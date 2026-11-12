import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Gallery — Harikrishnan Nandanan",
  description:
    "Explore the personal photography archive of Harikrishnan Nandanan. Curated travel journeys, landscapes, city streets, and architectural geometry captured with the Canon EOS R6 Mark III.",
  openGraph: {
    title: "The Gallery — Harikrishnan Nandanan",
    description:
      "Curated travel journeys, landscapes, city streets, and architectural geometry captured with the Canon EOS R6 Mark III.",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
