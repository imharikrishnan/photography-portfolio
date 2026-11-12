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
import { FEATURED_PHOTOGRAPHS, HERO_PHOTOGRAPH, Photograph } from "@/data/mockData";

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);

  const handleInspectHero = () => {
    setSelectedPhoto(HERO_PHOTOGRAPH);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const allPhotos = [HERO_PHOTOGRAPH, ...FEATURED_PHOTOGRAPHS];
    const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    setSelectedPhoto(allPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const allPhotos = [HERO_PHOTOGRAPH, ...FEATURED_PHOTOGRAPHS];
    const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Cinematic Hero */}
        <Hero onInspectPhoto={handleInspectHero} />

        {/* Curatorial Introduction */}
        <EditorialIntro />

        {/* Selected Works Gallery */}
        <FeaturedGallery onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        {/* Curated Series & Monographs */}
        <SeriesShowcase />

        {/* Artist Profile & Hardware */}
        <AboutSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

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
