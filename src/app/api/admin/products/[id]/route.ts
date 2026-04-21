import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { updateProductSchema } from "~/lib/validations";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const body = await req.json();

  const result = updateProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const product = await db.product.update({
    where: {
      id,
    },
    data: result.data,
  });

  return NextResponse.json(product);
}
