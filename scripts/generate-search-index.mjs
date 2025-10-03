// scripts/generate-search-index.mjs
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "src", "app");
const OUT_PATH = path.join(ROOT, "public", "search-index.json");

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    const st = await stat(full);
    if (st.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

function isPageTsx(file) {
  if (!file.endsWith(path.sep + "page.tsx")) return false;
  // skip API and the search page itself
  if (file.includes(path.sep + "api" + path.sep)) return false;
  if (file.endsWith(path.normalize("src/app/search/page.tsx"))) return false;
  // skip dynamic segments like [slug]
  if (file.split(path.sep).some((seg) => /^\[.+\]$/.test(seg))) return false;
  return true;
}

function routeFrom(file) {
  // src/app/page.tsx -> /
  // src/app/stories/sidewalk/page.tsx -> /stories/sidewalk
  const rel = path.relative(APP_DIR, path.dirname(file));
  if (!rel || rel === ".") return "/";
  return "/" + rel.replace(/\\/g, "/");
}

function stripJsxAndTags(s) {
  // remove TS/JS comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  // remove simple JSX expressions { ... }
  s = s.replace(/\{[^{}]*\}/g, " ");
  // collapse tags (keep text)
  s = s.replace(/<[^>]+>/g, " ");
  // normalize whitespace
  return s.replace(/\s+/g, " ").trim();
}

// Prefer `const title = "..."` or <h1>...</h1>; fallback to route fragment
function extractTitle(src, route) {
  let m = src.match(/const\s+title\s*=\s*["'`](.*?)["'`]/s);
  if (m && m[1]) return m[1].trim();
  m = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (m && m[1]) return stripJsxAndTags(m[1]);
  if (route === "/") return "Αρχική";
  return route.split("/").filter(Boolean).slice(-1)[0].replace(/[-_]/g, " ");
}

// Pull first ~240 chars from inside <article> if present; else whole file
function extractExcerpt(src) {
  const art = src.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const body = art ? art[1] : src;
  return stripJsxAndTags(body).slice(0, 240);
}

function fold(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

(async () => {
  const all = await walk(APP_DIR);
  const pages = all.filter(isPageTsx);

  const items = [];
  for (const file of pages) {
    const route = routeFrom(file);
    const raw = await readFile(file, "utf8");
    const title = extractTitle(raw, route);
    const excerpt = extractExcerpt(raw);
    items.push({
      title,
      url: route,
      excerpt,
      _folded: fold(`${title} ${excerpt}`),
    });
  }

  await writeFile(OUT_PATH, JSON.stringify(items, null, 2), "utf8");
  console.log(`✅ Wrote ${items.length} items to ${path.relative(ROOT, OUT_PATH)}`);
})();
