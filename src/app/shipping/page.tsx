import type { Metadata } from "next";
import { LegalPolicyClient } from "~/components/legal/LegalPolicyClient";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy | Loot Corner",
  description: "Delivery areas, prices, and timing for Loot Corner orders.",
};

export default function ShippingPage() {
  return <LegalPolicyClient pageKey="shipping" />;
}
