import { redirect } from "next/navigation";
import { AdminDashboardClient } from "~/components/admin/AdminDashboardClient";
import { auth } from "~/server/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <AdminDashboardClient />;
}
