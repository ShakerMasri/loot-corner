"use client";

import Link from "next/link";
import { SignOutButton } from "~/components/auth/SignOutButton";
import { useAppPreferences } from "~/components/providers/AppPreferencesProvider";

type AccountClientProps = {
  user: {
    name: string;
    email: string;
    role: string;
  };
};

export function AccountClient({ user }: AccountClientProps) {
  const { t } = useAppPreferences();

  const displayName = user.name || t.account.customer;
  const firstLetter = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold tracking-wide text-orange-600 uppercase dark:text-orange-400">
          {t.account.badge}
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
              {t.account.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {t.account.description}
            </p>
          </div>

          <SignOutButton />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-xl font-black text-orange-700 dark:bg-orange-950 dark:text-orange-300">
            {firstLetter}
          </div>

          <h2 className="mt-5 text-xl font-black text-zinc-950 dark:text-white">
            {displayName}
          </h2>

          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {user.email || t.account.noEmail}
          </p>

          <div className="mt-5 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {user.role}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-black text-zinc-950 dark:text-white">
            {t.account.quickActions}
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/products"
              className="rounded-2xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-900 dark:hover:bg-orange-950"
            >
              <p className="font-bold text-zinc-950 dark:text-white">
                {t.account.browseProducts}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {t.account.browseProductsDescription}
              </p>
            </Link>

            <Link
              href="/cart"
              className="rounded-2xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-900 dark:hover:bg-orange-950"
            >
              <p className="font-bold text-zinc-950 dark:text-white">
                {t.account.viewCart}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {t.account.viewCartDescription}
              </p>
            </Link>

            <Link
              href="/orders"
              className="rounded-2xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-900 dark:hover:bg-orange-950"
            >
              <p className="font-bold text-zinc-950 dark:text-white">
                {t.account.myOrders}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {t.account.myOrdersDescription}
              </p>
            </Link>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="rounded-2xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-900 dark:hover:bg-orange-950"
              >
                <p className="font-bold text-zinc-950 dark:text-white">
                  {t.account.adminDashboard}
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t.account.adminDashboardDescription}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
