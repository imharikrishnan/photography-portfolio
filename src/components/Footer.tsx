"use client";

import { ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/data/mockData";
import { SiteConfig } from "@/lib/data";
import { ScrollReveal } from "@/components/motion";

interface FooterProps {
  siteConfig?: SiteConfig;
}

export default function Footer({ siteConfig: propConfig }: FooterProps) {
  const config = propConfig || SITE_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="scroll-mt-24 md:scroll-mt-28 relative bg-[#050507] pt-16 md:pt-20 pb-10 px-5 sm:px-8 md:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
        {/* Friendly "Let's Connect" Section */}
        <ScrollReveal distance={16} delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end justify-between border-b border-white/10 pb-12">
            <div className="lg:col-span-8 space-y-3">
              <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block">
                [ Connect & Conversations ]
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f4f2ec] font-light tracking-tight">
                {config.contactHeading}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light max-w-xl leading-relaxed">
                {config.contactDescription}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <div className="p-4 bg-white/[0.02] border border-white/10 hover:border-[#d4a373]/30 transition-colors duration-300 space-y-2 font-mono text-xs">
                <span className="text-[#d4a373] text-[10px] tracking-widest uppercase block">
                  Contact Placeholder
                </span>
                <span className="text-[#f4f2ec] block text-sm">
                  {config.emailPlaceholder}
                </span>
                <span className="text-[10px] text-[#73737c] block">
                  Configured securely in CMS
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Directory & Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 font-mono text-xs text-[#a1a1aa]">
          <ScrollReveal distance={14} delay={0.1}>
            <div>
              <span className="text-[#f4f2ec] tracking-wider uppercase block mb-2 font-medium">
                Photographer
              </span>
              <p className="leading-relaxed text-[#c8c5bc]">
                {config.photographerName}<br />
                {config.tagline}<br />
                Personal Photography Archive
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal distance={14} delay={0.16}>
            <div>
              <span className="text-[#f4f2ec] tracking-wider uppercase block mb-2 font-medium">
                Camera & Focus
              </span>
              <p className="leading-relaxed text-[#c8c5bc]">
                {SITE_CONFIG.camera.model}<br />
                Travel, Landscapes, Streets<br />
                Observant Photography
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal distance={14} delay={0.22}>
            <div>
              <span className="text-[#f4f2ec] tracking-wider uppercase block mb-2 font-medium">
                Social Links
              </span>
              <div className="space-y-1 text-[#c8c5bc]">
                {SITE_CONFIG.socialLinks.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#d4a373]">{s.name}:</span>
                    <span className="text-[#a1a1aa]">{s.placeholder}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal distance={14} delay={0.28}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="text-[#f4f2ec] tracking-wider uppercase block mb-2 font-medium">
                  Gallery Format
                </span>
                <p className="text-[11px] text-[#73737c] leading-relaxed">
                  Fine-Art Visual Exhibition<br />
                  Curated Layout Plates
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="mt-6 inline-flex items-center space-x-2 text-xs text-[#d4a373] hover:text-white transition-colors group cursor-pointer self-start outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373] rounded-sm py-1 pr-2"
                aria-label="Back to top of page"
              >
                <span className="w-6 h-6 rounded-full border border-[#d4a373]/30 bg-white/[0.02] flex items-center justify-center group-hover:border-[#d4a373] group-hover:bg-[#d4a373]/10 transition-all duration-300">
                  <ArrowUp size={12} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
                </span>
                <span className="tracking-wider uppercase font-mono text-[11px]">Back to Top</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Monumental Typographic Watermark */}
        <ScrollReveal distance={0} duration={1.2} delay={0.15}>
          <div className="pt-6 select-none pointer-events-none opacity-[0.06] flex justify-center">
            <span className="font-serif text-[22vw] leading-none tracking-tighter text-[#f4f2ec] uppercase">
              HARI
            </span>
          </div>
        </ScrollReveal>

        {/* Bottom Colophon Bar */}
        <ScrollReveal distance={10} delay={0.2}>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#73737c] gap-3">
            <span>© 2026 Hari. All rights reserved.</span>
            <span>{config.tagline}</span>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
