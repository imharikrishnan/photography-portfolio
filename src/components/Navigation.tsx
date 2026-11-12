"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/mockData";
import { SiteConfig } from "@/lib/data";

interface NavigationProps {
  siteConfig?: SiteConfig;
}

export default function Navigation({ siteConfig: propConfig }: NavigationProps) {
  const config = propConfig || SITE_CONFIG;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isGallery = pathname?.startsWith("/gallery");
  const isCollections = pathname?.startsWith("/collections");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent py-5 md:py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-base sm:text-lg md:text-xl tracking-wider text-[#f4f2ec] group-hover:text-white transition-colors duration-300 uppercase">
              {config.photographerName}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#d4a373] uppercase">
              {config.tagline}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link
              href="/gallery"
              className={`font-sans text-xs tracking-widest uppercase py-1 relative group transition-colors duration-300 ${
                isGallery ? "text-[#f4f2ec]" : "text-[#c8c5bc] hover:text-[#f4f2ec]"
              }`}
            >
              Photographs
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-[#d4a373] transition-all duration-300 ${
                  isGallery ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href="/collections"
              className={`font-sans text-xs tracking-widest uppercase py-1 relative group transition-colors duration-300 ${
                isCollections ? "text-[#f4f2ec]" : "text-[#c8c5bc] hover:text-[#f4f2ec]"
              }`}
            >
              Journeys
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-[#d4a373] transition-all duration-300 ${
                  isCollections ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href={pathname === "/" ? "#about" : "/#about"}
              className="font-sans text-xs tracking-widest text-[#c8c5bc] hover:text-[#f4f2ec] transition-colors duration-300 uppercase py-1 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a373] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              className="font-sans text-xs tracking-widest text-[#c8c5bc] hover:text-[#f4f2ec] transition-colors duration-300 uppercase py-1 relative group"
            >
              Connect
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a373] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Status Badge */}
          <div className="hidden lg:flex items-center space-x-4">
            <span className="text-[11px] font-mono text-[#a1a1aa] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
              Personal Archive
            </span>

            <div className="h-3 w-[1px] bg-white/10" />

            <div className="px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-mono tracking-widest text-[#d4a373] uppercase bg-white/[0.03]">
              3D Exhibition <span className="text-white/60 ml-1">Phase 6</span>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f4f2ec] hover:text-white focus:outline-none transition-colors border border-white/10 rounded-md bg-white/[0.02]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Editorial Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#08080a]/98 backdrop-blur-2xl md:hidden transition-all duration-500 flex flex-col justify-between p-6 pt-24 overflow-y-auto ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs tracking-[0.2em] text-[#d4a373] uppercase">
              Navigation
            </span>
            <span className="font-mono text-[10px] text-[#73737c]">
              Personal Archive
            </span>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors py-1 flex items-baseline justify-between border-b border-white/5"
            >
              <span>01 / Photographs</span>
              <span className="font-mono text-[11px] text-[#73737c]">Gallery</span>
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors py-1 flex items-baseline justify-between border-b border-white/5"
            >
              <span>02 / Travel Journeys</span>
              <span className="font-mono text-[11px] text-[#73737c]">Collections</span>
            </Link>
            <Link
              href={pathname === "/" ? "#about" : "/#about"}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors py-1 flex items-baseline justify-between border-b border-white/5"
            >
              <span>03 / About Me</span>
              <span className="font-mono text-[11px] text-[#73737c]">Behind the Lens</span>
            </Link>
            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors py-1 flex items-baseline justify-between border-b border-white/5"
            >
              <span>04 / Let&apos;s Connect</span>
              <span className="font-mono text-[11px] text-[#73737c]">Get in Touch</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Drawer Colophon */}
        <div className="border-t border-white/10 pt-6 mt-8 flex flex-col space-y-3 font-mono text-xs text-[#a1a1aa]">
          <div className="flex flex-col space-y-0.5">
            <span className="text-[10px] text-[#73737c] tracking-widest uppercase">
              Photographer
            </span>
            <span className="text-[#f4f2ec] font-medium">
              {SITE_CONFIG.photographerName}
            </span>
          </div>

          <div className="flex flex-col space-y-0.5">
            <span className="text-[10px] text-[#73737c] tracking-widest uppercase">
              Camera System
            </span>
            <span className="text-[#e4e2db]">
              {SITE_CONFIG.camera.model}
            </span>
          </div>

          <div className="flex flex-col space-y-0.5">
            <span className="text-[10px] text-[#73737c] tracking-widest uppercase">
              Approach
            </span>
            <span className="text-[#d4a373]">
              Personal Photography & Travel Stories
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
