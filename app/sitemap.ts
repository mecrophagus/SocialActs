import type { MetadataRoute } from "next";
import { publicProfiles } from "@/lib/public-profiles";
import { siteUrl, indexable } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return [
    "/",
    "/perfiles",
    ...publicProfiles.map((profile) => `/perfiles/${profile.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
