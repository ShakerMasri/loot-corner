import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "~/lib/admin";
import { prisma } from "~/lib/prisma";
import { createProductSchema } from "~/lib/validations";
import { rateLimit } from "~/lib/rate-limit";

function serializeProduct(product: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: Prisma.Decimal;
  stock: number;
  images: string[];
  isArchived: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}) {
  return {
    ...product,
    price: product.price.toString(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export async function GET() {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        stock: true,
        images: true,
        isArchived: true,
        isFeatured: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      products: products.map(serializeProduct),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load products." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin();

  if (!admin.ok) {
    return admin.response;
  }

  const limited = await rateLimit(request, "adminMutation", admin.user.id);

  if (!limited.ok) {
    return limited.response;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = createProductSchema.safeParse(body);

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
    const category = await prisma.category.findUnique({
      where: {
        id: parsed.data.categoryId,
      },
      select: {
        id: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Invalid input.",
          errors: {
            categoryId: ["Category not found."],
          },
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: parsed.data,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        stock: true,
        images: true,
        isArchived: true,
        isFeatured: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully.",
        product: serializeProduct(product),
      },
      { status: 201 },
    );
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
      { message: "Failed to create product." },
      { status: 500 },
    );
  }
}
