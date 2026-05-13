import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { validateSameOriginRequest } from "~/lib/csrf";
import { prisma } from "~/lib/prisma";
import { rateLimit } from "~/lib/rate-limit";
import { auth } from "~/server/auth";
import { createOrderSchema } from "~/server/validations/order";

type OrderWithItems = {
  id: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: Prisma.Decimal;
  createdAt: Date;
  items: {
    id: string;
    quantity: number;
    priceAtPurchase: Prisma.Decimal;
    subtotalAmount: Prisma.Decimal;
    productNameAtPurchase: string;
    productSlugAtPurchase: string;
    productImagesAtPurchase: string[];
  }[];
};

function serializeOrder(order: OrderWithItems) {
  return {
    ...order,
    totalAmount: order.totalAmount.toString(),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      ...item,
      priceAtPurchase: item.priceAtPurchase.toString(),
      subtotalAmount: item.subtotalAmount.toString(),
    })),
  };
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "You must be logged in to view your orders." },
      { status: 401 },
    );
  }

  const userId = session.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        status: true,
        paymentMethod: true,
        paymentStatus: true,
        totalAmount: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            quantity: true,
            priceAtPurchase: true,
            subtotalAmount: true,
            productNameAtPurchase: true,
            productSlugAtPurchase: true,
            productImagesAtPurchase: true,
          },
        },
      },
    });

    return NextResponse.json({
      orders: orders.map(serializeOrder),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load orders." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "You must be logged in to place an order." },
      { status: 401 },
    );
  }

  const csrfResponse = validateSameOriginRequest(request);

  if (csrfResponse) {
    return csrfResponse;
  }

  const userId = session.user.id;

  const limited = await rateLimit(request, "orderCreate", userId);

  if (!limited.ok) {
    return limited.response;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = createOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid order request." },
      { status: 400 },
    );
  }

  const { idempotencyKey } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const customer = await tx.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          name: true,
          email: true,
          emailVerified: true,
          phone: true,
        },
      });

      if (!customer) {
        throw new Error("USER_NOT_FOUND");
      }

      if (!customer.emailVerified) {
        throw new Error("EMAIL_NOT_VERIFIED");
      }

      if (!customer.phone?.trim()) {
        throw new Error("PHONE_REQUIRED");
      }

      const existingOrder = await tx.order.findUnique({
        where: {
          userId_idempotencyKey: {
            userId,
            idempotencyKey,
          },
        },
        select: {
          id: true,
          status: true,
          paymentMethod: true,
          paymentStatus: true,
          totalAmount: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              quantity: true,
              priceAtPurchase: true,
              subtotalAmount: true,
              productNameAtPurchase: true,
              productSlugAtPurchase: true,
              productImagesAtPurchase: true,
            },
          },
        },
      });

      if (existingOrder) {
        return existingOrder;
      }

      const cartItems = await tx.cartItem.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              stock: true,
              images: true,
              isArchived: true,
            },
          },
        },
      });

      if (cartItems.length === 0) {
        throw new Error("EMPTY_CART");
      }

      for (const item of cartItems) {
        if (item.product.isArchived) {
          throw new Error("PRODUCT_NOT_AVAILABLE");
        }

        if (item.quantity > item.product.stock) {
          throw new Error("INSUFFICIENT_STOCK");
        }
      }

      for (const item of cartItems) {
        const updateResult = await tx.product.updateMany({
          where: {
            id: item.productId,
            isArchived: false,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (updateResult.count !== 1) {
          throw new Error("INSUFFICIENT_STOCK");
        }
      }

      const totalAmount = cartItems.reduce((sum, item) => {
        return sum.plus(item.product.price.mul(item.quantity));
      }, new Prisma.Decimal(0));

      const createdOrder = await tx.order.create({
        data: {
          userId,
          idempotencyKey,
          totalAmount,
          paymentMethod: "CASH_ON_DELIVERY",
          paymentStatus: "UNPAID",
          customerNameAtPurchase: customer.name,
          customerEmailAtPurchase: customer.email,
          customerPhoneAtPurchase: customer.phone,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.product.price,
              subtotalAmount: item.product.price.mul(item.quantity),
              productNameAtPurchase: item.product.name,
              productSlugAtPurchase: item.product.slug,
              productImagesAtPurchase: item.product.images,
            })),
          },
        },
        select: {
          id: true,
          status: true,
          paymentMethod: true,
          paymentStatus: true,
          totalAmount: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              quantity: true,
              priceAtPurchase: true,
              subtotalAmount: true,
              productNameAtPurchase: true,
              productSlugAtPurchase: true,
              productImagesAtPurchase: true,
            },
          },
        },
      });

      await tx.cartItem.deleteMany({
        where: {
          userId,
        },
      });

      return createdOrder;
    });

    return NextResponse.json({
      message: "Order placed successfully.",
      order: serializeOrder(order),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return NextResponse.json(
        { message: "Your account could not be found." },
        { status: 401 },
      );
    }

    if (error instanceof Error && error.message === "EMAIL_NOT_VERIFIED") {
      return NextResponse.json(
        { message: "Please verify your email before placing an order." },
        { status: 403 },
      );
    }

    if (error instanceof Error && error.message === "PHONE_REQUIRED") {
      return NextResponse.json(
        { message: "Please add a phone number before placing an order." },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "EMPTY_CART") {
      return NextResponse.json(
        { message: "Your cart is empty." },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "PRODUCT_NOT_AVAILABLE") {
      return NextResponse.json(
        { message: "One or more products are no longer available." },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "INSUFFICIENT_STOCK") {
      return NextResponse.json(
        { message: "One or more products do not have enough stock." },
        { status: 400 },
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const existingOrder = await prisma.order.findUnique({
        where: {
          userId_idempotencyKey: {
            userId,
            idempotencyKey,
          },
        },
        select: {
          id: true,
          status: true,
          paymentMethod: true,
          paymentStatus: true,
          totalAmount: true,
          createdAt: true,
          items: {
            select: {
              id: true,
              quantity: true,
              priceAtPurchase: true,
              subtotalAmount: true,
              productNameAtPurchase: true,
              productSlugAtPurchase: true,
              productImagesAtPurchase: true,
            },
          },
        },
      });

      if (existingOrder) {
        return NextResponse.json({
          message: "Order placed successfully.",
          order: serializeOrder(existingOrder),
        });
      }
    }

    return NextResponse.json(
      { message: "Failed to place order." },
      { status: 500 },
    );
  }
}
