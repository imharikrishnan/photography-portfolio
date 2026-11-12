import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/env";

export interface SanityWebhookPayload {
  _id?: string;
  _type?: string;
  slug?: string | { current?: string };
  previousSlug?: string | { current?: string };
  collectionSlug?: string | { current?: string };
  previousCollectionSlug?: string | { current?: string };
  featured?: boolean;
  previousFeatured?: boolean;
  isHero?: boolean;
  previousIsHero?: boolean;
  before?: Record<string, unknown>;
  [key: string]: unknown;
}

function extractSlug(val: unknown): string | null {
  if (typeof val === "string" && val.trim() !== "") return val.trim();
  if (
    typeof val === "object" &&
    val !== null &&
    "current" in val &&
    typeof (val as { current: unknown }).current === "string"
  ) {
    return (val as { current: string }).current.trim();
  }
  return null;
}

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

export async function POST(request: NextRequest) {
  const secret = revalidateSecret || process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error(
      "[Revalidate Webhook] SANITY_REVALIDATE_SECRET is not configured on the server."
    );
    return NextResponse.json(
      { message: "Server webhook secret not configured" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }

  let parseResult;
  try {
    const skipWait =
      process.env.NODE_ENV === "test" ||
      request.headers.get("x-skip-wait") === "true";
    parseResult = await parseBody<SanityWebhookPayload>(
      request,
      secret,
      !skipWait
    );
  } catch (err) {
    console.error(
      "[Revalidate Webhook] Error during signature verification:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { message: "Malformed webhook payload or signature format" },
      { status: 400, headers: NO_CACHE_HEADERS }
    );
  }

  const { isValidSignature, body } = parseResult;

  if (isValidSignature !== true) {
    console.warn(
      "[Revalidate Webhook] Invalid or missing Sanity webhook signature header."
    );
    return NextResponse.json(
      { message: "Invalid signature" },
      { status: 401, headers: NO_CACHE_HEADERS }
    );
  }

  if (!body || typeof body !== "object") {
    console.warn(
      "[Revalidate Webhook] Webhook request has missing or malformed body."
    );
    return NextResponse.json(
      { message: "Bad Request: Missing or malformed payload" },
      { status: 400, headers: NO_CACHE_HEADERS }
    );
  }

  const beforeObj =
    typeof body.before === "object" && body.before !== null
      ? (body.before as Record<string, unknown>)
      : {};

  const docType = (body._type || beforeObj._type) as string | undefined;
  const docId = (body._id || beforeObj._id) as string | undefined;

  if (!docType) {
    console.warn(
      "[Revalidate Webhook] Missing document _type in payload."
    );
    return NextResponse.json(
      { message: "Bad Request: Missing document _type" },
      { status: 400, headers: NO_CACHE_HEADERS }
    );
  }

  // Ignore draft mutation events for public cache revalidation
  if (typeof docId === "string" && docId.startsWith("drafts.")) {
    return NextResponse.json(
      {
        message: "Draft mutation ignored for public cache revalidation",
        revalidated: false,
        id: docId,
      },
      { status: 200, headers: NO_CACHE_HEADERS }
    );
  }

  const tagsToRevalidate = new Set<string>();
  const pathsToRevalidate = new Set<string>();

  // Extract slugs gracefully across create, update, delete, and unpublish events
  const slug =
    extractSlug(body.slug) ||
    extractSlug(body.previousSlug) ||
    extractSlug(beforeObj.slug);

  const previousSlug =
    extractSlug(body.previousSlug) ||
    extractSlug(beforeObj.slug);

  const collectionSlug =
    extractSlug(body.collectionSlug) ||
    extractSlug(body.previousCollectionSlug) ||
    extractSlug(beforeObj.collectionSlug);

  const previousCollectionSlug =
    extractSlug(body.previousCollectionSlug) ||
    extractSlug(beforeObj.collectionSlug);

  switch (docType) {
    case "photograph": {
      tagsToRevalidate.add("photographs");
      pathsToRevalidate.add("/");
      pathsToRevalidate.add("/gallery");
      pathsToRevalidate.add("/collections");

      if (slug) {
        tagsToRevalidate.add(`photograph:${slug}`);
        pathsToRevalidate.add(`/gallery/${slug}`);
      }
      if (previousSlug && previousSlug !== slug) {
        tagsToRevalidate.add(`photograph:${previousSlug}`);
        pathsToRevalidate.add(`/gallery/${previousSlug}`);
      }
      if (collectionSlug) {
        tagsToRevalidate.add(`collection:${collectionSlug}`);
        pathsToRevalidate.add(`/collections/${collectionSlug}`);
      }
      if (previousCollectionSlug && previousCollectionSlug !== collectionSlug) {
        tagsToRevalidate.add(`collection:${previousCollectionSlug}`);
        pathsToRevalidate.add(`/collections/${previousCollectionSlug}`);
      }
      break;
    }

    case "collection": {
      tagsToRevalidate.add("collections");
      tagsToRevalidate.add("photographs");
      pathsToRevalidate.add("/");
      pathsToRevalidate.add("/collections");
      pathsToRevalidate.add("/gallery");

      if (slug) {
        tagsToRevalidate.add(`collection:${slug}`);
        pathsToRevalidate.add(`/collections/${slug}`);
      }
      if (previousSlug && previousSlug !== slug) {
        tagsToRevalidate.add(`collection:${previousSlug}`);
        pathsToRevalidate.add(`/collections/${previousSlug}`);
      }
      break;
    }

    case "siteSettings": {
      tagsToRevalidate.add("siteSettings");
      pathsToRevalidate.add("/");
      pathsToRevalidate.add("/gallery");
      pathsToRevalidate.add("/collections");
      break;
    }

    default: {
      return NextResponse.json(
        {
          message: `Ignored unhandled document type: ${docType}`,
          revalidated: false,
        },
        { status: 200, headers: NO_CACHE_HEADERS }
      );
    }
  }

  // Invalidate cache tags and paths using supported Next.js 16 APIs
  for (const tag of tagsToRevalidate) {
    revalidateTag(tag, "max");
  }
  for (const path of pathsToRevalidate) {
    revalidatePath(path, "page");
  }

  return NextResponse.json(
    {
      revalidated: true,
      now: Date.now(),
      documentType: docType,
      tags: Array.from(tagsToRevalidate),
      paths: Array.from(pathsToRevalidate),
    },
    { status: 200, headers: NO_CACHE_HEADERS }
  );
}
