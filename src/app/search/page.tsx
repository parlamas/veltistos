// src/app/search/page.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import searchData from "../../../public/search-index.json";
import { homeSlots } from "@/content/home";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export type SearchItem = {
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  number?: string;    // identifier (e.g., "αριθμός 3 • number 3")
  _folded?: string;
  _fulltext?: string; // fetched full page text for searching
};

function fold(s: string) {
  return s
    .normalize("NFD")                 // split accents
    .replace(/[\u0300-\u036f]/g, "")  // drop accents/breathings
    .toLowerCase()
    .replace(/ς/g, "σ");              // final sigma → sigma
}


function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, "");
}

function extractTextFromHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildFoldMap(text: string) {
  let folded = "";
  const mapFoldToOrig: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const base = text[i]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/ς/g, "σ");           // normalize final sigma here too
    if (base.length === 0) continue;
    folded += base;
    for (let k = 0; k < base.length; k++) mapFoldToOrig.push(i);
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
  const titleF  = fold(it.title ?? "");
  const bodyF   = fold(((it.excerpt ?? "") + " " + (it.tags ?? []).join(" ")).trim());
  const numberF = fold(it.number ?? "");
  const fullF   = fold(it._fulltext ?? "");

  let score = 0;
  if (titleF.includes(s))   score += 100;
  if (titleF.startsWith(s)) score += 60;
  if (bodyF.includes(s))    score += 40;
  if (numberF.includes(s))  score += 140; // prioritize identifier matches
  if (fullF.includes(s))    score += 80;  // full body text, including “read more”

  if (it.date) {
    const t = new Date(it.date).getTime();
    if (!Number.isNaN(t)) {
      const days = (Date.now() - t) / 86_400_000;
      score += Math.max(0, 60 - Math.min(365, days));
    }
  }
  return score;
}

function matches(q: string, it: SearchItem) {
  const s = fold(q);
  const hay = it._folded
    ? it._folded
    : fold(
        (it.title ?? "") + " " +
        (it.excerpt ?? "") + " " +
        (it.tags ?? []).join(" ") + " " +
        (it.number ?? "") + " " +
        (it._fulltext ?? "")
      );
  return hay.includes(s);
}

const norm = (u: string) => (u.endsWith("/") && u !== "/" ? u.slice(0, -1) : u);

async function absoluteUrl(pathname: string) {
  const h = await headers();
  const host =
    h.get("x-forwarded-host") ??
    h.get("host") ??
    process.env.NEXT_PUBLIC_SITE_DOMAIN ??
    "veltistos.com";
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}${pathname}`;
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams?.q ?? "").toString().trim();

  // 1) Base index from JSON
  const rawIndex: SearchItem[] = Array.isArray(searchData) ? (searchData as SearchItem[]) : [];

  // 2) Slot-derived items (to ensure numbers exist)
  const slotItems: SearchItem[] = [
    ...homeSlots.left.map(s => ({
      title: stripHtml(s.title),
      url: s.href,
      excerpt: undefined,
      tags: s.kicker ? [s.kicker] : [],
      number: s.number,
    })),
    ...homeSlots.middle.map(s => ({
      title: stripHtml(s.title),
      url: s.href,
      excerpt: s.excerpt,
      tags: [],
      number: s.number,
    })),
    ...homeSlots.right.map(s => ({
      title: s.title,
      url: s.href,
      excerpt: undefined,
      tags: s.kicker ? [s.kicker] : [],
      number: s.number,
    })),
  ];

  // 3) Merge by URL; keep JSON item, fill number from slots, add slot-only items
  const byUrl = new Map<string, SearchItem>();
  for (const it of rawIndex) byUrl.set(norm(it.url), it);
  for (const s of slotItems) {
    const key = norm(s.url);
    const existing = byUrl.get(key);
    if (existing) {
      if (!existing.number && s.number) byUrl.set(key, { ...existing, number: s.number });
    } else {
      byUrl.set(key, s);
    }
  }
  const index = Array.from(byUrl.values());

  // 4) Fetch full HTML for each item (to include "Read more" text in search)
  //    Limit to reasonable concurrency by awaiting sequentially (small site).
  for (let i = 0; i < index.length; i++) {
    const it = index[i];
    try {
      const abs = await absoluteUrl(it.url);
      const res = await fetch(abs, { cache: "no-store", next: { revalidate: 0 } });
      if (res.ok) {
        const html = await res.text();
        const full = extractTextFromHtml(html);
        index[i] = { ...it, _fulltext: full };
      }
    } catch {
      // ignore fetch failures; keep item as-is
    }
  }

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
            Αποτελέσματα για <span className="font-medium text-zinc-900">“{q}”</span> — {results.length} ευρήματα
          </span>
        ) : (
          <span>Πληκτρολογήστε έναν όρο αναζήτησης.</span>
        )}
      </div>

      <ul className="space-y-4">
        {results.map((r) => (
          <li key={r.url} className="border-b border-zinc-200 pb-4">
            <Link href={r.url} className="text-zinc-900 font-medium hover:underline">
              {highlightAI(r.title, q)}
            </Link>

            {r.number && (
              <div className="text-xs text-zinc-600 mt-0.5">
                {highlightAI(r.number, q)}
              </div>
            )}

            {r.excerpt && (
              <p className="text-sm text-zinc-600 mt-1">{highlightAI(r.excerpt, q)}</p>
            )}
          </li>
        ))}
      </ul>

      {q && results.length === 0 && (
        <div className="mt-8 text-sm text-zinc-600">
          Δεν βρέθηκαν αποτελέσματα. Μπορείτε επίσης να δοκιμάσετε στο Google:{" "}
          <a
            className="underline"
            href={`https://www.google.com/search?q=site:${process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "veltistos.com"}+${encodeURIComponent(q)}`}
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
