import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Journeys & Collections — Harikrishnan Nandanan",
  description:
    "Thematic visual travel journeys by Harikrishnan Nandanan. Curated personal collections exploring mountain wilderness, city street notes, and architectural spaces.",
  openGraph: {
    title: "Travel Journeys & Collections — Harikrishnan Nandanan",
    description:
      "Curated personal collections exploring mountain wilderness, city street notes, and architectural spaces.",
    type: "website",
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
