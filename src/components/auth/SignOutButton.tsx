"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { useAppPreferences } from "~/components/providers/AppPreferencesProvider";

export function SignOutButton() {
  const { t } = useAppPreferences();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <button
      type="button"
      onClick={() => void handleSignOut()}
      disabled={isSigningOut}
      className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSigningOut ? t.auth.signingOut : t.auth.signOut}
    </button>
  );
}
