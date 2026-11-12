"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EditorialIntro from "@/components/EditorialIntro";
import FeaturedGallery from "@/components/FeaturedGallery";
import SeriesShowcase from "@/components/SeriesShowcase";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import PhotoDetailModal from "@/components/PhotoDetailModal";
import { Photograph, Collection, SiteConfig } from "@/lib/data";

interface HomePageClientProps {
  heroPhoto: Photograph | null;
  featuredPhotos: Photograph[];
  collections: (Collection & { count: number })[];
  siteConfig: SiteConfig;
}

export default function HomePageClient({
  heroPhoto,
  featuredPhotos,
  collections,
  siteConfig,
}: HomePageClientProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);

  const handleInspectHero = () => {
    if (heroPhoto) {
      setSelectedPhoto(heroPhoto);
    }
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const allPhotos = [
      ...(heroPhoto ? [heroPhoto] : []),
      ...featuredPhotos,
    ];
    if (allPhotos.length === 0) return;
    const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    setSelectedPhoto(allPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const allPhotos = [
      ...(heroPhoto ? [heroPhoto] : []),
      ...featuredPhotos,
    ];
    if (allPhotos.length === 0) return;
    const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      {/* Navigation */}
      <Navigation siteConfig={siteConfig} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Cinematic Hero */}
        <Hero
          photo={heroPhoto}
          siteConfig={siteConfig}
          onInspectPhoto={handleInspectHero}
        />

        {/* Curatorial Introduction */}
        <EditorialIntro siteConfig={siteConfig} />

        {/* Selected Works Gallery */}
        <FeaturedGallery
          photos={featuredPhotos}
          onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        />

        {/* Curated Series & Monographs */}
        <SeriesShowcase collections={collections} />

        {/* Artist Profile & Hardware */}
        <AboutSection siteConfig={siteConfig} />
      </main>

      {/* Editorial Footer */}
      <Footer siteConfig={siteConfig} />

      {/* Detailed Photographic Telemetry Modal */}
      <PhotoDetailModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
}
