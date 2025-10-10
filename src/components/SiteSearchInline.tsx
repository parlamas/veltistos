// src/components/SiteSearchInline.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SearchItem = {
  type: "doc" | "page";
  id: string;
  url: string;
  title: string;
  body?: string;
  excerpt?: string;
  tags?: string[];
  // folded (accent-insensitive) fields from the JSON index; may be absent
  titleFold?: string;
  excerptFold?: string;
  bodyFold?: string;
  tagsFold?: string[];
};

// Accent-insensitive folding for Greek (and general diacritics)
function foldGreek(s?: string) {
  if (!s) return "";
  // strip combining marks (accents/breathings), unify final sigma, lowercase, collapse spaces
  let out = s.normalize("NFD").replace(/\p{M}+/gu, "");
  out = out.replace(/\u03C2/g, "\u03C3"); // ς -> σ
  return out.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function SiteSearchInline() {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Load the prebuilt JSON (includes public/docs/*.html)
  useEffect(() => {
    let cancelled = false;
    fetch("/site-search.json")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results: SearchItem[] = useMemo(() => {
    const qFold = foldGreek(q);
    if (!qFold) return [];

    return items
      .map((it) => {
        // Prefer folded fields from the index; otherwise fold on the client
        const titleFold = it.titleFold ?? foldGreek(it.title);
        const excerptFold = it.excerptFold ?? foldGreek(it.excerpt);
        const bodyFold = it.bodyFold ?? foldGreek(it.body);
        const tagsFoldArr = it.tagsFold ?? (it.tags ? it.tags.map(foldGreek) : []);

        const hay = [titleFold, excerptFold, bodyFold, tagsFoldArr.join(" ")].join(" ");
        const titleHit = titleFold.includes(qFold);
        const bodyHit = hay.includes(qFold);
        const score = (titleHit ? 2 : 0) + (bodyHit ? 1 : 0);

        return { it, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.it.title.localeCompare(b.it.title))
      .slice(0, 12)
      .map((x) => x.it);
  }, [items, q]);

  // Keyboard nav
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[hi] ?? results[0];
      if (chosen) {
        if (chosen.type === "doc") {
          window.open(chosen.url, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = chosen.url;
        }
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // Close on outside click
  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(ev.target as Node)) {
        setOpen(false);
        setHi(0);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <input
        autoFocus
        type="text"
        placeholder="Αναζήτηση…"
        className="text-[16px] sm:text-sm outline-none border-none flex-1 bg-transparent w-full"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)}
        aria-label="Πεδίο αναζήτησης"
      />

      {open && q && results.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-2 max-h-96 overflow-auto rounded-md border border-zinc-200 bg-white shadow-lg z-50"
          role="listbox"
        >
          <ul className="py-1 text-sm">
            {results.map((r, idx) => (
              <li key={r.id}>
                <a
                  href={r.url}
                  target={r.type === "doc" ? "_blank" : undefined}
                  rel={r.type === "doc" ? "noopener noreferrer" : undefined}
                  className={`block px-3 py-2 hover:bg-zinc-50 ${idx === hi ? "bg-zinc-50" : ""}`}
                  onMouseEnter={() => setHi(idx)}
                  onMouseDown={(e) => {
                    // keep focus until click is processed
                    e.preventDefault();
                    if (r.type === "doc") {
                      window.open(r.url, "_blank", "noopener,noreferrer");
                    } else {
                      window.location.href = r.url;
                    }
                  }}
                >
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-zinc-600 truncate">{r.url}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {open && q && results.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 rounded-md border border-zinc-200 bg-white shadow-lg z-50 p-3 text-sm text-zinc-600">
          Κανένα αποτέλεσμα.
        </div>
      )}
    </div>
  );
}

