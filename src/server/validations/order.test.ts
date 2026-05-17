import { describe, expect, it } from "vitest";
import { createOrderSchema } from "./order";

describe("order validations", () => {
  it("accepts valid idempotency key", () => {
    const result = createOrderSchema.safeParse({
      idempotencyKey: "550e8400-e29b-41d4-a716-446655440000",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid idempotency key", () => {
    const result = createOrderSchema.safeParse({
      idempotencyKey: "not-a-uuid",
    });

    expect(result.success).toBe(false);
  });
});
