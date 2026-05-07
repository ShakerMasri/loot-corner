import { Suspense } from "react";
import { LoginForm } from "~/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-10">
          <div className="h-96 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
