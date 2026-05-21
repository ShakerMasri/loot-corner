import type { Metadata } from "next";
import { LegalPolicyClient } from "~/components/legal/LegalPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Loot Corner",
  description: "How Loot Corner collects and uses customer data.",
};

export default function PrivacyPage() {
  return <LegalPolicyClient pageKey="privacy" />;
}
