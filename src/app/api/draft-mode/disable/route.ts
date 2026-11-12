import { draftMode, cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PATH_REGEX = /^\/($|(gallery|collections)($|\/[a-zA-Z0-9_-]+$)|\?.*)/;

function isSafeInternalPath(pathStr: string): boolean {
  if (!pathStr || !pathStr.startsWith("/")) return false;
  if (pathStr.startsWith("//") || pathStr.startsWith("/\\")) return false;
  const firstSlash = pathStr.indexOf("/");
  const firstColon = pathStr.indexOf(":");
  if (firstColon !== -1 && firstColon < firstSlash) return false;
  return ALLOWED_PATH_REGEX.test(pathStr);
}

export async function GET(request: NextRequest) {
  const draft = await draftMode();
  draft.disable();

  const cookieStore = await cookies();
  cookieStore.delete("__prerender_bypass");

  const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/";
  const safePath = isSafeInternalPath(redirectUrl) ? redirectUrl : "/";

  const response = NextResponse.redirect(new URL(safePath, request.url));
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return response;
}
