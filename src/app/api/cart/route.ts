import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import { auth } from "~/server/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "You must be logged in to view your cart." },
      { status: 401 },
    );
  }

  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            stock: true,
            images: true,
            isArchived: true,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    const safeCartItems = cartItems.map((item) => ({
      ...item,
      product: {
        ...item.product,
        price: item.product.price.toString(),
      },
    }));

    return NextResponse.json({ cartItems: safeCartItems });
  } catch {
    return NextResponse.json(
      { message: "Failed to load cart." },
      { status: 500 },
    );
  }
}
