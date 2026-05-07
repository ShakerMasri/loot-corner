"use client";

import { useAppPreferences } from "~/components/providers/AppPreferencesProvider";

export function Footer() {
  const { t } = useAppPreferences();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
        </p>

        <p className="max-w-md">{t.footer.description}</p>
      </div>
    </footer>
  );
}
