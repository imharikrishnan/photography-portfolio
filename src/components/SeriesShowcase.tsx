import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS } from "@/data/mockData";
import { Collection } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion";

interface SeriesShowcaseProps {
  collections?: (Collection & { count: number })[];
}

export default function SeriesShowcase({
  collections: propCollections,
}: SeriesShowcaseProps) {
  const collections =
    propCollections !== undefined ? propCollections : COLLECTIONS;

  return (
    <section
      id="series"
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto border-b border-white/10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <ScrollReveal distance={16} delay={0.05}>
          <div>
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block mb-2">
              [ Section 03 / Travel Collections ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f4f2ec] font-normal tracking-tight">
              Curated Travel Journeys
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal distance={16} delay={0.15}>
          <p className="max-w-md font-sans text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
            Thematic visual journeys exploring landscapes, city streets, and architectural lines encountered while travelling and observing.
          </p>
        </ScrollReveal>
      </div>

      {collections.length === 0 ? (
        <ScrollReveal distance={20} delay={0.1}>
          <div className="py-16 my-8 border border-white/10 bg-white/[0.015] p-8 text-center space-y-3">
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block">
              [ Travel Collections In Preparation ]
            </span>
            <h3 className="font-serif text-2xl text-[#f4f2ec]">
              Awaiting Travel Journeys
            </h3>
            <p className="font-sans text-xs text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
              Curated travel journeys published in Sanity Studio will appear here.
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-12 md:pt-16">
          {collections.map((collection, index) => (
            <ScrollReveal
              key={collection.id}
              distance={24}
              delay={index * 0.1}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group flex flex-col justify-between p-5 sm:p-6 bg-white/[0.015] hover:bg-white/[0.035] border border-white/10 hover:border-[#d4a373]/50 transition-all duration-500 h-full outline-none focus-visible:ring-1 focus-visible:ring-[#d4a373]"
              >
                <div>
                  {/* Collection Cover Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden mb-5 bg-[#111114]">
                    <Image
                      src={collection.coverImage}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder={collection.lqip ? "blur" : "empty"}
                      blurDataURL={collection.lqip}
                      className="object-cover filter brightness-[0.9] group-hover:scale-[1.03] group-hover:brightness-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <span className="absolute top-2.5 right-2.5 font-mono text-[10px] tracking-widest uppercase bg-[#08080a]/85 backdrop-blur-md px-2 py-0.5 border border-white/15 text-[#f4f2ec] group-hover:border-[#d4a373]/40 transition-colors duration-300">
                      {collection.count} Plates
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
                    className="text-[#d4a373] group-hover:text-[#f4f2ec] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out"
                  />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
