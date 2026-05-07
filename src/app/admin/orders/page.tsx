import { redirect } from "next/navigation";
import { AdminOrdersClient } from "~/components/admin/AdminOrdersClient";
import { auth } from "~/server/auth";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/orders");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <AdminOrdersClient />
    </main>
  );
}
