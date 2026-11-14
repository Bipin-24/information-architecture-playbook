import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { trackOrder } from "@/lib/tracks";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/articles", "/tools", "/tools/maturity-assessment", "/tools/chunk-lab", "/tools/structure-checker", "/glossary", "/resources", "/evolution", "/about"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...trackOrder.map((t) => ({ url: `${site.url}/tracks/${t}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getAllArticles().map((a) => ({ url: `${site.url}/articles/${a.slug}`, lastModified: new Date(a.updated), changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
