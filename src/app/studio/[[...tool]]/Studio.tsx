"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function Studio() {
  return (
    <div className="fixed inset-0 z-[60] bg-[#101112]">
      <NextStudio config={config} />
    </div>
  );
}
