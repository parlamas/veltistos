// src/components/GlossesSearch.tsx
"use client";

import MiniSearch, { type SearchResult } from "minisearch";
import { useEffect, useMemo, useState } from "react";

type Doc = {
  id: string;
  url: string;
  title: string;
  body: string;
};

type Result = ReturnType<MiniSearch<Doc>["search"]>[number] & Partial<Doc>;


export default function GlossesSearch() {
  const [q, setQ] = useState<string>("");

  const mini = useMemo(
    () =>
      new MiniSearch<Doc>({
        fields: ["title", "body"],
        storeFields: ["title", "url"],
      }),
    []
  );

  useEffect(() => {
    // Your build script writes: public/search-index.json
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((json: Doc[]) => {
        mini.addAll(json);
      })
      .catch(() => {
        // If index missing, search just returns empty
      });
  }, [mini]);

  const results: Result[] = q
    ? (mini.search(q, { prefix: true }) as Result[])
    : [];

  return (
    <div className="space-y-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Αναζήτηση στα έγγραφα..."
        className="w-full border rounded px-3 py-2"
      />
      {q && results.length > 0 && (
        <ul className="space-y-2">
          {results.map((r) => (
            <li key={String(r.id)} className="border rounded p-3">
              <a
                className="text-blue-600 hover:underline"
                href={r.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.title ?? String(r.id)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
