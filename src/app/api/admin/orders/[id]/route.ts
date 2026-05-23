import { OrderStatus, PaymentStatus } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "~/lib/admin";
import { validateSameOriginRequest } from "~/lib/csrf";
import { prisma } from "~/lib/prisma";
import { rateLimit } from "~/lib/rate-limit";
import { adminOrderParamsSchema } from "~/server/validations/admin-order";

const adminOrderDetailSelect = {
  id: true,
  status: true,
  totalAmount: true,
  paymentMethod: true,
  paymentStatus: true,
  adminArchivedAt: true,
  stockDeductedAt: true,
  adminNote: true,
  customerNameAtPurchase: true,
  customerEmailAtPurchase: true,
  customerPhoneAtPurchase: true,
  deliveryAreaKey: true,
  deliveryPrice: true,
  deliveryCity: true,
  deliveryAddress: true,
  deliveryNotes: true,
  pickupAgreementAccepted: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
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

type AdminOrderDetail = Prisma.OrderGetPayload<{
  select: typeof adminOrderDetailSelect;
}>;

function serializeAdminOrderDetail(order: AdminOrderDetail) {
  return {
    ...order,
    totalAmount: order.totalAmount.toString(),
    deliveryPrice: order.deliveryPrice.toString(),
    adminArchivedAt: order.adminArchivedAt?.toISOString() ?? null,
    stockDeductedAt: order.stockDeductedAt?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      ...item,
      priceAtPurchase: item.priceAtPurchase.toString(),
      subtotalAmount: item.subtotalAmount.toString(),
    })),
  };
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const { id } = await params;

  const parsedParams = adminOrderParamsSchema.safeParse({ id });

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parsedParams.data.id,
      },
      select: adminOrderDetailSelect,
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      order: serializeAdminOrderDetail(order),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load order." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const csrfResponse = validateSameOriginRequest(request);

  if (csrfResponse) {
    return csrfResponse;
  }

  const limited = await rateLimit(request, "adminMutation", admin.user.id);

  if (!limited.ok) {
    return limited.response;
  }

  const { id } = await params;
  const parsedParams = adminOrderParamsSchema.safeParse({ id });

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: parsedParams.data.id,
      },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        adminArchivedAt: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    if (order.adminArchivedAt) {
      return NextResponse.json({
        message: "Order is already archived.",
        archivedAt: order.adminArchivedAt.toISOString(),
      });
    }

    if (order.status !== OrderStatus.CANCELLED) {
      return NextResponse.json(
        { message: "Only cancelled orders can be archived." },
        { status: 400 },
      );
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return NextResponse.json(
        { message: "Paid orders cannot be archived from this action." },
        { status: 400 },
      );
    }

    const archivedAt = new Date();
    const result = await prisma.order.updateMany({
      where: {
        id: order.id,
        status: OrderStatus.CANCELLED,
        paymentStatus: PaymentStatus.UNPAID,
        adminArchivedAt: null,
      },
      data: {
        adminArchivedAt: archivedAt,
      },
    });

    if (result.count !== 1) {
      return NextResponse.json(
        { message: "Order changed before it could be archived. Refresh and try again." },
        { status: 409 },
      );
    }

    return NextResponse.json({
      message: "Cancelled order archived successfully.",
      archivedAt: archivedAt.toISOString(),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to archive order." },
      { status: 500 },
    );
  }
}
