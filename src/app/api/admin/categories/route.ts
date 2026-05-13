import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "~/lib/admin";
import { prisma } from "~/lib/prisma";
import { createCategorySchema } from "~/lib/validations";
import { rateLimit } from "~/lib/rate-limit";
import { validateSameOriginRequest } from "~/lib/csrf";

const adminCategorySelect = {
  id: true,
  name: true,
  slug: true,
} satisfies Prisma.CategorySelect;

export async function POST(request: Request) {
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

  const body: unknown = await request.json().catch(() => null);
  const parsed = createCategorySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid input.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const category = await prisma.category.create({
      data: parsed.data,
      select: adminCategorySelect,
    });

    return NextResponse.json({
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: "Invalid input.",
          errors: {
            slug: ["This slug is already used."],
          },
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Failed to create category." },
      { status: 500 },
    );
  }
}
export async function GET() {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return NextResponse.json({
      categories,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load categories." },
      { status: 500 },
    );
  }
}
