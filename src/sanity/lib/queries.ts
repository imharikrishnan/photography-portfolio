import { groq } from "next-sanity";

// Shared projection for photograph documents
const PHOTOGRAPH_FIELDS = groq`
  _id,
  _createdAt,
  _updatedAt,
  title,
  "slug": slug.current,
  plateNumber,
  displayOrder,
  image {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip
      }
    },
    hotspot,
    crop,
    alt,
    caption
  },
  aspectRatio,
  category,
  "collection": collection-> {
    _id,
    title,
    "slug": slug.current,
    journeyNumber
  },
  featured,
  isHero,
  description,
  notes,
  location {
    placename,
    region,
    country
  },
  captureDate,
  cameraExif {
    cameraModel,
    lens,
    focalLength,
    aperture,
    shutterSpeed,
    iso
  },
  isPlaceholder,
  sampleNote,
  visualMetadata {
    status,
    version,
    sourceAssetRef,
    analyzedAt,
    dominantColor {
      hex,
      rgb { r, g, b },
      hsl { h, s, l },
      lab { l, a, b }
    },
    palette[] {
      hex,
      rgb { r, g, b },
      hsl { h, s, l },
      lab { l, a, b },
      population,
      role
    },
    brightness,
    contrast,
    saturation,
    colorTemperature,
    colorFamily,
    orientation,
    aspectRatioNumeric,
    error
  },
  curationControls {
    pinnedPosition,
    forcePunctuation,
    manualColorFamily
  }
`;

// Shared projection for travel collection documents
const COLLECTION_FIELDS = groq`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  journeyNumber,
  subtitle,
  description,
  coverImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip
      }
    },
    hotspot,
    crop,
    alt
  },
  yearRange,
  displayOrder,
  "count": count(*[_type == "photograph" && !(_id in path("drafts.**")) && references(^._id)])
`;

/**
 * Fetch all published photographs ordered by curatorial displayOrder
 */
export const ALL_PHOTOGRAPHS_QUERY = groq`
  *[_type == "photograph" && !(_id in path("drafts.**"))] | order(displayOrder asc, _createdAt desc) {
    ${PHOTOGRAPH_FIELDS}
  }
`;

/**
 * Fetch published photographs designated for the homepage featured grid
 */
export const FEATURED_PHOTOGRAPHS_QUERY = groq`
  *[_type == "photograph" && !(_id in path("drafts.**")) && featured == true] | order(displayOrder asc, _createdAt desc) {
    ${PHOTOGRAPH_FIELDS}
  }
`;

/**
 * Fetch the designated hero photograph (isHero == true), falling back to plate 00 or first plate
 */
export const HERO_PHOTOGRAPH_QUERY = groq`
  *[_type == "photograph" && !(_id in path("drafts.**")) && isHero == true][0] {
    ${PHOTOGRAPH_FIELDS}
  }
`;

/**
 * Fetch a single photograph by its URL slug
 */
export const PHOTOGRAPH_BY_SLUG_QUERY = groq`
  *[_type == "photograph" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    ${PHOTOGRAPH_FIELDS}
  }
`;

/**
 * Fetch published photographs belonging to a specific collection slug
 */
export const PHOTOGRAPHS_BY_COLLECTION_QUERY = groq`
  *[_type == "photograph" && !(_id in path("drafts.**")) && collection->slug.current == $collectionSlug] | order(displayOrder asc, _createdAt desc) {
    ${PHOTOGRAPH_FIELDS}
  }
`;

/**
 * Fetch published photographs matching a category
 */
export const PHOTOGRAPHS_BY_CATEGORY_QUERY = groq`
  *[_type == "photograph" && !(_id in path("drafts.**")) && category == $category] | order(displayOrder asc, _createdAt desc) {
    ${PHOTOGRAPH_FIELDS}
  }
`;

/**
 * Fetch all published travel collections with dynamic plate counts
 */
export const ALL_COLLECTIONS_QUERY = groq`
  *[_type == "collection" && !(_id in path("drafts.**"))] | order(displayOrder asc, _createdAt desc) {
    ${COLLECTION_FIELDS}
  }
`;

/**
 * Fetch a single travel collection by its URL slug
 */
export const COLLECTION_BY_SLUG_QUERY = groq`
  *[_type == "collection" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    ${COLLECTION_FIELDS}
  }
`;

/**
 * Fetch site settings and photographer identity singleton
 */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings" && !(_id in path("drafts.**"))][0] {
    _id,
    photographerName,
    tagline,
    siteTitle,
    personalIntro,
    aboutBio,
    portrait {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          },
          lqip
        }
      },
      hotspot,
      crop,
      alt
    },
    camera {
      model,
      description
    },
    contactHeading,
    contactDescription,
    emailPlaceholder,
    socialLinks,
    placeholderDisclaimer
  }
`;

/**
 * Draft mode queries: used exclusively in Draft Mode sessions with server-side authentication
 * to preview unpublished drafts alongside published content.
 */
export const DRAFT_PHOTOGRAPH_BY_SLUG_QUERY = groq`
  *[_type == "photograph" && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${PHOTOGRAPH_FIELDS}
  }
`;

export const DRAFT_ALL_PHOTOGRAPHS_QUERY = groq`
  *[_type == "photograph"] | order(displayOrder asc, _createdAt desc) {
    ${PHOTOGRAPH_FIELDS}
  }
`;

export const DRAFT_COLLECTION_BY_SLUG_QUERY = groq`
  *[_type == "collection" && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${COLLECTION_FIELDS}
  }
`;

export const DRAFT_ALL_COLLECTIONS_QUERY = groq`
  *[_type == "collection"] | order(displayOrder asc, _createdAt desc) {
    ${COLLECTION_FIELDS}
  }
`;
