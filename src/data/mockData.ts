import {
  Photograph,
  Collection,
  SiteConfig,
  SITE_CONFIG,
  RAW_PHOTOGRAPHS,
  getAllCollections,
  getPhotographBySlug,
} from "@/lib/data";

export type { Photograph, Collection, SiteConfig };
export { SITE_CONFIG };

export const HERO_PHOTOGRAPH: Photograph =
  getPhotographBySlug("morning-mist-on-alpine-waters") || RAW_PHOTOGRAPHS[0];

export const FEATURED_PHOTOGRAPHS: Photograph[] = RAW_PHOTOGRAPHS.filter(
  (p) => p.featured && p.id !== "hero-plate"
);

export const COLLECTIONS = getAllCollections();
