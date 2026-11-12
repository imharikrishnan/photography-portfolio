export interface Photograph {
  id: string;
  plateNumber: string;
  title: string;
  slug: string;
  imageUrl: string;
  aspectRatio: "4:5" | "16:9" | "1:1" | "2.39:1" | "3:2";
  alt: string;
  caption: string;
  series: string;
  category: "Landscapes" | "Travel & Streets" | "Nature & Wildlife" | "People & Portraits" | "Architecture";
  year: string;
  location: {
    placename: string;
    region: string;
  };
  sampleNote: string;
  isPlaceholder: boolean;
  notes: string;
}

export interface Collection {
  id: string;
  journeyNumber: string;
  title: string;
  slug: string;
  subtitle: string;
  count: number;
  coverImage: string;
  description: string;
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

export const HERO_PHOTOGRAPH: Photograph = {
  id: "hero-plate",
  plateNumber: "PLATE 00",
  title: "Morning Mist on Alpine Waters",
  slug: "morning-mist-on-alpine-waters",
  imageUrl:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2600&q=88",
  aspectRatio: "16:9",
  alt: "Morning fog lifting over a serene alpine valley lake with granite cliff reflections",
  caption: "Sample Plate 00 — Atmospheric dawn light over quiet valley waters.",
  series: "Wanderings & Wild Places",
  category: "Landscapes",
  year: "Sample Archive",
  location: {
    placename: "Valley Lake Reflection",
    region: "Sample Landscape",
  },
  sampleNote: "Temporary Sample Image (Placeholder)",
  isPlaceholder: true,
  notes:
    "A curated sample photograph representing the peaceful morning light and reflections typical of high mountain journeys.",
};

export const FEATURED_PHOTOGRAPHS: Photograph[] = [
  {
    id: "plate-01",
    plateNumber: "PLATE 01",
    title: "Mountain Ridges in Morning Sun",
    slug: "mountain-ridges-in-morning-sun",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=85",
    aspectRatio: "16:9",
    alt: "Majestic jagged mountain ridge illuminated by low-angle golden sunlight",
    caption: "Sample Plate 01 — Exploring rugged peaks and dramatic mountain light.",
    series: "Wanderings & Wild Places",
    category: "Landscapes",
    year: "Sample Archive",
    location: {
      placename: "Alpine Escarpment",
      region: "Mountain Journey (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    notes:
      "Sample photograph illustrating natural terrain, dynamic mountain range shadows, and early morning highlights.",
  },
  {
    id: "plate-02",
    plateNumber: "PLATE 02",
    title: "Misty Forest at Sunrise",
    slug: "misty-forest-at-sunrise",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "Morning fog drifting through mountain forest pine trees",
    caption: "Sample Plate 02 — An atmospheric morning walk through pine trees and rising mist.",
    series: "Nature & Encounters",
    category: "Nature & Wildlife",
    year: "Sample Archive",
    location: {
      placename: "Mountain Pine Ridge",
      region: "Forest Trail (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    notes:
      "Sample photograph capturing atmospheric mountain mist, soft woodland silhouettes, and quiet morning light.",
  },
  {
    id: "plate-03",
    plateNumber: "PLATE 03",
    title: "City Lights & Rain Reflections",
    slug: "city-lights-and-rain-reflections",
    imageUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "3:2",
    alt: "Urban street wet with rain reflecting vibrant neon colors and headlights",
    caption: "Sample Plate 03 — Street walks after an evening rain shower.",
    series: "City Streets & Travel Notes",
    category: "Travel & Streets",
    year: "Sample Archive",
    location: {
      placename: "City Boulevard at Night",
      region: "Urban Exploration (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    notes:
      "Sample photograph representing the energy, reflections, and mood of night-time street exploration.",
  },
  {
    id: "plate-04",
    plateNumber: "PLATE 04",
    title: "Lines & Shadows in Concrete",
    slug: "lines-and-shadows-in-concrete",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "1:1",
    alt: "Geometric shadow slicing diagonally across a minimalist architectural wall",
    caption: "Sample Plate 04 — Finding unexpected graphic geometry in everyday buildings.",
    series: "Forms & Spaces",
    category: "Architecture",
    year: "Sample Archive",
    location: {
      placename: "Modernist Pavilion",
      region: "Architectural Walk (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    notes:
      "Sample photograph showing how clean sunlight and architectural shadows create abstract natural compositions.",
  },
  {
    id: "plate-05",
    plateNumber: "PLATE 05",
    title: "The Clifftop Coastal Town",
    slug: "the-clifftop-coastal-town",
    imageUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=85",
    aspectRatio: "2.39:1",
    alt: "Panoramic sea view of historic colorful houses built along steep sea cliffs",
    caption: "Sample Plate 05 — A coastal afternoon wandering along the cliffs.",
    series: "City Streets & Travel Notes",
    category: "Travel & Streets",
    year: "Sample Archive",
    location: {
      placename: "Coastal Cliffside Village",
      region: "Travel Memory (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    notes:
      "Sample photograph showcasing panoramic travel viewpoints, historic coastal settlements, and seaside light.",
  },
  {
    id: "plate-06",
    plateNumber: "PLATE 06",
    title: "Quiet Window Light Portrait",
    slug: "quiet-window-light-portrait",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "4:5",
    alt: "Portrait lit with soft, gentle natural window illumination",
    caption: "Sample Plate 06 — Capturing natural expressions and quiet personality in soft light.",
    series: "People & Portraits",
    category: "People & Portraits",
    year: "Sample Archive",
    location: {
      placename: "Indoor Natural Daylight",
      region: "Portrait Study (Sample)",
    },
    sampleNote: "Temporary Sample Image (Placeholder)",
    isPlaceholder: true,
    notes:
      "Sample portrait photograph highlighting natural, unposed expression and soft daylight.",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "series-01",
    journeyNumber: "JOURNEY 01",
    title: "Wanderings & Wild Places",
    slug: "wanderings-and-wild-places",
    subtitle: "Mountains, Valleys & Open Trails",
    count: 6,
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    description:
      "Photographs from outdoor travels — mountain passes, tranquil lakes, and the raw beauty of natural landscapes.",
  },
  {
    id: "series-02",
    journeyNumber: "JOURNEY 02",
    title: "City Streets & Travel Notes",
    slug: "city-streets-and-travel-notes",
    subtitle: "Everyday Scenes & Evening Rain",
    count: 8,
    coverImage:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    description:
      "Candid street moments, evening light, coastal villages, and quiet corners discovered while wandering through new towns and cities.",
  },
  {
    id: "series-03",
    journeyNumber: "JOURNEY 03",
    title: "Forms & Spaces",
    slug: "forms-and-spaces",
    subtitle: "Architecture, Lines & Shadow",
    count: 5,
    coverImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Appreciating geometric lines, clean angles, and the play of sunlight and shadow on buildings and spaces.",
  },
];
