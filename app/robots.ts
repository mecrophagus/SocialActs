import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/acceso", "/registro"],
        }
      : { userAgent: "*", disallow: "/" },
    ...(indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
