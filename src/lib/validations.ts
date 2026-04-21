import { z } from "zod";

const slugSchema = z
  .string()
  .min(2, "Slug must be at least 2 characters")
  .max(100, "Slug must be less than 100 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must use lowercase letters, numbers, and hyphens only",
  );

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  email: z.string().email("Invalid email address").toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),

  slug: slugSchema,
});

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),

  slug: slugSchema,

  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .nullable(),

  price: z.coerce.number().positive("Price must be greater than 0"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  images: z.array(z.string().url("Image must be a valid URL")).default([]),

  isArchived: z.boolean().default(false),

  isFeatured: z.boolean().default(false),

  categoryId: z.string().min(1, "Category is required"),
});

export const updateProductSchema = createProductSchema.partial();

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
