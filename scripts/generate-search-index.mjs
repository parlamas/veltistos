// scripts/generate-search-index.mjs
// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * A document living in /public/docs
 * @typedef {{ type:'doc', id:string, url:string, title:string, body:string }} DocItem
 */

/** @type {string} */
const root = process.cwd();
/** @type {string} */
const docsDir = path.join(root, 'public', 'docs');
/** @type {string} */
const outFile = path.join(root, 'public', 'site-search.json');

async function main () {
  /** @type {DocItem[]} */
  const items = [];

  try {
    const dirents = await fs.readdir(docsDir, { withFileTypes: true });
    for (const ent of dirents) {
      if (!ent.isFile() || !ent.name.toLowerCase().endsWith('.html')) continue;

      const filePath = path.join(docsDir, ent.name);
      const html = await fs.readFile(filePath, 'utf8');

      // Title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = clean(decode(titleMatch ? titleMatch[1] : ent.name));

      // Body text (strip tags/scripts/styles, collapse whitespace)
      const text = clean(
        decode(
          html
            .replace(/<script[\s\S]*?<\/script>/gi, ' ')
            .replace(/<style[\s\S]*?<\/style>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
        )
      );

      const id = ent.name;
      const url = `/docs/${encodeURIComponent(ent.name)}`;

      items.push({
        type: 'doc',
        id,
        url,
        title,
        body: text.slice(0, 5000) // keep it reasonable
      });
    }
  } catch {
    // If public/docs doesn't exist yet, that's fine.
  }

  await fs.writeFile(outFile, JSON.stringify(items, null, 2), 'utf8');
  console.log(`✅ Wrote ${items.length} items to ${path.relative(root, outFile)}`);
}

function decode (s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function clean (s) {
  return s.replace(/\s+/g, ' ').trim();
}

main().catch(err => { console.error(err); process.exit(1); });

