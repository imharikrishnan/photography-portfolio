import Image from "next/image";
import { COLLECTIONS } from "@/data/mockData";
import { ArrowUpRight } from "lucide-react";

export default function SeriesShowcase() {
  return (
    <section
      id="series"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block mb-2">
            [ Section 03 / Travel Collections ]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f4f2ec] font-normal tracking-tight">
            Curated Travel Journeys
          </h2>
        </div>
        <p className="max-w-md font-sans text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
          Thematic visual journeys exploring landscapes, city streets, and architectural lines encountered while travelling and observing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 md:pt-16">
        {COLLECTIONS.map((collection) => (
          <div
            key={collection.id}
            className="group cursor-pointer flex flex-col justify-between p-5 sm:p-6 bg-white/[0.015] hover:bg-white/[0.04] border border-white/10 hover:border-[#d4a373]/40 transition-all duration-500"
          >
            <div>
              {/* Collection Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-5 bg-[#111114]">
                <Image
                  src={collection.coverImage}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                />
                <span className="absolute top-2.5 right-2.5 font-mono text-[10px] tracking-widest uppercase bg-[#08080a]/85 backdrop-blur-md px-2 py-0.5 border border-white/15 text-[#f4f2ec]">
                  Sample Collection
                </span>
              </div>

              {/* Title & Index */}
              <div className="font-mono text-[11px] text-[#d4a373] tracking-widest uppercase mb-1">
                {collection.journeyNumber}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#f4f2ec] group-hover:text-white transition-colors mb-2">
                {collection.title}
              </h3>
              <p className="font-sans text-xs text-[#c8c5bc] font-light leading-relaxed mb-6">
                {collection.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#a1a1aa] group-hover:text-[#f4f2ec] transition-colors">
              <span className="tracking-wider">EXPLORE JOURNEY</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#d4a373]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
