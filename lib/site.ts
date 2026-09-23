import type { Metadata } from "next";

// Configure the confirmed production origin before enabling indexing.
const configured = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configured
  ? new URL(configured).origin
  : "http://localhost:3000";
export const indexable = Boolean(
  configured && process.env.SITE_INDEXABLE === "true",
);
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Lolitas",
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: "/images/hero/lolitas-hero-mobile.jpg",
          alt: "Lolitas — experiencias y compañía",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero/lolitas-hero-mobile.jpg"],
    },
  };
}
