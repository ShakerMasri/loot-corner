import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";
import { AppPreferencesProvider } from "~/components/providers/AppPreferencesProvider";

export const metadata: Metadata = {
  title: "Loot Corner",
  description:
    "A simple ecommerce store for browsing products and placing orders.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-50 font-sans text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50">
        <AppPreferencesProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppPreferencesProvider>
      </body>
    </html>
  );
}
