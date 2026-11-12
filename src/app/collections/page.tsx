import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { draftMode } from "next/headers";
import { getAllCollections, getSiteConfig } from "@/lib/data";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default async function CollectionsPage() {
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }

  const [collections, siteConfig] = await Promise.all([
    getAllCollections({ isDraft }),
    getSiteConfig(),
  ]);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      <Navigation siteConfig={siteConfig} />

      <main className="flex-grow pt-28 md:pt-36 pb-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        {/* Curatorial Header */}
        <div className="pb-10 md:pb-14 border-b border-white/10 space-y-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 bg-[#d4a373] rounded-full" />
            <span>[ Personal Travel Archives · Thematic Collections ]</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f4f2ec] font-normal tracking-tight">
                Personal Photographic Journeys
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#c8c5bc] font-light max-w-2xl leading-relaxed mt-2">
                Curated bodies of work reflecting different facets of travel: from open mountain trails and wild places, to rain-soaked city alleys, candid moments, and quiet architectural lines.
              </p>
            </div>

            <div className="font-mono text-xs text-[#a1a1aa] shrink-0">
              <span className="text-[#f4f2ec] font-medium">{collections.length}</span> Curated Travel Journeys
            </div>
          </div>
        </div>

        {/* Collections Editorial Grid */}
        {collections.length === 0 ? (
          <div className="py-24 border border-white/10 bg-white/[0.015] p-8 md:p-16 text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block">
              [ Travel Collections · In Preparation ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f4f2ec]">
              Journeys Awaiting Publication
            </h2>
            <p className="font-sans text-sm text-[#c8c5bc] font-light leading-relaxed">
              The thematic travel journeys are being prepared. Monographic series published in Sanity Studio will appear here with curated plate sequences.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group flex flex-col justify-between p-6 bg-white/[0.015] hover:bg-white/[0.04] border border-white/10 hover:border-[#d4a373]/50 transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-[#d4a373]"
              >
                <div>
                  {/* Cover Image Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden mb-6 bg-[#111114]">
                    <Image
                      src={collection.coverImage}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder={collection.lqip ? "blur" : "empty"}
                      blurDataURL={collection.lqip}
                      className="object-cover filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute top-2.5 right-2.5 font-mono text-[10px] tracking-widest uppercase bg-[#08080a]/85 backdrop-blur-md px-2.5 py-0.5 border border-white/15 text-[#f4f2ec]">
                      {collection.count} Plates
                    </div>
                  </div>

                  {/* Journey Telemetry & Header */}
                  <div className="font-mono text-[11px] text-[#d4a373] tracking-widest uppercase mb-1">
                    {collection.journeyNumber}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#f4f2ec] group-hover:text-white transition-colors mb-2">
                    {collection.title}
                  </h2>
                  {collection.subtitle && (
                    <div className="font-mono text-xs text-[#a1a1aa] mb-4">
                      {collection.subtitle}
                    </div>
                  )}
                  <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light leading-relaxed mb-6">
                    {collection.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs text-[#a1a1aa] group-hover:text-[#f4f2ec] transition-colors">
                  <span className="tracking-wider">EXPLORE EXPEDITION DOSSIER</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#d4a373]"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Informational Curatorial Footer Note */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#a1a1aa]">
          <div>
            <span>Curatorial Organization: Thematic Chronology & Geography</span>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-[#d4a373] hover:text-white transition-colors uppercase tracking-widest"
          >
            <span>View All Individual Plates</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </main>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}
