import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/metadata";
import { site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Devaansh Kumar",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: "/",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5f4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <StructuredData />
        <a
          href="#main-content"
          className="bg-foreground text-background focus-visible:ring-accent sr-only z-[100] rounded-sm px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
