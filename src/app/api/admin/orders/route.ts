import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "~/lib/admin";
import { prisma } from "~/lib/prisma";
import { adminOrdersQuerySchema } from "~/server/validations/admin-order";

const adminOrderSelect = {
  id: true,
  status: true,
  totalAmount: true,
  paymentMethod: true,
  paymentStatus: true,
  adminNote: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  items: {
    select: {
      id: true,
      quantity: true,
      priceAtPurchase: true,
      subtotalAmount: true,
      productNameAtPurchase: true,
      productSlugAtPurchase: true,
      productImagesAtPurchase: true,
      productId: true,
    },
    orderBy: {
      id: "asc",
    },
  },
} satisfies Prisma.OrderSelect;

type AdminOrder = Prisma.OrderGetPayload<{
  select: typeof adminOrderSelect;
}>;

function serializeAdminOrder(order: AdminOrder) {
  return {
    ...order,
    totalAmount: order.totalAmount.toString(),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      ...item,
      priceAtPurchase: item.priceAtPurchase.toString(),
      subtotalAmount: item.subtotalAmount.toString(),
    })),
  };
}

export async function GET(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const url = new URL(request.url);

  const parsed = adminOrdersQuerySchema.safeParse({
    status: url.searchParams.get("status") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid query params.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const orders = await prisma.order.findMany({
      where: parsed.data.status
        ? {
            status: parsed.data.status,
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
      select: adminOrderSelect,
    });

    return NextResponse.json({
      orders: orders.map(serializeAdminOrder),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load orders." },
      { status: 500 },
    );
  }
}
