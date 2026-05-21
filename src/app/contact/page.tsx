import type { Metadata } from "next";
import { LegalPolicyClient } from "~/components/legal/LegalPolicyClient";

export const metadata: Metadata = {
  title: "Contact | Loot Corner",
  description: "Contact Loot Corner for order and support questions.",
};

export default function ContactPage() {
  return <LegalPolicyClient pageKey="contact" />;
}
