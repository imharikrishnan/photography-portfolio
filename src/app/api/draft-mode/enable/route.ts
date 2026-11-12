import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { getSanityClient } from "@/sanity/lib/client";
import { previewSecret, readToken } from "@/sanity/env";

// Regular expression to ensure redirection stays strictly within internal application routes
const ALLOWED_PATH_REGEX = /^\/($|(gallery|collections)($|\/[a-zA-Z0-9_-]+$)|\?.*)/;

function isSafeInternalPath(pathStr: string): boolean {
  if (!pathStr || !pathStr.startsWith("/")) return false;
  if (pathStr.startsWith("//") || pathStr.startsWith("/\\")) return false;
  // Disallow scheme attempts before slash
  const firstSlash = pathStr.indexOf("/");
  const firstColon = pathStr.indexOf(":");
  if (firstColon !== -1 && firstColon < firstSlash) return false;
  return ALLOWED_PATH_REGEX.test(pathStr);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const providedSecret = searchParams.get("secret");
  const configuredSecret = previewSecret || process.env.SANITY_PREVIEW_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  const draftClient = getSanityClient(true);
  let isValid = false;
  let targetPath = searchParams.get("slug") || searchParams.get("redirect") || "/";

  // Check 1: Ephemeral Sanity Studio secret validation via @sanity/preview-url-secret
  // This is the preferred, cryptographically secure, single-use token mechanism
  if (readToken) {
    try {
      const result = await validatePreviewUrl(draftClient, request.url);
      if (result.isValid) {
        isValid = true;
        if (result.redirectTo) {
          targetPath = result.redirectTo;
        }
      }
    } catch (err) {
      console.warn(
        "[Draft Mode] Sanity preview-url-secret validation error:",
        err instanceof Error ? err.message : err
      );
    }
  }

  // Check 2: Direct static secret preview fallback
  // Strictly disabled in production to eliminate reusable secret exposure in browser history and server access logs
  if (!isValid && !isProduction && configuredSecret && providedSecret && providedSecret === configuredSecret) {
    isValid = true;
  }

  // Reject unauthorized attempts
  if (!isValid) {
    const message =
      isProduction && providedSecret
        ? "Unauthorized: Static preview secrets are disabled in production. Use Sanity Studio Presentation Tool with ephemeral signed preview tokens."
        : "Unauthorized: Invalid or missing preview secret";

    return new NextResponse(message, {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  }

  // Normalize targetPath if a bare slug was provided
  if (!targetPath.startsWith("/")) {
    targetPath = `/gallery/${targetPath}`;
  }

  // Validate redirect destination against open redirect attacks
  if (!isSafeInternalPath(targetPath)) {
    console.warn(`[Draft Mode] Blocked potential open redirect attempt to: ${targetPath}`);
    targetPath = "/";
  }

  // Validate target document existence if targeting a specific photograph or collection detail page
  const galleryMatch = targetPath.match(/^\/gallery\/([a-zA-Z0-9_-]+)$/);
  if (galleryMatch) {
    const slug = galleryMatch[1];
    try {
      const doc = await draftClient.fetch(
        `*[_type == "photograph" && slug.current == $slug][0]._id`,
        { slug }
      );
      if (!doc) {
        return new NextResponse(`Photograph plate '${slug}' not found in Sanity archive.`, {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store, max-age=0",
          },
        });
      }
    } catch (err) {
      console.warn("[Draft Mode] Document existence check error:", err instanceof Error ? err.message : err);
    }
  }

  const collectionMatch = targetPath.match(/^\/collections\/([a-zA-Z0-9_-]+)$/);
  if (collectionMatch) {
    const slug = collectionMatch[1];
    try {
      const doc = await draftClient.fetch(
        `*[_type == "collection" && slug.current == $slug][0]._id`,
        { slug }
      );
      if (!doc) {
        return new NextResponse(`Travel collection '${slug}' not found in Sanity archive.`, {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-store, max-age=0",
          },
        });
      }
    } catch (err) {
      console.warn("[Draft Mode] Collection existence check error:", err instanceof Error ? err.message : err);
    }
  }

  // Enable Next.js Draft Mode
  const draft = await draftMode();
  draft.enable();

  const response = NextResponse.redirect(new URL(targetPath, request.url));
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return response;
}
