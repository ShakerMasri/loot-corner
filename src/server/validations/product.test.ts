import { describe, expect, it } from "vitest";
import { productQuerySchema, productSlugSchema } from "./product";

describe("product route validations", () => {
  it("accepts valid product slug", () => {
    const result = productSlugSchema.safeParse({
      slug: "silent-hill-figure",
    });

    expect(result.success).toBe(true);
  });

  it("rejects uppercase slug", () => {
    const result = productSlugSchema.safeParse({
      slug: "Silent-Hill-Figure",
    });

    expect(result.success).toBe(false);
  });

  it("rejects slug with spaces", () => {
    const result = productSlugSchema.safeParse({
      slug: "silent hill figure",
    });

    expect(result.success).toBe(false);
  });

  it("accepts empty product query", () => {
    const result = productQuerySchema.safeParse({});

    expect(result.success).toBe(true);
  });

  it("accepts valid category query", () => {
    const result = productQuerySchema.safeParse({
      category: "figures",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid category query", () => {
    const result = productQuerySchema.safeParse({
      category: "Bad Category!",
    });

    expect(result.success).toBe(false);
  });
});
