"use client";

import Link from "next/link";
import Image from "next/image";
import { HERO_PHOTOGRAPH, SITE_CONFIG } from "@/data/mockData";
import { Photograph, SiteConfig } from "@/lib/data";
import { MapPin, Info } from "lucide-react";

interface HeroProps {
  photo?: Photograph | null;
  siteConfig?: SiteConfig;
  onInspectPhoto: () => void;
}

export default function Hero({
  photo: propPhoto,
  siteConfig: propConfig,
  onInspectPhoto,
}: HeroProps) {
  const currentPhoto = propPhoto !== undefined ? propPhoto : HERO_PHOTOGRAPH;
  const config = propConfig || SITE_CONFIG;

  return (
    <section className="relative w-full min-h-[88vh] md:min-h-[94vh] flex flex-col justify-between pt-20 md:pt-28 pb-8 md:pb-12 px-5 sm:px-8 md:px-12 overflow-hidden border-b border-white/10">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {currentPhoto?.imageUrl ? (
          <Image
            src={currentPhoto.imageUrl}
            alt={currentPhoto.alt || currentPhoto.title || "Hero Photograph"}
            fill
            priority
            sizes="100vw"
            placeholder={currentPhoto.lqip ? "blur" : "empty"}
            blurDataURL={currentPhoto.lqip}
            className="object-cover object-center filter brightness-[0.80] contrast-[1.08] scale-[1.01] transition-transform duration-1000"
          />
        ) : (
          <div className="w-full h-full bg-[#0c0c10]" />
        )}
        {/* Layered Cinematic Vignettes for Enhanced Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/45 to-[#08080a]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/85 via-transparent to-[#08080a]/60" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Top Identity Badge */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#d4a373] tracking-widest uppercase">
        <span className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-[#d4a373] rounded-full animate-ping" />
          <span>
            Exhibition Prologue · {currentPhoto?.plateNumber || "PLATE 00"}
          </span>
        </span>
        <span className="hidden sm:inline-block text-[#c8c5bc]">
          {config.tagline}
        </span>
      </div>

      {/* Main Monumental Typography Block */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl space-y-4 md:space-y-6">
          <div className="inline-block border-l-2 border-[#d4a373] pl-3 py-0.5">
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-[#f4f2ec]">
              {config.photographerName}
            </span>
            <span className="block font-mono text-[10px] md:text-xs text-[#d4a373] tracking-widest uppercase mt-0.5">
              Personal Photography Exhibition
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#f4f2ec] leading-[1.02]">
            Light, Travel <br />
            <span className="italic font-light text-white">& Visual Stories</span>
          </h1>

          <p className="max-w-2xl font-sans text-sm sm:text-base text-[#e4e2db] font-light leading-relaxed tracking-wide pt-1">
            {config.personalIntro}
          </p>

          <div className="pt-2 md:pt-4 flex flex-wrap gap-3 sm:gap-4 items-center">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#f4f2ec] text-[#08080a] bg-[#f4f2ec] text-xs font-mono tracking-widest uppercase hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
            >
              Explore Photographs
            </Link>
            {currentPhoto && (
              <button
                onClick={onInspectPhoto}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white/50 text-[#f4f2ec] text-xs font-mono tracking-widest uppercase bg-[#08080a]/60 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                View Plate Notes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Floating Telemetry & Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 md:pt-6 border-t border-white/10">
        {/* Exhibition Plate Context */}
        <div className="flex flex-col space-y-1 font-mono text-xs text-[#a1a1aa]">
          {currentPhoto ? (
            <>
              <div className="flex items-center space-x-2 text-[#f4f2ec]">
                <MapPin size={13} className="text-[#d4a373]" />
                <span className="tracking-wider uppercase font-medium">
                  {currentPhoto.location?.placename || currentPhoto.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-[#c8c5bc]">
                {currentPhoto.series && (
                  <>
                    <span className="text-[#d4a373]">{currentPhoto.series}</span>
                    <span>·</span>
                  </>
                )}
                <span>{currentPhoto.category}</span>
                {currentPhoto.isPlaceholder && currentPhoto.sampleNote && (
                  <>
                    <span>·</span>
                    <span className="text-[#73737c] flex items-center gap-1">
                      <Info size={11} className="text-[#d4a373]" />
                      {currentPhoto.sampleNote}
                    </span>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="text-[11px] text-[#73737c]">
              Personal Photography Archive · Harikrishnan Nandanan
            </div>
          )}
        </div>

        {/* Scroll Cue */}
        <a
          href="#works"
          className="group flex items-center space-x-3 text-[11px] font-mono tracking-[0.25em] text-[#c8c5bc] uppercase hover:text-[#f4f2ec] transition-colors self-start sm:self-end pt-2 sm:pt-0"
        >
          <span>Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-white/25 flex justify-center p-1">
            <span className="w-1 h-1.5 bg-[#d4a373] rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
