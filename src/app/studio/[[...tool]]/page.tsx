import type { Metadata } from "next";
import Studio from "./Studio";

export const metadata: Metadata = {
  title: "Sanity Studio | Harikrishnan Photography Archive",
  description: "Exhibition archive and photograph editorial management system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return <Studio />;
}
