import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Start Here Jewelry – Lær smykkemaking",
  description: "Din guide til å komme i gang med smykkeprosjekter hjemme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className="antialiased min-h-screen bg-cream-50">{children}</body>
    </html>
  );
}
