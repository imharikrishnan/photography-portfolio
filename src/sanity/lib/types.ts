export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string;
  };
}

export interface SanityImage {
  asset?: SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

export type ColorFamily =
  | "monochrome"
  | "warm-earth"
  | "cool-slate"
  | "emerald-forest"
  | "golden-hour"
  | "crimson-accent"
  | "deep-night"
  | "high-key-light"
  | "muted-neutral";

export type ImageOrientation = "portrait" | "landscape" | "square";

export interface ColorSwatch {
  hex: string;
  rgb?: {
    r: number;
    g: number;
    b: number;
  };
  hsl?: {
    h: number;
    s: number;
    l: number;
  };
  lab?: {
    l: number;
    a: number;
    b: number;
  };
  population?: number;
  role?: "dominant" | "accent" | "background" | "muted" | string;
}

export interface PhotographVisualMetadata {
  status?: "pending" | "analyzed" | "failed";
  version?: number;
  sourceAssetRef?: string;
  analyzedAt?: string;
  dominantColor?: ColorSwatch;
  palette?: ColorSwatch[];
  brightness?: number;
  contrast?: number;
  saturation?: number;
  colorTemperature?: number;
  colorFamily?: ColorFamily;
  orientation?: ImageOrientation;
  aspectRatioNumeric?: number;
  error?: string;
}

export interface CurationControls {
  pinnedPosition?: number;
  forcePunctuation?: boolean;
  manualColorFamily?: ColorFamily;
}

export interface SanityPhotographDoc {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title?: string;
  slug?: string;
  plateNumber?: string;
  displayOrder?: number;
  image: SanityImage;
  aspectRatio?: "4:5" | "16:9" | "1:1" | "2.39:1" | "3:2";
  category?:
    | "Landscapes"
    | "Travel & Streets"
    | "Nature & Wildlife"
    | "People & Portraits"
    | "Architecture";
  collection?: {
    _id: string;
    title: string;
    slug: string;
    journeyNumber: string;
  } | null;
  featured?: boolean;
  isHero?: boolean;
  description?: string;
  notes?: string;
  location?: {
    placename?: string;
    region?: string;
    country?: string;
  };
  captureDate?: string;
  cameraExif?: {
    cameraModel?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
  };
  isPlaceholder?: boolean;
  sampleNote?: string;
  visualMetadata?: PhotographVisualMetadata;
  curationControls?: CurationControls;
}

export interface SanityCollectionDoc {
  _id: string;
  _createdAt?: string;
  title: string;
  slug: string;
  journeyNumber: string;
  subtitle?: string;
  description?: string;
  coverImage: SanityImage;
  yearRange?: string;
  displayOrder?: number;
  count?: number;
}

export interface SanitySiteSettingsDoc {
  _id: string;
  photographerName?: string;
  tagline?: string;
  siteTitle?: string;
  personalIntro?: string;
  aboutBio?: string[];
  portrait?: SanityImage;
  camera?: {
    model?: string;
    description?: string;
  };
  contactHeading?: string;
  contactDescription?: string;
  emailPlaceholder?: string;
  socialLinks?: {
    name: string;
    url: string;
  }[];
  placeholderDisclaimer?: string;
}
