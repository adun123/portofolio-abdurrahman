import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdurrahman — Fullstack Engineer",
  description:
    "Fullstack engineer crafting elegant, performant digital products. Based in Jakarta.",
  openGraph: {
    title: "Abdurrahman — Fullstack Engineer",
    description: "Crafting seamless digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}