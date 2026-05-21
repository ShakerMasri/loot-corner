import type { Metadata } from "next";
import { LegalPolicyClient } from "~/components/legal/LegalPolicyClient";

export const metadata: Metadata = {
  title: "Returns and Refunds Policy | Loot Corner",
  description: "Return and refund rules for Loot Corner orders.",
};

export default function ReturnsPage() {
  return <LegalPolicyClient pageKey="returns" />;
}
