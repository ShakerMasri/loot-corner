// src/app/api/admin/products/route.ts

import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { createProductSchema } from "~/lib/validations";

export async function POST(req: Request) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const body = await req.json();

  const result = createProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const product = await db.product.create({
    data: result.data,
  });

  return NextResponse.json(product, { status: 201 });
}
