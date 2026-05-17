import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Abdurrahman / AI-Powered Full Stack Engineer",
  description:
    "AI-Powered Full Stack Engineer building OCR systems, enterprise web apps, AI workflows, document intelligence platforms, and LLM integrations.",
  openGraph: {
    title: "Abdurrahman / AI-Powered Full Stack Engineer",
    description:
      "AI-Powered Full Stack Engineer building OCR systems, enterprise web apps, AI workflows, document intelligence platforms, and LLM integrations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
