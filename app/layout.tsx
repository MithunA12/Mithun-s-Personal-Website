import type { Metadata } from "next";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

const themeScript = `
  (() => {
    try {
      const storedTheme = localStorage.getItem("portfolio-theme");
      const theme = storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

      document.documentElement.classList.toggle("dark", theme === "dark");
      document.documentElement.dataset.theme = theme;
    } catch {}
  })();
`;

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
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
