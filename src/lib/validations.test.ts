import { describe, expect, it } from "vitest";
import {
  createProductSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "./validations";

describe("registerSchema", () => {
  it("accepts valid registration input", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "TEST@EXAMPLE.COM",
      password: "password123",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe("test@example.com");
    }
  });

  it("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "not-an-email",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = registerSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid login input", () => {
    const result = loginSchema.safeParse({
      email: "USER@EXAMPLE.COM",
      password: "password123",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });
});

describe("updateProfileSchema", () => {
  it("accepts valid profile input and normalizes phone", () => {
    const result = updateProfileSchema.safeParse({
      name: "Customer Name",
      phone: "+972 59-123-4567",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.phone).toBe("+972591234567");
    }
  });

  it("rejects invalid phone characters", () => {
    const result = updateProfileSchema.safeParse({
      name: "Customer Name",
      phone: "abc-phone",
    });

    expect(result.success).toBe(false);
  });
});

describe("createProductSchema", () => {
  const validProduct = {
    name: "Test Product",
    slug: "test-product",
    description: "A test product",
    price: "99.99",
    stock: 10,
    images: ["https://res.cloudinary.com/demo/image/upload/test.jpg"],
    isArchived: false,
    isFeatured: false,
    categoryId: "category-1",
  };

  it("accepts valid product input", () => {
    const result = createProductSchema.safeParse(validProduct);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.price).toBe(99.99);
    }
  });

  it("rejects invalid slug", () => {
    const result = createProductSchema.safeParse({
      ...validProduct,
      slug: "Invalid Slug!",
    });

    expect(result.success).toBe(false);
  });

  it("rejects negative stock", () => {
    const result = createProductSchema.safeParse({
      ...validProduct,
      stock: -1,
    });

    expect(result.success).toBe(false);
  });

  it("rejects non-Cloudinary image URLs", () => {
    const result = createProductSchema.safeParse({
      ...validProduct,
      images: ["https://example.com/image.jpg"],
    });

    expect(result.success).toBe(false);
  });

  it("rejects prices with more than 2 decimals", () => {
    const result = createProductSchema.safeParse({
      ...validProduct,
      price: "99.999",
    });

    expect(result.success).toBe(false);
  });
});
