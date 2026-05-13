import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug must be at least 2 characters.")
  .max(100, "Slug must be less than 100 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must use lowercase letters, numbers, and hyphens only.",
  );

export const productSlugSchema = z.object({
  slug: slugSchema,
});

export const productQuerySchema = z.object({
  category: slugSchema.optional(),
});
