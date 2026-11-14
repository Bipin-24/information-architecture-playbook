import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: information architecture, from fundamentals to the AI era`, template: `%s | ${site.short}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.linkedin }],
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  keywords: ["information architecture", "IA", "taxonomy", "ontology", "content modeling", "RAG", "knowledge graphs", "Model Context Protocol", "findability"],
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description, url: "/" },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
};

export const viewport: Viewport = { themeColor: "#090e1c", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
