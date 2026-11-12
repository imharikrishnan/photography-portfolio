export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Optional explicit development flag: if true, uses in-memory mock data even if Sanity is configured
export const useMockData =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

// Server-only environment variables (never prefixed with NEXT_PUBLIC_)
export const readToken = process.env.SANITY_API_READ_TOKEN || "";
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET || "";
export const previewSecret = process.env.SANITY_PREVIEW_SECRET || "";
