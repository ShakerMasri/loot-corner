import { OrderStatus, PaymentStatus } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

const validOrderId = "clh1q2w3e000008l4a5b6c7d8";

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
  rateLimit: vi.fn(),
  validateSameOriginRequest: vi.fn(),
  prisma: {
    order: {
      findUnique: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

vi.mock("~/lib/admin", () => ({
  requireAdmin: mocks.requireAdmin,
}));

vi.mock("~/lib/rate-limit", () => ({
  rateLimit: mocks.rateLimit,
}));

vi.mock("~/lib/csrf", () => ({
  validateSameOriginRequest: mocks.validateSameOriginRequest,
}));

vi.mock("~/lib/prisma", () => ({
  prisma: mocks.prisma,
}));

import { DELETE } from "./route";

function createRequest() {
  return new Request(`http://localhost:3000/api/admin/orders/${validOrderId}`, {
    method: "DELETE",
    headers: {
      origin: "http://localhost:3000",
    },
  });
}

function createRouteContext() {
  return {
    params: Promise.resolve({ id: validOrderId }),
  };
}

describe("admin order detail route", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.requireAdmin.mockResolvedValue({
      ok: true,
      user: {
        id: "admin-1",
        role: "ADMIN",
      },
    });

    mocks.rateLimit.mockResolvedValue({
      ok: true,
    });

    mocks.validateSameOriginRequest.mockReturnValue(null);
    mocks.prisma.order.updateMany.mockResolvedValue({ count: 1 });
  });

  it("soft archives a cancelled unpaid order", async () => {
    mocks.prisma.order.findUnique.mockResolvedValue({
      id: validOrderId,
      status: OrderStatus.CANCELLED,
      paymentStatus: PaymentStatus.UNPAID,
      adminArchivedAt: null,
    });

    const response = await DELETE(createRequest(), createRouteContext());

    expect(response.status).toBe(200);
    expect(mocks.prisma.order.updateMany).toHaveBeenCalledWith({
      where: {
        id: validOrderId,
        status: OrderStatus.CANCELLED,
        paymentStatus: PaymentStatus.UNPAID,
        adminArchivedAt: null,
      },
      data: {
        adminArchivedAt: expect.any(Date),
      },
    });
  });

  it("does not archive active orders", async () => {
    mocks.prisma.order.findUnique.mockResolvedValue({
      id: validOrderId,
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.UNPAID,
      adminArchivedAt: null,
    });

    const response = await DELETE(createRequest(), createRouteContext());
    const body = (await response.json()) as { message: string };

    expect(response.status).toBe(400);
    expect(body.message).toContain("Only cancelled orders");
    expect(mocks.prisma.order.updateMany).not.toHaveBeenCalled();
  });
});
