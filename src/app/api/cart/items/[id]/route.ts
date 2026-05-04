import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import { auth } from "~/server/auth";
import {
  cartItemParamsSchema,
  updateCartItemSchema,
} from "~/server/validations/cart";

type CartItemRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: CartItemRouteProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "You must be logged in to update your cart." },
      { status: 401 },
    );
  }

  const userId = session.user.id;
  const { id } = await params;

  const parsedParams = cartItemParamsSchema.safeParse({ id });

  if (!parsedParams.success) {
    return NextResponse.json(
      { message: "Invalid cart item ID." },
      { status: 400 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsedBody = updateCartItemSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid quantity." }, { status: 400 });
  }

  const { quantity } = parsedBody.data;

  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        id: parsedParams.data.id,
        userId,
      },
      select: {
        id: true,
        product: {
          select: {
            stock: true,
            isArchived: true,
          },
        },
      },
    });

    if (!existingCartItem) {
      return NextResponse.json(
        { message: "Cart item not found." },
        { status: 404 },
      );
    }

    if (existingCartItem.product.isArchived) {
      return NextResponse.json(
        { message: "This product is no longer available." },
        { status: 400 },
      );
    }

    if (quantity > existingCartItem.product.stock) {
      return NextResponse.json(
        { message: "Not enough stock available." },
        { status: 400 },
      );
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json({
      message: "Cart item updated.",
      cartItem: updatedCartItem,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update cart item." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: CartItemRouteProps,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "You must be logged in to remove cart items." },
      { status: 401 },
    );
  }

  const userId = session.user.id;
  const { id } = await params;

  const parsedParams = cartItemParamsSchema.safeParse({ id });

  if (!parsedParams.success) {
    return NextResponse.json(
      { message: "Invalid cart item ID." },
      { status: 400 },
    );
  }

  try {
    const result = await prisma.cartItem.deleteMany({
      where: {
        id: parsedParams.data.id,
        userId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: "Cart item not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Cart item removed.",
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to remove cart item." },
      { status: 500 },
    );
  }
}
