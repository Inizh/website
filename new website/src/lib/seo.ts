import type { Metadata } from "next";
import { site } from "@/lib/data";

export function createMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const siteUrl = site.url.replace(/\/$/, "");
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const ogImage = image ? `${siteUrl}${image}` : `${siteUrl}${site.ogImage}`;
  const pageTitle = title ? `${title} | ${site.name}` : site.name;
  const pageDescription = description ?? site.description;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name} cover image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}

export function jsonLdScript(value: Record<string, unknown>) {
  return {
    __html: JSON.stringify(value),
  };
}
