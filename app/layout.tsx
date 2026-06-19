import type { Metadata } from "next";
import { Space_Grotesk, Bricolage_Grotesque, Fraunces } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Abdurrahman — AI-Powered Full Stack Engineer",
  description:
    "Abdurrahman is an AI-powered full stack engineer building intelligent systems and digital experiences  OCR pipelines, document intelligence, LLM workflows, and enterprise web products.",
  metadataBase: new URL("https://abdurrahman.dev"),
  openGraph: {
    title: "Abdurrahman — AI-Powered Full Stack Engineer",
    description:
      "Building intelligent systems and digital experiences. OCR pipelines, document intelligence, LLM workflows, enterprise web products.",
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
      className={`${spaceGrotesk.variable} ${bricolage.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg antialiased selection:bg-fg/90 selection:text-bg">
        {children}
      </body>
    </html>
  );
}
