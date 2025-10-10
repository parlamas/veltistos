// npm i -D jsdom glob
// scripts/build-docs-index.mjs
import { JSDOM } from "jsdom";
import { glob } from "glob";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const root = process.cwd();
const docsDir = path.join(root, "public", "docs");
const files = await glob("public/docs/**/*.html", { cwd: root });

const records = [];
for (const rel of files) {
  const abs = path.join(root, rel);
  const html = await readFile(abs, "utf8");
  const dom = new JSDOM(html);
  const text = dom.window.document.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
  records.push({
    id: rel.replace(/^public\//, ""),         // e.g. 'docs/S-P-001.html'
    url: "/" + rel.replace(/^public\//, ""),  // e.g. '/docs/S-P-001.html'
    title: dom.window.document.title || path.basename(rel),
    body: text
  });
}

await writeFile(path.join(root, "public", "docs-index.json"), JSON.stringify(records), "utf8");
console.log(`Indexed ${records.length} docs`);
