import {
  Photograph,
  Collection,
  SiteConfig,
  SITE_CONFIG,
  RAW_PHOTOGRAPHS,
  RAW_COLLECTIONS,
} from "@/lib/data";

export type { Photograph, Collection, SiteConfig };
export { SITE_CONFIG };

export const HERO_PHOTOGRAPH: Photograph =
  RAW_PHOTOGRAPHS.find((p) => p.slug === "morning-mist-on-alpine-waters") ||
  RAW_PHOTOGRAPHS[0];

export const FEATURED_PHOTOGRAPHS: Photograph[] = RAW_PHOTOGRAPHS.filter(
  (p) => p.featured && p.id !== "hero-plate"
);

export const COLLECTIONS: (Collection & { count: number })[] =
  RAW_COLLECTIONS.map((c) => ({
    ...c,
    count: RAW_PHOTOGRAPHS.filter((p) => p.collectionSlug === c.slug).length,
  }));
