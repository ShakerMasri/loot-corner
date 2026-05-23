import { OrderStatus, PaymentStatus } from "@prisma/client";
import { describe, expect, it } from "vitest";
import {
  adminOrderParamsSchema,
  adminOrdersQuerySchema,
  updateAdminOrderNoteSchema,
  updateAdminOrderPaymentSchema,
  updateAdminOrderStatusSchema,
} from "./admin-order";

const validCuid = "clh1q2w3e000008l4a5b6c7d8";
const validOrderStatus = Object.values(OrderStatus)[0]!;

describe("admin order validations", () => {
  it("accepts valid admin orders query", () => {
    const result = adminOrdersQuerySchema.safeParse({
      status: validOrderStatus,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid admin orders status", () => {
    const result = adminOrdersQuerySchema.safeParse({
      status: "NOT_REAL",
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid order params", () => {
    const result = adminOrderParamsSchema.safeParse({
      id: validCuid,
    });

    expect(result.success).toBe(true);
  });

  it("accepts valid order status update", () => {
    const result = updateAdminOrderStatusSchema.safeParse({
      status: validOrderStatus,
    });

    expect(result.success).toBe(true);
  });

  it("only accepts paid payment updates", () => {
    const result = updateAdminOrderPaymentSchema.safeParse({
      paymentStatus: PaymentStatus.PAID,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid payment status", () => {
    const result = updateAdminOrderPaymentSchema.safeParse({
      paymentStatus: "UNPAID",
    });

    expect(result.success).toBe(false);
  });

  it("trims admin note", () => {
    const result = updateAdminOrderNoteSchema.safeParse({
      adminNote: "  test note  ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.adminNote).toBe("test note");
    }
  });

  it("accepts null admin note", () => {
    const result = updateAdminOrderNoteSchema.safeParse({
      adminNote: null,
    });

    expect(result.success).toBe(true);
  });

  it("rejects admin note above 1000 characters", () => {
    const result = updateAdminOrderNoteSchema.safeParse({
      adminNote: "a".repeat(1001),
    });

    expect(result.success).toBe(false);
  });
});
