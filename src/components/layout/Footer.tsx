"use client";

import Link from "next/link";
import { useAppPreferences } from "~/components/providers/AppPreferencesProvider";

export function Footer() {
  const { t } = useAppPreferences();

  const legalLinks = [
    { href: "/terms", label: t.legal.common.footerLinks.terms },
    { href: "/privacy", label: t.legal.common.footerLinks.privacy },
    { href: "/shipping", label: t.legal.common.footerLinks.shipping },
    { href: "/returns", label: t.legal.common.footerLinks.returns },
    { href: "/contact", label: t.legal.common.footerLinks.contact },
  ];

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
          </p>

          <p className="max-w-md">{t.footer.description}</p>
        </div>

        <nav
          aria-label="Legal links"
          className="flex flex-wrap gap-x-4 gap-y-2 border-t border-zinc-200 pt-5 dark:border-zinc-800"
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-zinc-700 transition hover:text-orange-600 dark:text-zinc-300 dark:hover:text-orange-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
