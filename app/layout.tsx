import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mithun Arun | AI/CS Researcher and Product Builder",
  description:
    "Portfolio of Mithun Arun, an AI/CS researcher and product builder working across healthcare, software engineering, and student innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
