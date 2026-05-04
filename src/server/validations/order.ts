import { z } from "zod";

export const createOrderSchema = z.object({
  idempotencyKey: z.string().uuid("Invalid idempotency key."),
});
