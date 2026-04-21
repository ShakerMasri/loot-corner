// src/app/admin/page.tsx

import { notFound, redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    notFound();
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Admin Page</h1>
      <p>Only admins can see this page.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
