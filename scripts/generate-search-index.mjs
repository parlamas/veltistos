// scripts/generate-search-index.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { glob } from "glob";

// --- paths ---------------------------------------------------------------
const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const APP_DIR = path.join(SRC_DIR, "app");
const PUBLIC_DIR = path.join(ROOT, "public");
const DOCS_DIR = path.join(PUBLIC_DIR, "docs");
const OUT_FILE = path.join(PUBLIC_DIR, "site-search.json");

// What to treat as "pages" in the app router:
const APP_PATTERNS = [
  path.join(APP_DIR, "**/page.tsx"),
  path.join(APP_DIR, "**/page.jsx"),
  path.join(APP_DIR, "**/page.ts"),
  path.join(APP_DIR, "**/page.js"),
  path.join(APP_DIR, "**/page.mdx"),
  path.join(APP_DIR, "**/page.md"),
  path.join(APP_DIR, "**/page.html"),
];

// --- helpers -------------------------------------------------------------

/** Map absolute app file => public URL (e.g. src/app/stories/x/page.tsx -> /stories/x) */
function routeFromAbsoluteAppFile(abs) {
  const rel = path.relative(APP_DIR, abs);                 // stories/x/page.tsx
  const noFile = rel.replace(/[/\\]page\.[^.]+$/i, "");    // stories/x
  return "/" + noFile.replace(/\\/g, "/");                 // /stories/x
}

/** Robust HTML->text using JSDOM (grabs hidden text, lists, etc.) */
function htmlToText(html) {
  const dom = new JSDOM(html);
  const d = dom.window.document;
  const title =
    d.querySelector("title")?.textContent?.trim() ||
    d.querySelector("h1")?.textContent?.trim() ||
    "";
  let body = d.body?.textContent || "";
  body = body.replace(/\s+/g, " ").trim();
  return { title, body };
}

/** Greek-insensitive folding (remove diacritics, normalize sigmas, lowercase) */
function foldGreek(str = "") {
  // NFD split + remove combining marks
  let s = str.normalize("NFD").replace(/\p{M}+/gu, "");
  // Normalize final sigma and regular sigma
  s = s.replace(/ς/g, "σ");
  // Lowercase
  s = s.toLowerCase();
  // Collapse spaces
  return s.replace(/\s+/g, " ").trim();
}

/** Heuristic extractor for TSX/JSX/TS/JS files – keep visible text between tags */
function extractTextFromTsx(source) {
  let s = source
    // strip imports/exports and comments
    .replace(/^\s*import[\s\S]*?;$/gm, " ")
    .replace(/^\s*export[\s\S]*?;$/gm, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/[^\n\r]*/g, " ");

  // remove JSX/TSX expressions {...}
  s = s.replace(/\{[\s\S]*?\}/g, " ");

  // replace tags with spaces, keep inner text
  s = s.replace(/<[^>]+>/g, " ");

  // light entity decode
  s = s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');

  return s.replace(/\s+/g, " ").trim();
}

/** Try to guess a title from source when we don't have <title>/<h1> */
function guessTitleFromSource(src, fallbackUrl = "") {
  // look for a heading-ish string
  const m = src.match(/<h1[^>]*>([^<]{3,200})<\/h1>/i);
  if (m) return m[1].replace(/\s+/g, " ").trim();
  // fallback to path
  return fallbackUrl || "Untitled";
}

// --- indexing ------------------------------------------------------------

/** Build items for app routes (TSX/JSX/MDX/MD/HTML/JS/TS) */
async function buildPages() {
  const files = (await Promise.all(APP_PATTERNS.map((p) => glob(p)))).flat();

  console.log(`App page files found: ${files.length}`);
  if (files.length) {
    console.log("First few app pages:");
    files
      .slice(0, 8)
      .forEach((f) => console.log("  -", path.relative(ROOT, f)));
  }

  const items = [];
  for (const abs of files) {
    let src = "";
    try {
      src = await fs.readFile(abs, "utf8");
    } catch {
      continue;
    }

    const url = routeFromAbsoluteAppFile(abs);
    let title = "";
    let body = "";

    if (/\.(html|mdx|md)$/i.test(abs)) {
      const t = htmlToText(src);
      title = t.title || guessTitleFromSource(src, url);
      body = t.body;
    } else {
      // tsx/jsx/js/ts => strip code/JSX and keep visible text
      title = guessTitleFromSource(src, url);
      body = extractTextFromTsx(src);
    }

    const excerpt = body.slice(0, 500);

    items.push({
      type: "page",
      id: `page:${path.relative(ROOT, abs).replace(/\\/g, "/")}`,
      url,
      title,
      excerpt,
      tags: [],
      // folded fields for accent-insensitive search
      titleFold: foldGreek(title),
      bodyFold: foldGreek(body),
      excerptFold: foldGreek(excerpt),
      tagsFold: [],
    });
  }
  return items;
}

/** Build items for public/docs/*.html */
async function buildDocs() {
  const exists = await fs
    .access(DOCS_DIR)
    .then(() => true)
    .catch(() => false);
  if (!exists) return [];

  const files = await glob("**/*.html", { cwd: DOCS_DIR, nodir: true });
  const items = [];

  for (const rel of files) {
    const abs = path.join(DOCS_DIR, rel);
    const html = await fs.readFile(abs, "utf8").catch(() => "");
    if (!html) continue;

    const { title: t, body: b } = htmlToText(html);
    const url = `/docs/${rel.replace(/\\/g, "/")}`;
    const title = t || rel;
    const body = b.slice(0, 8000); // keep it sane
    const excerpt = body.slice(0, 500);

    items.push({
      type: "doc",
      id: `doc:${rel.replace(/\\/g, "/")}`,
      url,
      title,
      body,
      // folded fields for accent-insensitive search
      titleFold: foldGreek(title),
      bodyFold: foldGreek(body),
      excerptFold: foldGreek(excerpt),
      tagsFold: [],
    });
  }

  return items;
}

// --- main ----------------------------------------------------------------

async function main() {
  const pages = await buildPages();
  const docs = await buildDocs();
  const all = [...pages, ...docs];

  async function main() {
  const pages = await buildPages();
  const docs = await buildDocs();
  const all = [...pages, ...docs];

  console.log(`Pages indexed: ${pages.length}`);
  console.log(`Docs indexed:  ${docs.length}`);

  // --- expand dynamic routes -------------------------------------------------
  // Hardcode your dynamic video slugs here (pulling from content/videos.ts
  // would require TS support in this .mjs script, so we list slugs manually).
  const dynamicVideos = [
    { slug: "malakia", title: "περί μαλακίας • on callousness" },
  ];

  // If the script picked up /videos/[slug], use it as a template; otherwise use a blank base.
  const videosTemplate = all.find(i => i.url === "/videos/[slug]") ?? {
    type: "page",
    excerpt: "",
    tags: [],
    title: "",
    titleFold: "",
    bodyFold: "",
    excerptFold: "",
    tagsFold: [],
  };

  // Build concrete entries for each video slug
  const expandedVideoItems = dynamicVideos.map(v => {
    const url = `/videos/${v.slug}`;
    return {
      ...videosTemplate,
      id: `page:videos/${v.slug}`,
      url,
      title: v.title || url,
      // keep folds consistent for search
      titleFold: foldGreek(v.title || url),
      // Optionally enrich:
      // bodyFold: foldGreek((videosTemplate.body ?? "") + " aa6 αα6"),
      // excerptFold: foldGreek((videosTemplate.excerpt ?? "")),
    };
  });

  // Remove the placeholder entry `/videos/[slug]` if it exists
  const withoutPlaceholders = all.filter(i => i.url !== "/videos/[slug]");

  // Final list the search should use
  const finalItems = [...withoutPlaceholders, ...expandedVideoItems];

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(finalItems, null, 2), "utf8");
  console.log(`✅ Wrote ${finalItems.length} items to ${path.relative(ROOT, OUT_FILE)}`);
}


  console.log(`Pages indexed: ${pages.length}`);
  console.log(`Docs indexed:  ${docs.length}`);

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(finalItems, null, 2), "utf8");
  console.log(`✅ Wrote ${all.length} items to ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
