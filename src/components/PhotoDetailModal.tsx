"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photograph } from "@/data/mockData";
import { X, MapPin, ChevronLeft, ChevronRight, Info } from "lucide-react";

interface PhotoDetailModalProps {
  photo: Photograph | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function PhotoDetailModal({
  photo,
  onClose,
  onNext,
  onPrev,
}: PhotoDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };

    if (photo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050507]/95 backdrop-blur-2xl p-3 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
        <div className="font-mono text-xs text-[#d4a373] tracking-widest uppercase flex items-center space-x-2 bg-[#08080a]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-sm">
          <span className="w-1.5 h-1.5 bg-[#d4a373] rounded-full" />
          <span>Plate Inspector · {photo.plateNumber}</span>
        </div>

        <button
          onClick={onClose}
          className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f4f2ec] transition-colors border border-white/15"
          aria-label="Close inspector"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Modal Card */}
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#08080a] border border-white/15 p-5 sm:p-8 md:p-10 shadow-2xl">
        {/* Left: Aspect-Ratio Preserved Image */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#111114] border border-white/10">
            <Image
              src={photo.imageUrl}
              alt={photo.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain"
            />

            <span className="absolute top-3 left-3 bg-[#08080a]/80 backdrop-blur-md px-2 py-0.5 border border-white/10 text-[10px] font-mono text-[#a1a1aa] uppercase tracking-wider">
              {photo.sampleNote}
            </span>
          </div>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center font-mono text-xs text-[#c8c5bc] pt-1">
            {onPrev ? (
              <button
                onClick={onPrev}
                className="flex items-center space-x-1.5 hover:text-[#d4a373] transition-colors"
              >
                <ChevronLeft size={14} />
                <span>PREV PLATE</span>
              </button>
            ) : <span />}
            {onNext && (
              <button
                onClick={onNext}
                className="flex items-center space-x-1.5 hover:text-[#d4a373] transition-colors"
              >
                <span>NEXT PLATE</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Plate Story & Notes */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#d4a373] tracking-widest uppercase">
              <span>{photo.plateNumber}</span>
              <span>·</span>
              <span>{photo.series}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f4f2ec]">
              {photo.title}
            </h2>
            <p className="font-sans text-xs text-[#c8c5bc] font-light leading-relaxed">
              {photo.caption}
            </p>
          </div>

          {/* Visual Notes Box */}
          <div className="p-4 bg-white/[0.02] border-l-2 border-[#d4a373] space-y-1.5">
            <span className="font-mono text-[10px] text-[#d4a373] tracking-widest uppercase block">
              Curatorial Notes
            </span>
            <p className="font-sans text-xs text-[#e4e2db] leading-relaxed italic">
              {photo.notes}
            </p>
          </div>

          {/* Plate Metadata Card */}
          <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2.5 font-mono text-xs text-[#c8c5bc]">
            <div className="flex items-center justify-between text-[#d4a373] tracking-wider uppercase border-b border-white/5 pb-2 text-[11px]">
              <span>Exhibition Plate Details</span>
              <span className="text-[#f4f2ec]">{photo.category}</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="text-[#73737c] text-[10px] block uppercase">Sample Scene / Subject</span>
                <span className="text-[#f4f2ec] flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#d4a373]" />
                  {photo.location?.placename || "Travel Archive"}
                </span>
              </div>
              <div className="pt-1 text-[#a1a1aa] flex items-center gap-1.5 border-t border-white/5">
                <Info size={11} className="text-[#d4a373]" />
                <span className="text-[10px] text-[#c8c5bc]">Sample layout placeholder — personal travels will be uploaded via CMS.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <Link
              href={`/gallery/${photo.slug}`}
              onClick={onClose}
              className="text-xs font-mono tracking-wider text-[#d4a373] hover:text-white transition-colors text-center sm:text-left"
            >
              View Full Plate Dossier →
            </Link>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] border border-white/15 transition-colors"
            >
              Return to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
