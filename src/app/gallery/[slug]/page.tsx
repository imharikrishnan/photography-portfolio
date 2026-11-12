import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CopyLinkButton from "@/components/CopyLinkButton";
import {
  getAllPhotographs,
  getPhotographBySlug,
  getAdjacentPhotographs,
  getPhotographsByCollection,
  SITE_CONFIG,
} from "@/lib/data";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Calendar,
  Layers,
  Info,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const photographs = getAllPhotographs();
  return photographs.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhotographBySlug(slug);

  if (!photo) {
    return {
      title: "Plate Not Found — Harikrishnan Nandanan",
    };
  }

  const title = `${photo.plateNumber ? `${photo.plateNumber} · ` : ""}${photo.title} — Harikrishnan Nandanan`;
  const description =
    photo.description ||
    photo.caption ||
    `Photographic study by Harikrishnan Nandanan captured with the Canon EOS R6 Mark III.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: photo.imageUrl,
          alt: photo.alt,
        },
      ],
    },
  };
}

export default async function PhotographDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const photo = getPhotographBySlug(slug);

  if (!photo) {
    notFound();
  }

  const { prev, next } = getAdjacentPhotographs(slug);

  const relatedPhotos = photo.collectionSlug
    ? getPhotographsByCollection(photo.collectionSlug)
        .filter((p) => p.slug !== photo.slug)
        .slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col relative selection:bg-[#f4f2ec] selection:text-[#08080a]">
      <Navigation />

      <main className="flex-grow pt-24 md:pt-32 pb-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        {/* Top Control Bar & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-1.5 text-[#a1a1aa] hover:text-[#f4f2ec] transition-colors"
            >
              <ArrowLeft size={13} className="text-[#d4a373]" />
              <span>Gallery</span>
            </Link>
            <span className="text-white/20">/</span>
            {photo.collectionSlug && (
              <>
                <Link
                  href={`/collections/${photo.collectionSlug}`}
                  className="text-[#a1a1aa] hover:text-[#f4f2ec] transition-colors hidden md:inline"
                >
                  {photo.series || "Journey"}
                </Link>
                <span className="text-white/20 hidden md:inline">/</span>
              </>
            )}
            <span className="text-[#d4a373] tracking-widest uppercase">
              {photo.plateNumber || "Plate"}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <CopyLinkButton title={photo.title} />
          </div>
        </div>

        {/* Monumental Aspect-Ratio-Preserved Photography Display */}
        <section className="space-y-4">
          <div className="relative w-full bg-[#030304] border border-white/10 p-2 sm:p-4 md:p-6 shadow-2xl flex items-center justify-center">
            <div
              className={`relative w-full overflow-hidden bg-[#111114] ${
                photo.aspectRatio === "4:5"
                  ? "aspect-[4/5] max-w-3xl mx-auto"
                  : photo.aspectRatio === "16:9"
                  ? "aspect-[16/9]"
                  : photo.aspectRatio === "1:1"
                  ? "aspect-square max-w-2xl mx-auto"
                  : photo.aspectRatio === "2.39:1"
                  ? "aspect-[2.39/1]"
                  : "aspect-[3/2] max-w-5xl mx-auto"
              }`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.alt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />

              {photo.isPlaceholder && (
                <span className="absolute top-3 left-3 bg-[#08080a]/85 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                  {photo.sampleNote || "Sample Image Placeholder"}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Curatorial Dossier & Metadata Slate */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4 border-t border-white/10">
          {/* Left Column: Curatorial Essay & Title */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase">
                <span className="font-semibold">{photo.plateNumber}</span>
                {photo.series && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-[#c8c5bc]">{photo.series}</span>
                  </>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f4f2ec] font-normal leading-tight">
                {photo.title}
              </h1>
            </div>

            {photo.description && (
              <p className="font-sans text-sm sm:text-base text-[#c8c5bc] font-light leading-relaxed">
                {photo.description}
              </p>
            )}

            {photo.caption && photo.caption !== photo.description && (
              <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed italic">
                {photo.caption}
              </p>
            )}

            {photo.notes && (
              <div className="p-5 bg-white/[0.015] border-l-2 border-[#d4a373] space-y-2">
                <span className="font-mono text-[10px] text-[#d4a373] tracking-widest uppercase block">
                  Field & Curatorial Context
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#e4e2db] font-light leading-relaxed">
                  {photo.notes}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Technical & Geographic Slate */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-white/[0.02] border border-white/10 space-y-4 font-mono text-xs">
              <span className="text-[#d4a373] text-[10px] tracking-widest uppercase block border-b border-white/5 pb-2">
                Plate Telemetry & Technical Slate
              </span>

              <div className="space-y-3 text-[11px]">
                {photo.location?.placename && (
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#73737c] flex items-center gap-1.5 uppercase">
                      <MapPin size={12} className="text-[#d4a373]" />
                      Location
                    </span>
                    <span className="text-[#f4f2ec] text-right font-medium">
                      {photo.location.placename}
                      {photo.location.region && (
                        <span className="block text-[#a1a1aa] font-normal">
                          {photo.location.region}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                {photo.cameraModel && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] flex items-center gap-1.5 uppercase">
                      <Camera size={12} className="text-[#d4a373]" />
                      Camera
                    </span>
                    <span className="text-[#f4f2ec]">
                      {photo.cameraModel}
                    </span>
                  </div>
                )}

                {photo.lens && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] uppercase">Lens</span>
                    <span className="text-[#f4f2ec]">{photo.lens}</span>
                  </div>
                )}

                {photo.focalLength && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] uppercase">Focal Length</span>
                    <span className="text-[#f4f2ec]">{photo.focalLength}</span>
                  </div>
                )}

                {photo.aperture && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] uppercase">Aperture</span>
                    <span className="text-[#f4f2ec]">{photo.aperture}</span>
                  </div>
                )}

                {photo.shutterSpeed && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] uppercase">Shutter</span>
                    <span className="text-[#f4f2ec]">{photo.shutterSpeed}</span>
                  </div>
                )}

                {photo.iso && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] uppercase">ISO</span>
                    <span className="text-[#f4f2ec]">{photo.iso}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                  <span className="text-[#73737c] flex items-center gap-1.5 uppercase">
                    <Layers size={12} className="text-[#d4a373]" />
                    Category
                  </span>
                  <span className="text-[#d4a373] font-medium">
                    {photo.category}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                  <span className="text-[#73737c] flex items-center gap-1.5 uppercase">
                    <Calendar size={12} className="text-[#d4a373]" />
                    Archive Date
                  </span>
                  <span className="text-[#f4f2ec]">
                    {photo.captureDate || photo.year || "Sample Archive"}
                  </span>
                </div>

                {photo.aspectRatio && (
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2">
                    <span className="text-[#73737c] uppercase">Format Ratio</span>
                    <span className="text-[#a1a1aa]">{photo.aspectRatio}</span>
                  </div>
                )}
              </div>

              {photo.isPlaceholder && (
                <div className="border-t border-white/5 pt-3 text-[10px] text-[#a1a1aa] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#d4a373] uppercase tracking-wider font-medium">
                    <Info size={11} className="shrink-0" />
                    <span>Sample Visual Placeholder</span>
                  </div>
                  <p className="text-[#73737c] leading-relaxed">
                    This sample photograph illustrates exhibition layout and aspect ratio. Camera and EXIF telemetry are displayed only for verified personal archive uploads.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stepper Navigation: Previous and Next Plates */}
        <section className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {prev ? (
              <Link
                href={`/gallery/${prev.slug}`}
                className="group p-4 bg-white/[0.015] hover:bg-white/[0.04] border border-white/10 hover:border-[#d4a373]/40 transition-all flex items-center space-x-3"
              >
                <ChevronLeft
                  size={16}
                  className="text-[#d4a373] transition-transform group-hover:-translate-x-1 shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="block text-[10px] text-[#73737c] uppercase tracking-widest">
                    Previous Plate · {prev.plateNumber}
                  </span>
                  <span className="block text-[#f4f2ec] font-serif text-base sm:text-lg group-hover:text-white transition-colors truncate">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={`/gallery/${next.slug}`}
                className="group p-4 bg-white/[0.015] hover:bg-white/[0.04] border border-white/10 hover:border-[#d4a373]/40 transition-all flex items-center justify-end space-x-3 text-right"
              >
                <div className="overflow-hidden">
                  <span className="block text-[10px] text-[#73737c] uppercase tracking-widest">
                    Next Plate · {next.plateNumber}
                  </span>
                  <span className="block text-[#f4f2ec] font-serif text-base sm:text-lg group-hover:text-white transition-colors truncate">
                    {next.title}
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#d4a373] transition-transform group-hover:translate-x-1 shrink-0"
                />
              </Link>
            )}
          </div>
        </section>

        {/* Related Photographs from the Same Collection */}
        {relatedPhotos.length > 0 && (
          <section className="pt-12 border-t border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase block mb-1">
                  [ Sibling Plates in Journey ]
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f4f2ec]">
                  More from {photo.series}
                </h3>
              </div>
              {photo.collectionSlug && (
                <Link
                  href={`/collections/${photo.collectionSlug}`}
                  className="font-mono text-xs text-[#d4a373] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Explore Entire Journey →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {relatedPhotos.map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/gallery/${sibling.slug}`}
                  className="group block space-y-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-[#d4a373]/40 p-3 transition-all"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111114]">
                    <Image
                      src={sibling.imageUrl}
                      alt={sibling.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                    />
                    <span className="absolute top-2 left-2 font-mono text-[9px] tracking-widest uppercase bg-[#08080a]/80 backdrop-blur-md px-1.5 py-0.5 border border-white/10 text-[#d4a373]">
                      {sibling.plateNumber}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base text-[#f4f2ec] group-hover:text-white transition-colors truncate">
                      {sibling.title}
                    </h4>
                    <span className="block font-mono text-[10px] text-[#a1a1aa]">
                      {sibling.location?.placename || "Travel Archive"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
