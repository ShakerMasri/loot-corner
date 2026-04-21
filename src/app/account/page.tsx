import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Account Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
