"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/data/mockData";
import { SiteConfig } from "@/lib/data";
import { EASINGS, SPRINGS } from "@/lib/motion";

interface NavigationProps {
  siteConfig?: SiteConfig;
}

const NAV_LINKS = [
  { href: "/gallery", label: "01 / Photographs", sub: "Gallery" },
  { href: "/collections", label: "02 / Travel Journeys", sub: "Collections" },
  { href: "/#about", label: "03 / About Me", sub: "Behind the Lens" },
  { href: "/#contact", label: "04 / Let's Connect", sub: "Get in Touch" },
] as const;

export default function Navigation({ siteConfig: propConfig }: NavigationProps) {
  const config = propConfig || SITE_CONFIG;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isGallery = pathname?.startsWith("/gallery");
  const isCollections = pathname?.startsWith("/collections");

  // Scroll detection for header morphing
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle closing mobile menu and returning focus
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Focus trap, Escape key handling, and background scroll locking
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";

    // Focus the first focusable element inside the drawer
    const focusFirst = () => {
      if (drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    };
    const timer = setTimeout(focusFirst, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-[#08080a]/92 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent py-5 md:py-7 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] rounded-sm"
          >
            <span className="font-serif text-base sm:text-lg md:text-xl tracking-wider text-[#f4f2ec] group-hover:text-white transition-colors duration-300 uppercase">
              {config.photographerName}
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#d4a373] uppercase">
              {config.tagline}
            </span>
          </Link>

          {/* Desktop Navigation Links with Bronze Underlines */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
          >
            <Link
              href="/gallery"
              className={`font-sans text-xs tracking-widest uppercase py-1 relative group transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] rounded-sm ${
                isGallery ? "text-[#f4f2ec] font-medium" : "text-[#c8c5bc] hover:text-[#f4f2ec]"
              }`}
            >
              Photographs
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-[#d4a373] transition-all duration-300 ease-out ${
                  isGallery ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href="/collections"
              className={`font-sans text-xs tracking-widest uppercase py-1 relative group transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] rounded-sm ${
                isCollections ? "text-[#f4f2ec] font-medium" : "text-[#c8c5bc] hover:text-[#f4f2ec]"
              }`}
            >
              Journeys
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-[#d4a373] transition-all duration-300 ease-out ${
                  isCollections ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href={pathname === "/" ? "#about" : "/#about"}
              className="font-sans text-xs tracking-widest text-[#c8c5bc] hover:text-[#f4f2ec] transition-colors duration-300 uppercase py-1 relative group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] rounded-sm"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a373] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
            <Link
              href={pathname === "/" ? "#contact" : "/#contact"}
              className="font-sans text-xs tracking-widest text-[#c8c5bc] hover:text-[#f4f2ec] transition-colors duration-300 uppercase py-1 relative group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] rounded-sm"
            >
              Connect
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4a373] transition-all duration-300 ease-out group-hover:w-full" />
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
            ref={triggerRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f4f2ec] hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] transition-colors border border-white/10 rounded-md bg-white/[0.02]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Refined Mobile Editorial Drawer with AnimatePresence & Focus Trap */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="fixed inset-0 z-50 bg-[#08080a]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-24 overflow-y-auto"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: "0%" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={shouldReduceMotion ? { duration: 0.15 } : SPRINGS.gentle}
          >
            {/* Top Close Button inside Drawer */}
            <div className="absolute top-6 right-6">
              <button
                onClick={closeMobileMenu}
                className="p-2 text-[#f4f2ec] hover:text-white border border-white/15 rounded-md bg-white/[0.04] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373]"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs tracking-[0.2em] text-[#d4a373] uppercase">
                  Navigation
                </span>
                <span className="font-mono text-[10px] text-[#73737c]">
                  Personal Archive
                </span>
              </div>

              {/* Staggered Navigation Links */}
              <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : 0.08 + idx * 0.05,
                      ease: EASINGS.editorial,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="font-serif text-2xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors py-2 flex items-baseline justify-between border-b border-white/5 focus:outline-none focus-visible:text-[#d4a373]"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-[11px] text-[#73737c]">{link.sub}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Colophon */}
            <motion.div
              className="border-t border-white/10 pt-6 mt-8 flex flex-col space-y-3 font-mono text-xs text-[#a1a1aa]"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.35, duration: 0.4 }}
            >
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
                  Personal Photography &amp; Travel Stories
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
