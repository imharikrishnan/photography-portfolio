import { spawn } from "child_process";
import path from "path";
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const TEST_SECRET = "stage-c-test-webhook-secret-min-32-chars-long";
const TEST_PREVIEW_SECRET = "stage-c-test-preview-secret-strong-key";
const PORT = 3003;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runStageCTests() {
  console.log("=================================================================");
  console.log("STAGE D SECURITY HARDENING & E2E VERIFICATION SUITE");
  console.log("=================================================================\n");

  console.log("1. Starting Next.js Production Server on port " + PORT + " (NODE_ENV=production)...");
  const nextBin = path.resolve("./node_modules/next/dist/bin/next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      SANITY_REVALIDATE_SECRET: TEST_SECRET,
      SANITY_PREVIEW_SECRET: TEST_PREVIEW_SECRET,
      NODE_ENV: "production",
    },
  });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await delay(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}`);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {}
  }

  if (!ready) {
    server.kill();
    throw new Error("Next.js server failed to bind to port " + PORT);
  }
  console.log("Next.js production server is live on http://127.0.0.1:" + PORT + "\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // SUITE 1: Webhook Signature Verification & Route Security
    // -------------------------------------------------------------
    console.log("--- SUITE 1: Webhook Signature Verification & Route Security ---");

    // 1A: Missing signature header
    const res1A = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _type: "photograph", slug: "test-slug" }),
    });
    assert(res1A.status === 401, "Missing signature header rejected with HTTP 401");

    // 1B: Tampered / Invalid signature header
    const res1B = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: "t=1794509795913,v1=tampered-invalid-signature-hash",
      },
      body: JSON.stringify({ _type: "photograph", slug: "test-slug" }),
    });
    assert(res1B.status === 401, "Tampered signature header rejected with HTTP 401");

    // 1C: Valid HMAC signature on photograph publication & slug rename
    const photoBody = JSON.stringify({
      _id: "photo-uuid-1",
      _type: "photograph",
      slug: { current: "alpine-morning-study" },
      previousSlug: { current: "old-alpine-study" },
      collectionSlug: { current: "high-altitude-light" },
      previousCollectionSlug: { current: "mountain-silence" },
      featured: true,
      isHero: false,
    });
    const photoTimestamp = Date.now();
    const photoSig = await encodeSignatureHeader(photoBody, photoTimestamp, TEST_SECRET);

    const res1C = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: photoSig,
        "x-skip-wait": "true",
      },
      body: photoBody,
    });
    const json1C = await res1C.json();
    assert(
      res1C.status === 200 &&
      json1C.revalidated === true &&
      json1C.tags.includes("photographs") &&
      json1C.tags.includes("photograph:alpine-morning-study") &&
      json1C.tags.includes("photograph:old-alpine-study") &&
      json1C.paths.includes("/gallery/alpine-morning-study") &&
      json1C.paths.includes("/gallery/old-alpine-study") &&
      json1C.paths.includes("/collections/high-altitude-light") &&
      json1C.paths.includes("/collections/mountain-silence"),
      "Valid photograph publish/rename webhook revalidates old & new slugs and collections"
    );

    // 1D: Valid HMAC signature on collection update
    const colBody = JSON.stringify({
      _id: "col-uuid-1",
      _type: "collection",
      slug: { current: "the-serene-coast" },
      previousSlug: { current: "old-coastal-plates" },
    });
    const colTimestamp = Date.now();
    const colSig = await encodeSignatureHeader(colBody, colTimestamp, TEST_SECRET);

    const res1D = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: colSig,
        "x-skip-wait": "true",
      },
      body: colBody,
    });
    const json1D = await res1D.json();
    assert(
      res1D.status === 200 &&
      json1D.revalidated === true &&
      json1D.tags.includes("collections") &&
      json1D.tags.includes("collection:the-serene-coast") &&
      json1D.paths.includes("/collections/the-serene-coast") &&
      json1D.paths.includes("/collections/old-coastal-plates"),
      "Valid collection webhook revalidates old & new collection paths"
    );

    // 1E: Valid HMAC signature on siteSettings update
    const settingsBody = JSON.stringify({
      _id: "siteSettings",
      _type: "siteSettings",
    });
    const settingsTimestamp = Date.now();
    const settingsSig = await encodeSignatureHeader(settingsBody, settingsTimestamp, TEST_SECRET);

    const res1E = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: settingsSig,
        "x-skip-wait": "true",
      },
      body: settingsBody,
    });
    const json1E = await res1E.json();
    assert(
      res1E.status === 200 &&
      json1E.revalidated === true &&
      json1E.tags.includes("siteSettings") &&
      json1E.paths.includes("/") &&
      json1E.paths.includes("/gallery") &&
      json1E.paths.includes("/collections"),
      "Valid siteSettings webhook revalidates global siteSettings tag and top-level pages"
    );

    // 1F: Draft event ignores public cache revalidation
    const draftBody = JSON.stringify({
      _id: "drafts.photo-uuid-1",
      _type: "photograph",
      slug: { current: "draft-in-progress" },
    });
    const draftTimestamp = Date.now();
    const draftSig = await encodeSignatureHeader(draftBody, draftTimestamp, TEST_SECRET);

    const res1F = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: draftSig,
        "x-skip-wait": "true",
      },
      body: draftBody,
    });
    const json1F = await res1F.json();
    assert(
      res1F.status === 200 &&
      json1F.revalidated === false &&
      json1F.message.includes("Draft mutation ignored"),
      "Draft document mutations explicitly ignore public cache invalidation"
    );

    // 1G: Malformed body payload with valid signature
    const malformedBody = "   ";
    const malformedTimestamp = Date.now();
    const malformedSig = await encodeSignatureHeader(malformedBody, malformedTimestamp, TEST_SECRET);

    const res1G = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: malformedSig,
        "x-skip-wait": "true",
      },
      body: malformedBody,
    });
    assert(res1G.status === 400, "Malformed body payload rejected with HTTP 400");

    // 1H: Check Cache-Control headers on revalidation responses
    assert(
      res1C.headers.get("cache-control")?.includes("no-store"),
      "Revalidation API returns Cache-Control: no-store (never cached by proxies)"
    );

    // -------------------------------------------------------------
    // SUITE 2: Draft Preview Security Hardening
    // -------------------------------------------------------------
    console.log("\n--- SUITE 2: Draft Preview Security Hardening ---");

    // 2A: Unauthorized preview request (no secret)
    const res2A = await fetch(`http://127.0.0.1:${PORT}/api/draft-mode/enable?slug=test-1`, {
      redirect: "manual",
    });
    assert(res2A.status === 401, "Preview request without secret rejected with HTTP 401");

    // 2B: In production, static secret URLs are strictly forbidden
    const res2B = await fetch(
      `http://127.0.0.1:${PORT}/api/draft-mode/enable?secret=${TEST_PREVIEW_SECRET}&slug=test-1`,
      { redirect: "manual" }
    );
    const text2B = await res2B.text();
    assert(
      res2B.status === 401 && text2B.includes("Static preview secrets are disabled in production"),
      "Static secret preview URLs are strictly disabled in production (HTTP 401 with hardening warning)"
    );

    // 2C: Open redirect attack on preview enable
    const res2C = await fetch(
      `http://127.0.0.1:${PORT}/api/draft-mode/enable?secret=${TEST_PREVIEW_SECRET}&slug=https://attacker.evil.com`,
      { redirect: "manual" }
    );
    assert(res2C.status === 401, "Open redirect with static secret in production rejected with 401");

    // 2D: Disable draft mode
    const res2D = await fetch(
      `http://127.0.0.1:${PORT}/api/draft-mode/disable?redirect=/gallery`,
      { redirect: "manual" }
    );
    const setCookie2D = res2D.headers.get("set-cookie");
    const location2D = res2D.headers.get("location");
    assert(
      res2D.status === 307 &&
      location2D?.endsWith("/gallery") &&
      (setCookie2D?.includes("__prerender_bypass") || setCookie2D?.includes("Max-Age=0") || setCookie2D?.includes("Expires=")),
      "Disable preview route clears bypass cookie and redirects to requested internal route"
    );

    // 2E: Open redirect attack on disable preview
    const res2E = await fetch(
      `http://127.0.0.1:${PORT}/api/draft-mode/disable?redirect=https://evil.attacker.com`,
      { redirect: "manual" }
    );
    const location2E = res2E.headers.get("location");
    assert(
      res2E.status === 307 && location2E?.endsWith("/"),
      "Open redirect attack on disable route neutralized to safe root '/'"
    );

    // 2F: Cache-Control on disable route
    assert(
      res2D.headers.get("cache-control")?.includes("no-store"),
      "Disable preview route returns Cache-Control: no-store (never cached by proxies)"
    );

    console.log(`\n=================================================================`);
    console.log(`RESULTS: ${passedTests} / ${totalTests} STAGE D SECURITY TESTS PASSED`);
    console.log(`=================================================================`);
  } finally {
    server.kill();
  }
}

runStageCTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
