import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/metadata";

const indexedRoutes = [
  "/",
  "/experience",
  "/projects",
  "/about",
  "/resume",
  "/contact",
  "/projects/rupturelab",
  "/projects/nat",
  "/projects/wheat-segmentation",
  "/projects/xrfm",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return indexedRoutes.map((path) => ({
    url: new URL(path, baseUrl).toString(),
  }));
}
