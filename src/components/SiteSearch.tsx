//src/components/SiteSearch.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  type: "doc" | "page";
  id: string;
  url: string;
  title: string;
  body?: string;
  excerpt?: string;
  tags?: string[];
};

export default function SiteSearch() {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/site-search.json")
      .then((r) => r.json())
      .then((data: Item[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return items
      .map((it) => {
        const hay = (
          it.title +
          " " +
          (it.excerpt ?? "") +
          " " +
          (it.body ?? "") +
          " " +
          (it.tags ?? []).join(" ")
        ).toLowerCase();
        const score =
          (terms.some((t) => it.title.toLowerCase().includes(t)) ? 2 : 0) +
          (terms.some((t) => hay.includes(t)) ? 1 : 0);
        return { it, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.it.title.localeCompare(b.it.title))
      .slice(0, 20)
      .map((x) => x.it);
  }, [items, q]);

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Αναζήτηση σε όλο τον ιστότοπο…"
        className="w-full border rounded px-3 py-2"
        aria-label="Αναζήτηση"
      />
      {q && (
        <ul className="space-y-2">
          {results.map((r) => (
            <li key={r.id} className="border rounded p-3">
              <a
                className="text-blue-600 hover:underline"
                href={r.url}
                target={r.type === "doc" ? "_blank" : undefined}
                rel={r.type === "doc" ? "noopener noreferrer" : undefined}
              >
                {r.title}
              </a>
              <div className="text-xs text-zinc-600 mt-1">
                {r.type === "doc" ? "Document" : "Page"} · {r.url}
              </div>
            </li>
          ))}
          {results.length === 0 && (
            <li className="text-sm text-zinc-600">Κανένα αποτέλεσμα.</li>
          )}
        </ul>
      )}
    </div>
  );
}
