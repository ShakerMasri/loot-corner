import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import { rateLimit } from "~/lib/rate-limit";
import { auth } from "~/server/auth";
import { addCartItemSchema } from "~/server/validations/cart";

const cartItemSelect = {
  id: true,
  productId: true,
  quantity: true,
} satisfies Prisma.CartItemSelect;

async function addOrIncrementCartItem({
  tx,
  userId,
  productId,
  quantity,
}: {
  tx: Prisma.TransactionClient;
  userId: string;
  productId: string;
  quantity: number;
}) {
  const product = await tx.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      stock: true,
      isArchived: true,
    },
  });

  if (!product || product.isArchived) {
    throw new Error("PRODUCT_NOT_AVAILABLE");
  }

  if (quantity > product.stock) {
    throw new Error("INSUFFICIENT_STOCK");
  }

  const existingCartItem = await tx.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingCartItem) {
    const updateResult = await tx.cartItem.updateMany({
      where: {
        id: existingCartItem.id,
        userId,
        quantity: {
          lte: product.stock - quantity,
        },
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });

    if (updateResult.count !== 1) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    return tx.cartItem.findUniqueOrThrow({
      where: {
        id: existingCartItem.id,
      },
      select: cartItemSelect,
    });
  }

  return tx.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
    select: cartItemSelect,
  });
}

function cartErrorResponse(error: unknown) {
  if (error instanceof Error && error.message === "PRODUCT_NOT_AVAILABLE") {
    return NextResponse.json(
      { message: "Product is not available." },
      { status: 404 },
    );
  }

  if (error instanceof Error && error.message === "INSUFFICIENT_STOCK") {
    return NextResponse.json(
      { message: "Not enough stock available." },
      { status: 400 },
    );
  }

  return null;
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "You must be logged in to add items to your cart." },
      { status: 401 },
    );
  }

  const userId = session.user.id;

  const limited = await rateLimit(request, "cartMutation", userId);

  if (!limited.ok) {
    return limited.response;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = addCartItemSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid cart item data." },
      { status: 400 },
    );
  }

  const { productId, quantity } = parsed.data;

  try {
    const cartItem = await prisma.$transaction((tx) =>
      addOrIncrementCartItem({
        tx,
        userId,
        productId,
        quantity,
      }),
    );

    return NextResponse.json({
      message: "Item added to cart.",
      cartItem,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      try {
        const cartItem = await prisma.$transaction((tx) =>
          addOrIncrementCartItem({
            tx,
            userId,
            productId,
            quantity,
          }),
        );

        return NextResponse.json({
          message: "Item added to cart.",
          cartItem,
        });
      } catch (retryError) {
        const retryResponse = cartErrorResponse(retryError);

        if (retryResponse) {
          return retryResponse;
        }
      }
    }

    const response = cartErrorResponse(error);

    if (response) {
      return response;
    }

    return NextResponse.json(
      { message: "Failed to add item to cart." },
      { status: 500 },
    );
  }
}
