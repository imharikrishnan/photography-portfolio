"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function CopyLinkButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Try modern asynchronous Clipboard API
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        // Fallback for restricted clipboard contexts
        try {
          const textarea = document.createElement("textarea");
          textarea.value = window.location.href;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        } catch {
          // ignore
        }
      }
    }

    // Always provide tactile feedback acknowledging the copy action
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono tracking-wider text-[#c8c5bc] hover:text-[#f4f2ec] transition-all duration-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#d4a373] cursor-pointer"
      title={`Copy canonical link for ${title}`}
      aria-label="Copy link to this plate"
    >
      {copied ? (
        <>
          <Check size={13} className="text-[#d4a373]" />
          <span className="text-[#d4a373]">Link Copied</span>
        </>
      ) : (
        <>
          <Link2 size={13} className="text-[#d4a373]" />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
}
