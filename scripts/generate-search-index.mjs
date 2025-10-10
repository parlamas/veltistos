// scripts/generate-search-index.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { PAGES } from "./search-pages.mjs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const DOCS_DIR = path.join(PUBLIC_DIR, "docs");
const OUT_FILE = path.join(PUBLIC_DIR, "site-search.json");

const APP_CANDIDATES = [path.join(ROOT, "src", "app"), path.join(ROOT, "app")];
const PAGE_FILENAMES = new Set([
  "page.tsx", "page.jsx", "page.js", "page.ts",
  "page.mdx", "page.md", "page.html",
]);

async function existsDir(dir) { try { return (await fs.stat(dir)).isDirectory(); } catch { return false; } }
async function walk(dir) {
  const out = [];
  const ents = await fs.readdir(dir, { withFileTypes: true });
  for (const e of ents) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(abs)));
    else out.push(abs);
  }
  return out;
}
const isDyn = (seg) => /^\[.*\]$/.test(seg);

/* --------- normalization (accent-insensitive Greek, case-folded) --------- */
function foldGreek(s) {
  if (!s) return "";
  // NFD: break letters + combining marks, then strip all marks
  let out = s.normalize("NFD").replace(/\p{M}+/gu, "");
  // unify sigma: final ς -> σ
  out = out.replace(/\u03C2/g, "\u03C3"); // ς -> σ
  // lowercase
  out = out.toLowerCase();
  // collapse whitespace
  out = out.replace(/\s+/g, " ").trim();
  return out;
}

/* ---------- plain-text extractors ---------- */
function mdToText(src) {
  return src
    .replace(/^---[\s\S]*?---/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s*/gm, " ")
    .replace(/[*_~>#\-+]+/g, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToText(html) {
  try {
    const dom = new JSDOM(html);
    // textContent includes LI text and hidden text, which we DO want in the index.
    const txt = dom.window.document.body?.textContent || "";
    return txt.replace(/\s+/g, " ").trim();
  } catch {
    return html.replace(/\s+/g, " ").trim();
  }
}

/** Extracts strings from JS/TS/JSX/TSX using Babel AST (captures JSX text & literals). */
function codeToText(src) {
  let ast;
  try {
    ast = parse(src, {
      sourceType: "module",
      plugins: ["jsx", "typescript", "importAssertions"],
      errorRecovery: true,
    });
  } catch {
    // fallback: rough strip
    return src
      .replace(/\/\*[\s\S]*?\*\//g, " ")
      .replace(/\/\/[^\n\r]*/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\{[\s\S]*?\}/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const chunks = [];

  traverse(ast, {
    JSXText(path) {
      const v = path.node.value;
      if (v && /\S/.test(v)) chunks.push(v);
    },
    StringLiteral(path) {
      const v = path.node.value;
      if (v && /\S/.test(v)) chunks.push(v);
    },
    TemplateLiteral(path) {
      for (const q of path.node.quasis) {
        const v = q.value.cooked ?? q.value.raw;
        if (v && /\S/.test(v)) chunks.push(v);
      }
    },
    JSXAttribute(path) {
      const name = path.node.name?.name;
      if ((name === "alt" || name === "title") && path.node.value?.type === "StringLiteral") {
        const v = path.node.value.value;
        if (v && /\S/.test(v)) chunks.push(v);
      }
    },
  });

  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

/* ------------------ build PAGES (app routes) ------------------ */
async function buildPages() {
  const explicit = (PAGES || []).map((p, i) => {
    const title = p.title || p.url;
    const excerpt = p.excerpt || "";
    const tags = p.tags || [];
    const body = (p.body || "").toString();

    return {
      type: "page",
      id: `page-explicit-${i + 1}`,
      url: p.url,
      title,
      excerpt,
      tags,
      body,
      // folded fields
      titleFold: foldGreek(title),
      excerptFold: foldGreek(excerpt),
      bodyFold: foldGreek(body),
      tagsFold: tags.map(foldGreek),
    };
  });

  let base = null;
  for (const c of APP_CANDIDATES) { if (await existsDir(c)) { base = c; break; } }
  if (!base) return explicit;

  const all = await walk(base);
  const pageFiles = all.filter(f => PAGE_FILENAMES.has(path.basename(f)));

  const discovered = [];
  for (const abs of pageFiles) {
    const rel = path.relative(base, abs).replace(/\\/g, "/");
    const parts = rel.split("/");
    if (parts.some(isDyn)) continue;

    const dir = path.dirname(rel);
    let url = "/" + (dir === "." ? "" : dir);
    if (url === "/index") url = "/";

    let raw = "";
    try { raw = await fs.readFile(abs, "utf8"); } catch { /* ignore */ }

    const ext = path.extname(abs).toLowerCase();
    let body = "";
    if (ext === ".md" || ext === ".mdx") body = mdToText(raw);
    else if (ext === ".html") body = htmlToText(raw);
    else body = codeToText(raw);

    // title: try <h1>, else folder name
    let title = url === "/" ? "Αρχική" : (dir.split("/").pop() || url);
    const h1 = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1 && h1[1]) {
      const dom = new JSDOM(h1[1]);
      const t = dom.window.document.body.textContent?.trim();
      if (t) title = t;
    }

    if (body.length > 10000) body = body.slice(0, 10000);

    discovered.push({
      type: "page",
      id: `page-auto-${discovered.length + 1}`,
      url,
      title,
      excerpt: "",
      tags: [],
      body,
      titleFold: foldGreek(title),
      excerptFold: "",
      bodyFold: foldGreek(body),
      tagsFold: [],
    });
  }

  const byUrl = new Map();
  for (const p of discovered) byUrl.set(p.url, p);
  for (const p of explicit) byUrl.set(p.url, p);

  return Array.from(byUrl.values()).sort((a, b) => a.url.localeCompare(b.url));
}

/* --------------------- build DOCS (public/docs) --------------------- */
async function buildDocs() {
  const items = [];
  if (!(await existsDir(DOCS_DIR))) return items;

  async function walkDocs(dir, relBase = "") {
    const ents = await fs.readdir(dir, { withFileTypes: true });
    for (const e of ents) {
      const abs = path.join(dir, e.name);
      const rel = path.join(relBase, e.name);
      if (e.isDirectory()) {
        await walkDocs(abs, rel);
      } else if (e.isFile() && e.name.toLowerCase().endsWith(".html")) {
        let html = "";
        try { html = await fs.readFile(abs, "utf8"); } catch { continue; }

        const dom = new JSDOM(html);
        const d = dom.window.document;

        const title =
          d.querySelector("h1")?.textContent?.trim() ||
          d.querySelector("title")?.textContent?.trim() ||
          rel;

        // textContent includes UL/OL/LI and hidden text; we keep everything
        let body = (d.body?.textContent || "").replace(/\s+/g, " ").trim();
        if (body.length > 12000) body = body.slice(0, 12000);

        items.push({
          type: "doc",
          id: `doc-${rel.replace(/\\/g, "/")}`,
          url: `/docs/${rel.replace(/\\/g, "/")}`,
          title,
          body,
          titleFold: foldGreek(title),
          bodyFold: foldGreek(body),
        });
      }
    }
  }

  await walkDocs(DOCS_DIR, "");
  return items;
}

/* ------------------------------ main ------------------------------ */
async function main() {
  const pages = await buildPages();
  const docs = await buildDocs();
  const all = [...pages, ...docs];

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(all, null, 2), "utf8");

  console.log(`✅ Indexed pages: ${pages.length}, docs: ${docs.length}`);
  console.log(`✅ Wrote ${all.length} items to ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch(err => { console.error(err); process.exit(1); });


