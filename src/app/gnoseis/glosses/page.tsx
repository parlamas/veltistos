// app/gnoseis/glosses/page.tsx
import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";

export const dynamic = "force-dynamic"; // read folder on every request

export default async function GlossesIndex() {
  const docsDir = path.join(process.cwd(), "public", "docs");

  let entries: string[] = [];
  try {
    const files = await fs.readdir(docsDir, { withFileTypes: true });
    entries = files
      .filter(f => f.isFile() && f.name.toLowerCase().endsWith(".html"))
      // optional: only S-P-*.html
      // .filter(f => /^S-P-\d+\.html$/i.test(f.name))
      .map(f => f.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    // no docs directory yet; that's fine
  }

  return (
    <main className="max-w-[900px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">Γνώσεις · Γλώσσες</h1>
      <p className="text-sm text-zinc-600 mb-6">
        Αρχεία που βρίσκονται στον φάκελο <code className="px-1 rounded bg-zinc-100">public/docs</code>.
      </p>

      {entries.length === 0 ? (
        <p className="text-zinc-700">Δεν υπάρχουν ακόμη αρχεία.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map(name => (
            <li key={name} className="flex items-center justify-between rounded-md border border-zinc-200 p-3 hover:bg-zinc-50">
              <div className="truncate">
                <span className="font-medium">{name}</span>
              </div>
              <Link
                href={`/docs/${encodeURIComponent(name)}`}
                className="text-blue-600 hover:underline shrink-0 ml-3"
                target="_blank" // open the raw HTML in a new tab
                rel="noopener noreferrer"
              >
                Άνοιγμα
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
