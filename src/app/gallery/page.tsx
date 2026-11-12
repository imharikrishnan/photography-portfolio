import { draftMode } from "next/headers";
import GalleryClient from "./GalleryClient";
import { getAllPhotographs, getAllCollections, getSiteConfig } from "@/lib/data";

export default async function GalleryPage() {
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  const [photographs, collections, siteConfig] = await Promise.all([
    getAllPhotographs({ isDraft }),
    getAllCollections({ isDraft }),
    getSiteConfig(),
  ]);

  return (
    <GalleryClient
      initialPhotographs={photographs}
      initialCollections={collections}
      siteConfig={siteConfig}
    />
  );
}
