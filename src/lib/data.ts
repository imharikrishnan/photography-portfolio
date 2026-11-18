export type PhotographCategory =
  | "Landscapes"
  | "Travel & Streets"
  | "Nature & Wildlife"
  | "People & Portraits"
  | "Architecture";

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

export type PhotographAspectRatio =
  | "4:5"
  | "16:9"
  | "1:1"
  | "2.39:1"
  | "3:2";

export interface PhotographLocation {
  placename: string;
  region: string;
  country?: string;
}

export interface PhotographCameraExif {
  cameraModel?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
}

export interface Photograph {
  // Core display identifiers
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  alt: string;

  // Optional categorization and sequence
  category?: PhotographCategory;
  displayOrder?: number;

  // Optional curatorial & editorial fields
  plateNumber?: string;
  aspectRatio?: PhotographAspectRatio;
  caption?: string;
  description?: string;
  notes?: string;
  location?: PhotographLocation;
  captureDate?: string;
  year?: string;
  collectionSlug?: string;
  series?: string;
  cameraModel?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  featured?: boolean;
  isHero?: boolean;
  isPlaceholder?: boolean;
  sampleNote?: string;
  lqip?: string;

  // Visual intelligence & curation
  visualMetadata?: PhotographVisualMetadata;
  curationControls?: CurationControls;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  journeyNumber: string;
  subtitle: string;
  description: string;
  coverImage: string;
  yearRange?: string;
  lqip?: string;
}

export interface SiteConfig {
  photographerName: string;
  tagline: string;
  siteTitle: string;
  personalIntro: string;
  aboutBio: string[];
  camera: {
    model: string;
    description: string;
  };
  contactHeading: string;
  contactDescription: string;
  emailPlaceholder: string;
  socialLinks: {
    name: string;
    placeholder: string;
  }[];
  placeholderDisclaimer: string;
  portraitUrl?: string;
  portraitLqip?: string;
}

export const SITE_CONFIG: SiteConfig = {
  photographerName: "Harikrishnan Nandanan",
  tagline: "Photography · Travel · Visual Stories",
  siteTitle: "Harikrishnan Nandanan — Photography · Travel · Visual Stories",
  personalIntro:
    "A personal photography archive and visual exhibition — documenting travel journeys, wild landscapes, city streets, and quiet everyday moments.",
  aboutBio: [
    "I am a hobbyist photographer with an enduring passion for travelling, exploring unfamiliar places, and taking photographs along the way.",
    "Photography is not my profession — it is my creative space and personal way of slowing down. Whether hiking up a mountain trail, wandering through rain-soaked city alleys, observing wildlife, or admiring geometric architecture, I use photography to document experiences, light, and memory.",
    "This website is designed like a personal exhibition: a thoughtful, quiet space to share the scenes and stories that caught my eye.",
  ],
  camera: {
    model: "Canon EOS R6 Mark III",
    description:
      "My primary camera for travels and everyday explorations. Paired with versatile optics, it allows me to stay mobile and focus on observing rather than carrying heavy equipment.",
  },
  contactHeading: "Let's Connect",
  contactDescription:
    "Whether it's a shared love of photography, a travel story, or simply a conversation about a memorable place, I'd love to hear from you.",
  emailPlaceholder: "[Your Email Address — to be configured in CMS]",
  socialLinks: [
    { name: "Instagram", placeholder: "[Your Instagram Profile]" },
    { name: "Twitter / X", placeholder: "[Your Profile or Link]" },
  ],
  placeholderDisclaimer:
    "Notice: All current images are temporary sample placeholders illustrating the exhibition layout until my personal photo library is uploaded.",
};

export const RAW_COLLECTIONS: Collection[] = [
  {
    id: "series-01",
    journeyNumber: "JOURNEY 01",
    title: "Wanderings & Wild Places",
    slug: "wanderings-and-wild-places",
    subtitle: "Mountains, Valleys & Open Trails",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Photographs from outdoor travels — mountain passes, tranquil lakes, forest trails, and the raw beauty of natural landscapes encountered while hiking.",
    yearRange: "Recent Travels",
  },
  {
    id: "series-02",
    journeyNumber: "JOURNEY 02",
    title: "City Streets & Travel Notes",
    slug: "city-streets-and-travel-notes",
    subtitle: "Everyday Scenes & Evening Rain",
    coverImage:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    description:
      "Candid street moments, evening light, coastal villages, and quiet corners discovered while wandering through new towns, alleys, and historic pathways.",
    yearRange: "Recent Travels",
  },
  {
    id: "series-03",
    journeyNumber: "JOURNEY 03",
    title: "Forms & Spaces",
    slug: "forms-and-spaces",
    subtitle: "Architecture, Lines & Shadow",
    coverImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Appreciating geometric lines, clean angles, cantilevered façades, and the play of sunlight and shadow on buildings and public spaces.",
    yearRange: "Recent Travels",
  },
];

export const RAW_PHOTOGRAPHS: Photograph[] = [
  {
    id: "hero-plate",
    plateNumber: "PLATE 00",
    displayOrder: 0,
    title: "Morning Mist on Alpine Waters",
    slug: "morning-mist-on-alpine-waters",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2600&q=88",
    aspectRatio: "16:9",
    alt: "Morning fog lifting over a serene alpine valley lake with granite cliff reflections",
    caption: "Sample Plate 00 — Atmospheric dawn light over quiet valley waters.",
    description:
      "A peaceful morning study of dawn mist drifting across mountain lake reflections, photographed during an early trail walk.",
    series: "Wanderings & Wild Places",
    collectionSlug: "wanderings-and-wild-places",
    category: "Landscapes",
    year: "Sample Archive",
    captureDate: "Early Morning Walk",
    location: {
      placename: "Valley Lake Reflection",
      region: "Mountain Range (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "A curated sample photograph representing the peaceful morning light and reflections typical of high mountain journeys.",
  },
  {
    id: "plate-01",
    plateNumber: "PLATE 01",
    displayOrder: 1,
    title: "Mountain Ridges in Morning Sun",
    slug: "mountain-ridges-in-morning-sun",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=85",
    aspectRatio: "16:9",
    alt: "Majestic jagged mountain ridge illuminated by low-angle golden sunlight",
    caption: "Sample Plate 01 — Exploring rugged peaks and dramatic mountain light.",
    description:
      "First sunlight breaking over jagged alpine crests, illuminating sharp granite ridges against deep valley shadows.",
    series: "Wanderings & Wild Places",
    collectionSlug: "wanderings-and-wild-places",
    category: "Landscapes",
    year: "Sample Archive",
    captureDate: "Morning Ascent",
    location: {
      placename: "Alpine Escarpment",
      region: "Mountain Journey (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "Sample photograph illustrating natural terrain, dynamic mountain range shadows, and early morning highlights.",
  },
  {
    id: "plate-02",
    plateNumber: "PLATE 02",
    displayOrder: 2,
    title: "Misty Forest at Sunrise",
    slug: "misty-forest-at-sunrise",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "Morning fog drifting through mountain forest pine trees",
    caption: "Sample Plate 02 — An atmospheric morning walk through pine trees and rising mist.",
    description:
      "Quiet dawn atmosphere in an evergreen mountain forest where rising fog diffuses the early sun into soft shafts of light.",
    series: "Wanderings & Wild Places",
    collectionSlug: "wanderings-and-wild-places",
    category: "Nature & Wildlife",
    year: "Sample Archive",
    captureDate: "Dawn Walk",
    location: {
      placename: "Mountain Pine Ridge",
      region: "Forest Trail (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "Sample photograph capturing atmospheric mountain mist, soft woodland silhouettes, and quiet morning light.",
  },
  {
    id: "plate-03",
    plateNumber: "PLATE 03",
    displayOrder: 3,
    title: "City Lights & Rain Reflections",
    slug: "city-lights-and-rain-reflections",
    imageUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "3:2",
    alt: "Urban street wet with rain reflecting vibrant neon colors and headlights",
    caption: "Sample Plate 03 — Street walks after an evening rain shower.",
    description:
      "Evening rain transforms the city asphalt into a luminous mirror reflecting warm street lamps and vehicle trails.",
    series: "City Streets & Travel Notes",
    collectionSlug: "city-streets-and-travel-notes",
    category: "Travel & Streets",
    year: "Sample Archive",
    captureDate: "Evening Rain",
    location: {
      placename: "City Boulevard at Night",
      region: "Urban Exploration (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "Sample photograph representing the energy, reflections, and mood of night-time street exploration.",
  },
  {
    id: "plate-04",
    plateNumber: "PLATE 04",
    displayOrder: 4,
    title: "Lines & Shadows in Concrete",
    slug: "lines-and-shadows-in-concrete",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "1:1",
    alt: "Geometric shadow slicing diagonally across a minimalist architectural wall",
    caption: "Sample Plate 04 — Finding unexpected graphic geometry in everyday buildings.",
    description:
      "Midday sun casts a sharp diagonal shadow across raw architectural concrete, revealing textures and minimalist balance.",
    series: "Forms & Spaces",
    collectionSlug: "forms-and-spaces",
    category: "Architecture",
    year: "Sample Archive",
    captureDate: "Afternoon Walk",
    location: {
      placename: "Modernist Pavilion",
      region: "Architectural Walk (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "Sample photograph showing how clean sunlight and architectural shadows create abstract natural compositions.",
  },
  {
    id: "plate-05",
    plateNumber: "PLATE 05",
    displayOrder: 5,
    title: "The Clifftop Coastal Town",
    slug: "the-clifftop-coastal-town",
    imageUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=85",
    aspectRatio: "2.39:1",
    alt: "Panoramic sea view of historic colorful houses built along steep sea cliffs",
    caption: "Sample Plate 05 — A coastal afternoon wandering along the cliffs.",
    description:
      "Cinematic panoramic perspective of historic houses clinging to rugged coastal rock faces over the open sea.",
    series: "City Streets & Travel Notes",
    collectionSlug: "city-streets-and-travel-notes",
    category: "Travel & Streets",
    year: "Sample Archive",
    captureDate: "Late Afternoon",
    location: {
      placename: "Coastal Cliffside Village",
      region: "Travel Memory (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "Sample photograph showcasing panoramic travel viewpoints, historic coastal settlements, and seaside light.",
  },
  {
    id: "plate-06",
    plateNumber: "PLATE 06",
    displayOrder: 6,
    title: "Quiet Window Light Portrait",
    slug: "quiet-window-light-portrait",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "Portrait lit with soft, gentle natural window illumination",
    caption: "Sample Plate 06 — Capturing natural expressions and quiet personality in soft light.",
    description:
      "A candid study of gentle, directional window light illuminating thoughtful expression and subtle texture.",
    series: "City Streets & Travel Notes",
    collectionSlug: "city-streets-and-travel-notes",
    category: "People & Portraits",
    year: "Sample Archive",
    captureDate: "Afternoon Study",
    location: {
      placename: "Indoor Natural Daylight",
      region: "Portrait Study (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: true,
    notes:
      "Sample portrait photograph highlighting natural, unposed expression and soft daylight.",
  },
  {
    id: "plate-07",
    plateNumber: "PLATE 07",
    displayOrder: 7,
    title: "Glacial Valley at Twilight",
    slug: "glacial-valley-at-twilight",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85",
    aspectRatio: "16:9",
    alt: "Wide mountain valley glowing under soft purple and blue twilight skies",
    caption: "Sample Plate 07 — The stillness of twilight over expansive glacial valleys.",
    description:
      "Cool twilight descending across an open mountain valley as the remaining ambient glow touches distant summits.",
    series: "Wanderings & Wild Places",
    collectionSlug: "wanderings-and-wild-places",
    category: "Landscapes",
    year: "Sample Archive",
    captureDate: "Dusk",
    location: {
      placename: "Upper Glacier Pass",
      region: "High Trail (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph exploring wide-angle depth, twilight color gradation, and mountainous solitude.",
  },
  {
    id: "plate-08",
    plateNumber: "PLATE 08",
    displayOrder: 8,
    title: "Cobblestone Passage After Rain",
    slug: "cobblestone-passage-after-rain",
    imageUrl:
      "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "Narrow European cobblestone alleyway illuminated by historic street lanterns after rainfall",
    caption: "Sample Plate 08 — Wandering narrow historic alleyways after the storm clears.",
    description:
      "Wet stones reflecting amber street lanterns along a quiet pedestrian lane in an old quarter.",
    series: "City Streets & Travel Notes",
    collectionSlug: "city-streets-and-travel-notes",
    category: "Travel & Streets",
    year: "Sample Archive",
    captureDate: "Night Walk",
    location: {
      placename: "Old Town Passage",
      region: "Historic Quarter (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph observing the warm textures of aged architecture and wet cobblestone surfaces.",
  },
  {
    id: "plate-09",
    plateNumber: "PLATE 09",
    displayOrder: 9,
    title: "Minimalist Spiral Staircase",
    slug: "minimalist-spiral-staircase",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
    aspectRatio: "3:2",
    alt: "Geometric overhead view of a spiral architectural staircase in monochrome tones",
    caption: "Sample Plate 09 — The rhythm and recurring curve of interior geometry.",
    description:
      "An overhead perspective capturing repeating concentric curves and subtle shadows in modern interior architecture.",
    series: "Forms & Spaces",
    collectionSlug: "forms-and-spaces",
    category: "Architecture",
    year: "Sample Archive",
    captureDate: "Interior Study",
    location: {
      placename: "Civic Library Atrium",
      region: "Architectural Study (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph demonstrating architectural abstraction, symmetry, and rhythmic leading lines.",
  },
  {
    id: "plate-10",
    plateNumber: "PLATE 10",
    displayOrder: 10,
    title: "Solitary Pine on High Ridge",
    slug: "solitary-pine-on-high-ridge",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "A solitary evergreen pine tree standing resilient against a cloudy mountain sky",
    caption: "Sample Plate 10 — Solitude and resilience along the windy ridge line.",
    description:
      "A weathered pine enduring wind and weather along an exposed crest, framed against passing storm clouds.",
    series: "Wanderings & Wild Places",
    collectionSlug: "wanderings-and-wild-places",
    category: "Nature & Wildlife",
    year: "Sample Archive",
    captureDate: "Ridge Trail",
    location: {
      placename: "Windward Crest",
      region: "Subalpine Zone (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph studying botanical resilience in challenging mountain environments.",
  },
  {
    id: "plate-11",
    plateNumber: "PLATE 11",
    displayOrder: 11,
    title: "Morning Sunlight Along the Canal",
    slug: "morning-sunlight-along-the-canal",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1800&q=85",
    aspectRatio: "16:9",
    alt: "Quiet canal waterway lined with historic buildings in early morning golden light",
    caption: "Sample Plate 11 — Early morning light glancing across quiet waterways.",
    description:
      "Soft morning light glancing across the rippling surface of a quiet canal waterway, illuminating rowed historic façades.",
    series: "City Streets & Travel Notes",
    collectionSlug: "city-streets-and-travel-notes",
    category: "Travel & Streets",
    year: "Sample Archive",
    captureDate: "Morning Stroll",
    location: {
      placename: "Canal District",
      region: "Waterfront Quarter (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph observing how early sunlight changes the color and character of waterfront architecture.",
  },
  {
    id: "plate-12",
    plateNumber: "PLATE 12",
    displayOrder: 12,
    title: "Cantilevered Glass & Steel Façade",
    slug: "cantilevered-glass-and-steel-facade",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85",
    aspectRatio: "3:2",
    alt: "Striking low-angle view of modern glass skyscraper reflecting dramatic clouds",
    caption: "Sample Plate 12 — Angles, reflections, and soaring vertical perspective.",
    description:
      "Low-angle perspective emphasizing soaring vertical lines, grid patterns, and sky reflections across a glass curtain wall.",
    series: "Forms & Spaces",
    collectionSlug: "forms-and-spaces",
    category: "Architecture",
    year: "Sample Archive",
    captureDate: "Midday",
    location: {
      placename: "Financial Plaza",
      region: "Metropolitan Center (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph exploring vertical scale, glass reflections, and modern structural engineering.",
  },
  {
    id: "plate-13",
    plateNumber: "PLATE 13",
    displayOrder: 13,
    title: "Wild Highland Grazing",
    slug: "wild-highland-grazing",
    imageUrl:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "Wildlife in an expansive open meadow surrounded by distant mountain peaks",
    caption: "Sample Plate 13 — Quiet encounters in vast open highland meadows.",
    description:
      "A peaceful encounter in a sprawling highland pasture surrounded by distant blue peaks and drifting cloud shadows.",
    series: "Wanderings & Wild Places",
    collectionSlug: "wanderings-and-wild-places",
    category: "Nature & Wildlife",
    year: "Sample Archive",
    captureDate: "Afternoon Meadow",
    location: {
      placename: "Highland Pasture",
      region: "Valley Reserve (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph documenting open natural habitats and peaceful highland wildlife encounters.",
  },
  {
    id: "plate-14",
    plateNumber: "PLATE 14",
    displayOrder: 14,
    title: "Golden Hour Silhouette at the Crossing",
    slug: "golden-hour-silhouette-at-the-crossing",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "1:1",
    alt: "Subtle silhouette portrait bathed in warm golden hour sunset light",
    caption: "Sample Plate 14 — Capturing fleeting warmth and silhouette during sunset.",
    description:
      "Warm evening backlight creating a gentle rim of gold around quiet figures pausing at a pedestrian crossroads.",
    series: "City Streets & Travel Notes",
    collectionSlug: "city-streets-and-travel-notes",
    category: "People & Portraits",
    year: "Sample Archive",
    captureDate: "Sunset",
    location: {
      placename: "Crossroads Promenade",
      region: "City Center (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    featured: false,
    notes:
      "Sample photograph exploring backlighting, silhouette contrast, and the warmth of the golden hour.",
  },
];

// --- Data Access Layer ---
// These functions provide clean, decoupled access to photographs and collections.
// In Phase 4, these query Sanity CMS via GROQ with Next.js tag-based caching,
// and gracefully fallback to mock data only when explicitly enabled or unconfigured.

import { sanityFetch } from "@/sanity/lib/client";
import {
  ALL_PHOTOGRAPHS_QUERY,
  FEATURED_PHOTOGRAPHS_QUERY,
  HERO_PHOTOGRAPH_QUERY,
  PHOTOGRAPH_BY_SLUG_QUERY,
  PHOTOGRAPHS_BY_COLLECTION_QUERY,
  PHOTOGRAPHS_BY_CATEGORY_QUERY,
  ALL_COLLECTIONS_QUERY,
  COLLECTION_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
  DRAFT_PHOTOGRAPH_BY_SLUG_QUERY,
  DRAFT_ALL_PHOTOGRAPHS_QUERY,
  DRAFT_COLLECTION_BY_SLUG_QUERY,
  DRAFT_ALL_COLLECTIONS_QUERY,
} from "@/sanity/lib/queries";
import {
  SanityPhotographDoc,
  SanityCollectionDoc,
  SanitySiteSettingsDoc,
} from "@/sanity/lib/types";
import {
  mapSanityPhotograph,
  mapSanityCollection,
  mapSanitySiteSettings,
} from "@/sanity/lib/mappers";
import { projectId, useMockData } from "@/sanity/env";

export function shouldServeMockData(): boolean {
  if (useMockData) return true;
  if (
    !projectId ||
    projectId.trim() === "" ||
    projectId === "placeholder-project-id"
  ) {
    return true;
  }
  return false;
}

export interface FetchOptions {
  isDraft?: boolean;
}

export async function getAllPhotographs(
  options?: FetchOptions
): Promise<Photograph[]> {
  if (shouldServeMockData()) {
    return [...RAW_PHOTOGRAPHS].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );
  }

  try {
    const isDraft = options?.isDraft ?? false;
    const query = isDraft ? DRAFT_ALL_PHOTOGRAPHS_QUERY : ALL_PHOTOGRAPHS_QUERY;
    const docs = await sanityFetch<SanityPhotographDoc[]>({
      query,
      tags: isDraft ? [] : ["photographs"],
      isDraftMode: isDraft,
    });
    return docs.map(mapSanityPhotograph);
  } catch (error) {
    console.error(
      "[Sanity Data Layer] Error fetching photographs:",
      error instanceof Error ? error.message : "API failure"
    );
    return [];
  }
}

export async function getFeaturedPhotographs(): Promise<Photograph[]> {
  if (shouldServeMockData()) {
    return RAW_PHOTOGRAPHS.filter((p) => p.featured && p.id !== "hero-plate");
  }

  try {
    const docs = await sanityFetch<SanityPhotographDoc[]>({
      query: FEATURED_PHOTOGRAPHS_QUERY,
      tags: ["photographs"],
    });
    return docs.map(mapSanityPhotograph);
  } catch (error) {
    console.error("Sanity error fetching featured photographs:", error);
    return [];
  }
}

export async function getHeroPhotograph(): Promise<Photograph | null> {
  if (shouldServeMockData()) {
    return (
      RAW_PHOTOGRAPHS.find((p) => p.slug === "morning-mist-on-alpine-waters") ||
      RAW_PHOTOGRAPHS[0] ||
      null
    );
  }

  try {
    const heroDoc = await sanityFetch<SanityPhotographDoc | null>({
      query: HERO_PHOTOGRAPH_QUERY,
      tags: ["photographs"],
    });
    if (heroDoc) {
      return mapSanityPhotograph(heroDoc);
    }
    const all = await getAllPhotographs();
    return all[0] || null;
  } catch (error) {
    console.error("Sanity error fetching hero photograph:", error);
    return null;
  }
}

export async function getPhotographBySlug(
  slug: string,
  options?: FetchOptions
): Promise<Photograph | null> {
  if (shouldServeMockData()) {
    return RAW_PHOTOGRAPHS.find((p) => p.slug === slug) || null;
  }

  try {
    const isDraft = options?.isDraft ?? false;
    const query = isDraft ? DRAFT_PHOTOGRAPH_BY_SLUG_QUERY : PHOTOGRAPH_BY_SLUG_QUERY;
    const doc = await sanityFetch<SanityPhotographDoc | null>({
      query,
      params: { slug },
      tags: isDraft ? [] : ["photographs", `photograph:${slug}`],
      isDraftMode: isDraft,
    });
    return doc ? mapSanityPhotograph(doc) : null;
  } catch (error) {
    console.error(
      `[Sanity Data Layer] Error fetching photograph by slug ${slug}:`,
      error instanceof Error ? error.message : "API failure"
    );
    return null;
  }
}

export async function getAdjacentPhotographs(slug: string): Promise<{
  prev: Photograph | null;
  next: Photograph | null;
}> {
  const all = await getAllPhotographs();
  const currentIndex = all.findIndex((p) => p.slug === slug);

  if (currentIndex === -1 || all.length <= 1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? all[currentIndex - 1] : all[all.length - 1];
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : all[0];

  return { prev, next };
}

export async function getPhotographsByCollection(
  collectionSlug: string
): Promise<Photograph[]> {
  if (shouldServeMockData()) {
    return RAW_PHOTOGRAPHS.filter((p) => p.collectionSlug === collectionSlug);
  }

  try {
    const docs = await sanityFetch<SanityPhotographDoc[]>({
      query: PHOTOGRAPHS_BY_COLLECTION_QUERY,
      params: { collectionSlug },
      tags: ["photographs", `collection:${collectionSlug}`],
    });
    return docs.map(mapSanityPhotograph);
  } catch (error) {
    console.error(
      `Sanity error fetching photographs by collection ${collectionSlug}:`,
      error
    );
    return [];
  }
}

export async function getPhotographsByCategory(
  category: PhotographCategory
): Promise<Photograph[]> {
  if (shouldServeMockData()) {
    return RAW_PHOTOGRAPHS.filter((p) => p.category === category);
  }

  try {
    const docs = await sanityFetch<SanityPhotographDoc[]>({
      query: PHOTOGRAPHS_BY_CATEGORY_QUERY,
      params: { category },
      tags: ["photographs"],
    });
    return docs.map(mapSanityPhotograph);
  } catch (error) {
    console.error(
      `Sanity error fetching photographs by category ${category}:`,
      error
    );
    return [];
  }
}

export async function getAllCollections(
  options?: FetchOptions
): Promise<(Collection & { count: number })[]> {
  if (shouldServeMockData()) {
    return RAW_COLLECTIONS.map((c) => ({
      ...c,
      count: RAW_PHOTOGRAPHS.filter((p) => p.collectionSlug === c.slug).length,
    }));
  }

  try {
    const isDraft = options?.isDraft ?? false;
    const query = isDraft ? DRAFT_ALL_COLLECTIONS_QUERY : ALL_COLLECTIONS_QUERY;
    const docs = await sanityFetch<SanityCollectionDoc[]>({
      query,
      tags: isDraft ? [] : ["collections"],
      isDraftMode: isDraft,
    });
    return docs.map(mapSanityCollection);
  } catch (error) {
    console.error(
      "[Sanity Data Layer] Error fetching collections:",
      error instanceof Error ? error.message : "API failure"
    );
    return [];
  }
}

export async function getCollectionBySlug(
  slug: string,
  options?: FetchOptions
): Promise<(Collection & { count: number }) | null> {
  if (shouldServeMockData()) {
    const collection = RAW_COLLECTIONS.find((c) => c.slug === slug);
    if (!collection) return null;
    const count = RAW_PHOTOGRAPHS.filter((p) => p.collectionSlug === slug).length;
    return { ...collection, count };
  }

  try {
    const isDraft = options?.isDraft ?? false;
    const query = isDraft ? DRAFT_COLLECTION_BY_SLUG_QUERY : COLLECTION_BY_SLUG_QUERY;
    const doc = await sanityFetch<SanityCollectionDoc | null>({
      query,
      params: { slug },
      tags: isDraft ? [] : ["collections", `collection:${slug}`],
      isDraftMode: isDraft,
    });
    return doc ? mapSanityCollection(doc) : null;
  } catch (error) {
    console.error(
      `[Sanity Data Layer] Error fetching collection by slug ${slug}:`,
      error instanceof Error ? error.message : "API failure"
    );
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (shouldServeMockData()) {
    return SITE_CONFIG;
  }

  try {
    const doc = await sanityFetch<SanitySiteSettingsDoc | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["siteSettings"],
    });
    return mapSanitySiteSettings(doc);
  } catch (error) {
    console.error("Sanity error fetching siteSettings:", error);
    return SITE_CONFIG;
  }
}
