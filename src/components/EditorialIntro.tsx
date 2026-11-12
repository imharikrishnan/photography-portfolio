import { SITE_CONFIG } from "@/data/mockData";
import { SiteConfig } from "@/lib/data";
import { Camera, Compass, Eye, Heart } from "lucide-react";

interface EditorialIntroProps {
  siteConfig?: SiteConfig;
}

export default function EditorialIntro({ siteConfig: propConfig }: EditorialIntroProps) {
  const config = propConfig || SITE_CONFIG;
  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Personal Premise */}
        <div className="lg:col-span-5 flex flex-col space-y-4 md:space-y-6">
          <div className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#d4a373] rounded-full" />
            <span>[ Personal Exhibition Premise ]</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f4f2ec] leading-snug font-light">
            “Photography is a personal way of slowing down — pausing to notice light, atmosphere, and the character of a place.”
          </h2>
          <div className="h-[1px] w-20 bg-[#d4a373]/50" />
        </div>

        {/* Right Column: Statement & Key Highlights */}
        <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 text-[#c8c5bc] font-light leading-relaxed text-sm sm:text-base md:text-lg">
          <p>
            Welcome to the personal photography portfolio of{" "}
            <strong className="text-[#f4f2ec] font-normal">{config.photographerName}</strong>.
            This space is created as a digital exhibition: an intimate, unhurried gallery
            showcasing photographs captured during travels, hikes, city walks, and everyday explorations.
          </p>

          <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
            Presented in an editorial fine-art format, each photograph is framed with its own
            context and story. The visual layout reflects my appreciation for clean design,
            controlled contrast, and the quiet dignity of memorable moments.
          </p>

          {/* Genuine Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="bg-white/[0.015] border border-white/5 p-3 sm:p-4">
              <Camera size={14} className="text-[#d4a373] mb-1.5" />
              <span className="block text-base sm:text-lg font-serif text-[#f4f2ec]">
                {config.camera.model}
              </span>
              <span className="text-[10px] text-[#73737c] tracking-widest uppercase mt-0.5 block">
                Primary Camera
              </span>
            </div>

            <div className="bg-white/[0.015] border border-white/5 p-3 sm:p-4">
              <Compass size={14} className="text-[#d4a373] mb-1.5" />
              <span className="block text-base sm:text-lg font-serif text-[#f4f2ec]">
                Travel & Nature
              </span>
              <span className="text-[10px] text-[#73737c] tracking-widest uppercase mt-0.5 block">
                Core Inspiration
              </span>
            </div>

            <div className="bg-white/[0.015] border border-white/5 p-3 sm:p-4">
              <Eye size={14} className="text-[#d4a373] mb-1.5" />
              <span className="block text-base sm:text-lg font-serif text-[#f4f2ec]">
                Observant Gaze
              </span>
              <span className="text-[10px] text-[#73737c] tracking-widest uppercase mt-0.5 block">
                Visual Philosophy
              </span>
            </div>

            <div className="bg-white/[0.015] border border-white/5 p-3 sm:p-4">
              <Heart size={14} className="text-[#d4a373] mb-1.5" />
              <span className="block text-base sm:text-lg font-serif text-[#f4f2ec]">
                Creative Hobby
              </span>
              <span className="text-[10px] text-[#73737c] tracking-widest uppercase mt-0.5 block">
                Personal Passion
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
