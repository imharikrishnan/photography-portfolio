import Image from "next/image";
import { SITE_CONFIG } from "@/data/mockData";
import { SiteConfig } from "@/lib/data";
import { Camera, Mail, Sparkles, User } from "lucide-react";

interface AboutSectionProps {
  siteConfig?: SiteConfig;
}

export default function AboutSection({ siteConfig: propConfig }: AboutSectionProps) {
  const config = propConfig || SITE_CONFIG;

  return (
    <section
      id="about"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
        {/* Left Column: Portrait or Honest Placeholder Frame & Connect Card */}
        <div className="lg:col-span-5 space-y-6">
          {config.portraitUrl ? (
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111114] border border-white/10 group">
              <Image
                src={config.portraitUrl}
                alt={config.photographerName}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder={config.portraitLqip ? "blur" : "empty"}
                blurDataURL={config.portraitLqip}
                className="object-cover object-center filter brightness-[0.95] group-hover:scale-[1.015] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-[#c8c5bc] flex justify-between items-center border-t border-white/10 pt-2 z-10">
                <span className="text-[#f4f2ec] uppercase tracking-wider">
                  {config.photographerName}
                </span>
                <span className="text-[#d4a373]">PERSONAL ARCHIVE</span>
              </div>
            </div>
          ) : (
            /* Explicit, Honest Portrait Placeholder */
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111114] border border-white/10 flex flex-col items-center justify-center p-8 text-center group">
              <div className="w-20 h-20 rounded-full border border-white/20 bg-white/[0.02] flex items-center justify-center text-[#d4a373] mb-4 group-hover:border-[#d4a373]/50 transition-colors">
                <User size={32} />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[11px] text-[#d4a373] tracking-widest uppercase block">
                  [ Portrait Placeholder ]
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#f4f2ec]">
                  {config.photographerName}
                </h3>
                <p className="font-sans text-xs text-[#a1a1aa] max-w-xs leading-relaxed pt-1">
                  Personal portrait will be added here. (Temporary fine-art placeholder frame).
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-[#73737c] flex justify-between items-center border-t border-white/5 pt-2">
                <span>{config.camera.model.toUpperCase()}</span>
                <span>PERSONAL ARCHIVE</span>
              </div>
            </div>
          )}

          {/* Friendly Let's Connect Card */}
          <div className="p-5 bg-white/[0.02] border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#d4a373] tracking-widest uppercase text-[11px]">
              <Mail size={13} />
              <span>{config.contactHeading}</span>
            </div>
            <p className="font-sans text-xs text-[#c8c5bc] leading-relaxed">
              {config.contactDescription}
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] text-[#a1a1aa] flex items-center justify-between">
              <span className="text-[#f4f2ec]">{config.emailPlaceholder}</span>
              <span className="text-[#d4a373]">Personal Archive</span>
            </div>
          </div>
        </div>

        {/* Right Column: About the Hobbyist Photographer */}
        <div className="lg:col-span-7 flex flex-col space-y-8 md:space-y-10">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block">
              [ Section 04 / About the Photographer ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f4f2ec] font-normal leading-tight">
              A personal passion for travelling, observing, and telling visual stories.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm sm:text-base text-[#c8c5bc] font-light leading-relaxed">
            {config.aboutBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Behind the Lens: Camera & Approach */}
          <div className="p-5 bg-white/[0.015] border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#d4a373] tracking-widest uppercase text-[11px]">
              <Camera size={13} />
              <span>Behind the Lens · Primary Camera</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-2">
              <span className="font-serif text-xl sm:text-2xl text-[#f4f2ec]">
                {config.camera.model}
              </span>
              <span className="text-[11px] text-[#a1a1aa]">
                Digital Mirrorless System
              </span>
            </div>
            <p className="font-sans text-xs text-[#c8c5bc] font-light leading-relaxed pt-1">
              {config.camera.description}
            </p>
          </div>

          {/* Creative Philosophy Callout */}
          <div className="p-5 bg-white/[0.01] border-l-2 border-[#d4a373] space-y-2">
            <div className="flex items-center space-x-2 font-mono text-[10px] text-[#d4a373] tracking-widest uppercase">
              <Sparkles size={11} />
              <span>Approach to Photography</span>
            </div>
            <p className="font-serif text-base sm:text-lg text-[#f4f2ec] italic leading-relaxed">
              “Photography is about being present in a moment, appreciating the atmosphere of an unfamiliar place, and carrying that memory forward.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
