// src/app/search/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
// Statically import the built index from /public
import searchData from "../../../public/search-index.json";
// Pull numbers from homepage slots to enrich items that may not have number in the JSON
import { homeSlots } from "@/content/home";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export type SearchItem = {
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  number?: string;   // ← include number in the search item
  _folded?: string;
};

function fold(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function buildFoldMap(text: string) {
  let folded = "";
  const mapFoldToOrig: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const f = text[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (f.length === 0) continue;
    folded += f;
    for (let k = 0; k < f.length; k++) mapFoldToOrig.push(i);
  }
  return { folded, mapFoldToOrig };
}

function highlightAI(text: string, query: string) {
  const q = fold(query);
  if (!q) return text;
  const { folded, mapFoldToOrig } = buildFoldMap(text);
  const ranges: Array<[number, number]> = [];
  let pos = 0;
  while (true) {
    const i = folded.indexOf(q, pos);
    if (i === -1) break;
    const start = mapFoldToOrig[i];
    const end = mapFoldToOrig[Math.min(i + q.length - 1, mapFoldToOrig.length - 1)] + 1;
    ranges.push([start, end]);
    pos = i + q.length;
  }
  if (ranges.length === 0) return text;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  let [cs, ce] = ranges[0];
  for (let r = 1; r < ranges.length; r++) {
    const [s, e] = ranges[r];
    if (s <= ce) ce = Math.max(ce, e);
    else {
      merged.push([cs, ce]);
      [cs, ce] = [s, e];
    }
  }
  merged.push([cs, ce]);

  const out: ReactNode[] = [];
  let last = 0;
  merged.forEach(([s, e], idx) => {
    if (last < s) out.push(<span key={`r-${idx}-a`}>{text.slice(last, s)}</span>);
    out.push(
      <mark key={`r-${idx}-b`} className="bg-yellow-100 rounded px-0.5">
        {text.slice(s, e)}
      </mark>
    );
    last = e;
  });
  if (last < text.length) out.push(<span key="r-end">{text.slice(last)}</span>);
  return out;
}

function scoreItem(q: string, it: SearchItem) {
  const s = fold(q);
  const titleF = fold(it.title ?? "");
  const bodyF = fold(((it.excerpt ?? "") + " " + (it.tags ?? []).join(" ")).trim());
  const numberF = fold(it.number ?? "");

  let score = 0;
  if (titleF.includes(s)) score += 100;
  if (titleF.startsWith(s)) score += 60;
  if (bodyF.includes(s)) score += 40;
  if (numberF.includes(s)) score += 80; // prioritize matches in the identifier

  if (it.date) {
    const t = new Date(it.date).getTime();
    if (!Number.isNaN(t)) {
      const days = (Date.now() - t) / 86_400_000;
      const recencyBoost = Math.max(0, 60 - Math.min(365, days));
      score += recencyBoost;
    }
  }
  return score;
}

function matches(q: string, it: SearchItem) {
  const s = fold(q);
  const hay = it._folded
    ? it._folded
    : fold(
        (it.title ?? "") +
          " " +
          (it.excerpt ?? "") +
          " " +
          (it.tags ?? []).join(" ") +
          " " +
          (it.number ?? "")
      );
  return hay.includes(s);
}

// helper to normalize keys like "/path" and "/path/"
const stripTrail = (u: string) => (u.endsWith("/") && u !== "/" ? u.slice(0, -1) : u);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams?.q ?? "").toString().trim();

  // Normalize imported data to the expected type
  const rawIndex: SearchItem[] = Array.isArray(searchData)
    ? (searchData as SearchItem[])
    : [];

  // Build a map of url -> number from the homepage slots (if present)
  const numberByUrl = new Map<string, string>();
  for (const s of [...homeSlots.left, ...homeSlots.middle, ...homeSlots.right]) {
    if (s.number) {
      numberByUrl.set(stripTrail(s.href), s.number);
      numberByUrl.set(stripTrail(`${s.href}/`), s.number);
    }
  }

  // Enrich index with number (if missing) from home slots
  const index: SearchItem[] = rawIndex.map((it) => {
    const key = stripTrail(it.url);
    const num = it.number ?? numberByUrl.get(key);
    return num ? { ...it, number: num } : it;
  });

  const filtered = q ? index.filter((it) => matches(q, it)) : [];
  const results = filtered
    .map((it) => ({ it, score: scoreItem(q, it) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);

  return (
    <main className="max-w-[1120px] mx-auto px-6 py-6">
      <h1 className="text-xl font-semibold mb-2">Αναζήτηση</h1>
      <div className="text-sm text-zinc-600 mb-6">
        {q ? (
          <span>
            Αποτελέσματα για{" "}
            <span className="font-medium text-zinc-900">“{q}”</span> —{" "}
            {results.length} ευρήματα
          </span>
        ) : (
          <span>Πληκτρολογήστε έναν όρο αναζήτησης.</span>
        )}
      </div>

      <ul className="space-y-4">
        {results.map((r) => (
          <li key={r.url} className="border-b border-zinc-200 pb-4">
            <Link
              href={r.url}
              className="text-zinc-900 font-medium hover:underline"
            >
              {highlightAI(r.title, q)}
            </Link>

            {/* Show and highlight the identifier */}
            {r.number && (
              <div className="text-xs text-zinc-600 mt-0.5">
                {highlightAI(r.number, q)}
              </div>
            )}

            {r.excerpt && (
              <p className="text-sm text-zinc-600 mt-1">
                {highlightAI(r.excerpt, q)}
              </p>
            )}
            {r.date && (
              <p className="text-xs text-zinc-500 mt-1">
                {new Date(r.date).toLocaleDateString("el-GR")}
                {r.tags?.length ? ` · ${r.tags.join(", ")}` : null}
              </p>
            )}
          </li>
        ))}
      </ul>

      {q && results.length === 0 && (
        <div className="mt-8 text-sm text-zinc-600">
          Δεν βρέθηκαν αποτελέσματα. Μπορείτε επίσης να δοκιμάσετε στο Google:{" "}
          <a
            className="underline"
            href={`https://www.google.com/search?q=site:${
              process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "veltistos.com"
            }+${encodeURIComponent(q)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            site:veltistos.com {q}
          </a>
        </div>
      )}
    </main>
  );
}
