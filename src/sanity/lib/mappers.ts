import { Photograph, Collection, SiteConfig, SITE_CONFIG } from "@/lib/data";
import {
  SanityPhotographDoc,
  SanityCollectionDoc,
  SanitySiteSettingsDoc,
} from "./types";
import { resolveImageUrl } from "./image";

/**
 * Maps a Sanity photograph document to the application Photograph model
 */
export function mapSanityPhotograph(doc: SanityPhotographDoc): Photograph {
  const imageUrl = resolveImageUrl(doc.image, 2000, 85);
  const lqip = doc.image?.asset?.metadata?.lqip;

  // Extract authentic EXIF only. None of these fields should ever be fabricated.
  const exif = doc.cameraExif;
  const cameraModel = exif?.cameraModel?.trim() || undefined;
  const lens = exif?.lens?.trim() || undefined;
  const focalLength = exif?.focalLength?.trim() || undefined;
  const aperture = exif?.aperture?.trim() || undefined;
  const shutterSpeed = exif?.shutterSpeed?.trim() || undefined;
  const iso = exif?.iso?.trim() || undefined;

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    imageUrl: imageUrl || "/placeholder.jpg",
    alt: doc.image?.alt || doc.title,
    category: doc.category,
    displayOrder: doc.displayOrder ?? 0,
    plateNumber: doc.plateNumber || undefined,
    aspectRatio: doc.aspectRatio || undefined,
    caption: doc.image?.caption || undefined,
    description: doc.description || undefined,
    notes: doc.notes || undefined,
    location: doc.location?.placename
      ? {
          placename: doc.location.placename,
          region: doc.location.region || "",
          country: doc.location.country || undefined,
        }
      : undefined,
    captureDate: doc.captureDate || undefined,
    collectionSlug: doc.collection?.slug || undefined,
    series: doc.collection?.title || undefined,
    cameraModel,
    lens,
    focalLength,
    aperture,
    shutterSpeed,
    iso,
    featured: Boolean(doc.featured),
    isPlaceholder: Boolean(doc.isPlaceholder),
    sampleNote: doc.sampleNote || undefined,
    lqip,
  };
}

/**
 * Maps a Sanity collection document to the application Collection model with plate count
 */
export function mapSanityCollection(
  doc: SanityCollectionDoc
): Collection & { count: number } {
  const coverImage = resolveImageUrl(doc.coverImage, 1600, 85);
  const lqip = doc.coverImage?.asset?.metadata?.lqip;

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    journeyNumber: doc.journeyNumber,
    subtitle: doc.subtitle || "",
    description: doc.description || "",
    coverImage: coverImage || "/placeholder.jpg",
    yearRange: doc.yearRange || undefined,
    count: doc.count ?? 0,
    lqip,
  };
}

/**
 * Maps a Sanity siteSettings document to the application SiteConfig model
 */
export function mapSanitySiteSettings(
  doc: SanitySiteSettingsDoc | null | undefined
): SiteConfig {
  if (!doc) {
    return SITE_CONFIG;
  }

  const portraitUrl = doc.portrait
    ? resolveImageUrl(doc.portrait, 900, 90)
    : undefined;
  const portraitLqip = doc.portrait?.asset?.metadata?.lqip;

  return {
    photographerName:
      doc.photographerName?.trim() || SITE_CONFIG.photographerName,
    tagline: doc.tagline?.trim() || SITE_CONFIG.tagline,
    siteTitle: doc.siteTitle?.trim() || SITE_CONFIG.siteTitle,
    personalIntro: doc.personalIntro?.trim() || SITE_CONFIG.personalIntro,
    aboutBio:
      doc.aboutBio && doc.aboutBio.length > 0
        ? doc.aboutBio
        : SITE_CONFIG.aboutBio,
    camera: {
      model: doc.camera?.model?.trim() || SITE_CONFIG.camera.model,
      description:
        doc.camera?.description?.trim() || SITE_CONFIG.camera.description,
    },
    contactHeading:
      doc.contactHeading?.trim() || SITE_CONFIG.contactHeading,
    contactDescription:
      doc.contactDescription?.trim() || SITE_CONFIG.contactDescription,
    emailPlaceholder:
      doc.emailPlaceholder?.trim() || SITE_CONFIG.emailPlaceholder,
    socialLinks:
      doc.socialLinks && doc.socialLinks.length > 0
        ? doc.socialLinks.map((s) => ({
            name: s.name,
            placeholder: s.url,
          }))
        : SITE_CONFIG.socialLinks,
    placeholderDisclaimer:
      doc.placeholderDisclaimer?.trim() || SITE_CONFIG.placeholderDisclaimer,
    portraitUrl,
    portraitLqip,
  };
}
