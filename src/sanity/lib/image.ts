import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "placeholder-project-id",
  dataset: dataset || "production",
});

/**
 * Generates an image URL builder that respects Sanity hotspots and crop rectangles
 */
export function urlForImage(source: any) {
  return imageBuilder.image(source).auto("format").fit("max");
}

/**
 * Resolves an image source (Sanity image object or plain URL string) to a full CDN URL
 */
export function resolveImageUrl(
  source: unknown,
  width?: number,
  quality: number = 85
): string {
  if (!source) return "";

  // If already a string URL (e.g. Unsplash or direct URL)
  if (typeof source === "string") {
    return source;
  }

  // If a Sanity image object with asset reference or expanded asset
  try {
    let builder = urlForImage(source).quality(quality);
    if (width) {
      builder = builder.width(width);
    }
    return builder.url();
  } catch {
    // If builder fails, try direct asset url if expanded
    if (typeof source === "object" && source !== null && "asset" in source) {
      const asset = (source as { asset?: { url?: string } }).asset;
      if (asset?.url) return asset.url;
    }
    return "";
  }
}
