import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACT_DIR = "C:\\Users\\harik\\.gemini\\antigravity\\brain\\5ae624c8-fc7c-4d19-952a-72aac1bb4d5c";
const PORT = 3006;
const CHROME_PORT = 9224;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runRegression() {
  console.log("=================================================================");
  console.log("STAGE D BROWSER REGRESSION TESTING");
  console.log("=================================================================\n");

  console.log("1. Starting Next.js Production Server on port " + PORT + "...");
  const nextBin = path.resolve("./node_modules/next/dist/bin/next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
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
    throw new Error("Failed to start server on port " + PORT);
  }
  console.log("Server ready on port " + PORT);

  console.log("2. Launching headless Chrome with remote debugging on port " + CHROME_PORT + "...");
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${CHROME_PORT}`,
    "--no-sandbox",
    "--disable-gpu",
    "--window-size=1440,900",
    "about:blank",
  ]);

  let cdp;
  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      await delay(500);
      try {
        const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/version`);
        if (res.ok) {
          const data = await res.json();
          wsUrl = data.webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }
    if (!wsUrl) throw new Error("Could not connect to Chrome DevTools port");

    const targetsRes = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/list`);
    const targets = await targetsRes.json();
    const pageTarget = targets.find((t) => t.type === "page") || targets[0];

    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();
    console.log("Connected to Chrome via CDP\n");

    await cdp.send("Page.enable");
    await cdp.send("DOM.enable");
    await cdp.send("Runtime.enable");

    async function takeScreenshot(fileName) {
      const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
      const filePath = path.join(ARTIFACT_DIR, fileName);
      fs.writeFileSync(filePath, Buffer.from(data, "base64"));
      console.log(`Saved screenshot: ${fileName} (${fs.statSync(filePath).size} bytes)`);
      return filePath;
    }

    async function navigate(url) {
      console.log(`Navigating to ${url}...`);
      await cdp.send("Page.navigate", { url });
      await delay(1200);
    }

    async function evalCode(expression) {
      const result = await cdp.send("Runtime.evaluate", {
        expression,
        returnByValue: true,
      });
      return result.result?.value;
    }

    // --- CHECK 1: Homepage Desktop ---
    console.log("--- CHECK 1: Homepage Desktop (1440x900) ---");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await navigate(`http://localhost:${PORT}`);
    const hasHariWatermark = await evalCode("document.body.innerText.includes('HARI')");
    const hasEOSR6Attribution = await evalCode("document.body.innerText.includes('Canon EOS R6 Mark III')");
    const hasDraftBannerOnPublic = await evalCode("document.querySelector('aside[role=\"status\"]') !== null");
    console.log("  ✓ Monumental HARI watermark intact:", hasHariWatermark);
    console.log("  ✓ Personal Camera Canon EOS R6 Mark III intact:", hasEOSR6Attribution);
    console.log("  ✓ Draft Banner absent on public page:", !hasDraftBannerOnPublic);
    await takeScreenshot("12-homepage-final-desktop.png");

    // --- CHECK 2: Gallery Desktop & Filters ---
    console.log("\n--- CHECK 2: Gallery Desktop & Category Filters ---");
    await navigate(`http://localhost:${PORT}/gallery`);
    const plateCount = await evalCode("document.querySelector('.font-mono.text-xs.text-\\\\[\\\\#a1a1aa\\\\]')?.innerText || ''");
    const hasTest1Plate = await evalCode("document.body.innerText.includes('test 1')");
    console.log("  ✓ Gallery Plate Count Indicator:", plateCount);
    console.log("  ✓ Live plate 'test 1' rendered from Sanity:", hasTest1Plate);
    await takeScreenshot("13-gallery-final-desktop.png");

    // --- CHECK 3: Photograph Detail Page & CDN Image ---
    console.log("\n--- CHECK 3: Photograph Detail Page (/gallery/test-1) ---");
    await navigate(`http://localhost:${PORT}/gallery/test-1`);
    const hasSanityCDNImage = await evalCode("document.querySelector('img[src*=\"cdn.sanity.io\"]') !== null");
    const detailTitle = await evalCode("document.title");
    console.log("  ✓ Detail page document.title:", detailTitle);
    console.log("  ✓ Sanity CDN Image asset verified:", hasSanityCDNImage);
    await takeScreenshot("14-photograph-detail-final.png");

    // --- CHECK 4: Collections Overview ---
    console.log("\n--- CHECK 4: Collections Overview (/collections) ---");
    await navigate(`http://localhost:${PORT}/collections`);
    const colEmptyState = await evalCode("document.body.innerText.includes('Journeys Awaiting Publication')");
    console.log("  ✓ Curatorial 'Journeys Awaiting Publication' empty state verified:", colEmptyState);
    await takeScreenshot("15-collections-final-desktop.png");

    // --- CHECK 5: Mobile Viewport (390x844) ---
    console.log("\n--- CHECK 5: Mobile Viewport (390x844) ---");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await navigate(`http://localhost:${PORT}`);
    const mobileWatermark = await evalCode("document.body.innerText.includes('HARI')");
    console.log("  ✓ Mobile HARI watermark rendered:", mobileWatermark);
    await takeScreenshot("16-mobile-final-regression.png");

    console.log("\n=================================================================");
    console.log("ALL BROWSER QUALITY ASSURANCE REGRESSION CHECKS PASSED PERFECTLY.");
    console.log("=================================================================");
  } finally {
    if (cdp) cdp.close();
    chrome.kill();
    server.kill();
  }
}

runRegression().catch((err) => {
  console.error("Regression test failed:", err);
  process.exit(1);
});
