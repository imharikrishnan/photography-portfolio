"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_PHOTOGRAPHS, Photograph } from "@/data/mockData";
import { Eye, MapPin, Info, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal, ImageVeil } from "@/components/motion";

interface FeaturedGalleryProps {
  photos?: Photograph[];
  onSelectPhoto: (photo: Photograph) => void;
}

const CATEGORIES = [
  "ALL PHOTOGRAPHS",
  "LANDSCAPES",
  "TRAVEL & STREETS",
  "NATURE & WILDLIFE",
  "PEOPLE & PORTRAITS",
  "ARCHITECTURE",
] as const;

export default function FeaturedGallery({
  photos: propPhotos,
  onSelectPhoto,
}: FeaturedGalleryProps) {
  const sourcePhotos =
    propPhotos && propPhotos.length > 0 ? propPhotos : FEATURED_PHOTOGRAPHS;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL PHOTOGRAPHS");
  const shouldReduceMotion = useReducedMotion();

  const filteredPhotos =
    selectedCategory === "ALL PHOTOGRAPHS"
      ? sourcePhotos
      : sourcePhotos.filter(
          (p) => p.category?.toUpperCase() === selectedCategory
        );

  return (
    <section
      id="works"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/10"
    >
      {/* Gallery Header & Genre Filtering */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <ScrollReveal distance={16} delay={0.05}>
          <div>
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block mb-2">
              [ Section 02 / The Gallery ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f4f2ec] font-normal tracking-tight">
              Selected Exhibition Plates
            </h2>
            <p className="font-mono text-xs text-[#a1a1aa] uppercase tracking-widest mt-1.5 flex items-center gap-1.5 flex-wrap">
              <span>Showing {filteredPhotos.length} Curated Plates</span>
              {filteredPhotos.some((p) => p.isPlaceholder) && (
                <>
                  <span className="text-[#73737c]">·</span>
                  <span className="text-[#d4a373]">Sample Visual Placeholders</span>
                </>
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Minimalist Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 pt-2 md:pt-0"
          role="group"
          aria-label="Filter photographs by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] ${
                  isActive
                    ? "text-[#08080a] font-medium"
                    : "text-[#c8c5bc] hover:text-[#f4f2ec] hover:bg-white/[0.06]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#f4f2ec] rounded-full shadow-md -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 30 }
                    }
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-white/10 -z-10 bg-white/[0.02]" />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Editorial Grid */}
      {sourcePhotos.length === 0 ? (
        <ScrollReveal distance={20} delay={0.1}>
          <div className="py-20 my-8 border border-white/10 bg-white/[0.015] p-8 md:p-12 text-center space-y-4">
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block">
              [ Exhibition Selection In Preparation ]
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f4f2ec]">
              Exhibition Plates Awaiting Selection
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
              Photographs marked as featured in Sanity Studio will appear in this curated selection.
            </p>
            <div className="pt-2">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#d4a373] hover:text-[#f4f2ec] transition-colors underline underline-offset-4"
              >
                <span>Explore Full Archive</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      ) : (
        <div className="pt-12 md:pt-16 space-y-16 sm:space-y-20 md:space-y-28 transition-opacity duration-300">
          {filteredPhotos.map((photo, index) => {
            const isEven = index % 2 === 0;
            const isPanoramic = photo.aspectRatio === "2.39:1";
            const isSquare = photo.aspectRatio === "1:1";
            const useVeil = index < 2;

            if (isPanoramic) {
              // Full-Width Cinemascope Composition
              return (
                <ScrollReveal
                  key={photo.id}
                  distance={24}
                  delay={Math.min(index * 0.08, 0.24)}
                >
                  <button
                    type="button"
                    className="group text-left w-full space-y-4 outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] p-1 -m-1 cursor-pointer"
                    onClick={() => onSelectPhoto(photo)}
                    aria-label={`View story and plate notes for ${photo.title}`}
                  >
                    {useVeil ? (
                      <ImageVeil
                        duration={0.9}
                        delay={0.12}
                        className="w-full aspect-[2.39/1] bg-[#111114] border border-white/10 transition-colors duration-500 group-hover:border-[#d4a373]/50"
                      >
                        <Image
                          src={photo.imageUrl}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 1200px) 100vw, 1280px"
                          placeholder={photo.lqip ? "blur" : "empty"}
                          blurDataURL={photo.lqip}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015] filter brightness-[0.92] group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-[#08080a]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase group-hover:border-[#d4a373]/50 transition-colors">
                            <Eye size={13} />
                            <span>View Story & Notes</span>
                          </span>
                        </div>

                        {photo.isPlaceholder && photo.sampleNote && (
                          <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                            {photo.sampleNote}
                          </span>
                        )}
                      </ImageVeil>
                    ) : (
                      <div className="relative w-full aspect-[2.39/1] overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 group-hover:border-[#d4a373]/50">
                        <Image
                          src={photo.imageUrl}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 1200px) 100vw, 1280px"
                          placeholder={photo.lqip ? "blur" : "empty"}
                          blurDataURL={photo.lqip}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015] filter brightness-[0.92] group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-[#08080a]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase group-hover:border-[#d4a373]/50 transition-colors">
                            <Eye size={13} />
                            <span>View Story & Notes</span>
                          </span>
                        </div>

                        {photo.isPlaceholder && photo.sampleNote && (
                          <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                            {photo.sampleNote}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Metadata Caption Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-white/5 pt-3 w-full">
                      <div className="flex items-baseline space-x-3">
                        <span className="font-mono text-xs text-[#d4a373] tracking-wider font-medium">
                          {photo.plateNumber || "PLATE"}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#f4f2ec] group-hover:text-white transition-colors">
                          {photo.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-[#a1a1aa]">
                        <span className="text-[#f4f2ec]">{photo.location?.placename || "Travel Archive"}</span>
                        <span>·</span>
                        <span className="text-[#d4a373] capitalize">
                          {photo.category ||
                            (photo.visualMetadata?.colorFamily
                              ? photo.visualMetadata.colorFamily.replace(/-/g, " ")
                              : "Archive")}
                        </span>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            }

            // Offset 2-Column Editorial Pairings
            return (
              <ScrollReveal
                key={photo.id}
                distance={24}
                delay={Math.min(index * 0.08, 0.24)}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image Frame Column */}
                  <button
                    type="button"
                    className={`group text-left cursor-pointer overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] p-1 -m-1 ${
                      isSquare
                        ? "lg:col-span-6 lg:col-start-4"
                        : isEven
                        ? "lg:col-span-7"
                        : "lg:col-span-7 lg:col-start-6"
                    }`}
                    onClick={() => onSelectPhoto(photo)}
                    aria-label={`View story and plate notes for ${photo.title}`}
                  >
                    {useVeil ? (
                      <ImageVeil
                        duration={0.9}
                        delay={0.12}
                        className={`w-full overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 group-hover:border-[#d4a373]/50 ${
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
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          placeholder={photo.lqip ? "blur" : "empty"}
                          blurDataURL={photo.lqip}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.92] group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-[#08080a]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase group-hover:border-[#d4a373]/50 transition-colors">
                            <Eye size={13} />
                            <span>View Story & Notes</span>
                          </span>
                        </div>

                        {photo.isPlaceholder && photo.sampleNote && (
                          <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                            {photo.sampleNote}
                          </span>
                        )}
                      </ImageVeil>
                    ) : (
                      <div
                        className={`relative w-full overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 group-hover:border-[#d4a373]/50 ${
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
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          placeholder={photo.lqip ? "blur" : "empty"}
                          blurDataURL={photo.lqip}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] filter brightness-[0.92] group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-[#08080a]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase group-hover:border-[#d4a373]/50 transition-colors">
                            <Eye size={13} />
                            <span>View Story & Notes</span>
                          </span>
                        </div>

                        {photo.isPlaceholder && photo.sampleNote && (
                          <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                            {photo.sampleNote}
                          </span>
                        )}
                      </div>
                    )}
                  </button>

                  {/* Editorial Description Column */}
                  <div
                    className={`flex flex-col justify-center space-y-4 sm:space-y-5 ${
                      isSquare
                        ? "lg:col-span-6 lg:col-start-4 text-center items-center pt-3"
                        : isEven
                        ? "lg:col-span-5 lg:pl-4"
                        : "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-4"
                    }`}
                  >
                    <div className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase flex items-center space-x-2">
                      <span className="font-semibold">{photo.plateNumber || "PLATE"}</span>
                      {photo.series && (
                        <>
                          <span className="text-white/20">/</span>
                          <span className="text-[#c8c5bc]">{photo.series}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f4f2ec] leading-tight">
                      <button
                        type="button"
                        onClick={() => onSelectPhoto(photo)}
                        className="text-left cursor-pointer hover:text-[#d4a373] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373]"
                      >
                        {photo.title}
                      </button>
                    </h3>

                    {photo.caption && (
                      <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light leading-relaxed">
                        {photo.caption}
                      </p>
                    )}

                    {/* Location & Context Note */}
                    <div className="p-3.5 bg-white/[0.02] border border-white/10 space-y-1.5 font-mono text-xs text-[#a1a1aa]">
                      <div className="flex items-center justify-between text-[#f4f2ec]">
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin size={12} className="text-[#d4a373]" />
                          {photo.location?.placename || "Travel Archive"}
                        </span>
                        <span className="text-[#d4a373] text-[11px] capitalize">
                          {photo.category ||
                            (photo.visualMetadata?.colorFamily
                              ? photo.visualMetadata.colorFamily.replace(/-/g, " ")
                              : "Archive")}
                        </span>
                      </div>
                      {photo.isPlaceholder && photo.sampleNote && (
                        <div className="text-[11px] text-[#73737c] flex items-center gap-1.5">
                          <Info size={11} className="text-[#a1a1aa]" />
                          <span>{photo.sampleNote}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => onSelectPhoto(photo)}
                        className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] hover:text-[#d4a373] transition-colors group pt-1 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373]"
                      >
                        <span>Read Plate Notes</span>
                        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}

      {/* Link to Full Exhibition Gallery */}
      <ScrollReveal delay={0.1} distance={16}>
        <div className="pt-16 text-center border-t border-white/10 mt-16">
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/20 hover:border-[#d4a373] text-xs font-mono tracking-[0.2em] text-[#f4f2ec] uppercase transition-all duration-300 group"
          >
            <span>Explore Complete Exhibition Gallery</span>
            <ArrowRight size={14} className="text-[#d4a373] transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
