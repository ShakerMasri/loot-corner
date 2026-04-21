import { auth } from "~/server/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <main style={{ padding: 40 }}>
      <h1>Profile</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
