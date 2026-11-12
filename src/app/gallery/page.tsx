"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  getAllPhotographs,
  getAllCollections,
  Photograph,
  PhotographCategory,
} from "@/lib/data";
import { MapPin, Info, ArrowRight, RotateCcw } from "lucide-react";

const CATEGORIES: { label: string; value: "ALL" | PhotographCategory }[] = [
  { label: "ALL PHOTOGRAPHS", value: "ALL" },
  { label: "LANDSCAPES", value: "Landscapes" },
  { label: "TRAVEL & STREETS", value: "Travel & Streets" },
  { label: "NATURE & WILDLIFE", value: "Nature & Wildlife" },
  { label: "PEOPLE & PORTRAITS", value: "People & Portraits" },
  { label: "ARCHITECTURE", value: "Architecture" },
];

export default function GalleryPage() {
  const allPhotographs = useMemo(() => getAllPhotographs(), []);
  const allCollections = useMemo(() => getAllCollections(), []);

  const [selectedCategory, setSelectedCategory] =
    useState<"ALL" | PhotographCategory>("ALL");
  const [selectedCollection, setSelectedCollection] = useState<string>("ALL");

  const filteredPhotographs = useMemo(() => {
    return allPhotographs.filter((photo) => {
      const matchesCategory =
        selectedCategory === "ALL" || photo.category === selectedCategory;

      const matchesCollection =
        selectedCollection === "ALL" ||
        photo.collectionSlug === selectedCollection;

      return matchesCategory && matchesCollection;
    });
  }, [allPhotographs, selectedCategory, selectedCollection]);

  const isFiltered =
    selectedCategory !== "ALL" || selectedCollection !== "ALL";

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedCollection("ALL");
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      <Navigation />

      <main className="flex-grow pt-28 md:pt-36 pb-20 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        {/* Curatorial Header */}
        <div className="pb-10 md:pb-14 border-b border-white/10 space-y-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 bg-[#d4a373] rounded-full" />
            <span>[ Exhibition Archive · Curated Plates ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f4f2ec] font-normal tracking-tight">
                The Photography Gallery
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#c8c5bc] font-light max-w-2xl leading-relaxed mt-2">
                A personal visual archive documenting landscapes, city streets, quiet moments, and geometric forms. Captured during travels with the Canon EOS R6 Mark III.
              </p>
            </div>

            <div className="font-mono text-xs text-[#a1a1aa] flex items-center gap-2">
              <span className="text-[#f4f2ec] font-medium">
                {filteredPhotographs.length}
              </span>
              <span>of {allPhotographs.length} Plates Displayed</span>
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="ml-3 inline-flex items-center gap-1.5 text-[#d4a373] hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="py-8 md:py-10 border-b border-white/10 space-y-6">
          {/* Category Filter Tabs */}
          <div className="space-y-2">
            <span className="block font-mono text-[10px] text-[#73737c] tracking-widest uppercase">
              Filter by Subject / Genre
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#d4a373] ${
                      isActive
                        ? "bg-[#f4f2ec] text-[#08080a] font-medium shadow-md"
                        : "bg-white/[0.03] text-[#c8c5bc] hover:text-[#f4f2ec] hover:bg-white/[0.08] border border-white/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel Journey Filter Tabs */}
          <div className="space-y-2">
            <span className="block font-mono text-[10px] text-[#73737c] tracking-widest uppercase">
              Filter by Travel Journey
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCollection("ALL")}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 border focus:outline-none focus:ring-1 focus:ring-[#d4a373] ${
                  selectedCollection === "ALL"
                    ? "border-[#d4a373] bg-[#d4a373]/10 text-[#f4f2ec]"
                    : "border-white/10 bg-white/[0.02] text-[#a1a1aa] hover:text-[#f4f2ec] hover:border-white/20"
                }`}
              >
                ALL JOURNEYS
              </button>
              {allCollections.map((col) => {
                const isActive = selectedCollection === col.slug;
                return (
                  <button
                    key={col.slug}
                    onClick={() => setSelectedCollection(col.slug)}
                    className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 border focus:outline-none focus:ring-1 focus:ring-[#d4a373] ${
                      isActive
                        ? "border-[#d4a373] bg-[#d4a373]/10 text-[#f4f2ec]"
                        : "border-white/10 bg-white/[0.02] text-[#a1a1aa] hover:text-[#f4f2ec] hover:border-white/20"
                    }`}
                  >
                    {col.title.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPhotographs.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <div className="font-mono text-xs text-[#d4a373] tracking-widest uppercase">
              [ No Plates Found ]
            </div>
            <h2 className="font-serif text-2xl text-[#f4f2ec]">
              No photographs match the selected filter combination.
            </h2>
            <p className="font-sans text-xs text-[#a1a1aa]">
              Try adjusting your genre or journey filters to explore other plates.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Asymmetric Cinematic Gallery Layout */}
        <div className="pt-12 md:pt-16 space-y-20 sm:space-y-24 md:space-y-32">
          {filteredPhotographs.map((photo, index) => {
            const isEven = index % 2 === 0;
            const isPanoramic = photo.aspectRatio === "2.39:1";
            const isSquare = photo.aspectRatio === "1:1";
            const isPriority = index < 2;

            if (isPanoramic) {
              // Full-Width Cinemascope Composition
              return (
                <div key={photo.id} className="space-y-5">
                  <Link
                    href={`/gallery/${photo.slug}`}
                    className="group block relative w-full aspect-[2.39/1] overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 hover:border-[#d4a373]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a373]"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt}
                      fill
                      priority={isPriority}
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] filter brightness-[0.92] group-hover:brightness-100"
                    />

                    {photo.isPlaceholder && (
                      <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                        {photo.sampleNote || "Sample Image"}
                      </span>
                    )}

                    <div className="absolute inset-0 bg-[#08080a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase">
                        <span>Explore Plate Dossier</span>
                        <ArrowRight size={13} className="text-[#d4a373]" />
                      </span>
                    </div>
                  </Link>

                  {/* Caption Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-t border-white/5 pt-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline space-x-3">
                        <span className="font-mono text-xs text-[#d4a373] tracking-wider font-medium">
                          {photo.plateNumber}
                        </span>
                        <Link
                          href={`/gallery/${photo.slug}`}
                          className="font-serif text-2xl sm:text-3xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors"
                        >
                          {photo.title}
                        </Link>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light max-w-3xl leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-[#a1a1aa] shrink-0">
                      <span className="text-[#f4f2ec] flex items-center gap-1">
                        <MapPin size={12} className="text-[#d4a373]" />
                        {photo.location?.placename || "Travel Archive"}
                      </span>
                      <span>·</span>
                      <span className="text-[#d4a373]">{photo.category}</span>
                      {photo.cameraModel && (
                        <>
                          <span>·</span>
                          <span>{photo.cameraModel}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Offset 2-Column Editorial Pairings
            return (
              <div
                key={photo.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Frame Column */}
                <div
                  className={`overflow-hidden ${
                    isSquare
                      ? "lg:col-span-6 lg:col-start-4"
                      : isEven
                      ? "lg:col-span-7"
                      : "lg:col-span-7 lg:col-start-6"
                  }`}
                >
                  <Link
                    href={`/gallery/${photo.slug}`}
                    className="group block relative w-full overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 hover:border-[#d4a373]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a373]"
                  >
                    <div
                      className={`relative w-full ${
                        photo.aspectRatio === "4:5"
                          ? "aspect-[4/5]"
                          : photo.aspectRatio === "16:9"
                          ? "aspect-[16/9]"
                          : photo.aspectRatio === "1:1"
                          ? "aspect-square"
                          : "aspect-[3/2]"
                      }`}
                    >
                      <Image
                        src={photo.imageUrl}
                        alt={photo.alt}
                        fill
                        priority={isPriority}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] filter brightness-[0.92] group-hover:brightness-100"
                      />

                      {photo.isPlaceholder && (
                        <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                          {photo.sampleNote || "Sample Image"}
                        </span>
                      )}

                      <div className="absolute inset-0 bg-[#08080a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase">
                          <span>Explore Plate Dossier</span>
                          <ArrowRight size={13} className="text-[#d4a373]" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Editorial Description Column */}
                <div
                  className={`flex flex-col justify-center space-y-4 sm:space-y-5 ${
                    isSquare
                      ? "lg:col-span-6 lg:col-start-4 text-center items-center pt-2"
                      : isEven
                      ? "lg:col-span-5 lg:pl-2"
                      : "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-2"
                  }`}
                >
                  <div className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase flex items-center space-x-2">
                    <span className="font-semibold">{photo.plateNumber}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-[#c8c5bc]">{photo.series}</span>
                  </div>

                  <Link
                    href={`/gallery/${photo.slug}`}
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors leading-tight"
                  >
                    {photo.title}
                  </Link>

                  <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light leading-relaxed">
                    {photo.description || photo.caption}
                  </p>

                  {/* Location & Metadata Note */}
                  <div className="p-3.5 bg-white/[0.02] border border-white/10 space-y-1.5 font-mono text-xs text-[#a1a1aa] w-full">
                    <div className="flex items-center justify-between text-[#f4f2ec]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin size={12} className="text-[#d4a373]" />
                        {photo.location?.placename || "Travel Archive"}
                      </span>
                      <span className="text-[#d4a373] text-[11px]">
                        {photo.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#73737c] flex items-center justify-between border-t border-white/5 pt-1.5">
                      <span>{photo.cameraModel ? photo.cameraModel : photo.series || photo.category}</span>
                      <span>{photo.year || "Sample Archive"}</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/gallery/${photo.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] hover:text-[#d4a373] transition-colors group pt-1"
                    >
                      <span>Explore Plate Dossier</span>
                      <span className="transition-transform group-hover:translate-x-1 text-[#d4a373]">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
