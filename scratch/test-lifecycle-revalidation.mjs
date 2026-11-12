import { spawn } from "child_process";
import path from "path";
import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const TEST_SECRET = "stage-c-test-webhook-secret-min-32-chars-long";
const PORT = 3005;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runTests() {
  console.log("=================================================================");
  console.log("VERIFICATION: SANITY WEBHOOK PROJECTION & LIFECYCLE REVALIDATION");
  console.log("=================================================================\n");

  const nextBin = path.resolve("./node_modules/next/dist/bin/next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      SANITY_REVALIDATE_SECRET: TEST_SECRET,
      NODE_ENV: "production",
    },
  });

  let serverReady = false;
  for (let i = 0; i < 30; i++) {
    await delay(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}`);
      if (res.ok) {
        serverReady = true;
        break;
      }
    } catch {}
  }
  if (!serverReady) {
    server.kill();
    throw new Error("Server failed to start on port " + PORT);
  }

  async function sendWebhook(bodyObj) {
    const bodyStr = JSON.stringify(bodyObj);
    const timestamp = Date.now();
    const sig = await encodeSignatureHeader(bodyStr, timestamp, TEST_SECRET);
    const res = await fetch(`http://127.0.0.1:${PORT}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: sig,
        "x-skip-wait": "true",
      },
      body: bodyStr,
    });
    return { status: res.status, data: await res.json() };
  }

  let passed = 0;
  let total = 0;
  function check(cond, label) {
    total++;
    if (cond) {
      console.log(`  ✓ PASS: ${label}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${label}`);
    }
  }

  try {
    // 1. CREATE EVENT (before() is null)
    console.log("--- 1. Photograph CREATE Event (before() is null) ---");
    const createRes = await sendWebhook({
      operation: "create",
      _id: "photo-brand-new",
      _type: "photograph",
      slug: "mist-over-alps",
      previousSlug: null,
      collectionSlug: "high-plateaus",
      previousCollectionSlug: null,
    });
    check(
      createRes.status === 200 &&
      createRes.data.revalidated === true &&
      createRes.data.tags.includes("photograph:mist-over-alps") &&
      createRes.data.paths.includes("/gallery/mist-over-alps") &&
      createRes.data.paths.includes("/collections/high-plateaus"),
      "Create event successfully revalidates new slug and collection without requiring previousSlug"
    );

    // 2. UPDATE / RENAME EVENT (both old and new slugs exist)
    console.log("\n--- 2. Photograph RENAME & REASSIGN Event ---");
    const updateRes = await sendWebhook({
      operation: "update",
      _id: "photo-brand-new",
      _type: "photograph",
      slug: "mist-over-alps-revised",
      previousSlug: "mist-over-alps",
      collectionSlug: "alpine-silence",
      previousCollectionSlug: "high-plateaus",
    });
    check(
      updateRes.status === 200 &&
      updateRes.data.revalidated === true &&
      updateRes.data.tags.includes("photograph:mist-over-alps-revised") &&
      updateRes.data.tags.includes("photograph:mist-over-alps") &&
      updateRes.data.paths.includes("/gallery/mist-over-alps-revised") &&
      updateRes.data.paths.includes("/gallery/mist-over-alps") &&
      updateRes.data.paths.includes("/collections/alpine-silence") &&
      updateRes.data.paths.includes("/collections/high-plateaus"),
      "Rename & Reassign revalidates BOTH old and new slugs and BOTH collections"
    );

    // 3. DELETE / UNPUBLISH EVENT with COALESCE PROJECTION (root fields populated via coalesce)
    console.log("\n--- 3. Photograph DELETE Event (with coalesce projection) ---");
    const deleteCoalesceRes = await sendWebhook({
      operation: "delete",
      _id: "photo-brand-new",
      _type: "photograph",
      slug: "mist-over-alps-revised",
      previousSlug: "mist-over-alps-revised",
      collectionSlug: "alpine-silence",
      previousCollectionSlug: "alpine-silence",
    });
    check(
      deleteCoalesceRes.status === 200 &&
      deleteCoalesceRes.data.revalidated === true &&
      deleteCoalesceRes.data.tags.includes("photograph:mist-over-alps-revised") &&
      deleteCoalesceRes.data.paths.includes("/gallery/mist-over-alps-revised"),
      "Delete event with coalesce projection correctly purges deleted plate path"
    );

    // 4. DELETE / UNPUBLISH EVENT with RAW BEFORE NESTING (root document is null)
    console.log("\n--- 4. Photograph DELETE Event (raw before() fallback) ---");
    const rawDeleteRes = await sendWebhook({
      operation: "delete",
      _id: null,
      _type: null,
      before: {
        _id: "photo-legacy-1",
        _type: "photograph",
        slug: { current: "legacy-morning-plate" },
        collectionSlug: "forgotten-journeys",
      },
    });
    check(
      rawDeleteRes.status === 200 &&
      rawDeleteRes.data.revalidated === true &&
      rawDeleteRes.data.documentType === "photograph" &&
      rawDeleteRes.data.tags.includes("photograph:legacy-morning-plate") &&
      rawDeleteRes.data.paths.includes("/gallery/legacy-morning-plate"),
      "Delete event without coalesce extracts documentType and slug from before() fallback"
    );

    // 5. DRAFT MUTATION EVENT (must be ignored for public revalidation)
    console.log("\n--- 5. DRAFT Document Mutation Event ---");
    const draftRes = await sendWebhook({
      operation: "update",
      _id: "drafts.photo-uuid-xyz",
      _type: "photograph",
      slug: "secret-unreleased-plate",
    });
    check(
      draftRes.status === 200 &&
      draftRes.data.revalidated === false &&
      draftRes.data.message.includes("Draft mutation ignored"),
      "Draft mutations are safely filtered out, preventing premature public cache purges"
    );

    console.log(`\n=================================================================`);
    console.log(`LIFECYCLE RESULTS: ${passed} / ${total} TESTS PASSED`);
    console.log(`=================================================================`);
  } finally {
    server.kill();
  }
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
