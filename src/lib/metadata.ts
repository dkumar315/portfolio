import type { Metadata } from "next";

import { site } from "@/lib/site";

const localSiteUrl = "http://localhost:3000";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

export function getSiteUrl(): URL {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!configuredUrl) {
    return new URL(localSiteUrl);
  }

  const absoluteUrl = configuredUrl.includes("://")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return new URL(absoluteUrl);
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: site.name,
      title: socialTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
