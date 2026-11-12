import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function CollectionNotFound() {
  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f2ec] flex flex-col justify-between selection:bg-[#f4f2ec] selection:text-[#08080a]">
      <Navigation />

      <main className="flex-grow flex items-center justify-center px-5 sm:px-8 py-32 text-center">
        <div className="max-w-md space-y-6">
          <div className="font-mono text-xs text-[#d4a373] tracking-[0.25em] uppercase">
            [ Archive Notice · 404 ]
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#f4f2ec]">
            Travel Journey Not Found
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#c8c5bc] font-light leading-relaxed">
            The requested travel collection does not exist in the archive.
          </p>
          <div className="pt-2">
            <Link
              href="/collections"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-mono tracking-widest uppercase text-[#f4f2ec] transition-colors"
            >
              <ArrowLeft size={14} className="text-[#d4a373]" />
              <span>Return to All Journeys</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
