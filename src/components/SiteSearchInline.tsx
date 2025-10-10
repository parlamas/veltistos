// src/components/SiteSearchInline.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";

type SearchItem =
  | { type: "doc"; id: string; url: string; title: string; body: string }
  | { type: "page"; id: string; url: string; title: string; excerpt?: string; tags?: string[] };

export default function SiteSearchInline() {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const mini = useMemo(
    () =>
      new MiniSearch<SearchItem>({
        fields: ["title", "body", "excerpt", "tags"],
        storeFields: ["title", "url", "type"],
        searchOptions: { prefix: true, boost: { title: 3 } },
      }),
    []
  );

  useEffect(() => {
    fetch("/site-search.json")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        setItems(data);
        mini.addAll(data);
      })
      .catch(() => {});
  }, [mini]);

  const results = q ? mini.search(q) : [];

  return (
    <div className="relative w-full">
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
        onFocus={() => setOpen(true)}
        aria-label="Πεδίο αναζήτησης"
      />
      {open && q && (
        <div className="absolute left-0 right-0 mt-2 rounded-md border bg-white shadow-lg z-40 p-2">
          {results.length === 0 ? (
            <div className="text-sm text-zinc-600 px-2 py-1">Κανένα αποτέλεσμα.</div>
          ) : (
            <ul className="max-h-80 overflow-auto divide-y">
              {results.slice(0, 10).map((r) => {
                const url = (r as any).url as string;
                const title = (r as any).title as string;
                const type = (r as any).type as "doc" | "page";
                return (
                  <li key={r.id} className="py-2">
                    <a
                      className="block px-2 hover:bg-zinc-50 rounded"
                      href={url}
                      target={type === "doc" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      <div className="text-sm font-medium">{title}</div>
                      <div className="text-[11px] text-zinc-600">{url}</div>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
