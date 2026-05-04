import { OrderStatus, PaymentStatus } from "@prisma/client";
import { z } from "zod";

export const adminOrdersQuerySchema = z.object({
  status: z.nativeEnum(OrderStatus).optional(),
});

export const adminOrderParamsSchema = z.object({
  id: z.string().min(1, "Order ID is required."),
});

export const updateAdminOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});

export const updateAdminOrderPaymentSchema = z.object({
  paymentStatus: z.literal(PaymentStatus.PAID),
});
export const updateAdminOrderNoteSchema = z.object({
  adminNote: z.string().trim().max(1000, "Admin note is too long.").nullable(),
});
