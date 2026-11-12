import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  getAllCollections,
  getCollectionBySlug,
  getPhotographsByCollection,
} from "@/lib/data";
import { ArrowLeft, ArrowRight, MapPin, Eye } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = getAllCollections();
  return collections.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Journey Not Found — Harikrishnan Nandanan",
    };
  }

  const title = `${collection.title} — Travel Journey · Harikrishnan Nandanan`;
  const description = collection.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: collection.coverImage,
          alt: collection.title,
        },
      ],
    },
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const photos = getPhotographsByCollection(slug);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      <Navigation />

      <main className="flex-grow pt-24 md:pt-32 pb-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center space-x-3 text-xs font-mono pb-6 border-b border-white/10">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-1.5 text-[#a1a1aa] hover:text-[#f4f2ec] transition-colors"
          >
            <ArrowLeft size={13} className="text-[#d4a373]" />
            <span>All Journeys</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#d4a373] tracking-widest uppercase">
            {collection.journeyNumber}
          </span>
        </div>

        {/* Collection Hero Header */}
        <section className="space-y-6 pb-8 border-b border-white/10">
          <div className="max-w-4xl space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 bg-[#d4a373] rounded-full" />
              <span>{collection.journeyNumber} · Travel Journey</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f4f2ec] font-normal tracking-tight">
              {collection.title}
            </h1>
            <div className="font-mono text-xs sm:text-sm text-[#d4a373] tracking-wider uppercase">
              {collection.subtitle}
            </div>
            <p className="font-sans text-sm sm:text-base text-[#c8c5bc] font-light max-w-3xl leading-relaxed pt-2">
              {collection.description}
            </p>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs text-[#a1a1aa]">
            <span className="text-[#f4f2ec] font-medium">{photos.length}</span>
            <span>Exhibition Plates in this Journey</span>
            <span className="text-white/20">·</span>
            <span className="text-[#d4a373]">Sample Visual Collection</span>
          </div>
        </section>

        {/* Plates Sequence in this Collection */}
        <section className="space-y-16 sm:space-y-20 md:space-y-28">
          {photos.map((photo, index) => {
            const isEven = index % 2 === 0;
            const isPanoramic = photo.aspectRatio === "2.39:1";
            const isSquare = photo.aspectRatio === "1:1";

            if (isPanoramic) {
              return (
                <div key={photo.id} className="space-y-4">
                  <Link
                    href={`/gallery/${photo.slug}`}
                    className="group block relative w-full aspect-[2.39/1] overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 hover:border-[#d4a373]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a373]"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] filter brightness-[0.92] group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-[#08080a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase">
                        <Eye size={13} />
                        <span>View Plate Dossier</span>
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-white/5 pt-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline space-x-3">
                        <span className="font-mono text-xs text-[#d4a373] tracking-wider font-medium">
                          {photo.plateNumber}
                        </span>
                        <Link
                          href={`/gallery/${photo.slug}`}
                          className="font-serif text-xl sm:text-2xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors"
                        >
                          {photo.title}
                        </Link>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light max-w-2xl leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-[#a1a1aa] shrink-0">
                      <span className="text-[#f4f2ec] flex items-center gap-1">
                        <MapPin size={12} className="text-[#d4a373]" />
                        {photo.location?.placename || "Travel Archive"}
                      </span>
                      <span>·</span>
                      <span className="text-[#d4a373]">{photo.category}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={photo.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Frame Column */}
                <div
                  className={`overflow-hidden ${
                    isSquare
                      ? "lg:col-span-6 lg:col-start-4"
                      : isEven
                      ? "lg:col-span-7"
                      : "lg:col-span-7 lg:col-start-6"
                  }`}
                >
                  <Link
                    href={`/gallery/${photo.slug}`}
                    className="group block relative w-full overflow-hidden bg-[#111114] border border-white/10 transition-colors duration-500 hover:border-[#d4a373]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a373]"
                  >
                    <div
                      className={`relative w-full ${
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
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] filter brightness-[0.92] group-hover:brightness-100"
                      />

                      <div className="absolute inset-0 bg-[#08080a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center space-x-2 px-4 py-2 bg-[#08080a]/85 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#f4f2ec] uppercase">
                          <Eye size={13} />
                          <span>View Plate Dossier</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Description Column */}
                <div
                  className={`flex flex-col justify-center space-y-4 sm:space-y-5 ${
                    isSquare
                      ? "lg:col-span-6 lg:col-start-4 text-center items-center pt-2"
                      : isEven
                      ? "lg:col-span-5 lg:pl-2"
                      : "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pr-2"
                  }`}
                >
                  <div className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase">
                    {photo.plateNumber}
                  </div>

                  <Link
                    href={`/gallery/${photo.slug}`}
                    className="font-serif text-2xl sm:text-3xl text-[#f4f2ec] hover:text-[#d4a373] transition-colors leading-tight"
                  >
                    {photo.title}
                  </Link>

                  <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light leading-relaxed">
                    {photo.description || photo.caption}
                  </p>

                  <div className="p-3.5 bg-white/[0.02] border border-white/10 space-y-1.5 font-mono text-xs text-[#a1a1aa] w-full">
                    <div className="flex items-center justify-between text-[#f4f2ec]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin size={12} className="text-[#d4a373]" />
                        {photo.location?.placename || "Travel Archive"}
                      </span>
                      <span className="text-[#d4a373] text-[11px]">
                        {photo.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/gallery/${photo.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] hover:text-[#d4a373] transition-colors group pt-1"
                    >
                      <span>Read Plate Notes</span>
                      <span className="transition-transform group-hover:translate-x-1 text-[#d4a373]">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Footer Navigation Back to Collections */}
        <section className="pt-16 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 text-[#a1a1aa] hover:text-[#f4f2ec] transition-colors"
          >
            <ArrowLeft size={14} className="text-[#d4a373]" />
            <span>Return to All Travel Journeys</span>
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 text-[#f4f2ec] uppercase tracking-wider transition-all"
          >
            <span>Explore All Photographs</span>
            <ArrowRight size={14} className="text-[#d4a373]" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
