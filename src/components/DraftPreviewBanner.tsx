import { draftMode } from "next/headers";
import { Eye, X } from "lucide-react";

export default async function DraftPreviewBanner() {
  let isDraft = false;
  try {
    const draft = await draftMode();
    isDraft = draft.isEnabled;
  } catch {
    isDraft = false;
  }

  if (!isDraft) return null;

  return (
    <aside
      role="status"
      aria-label="Draft Preview Mode Active"
      className="fixed top-0 inset-x-0 z-[100] bg-[#12110e]/95 border-b border-[#c89d5c]/30 backdrop-blur-md px-4 py-2.5 text-xs font-mono text-[#e5d5be] flex items-center justify-between shadow-2xl transition-all"
    >
      <div className="flex items-center space-x-2.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c89d5c] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c89d5c]" />
        </span>
        <div className="flex items-center space-x-2">
          <Eye className="w-3.5 h-3.5 text-[#c89d5c]" />
          <span className="font-semibold tracking-wider uppercase text-[#c89d5c]">
            Draft Preview Mode Active
          </span>
        </div>
        <span className="hidden md:inline text-white/50 text-[11px]">
          — Rendering unpublished Sanity drafts with real-time updates
        </span>
      </div>

      <a
        href="/api/draft-mode/disable"
        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#c89d5c]/10 hover:bg-[#c89d5c]/25 text-[#f4f2ec] border border-[#c89d5c]/30 hover:border-[#c89d5c]/60 transition-colors text-xs"
      >
        <span>Exit Preview</span>
        <X className="w-3.5 h-3.5 text-[#c89d5c]" />
      </a>
    </aside>
  );
}
