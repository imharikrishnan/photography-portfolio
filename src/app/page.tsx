import { draftMode } from "next/headers";
import HomePageClient from "@/components/HomePageClient";
import {
  getHeroPhotograph,
  getFeaturedPhotographs,
  getAllCollections,
  getSiteConfig,
} from "@/lib/data";

export default async function Home() {
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  const [heroPhoto, featuredPhotos, collections, siteConfig] =
    await Promise.all([
      getHeroPhotograph(),
      getFeaturedPhotographs(),
      getAllCollections({ isDraft }),
      getSiteConfig(),
    ]);

  return (
    <HomePageClient
      heroPhoto={heroPhoto}
      featuredPhotos={featuredPhotos}
      collections={collections}
      siteConfig={siteConfig}
    />
  );
}
