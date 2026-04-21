import { NextResponse } from "next/server";
import { auth } from "~/server/auth";

export async function GET() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Admin API works",
    user: session.user,
  });
}
