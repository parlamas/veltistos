// scripts/generate-search-index.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { glob } from "glob";
import { PAGES } from "./search-pages.mjs";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const DOCS_DIR = path.join(PUBLIC_DIR, "docs");
const OUT_FILE = path.join(PUBLIC_DIR, "site-search.json");

/**
 * Build page items (your app routes).
 * Shape: { type: "page", id, url, title, excerpt, tags? }
 */
function buildPages() {
  return PAGES.map((p, i) => ({
    type: "page",
    id: `page-${i + 1}`,
    url: p.url,
    title: p.title || p.url,
    excerpt: p.excerpt || "",
    tags: p.tags || [],
  }));
}

/**
 * Build doc items from public/docs/*.html by extracting
 * <title> or first <h1> and a short text body.
 * Shape: { type: "doc", id, url, title, body }
 */
async function buildDocs() {
  // Collect all .html under public/docs
  const files = await glob("**/*.html", { cwd: DOCS_DIR, nodir: true });
  const items = [];

  for (const rel of files) {
    const abs = path.join(DOCS_DIR, rel);
    const html = await fs.readFile(abs, "utf8").catch(() => "");
    if (!html) continue;

    const dom = new JSDOM(html);
    const d = dom.window.document;

    let title =
      d.querySelector("h1")?.textContent?.trim() ||
      d.querySelector("title")?.textContent?.trim() ||
      rel;

    // Extract some visible text (very light)
    let body = d.body?.textContent?.replace(/\s+/g, " ").trim() || "";

    // Keep it reasonably sized
    if (body.length > 4000) body = body.slice(0, 4000);

    items.push({
      type: "doc",
      id: `doc-${rel}`,
      url: `/docs/${rel.replace(/\\/g, "/")}`,
      title,
      body,
    });
  }

  return items;
}

async function main() {
  const pages = buildPages();
  const docs = await buildDocs();

  const all = [...pages, ...docs];

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(all, null, 2), "utf8");

  console.log(`✅ Wrote ${all.length} items to ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
