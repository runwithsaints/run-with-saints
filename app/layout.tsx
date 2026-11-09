// app/layout.tsx
// Wraps every page on the site. This replaces the starter layout, which
// loaded the Geist font from Google over the internet. The display font
// now comes from node_modules, so pages look right with no connection.
import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Run With Saints",
  description: "Discover Catholic events near you.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
