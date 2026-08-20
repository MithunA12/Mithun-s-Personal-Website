import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { profile } from "@/src/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name }],
  category: "technology",
  creator: profile.name,
  description:
    "Portfolio of Mithun Arun, an AI/Biomedical researcher and product builder with published healthcare AI work and shipped software projects.",
  keywords: [
    "Mithun Arun",
    "AI researcher",
    "computer science",
    "healthcare AI",
    "software engineer portfolio",
    "machine learning",
    "signal processing",
  ],
  openGraph: {
    description:
      "Published healthcare AI research, software projects, and product building from Mithun Arun.",
    locale: "en_US",
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} Portfolio`,
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  },
  title: `${profile.name} Portfolio`,
  twitter: {
    card: "summary",
    description:
      "Published healthcare AI research, software projects, and product building from Mithun Arun.",
    title: `${profile.name} Portfolio`,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { color: "#f6f8fb", media: "(prefers-color-scheme: light)" },
    { color: "#0b1120", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ScrollProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
