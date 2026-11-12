import { createClient, type ClientConfig, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "../env";

const config: ClientConfig = {
  projectId: projectId || "placeholder-project-id",
  dataset: dataset || "production",
  apiVersion: apiVersion || "2026-03-01",
  // useCdn: false ensures Next.js Data Cache handles caching and tag revalidations directly
  useCdn: false,
};

export const client = createClient(config);

/**
 * Returns a configured Sanity client.
 * In draft mode, attaches the server-only read token and enables previewDrafts perspective.
 */
export function getSanityClient(isDraftMode = false): SanityClient {
  if (isDraftMode) {
    const token = readToken || process.env.SANITY_API_READ_TOKEN;
    if (!token) {
      console.warn(
        "[Sanity] Draft Mode is active, but SANITY_API_READ_TOKEN is not configured. Private drafts cannot be read without a token."
      );
    }
    return client.withConfig({
      token: token || undefined,
      perspective: token ? "previewDrafts" : "published",
      useCdn: false,
    });
  }
  return client.withConfig({
    perspective: "published",
    useCdn: false,
  });
}

/**
 * Helper to execute cached GROQ queries with Next.js tag revalidation,
 * or live un-cached queries when Draft Mode is active.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
  isDraftMode = false,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
  isDraftMode?: boolean;
}): Promise<QueryResponse> {
  if (isDraftMode) {
    const draftClient = getSanityClient(true);
    return draftClient.fetch<QueryResponse>(query, params, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
  }

  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
