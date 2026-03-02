import sharp from "sharp";
import { chromium } from "playwright";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Favicon 32x32
await sharp(join(publicDir, "logo.svg"))
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, "favicon.png"));
console.log("Created favicon.png");

// OG image 1200x630 - logo + "lmk" text, same style as homepage (SF Pro, semibold, italic, tracking-tight, neutral-800)
const logoDataUrl = `data:image/svg+xml;base64,${Buffer.from(
  readFileSync(join(publicDir, "logo.svg"), "utf-8")
).toString("base64")}`;

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", sans-serif;
    }
    .container {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      width: 160px;
      height: 160px;
    }
    .text {
      font-size: 96px;
      font-weight: 600;
      font-style: italic;
      letter-spacing: -0.025em;
      color: #262626;
    }
  </style>
</head>
<body>
  <div class="container">
    <img class="logo" src="${logoDataUrl}" alt="" />
    <span class="text">lmk</span>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: join(publicDir, "og-image.png") });
await browser.close();
console.log("Created og-image.png");
