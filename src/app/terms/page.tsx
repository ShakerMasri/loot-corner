import type { Metadata } from "next";
import { LegalPolicyClient } from "~/components/legal/LegalPolicyClient";

export const metadata: Metadata = {
  title: "Terms of Use | Loot Corner",
  description: "Terms for using Loot Corner and placing orders.",
};

export default function TermsPage() {
  return <LegalPolicyClient pageKey="terms" />;
}
