import type { MetadataRoute } from "next";
import { demos } from "@/lib/demos";
import { locales } from "@/i18n/routing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/marketing", "/contact", ...demos.map((d) => `/demos/${d.slug}`)];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${site.url}${locale === "en" ? "" : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : page.startsWith("/demos") ? 0.7 : 0.9,
    })),
  );
}
