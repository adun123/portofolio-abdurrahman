import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Abdurrahman — AI-Powered Full Stack Engineer",
  description:
    "Abdurrahman is an AI-powered full stack engineer building intelligent systems and digital experiences — OCR pipelines, document intelligence, LLM workflows, and enterprise web products.",
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
      className={`${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg antialiased selection:bg-fg/90 selection:text-bg">
        {children}
      </body>
    </html>
  );
}
