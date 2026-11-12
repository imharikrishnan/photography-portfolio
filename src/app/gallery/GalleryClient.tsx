"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Photograph, Collection, PhotographCategory, SiteConfig } from "@/lib/data";
import { MapPin, Info, ArrowRight, RotateCcw } from "lucide-react";

const CATEGORIES: { label: string; value: "ALL" | PhotographCategory }[] = [
  { label: "ALL PHOTOGRAPHS", value: "ALL" },
  { label: "LANDSCAPES", value: "Landscapes" },
  { label: "TRAVEL & STREETS", value: "Travel & Streets" },
  { label: "NATURE & WILDLIFE", value: "Nature & Wildlife" },
  { label: "PEOPLE & PORTRAITS", value: "People & Portraits" },
  { label: "ARCHITECTURE", value: "Architecture" },
];

interface GalleryClientProps {
  initialPhotographs: Photograph[];
  initialCollections: (Collection & { count: number })[];
  siteConfig?: SiteConfig;
}

export default function GalleryClient({
  initialPhotographs,
  initialCollections,
  siteConfig,
}: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<"ALL" | PhotographCategory>("ALL");
  const [selectedCollection, setSelectedCollection] = useState<string>("ALL");

  const filteredPhotographs = useMemo(() => {
    return initialPhotographs.filter((photo) => {
      const matchesCategory =
        selectedCategory === "ALL" || photo.category === selectedCategory;

      const matchesCollection =
        selectedCollection === "ALL" ||
        photo.collectionSlug === selectedCollection;

      return matchesCategory && matchesCollection;
    });
  }, [initialPhotographs, selectedCategory, selectedCollection]);

  const isFiltered =
    selectedCategory !== "ALL" || selectedCollection !== "ALL";

  const handleResetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedCollection("ALL");
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      <Navigation siteConfig={siteConfig} />

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
                A personal visual archive documenting landscapes, city streets, quiet moments, and geometric forms. Captured during travels with the {siteConfig?.camera?.model || "Canon EOS R6 Mark III"}.
              </p>
            </div>

            <div className="font-mono text-xs text-[#a1a1aa] flex items-center gap-2">
              <span className="text-[#f4f2ec] font-medium">
                {filteredPhotographs.length}
              </span>
              <span>of {initialPhotographs.length} Plates Displayed</span>
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
        {initialPhotographs.length > 0 && (
          <div className="py-8 md:py-10 border-b border-white/10 space-y-6">
            {/* Category Filter Tabs */}
            <div className="space-y-2">
              <span className="block font-mono text-[10px] text-[#73737c] tracking-widest uppercase">
                Filter by Subject / Genre
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  const count =
                    cat.value === "ALL"
                      ? initialPhotographs.length
                      : initialPhotographs.filter(
                          (p) => p.category === cat.value
                        ).length;

                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                        isActive
                          ? "bg-[#f4f2ec] text-[#08080a] font-medium shadow-md"
                          : "bg-white/[0.03] text-[#c8c5bc] hover:text-[#f4f2ec] hover:bg-white/[0.08] border border-white/10"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] ${
                          isActive ? "text-[#08080a]/60" : "text-[#73737c]"
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Travel Collection Tabs */}
            {initialCollections.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="block font-mono text-[10px] text-[#73737c] tracking-widest uppercase">
                  Filter by Travel Journey / Collection
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCollection("ALL")}
                    className={`px-3 py-1 rounded-sm text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                      selectedCollection === "ALL"
                        ? "bg-[#d4a373] text-[#08080a] font-medium"
                        : "bg-white/[0.02] text-[#a1a1aa] hover:text-[#f4f2ec] hover:bg-white/[0.06] border border-white/10"
                    }`}
                  >
                    ALL JOURNEYS
                  </button>

                  {initialCollections.map((col) => {
                    const isActive = selectedCollection === col.slug;
                    return (
                      <button
                        key={col.id}
                        onClick={() => setSelectedCollection(col.slug)}
                        className={`px-3 py-1 rounded-sm text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                          isActive
                            ? "bg-[#d4a373] text-[#08080a] font-medium"
                            : "bg-white/[0.02] text-[#a1a1aa] hover:text-[#f4f2ec] hover:bg-white/[0.06] border border-white/10"
                        }`}
                      >
                        <span>{col.title.toUpperCase()}</span>
                        <span
                          className={`text-[10px] ${
                            isActive ? "text-[#08080a]/70" : "text-[#73737c]"
                          }`}
                        >
                          ({col.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery Content Area */}
        {initialPhotographs.length === 0 ? (
          /* Elegant Fine-Art Empty Gallery State */
          <div className="py-24 my-12 border border-white/10 bg-white/[0.015] p-8 md:p-16 text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block">
              [ Exhibition Archive · In Preparation ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f2ec]">
              Archive Awaiting Plates
            </h2>
            <p className="font-sans text-sm text-[#c8c5bc] font-light leading-relaxed">
              The photographic archive is currently being prepared. As new plates are uploaded and published in Sanity Studio, they will appear here with full curatorial dossiers and verified camera telemetry.
            </p>
          </div>
        ) : filteredPhotographs.length === 0 ? (
          /* No filter match state */
          <div className="py-24 text-center space-y-4 border border-white/10 bg-white/[0.01] p-8 my-12">
            <div className="font-mono text-xs text-[#d4a373] tracking-widest uppercase">
              [ Zero Plates Matched ]
            </div>
            <h3 className="font-serif text-2xl text-[#f4f2ec]">
              No photographs found for this filter combination.
            </h3>
            <p className="font-sans text-xs text-[#a1a1aa] max-w-md mx-auto">
              Try adjusting the category or journey filter, or click reset to view all plates.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center space-x-2 px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] transition-colors cursor-pointer"
            >
              <RotateCcw size={13} className="text-[#d4a373]" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          /* Asymmetric Editorial Gallery Grid */
          <div className="pt-12 md:pt-16 space-y-20 md:space-y-28">
            {filteredPhotographs.map((photo, index) => {
              const isEven = index % 2 === 0;
              const isPriority = index < 3;
              const isPanoramic = photo.aspectRatio === "2.39:1";

              if (isPanoramic) {
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
                        placeholder={photo.lqip ? "blur" : "empty"}
                        blurDataURL={photo.lqip}
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
                        {photo.caption && (
                          <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light max-w-3xl leading-relaxed">
                            {photo.caption}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-[#a1a1aa] shrink-0">
                        {photo.location?.placename && (
                          <span className="text-[#f4f2ec] flex items-center gap-1">
                            <MapPin size={12} className="text-[#d4a373]" />
                            {photo.location.placename}
                          </span>
                        )}
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

              // Standard Offset Pairs
              return (
                <div
                  key={photo.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Photo Frame */}
                  <div
                    className={`${
                      isEven
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
                          placeholder={photo.lqip ? "blur" : "empty"}
                          blurDataURL={photo.lqip}
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] filter brightness-[0.92] group-hover:brightness-100"
                        />
                      </div>

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
                  </div>

                  {/* Curatorial Context Dossier */}
                  <div
                    className={`space-y-4 ${
                      isEven
                        ? "lg:col-span-5"
                        : "lg:col-span-5 lg:col-start-1 lg:row-start-1"
                    }`}
                  >
                    <div className="font-mono text-xs text-[#d4a373] tracking-widest uppercase flex items-center space-x-2">
                      <span>{photo.plateNumber || "PLATE"}</span>
                      {photo.series && (
                        <>
                          <span className="text-[#73737c]">·</span>
                          <span className="text-[#c8c5bc]">{photo.series}</span>
                        </>
                      )}
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f2ec] font-normal leading-tight">
                      <Link
                        href={`/gallery/${photo.slug}`}
                        className="hover:text-[#d4a373] transition-colors"
                      >
                        {photo.title}
                      </Link>
                    </h2>

                    {photo.description && (
                      <p className="font-sans text-sm text-[#c8c5bc] font-light leading-relaxed">
                        {photo.description}
                      </p>
                    )}

                    {/* Location & Metadata Note */}
                    <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-[#a1a1aa]">
                      {photo.location?.placename && (
                        <div className="flex items-center space-x-2 text-[#f4f2ec]">
                          <MapPin size={13} className="text-[#d4a373]" />
                          <span>
                            {photo.location.placename}
                            {photo.location.region
                              ? `, ${photo.location.region}`
                              : ""}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#73737c]">
                        <span>Genre: {photo.category}</span>
                        {photo.captureDate && (
                          <>
                            <span>·</span>
                            <span>Captured: {photo.captureDate}</span>
                          </>
                        )}
                        {photo.cameraModel && (
                          <>
                            <span>·</span>
                            <span>{photo.cameraModel}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/gallery/${photo.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-mono text-[#d4a373] hover:text-white transition-colors group tracking-widest uppercase"
                      >
                        <span>View Full Dossier</span>
                        <ArrowRight
                          size={13}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
