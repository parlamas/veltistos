// src/components/GlossesSearch.tsx
// npm i minisearch
"use client";
import MiniSearch from "minisearch";
import { useEffect, useMemo, useState } from "react";

export default function GlossesSearch() {
  const [docs, setDocs] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const mini = useMemo(() => new MiniSearch({
    fields: ["title", "body"], storeFields: ["title", "url"]
  }), []);

  useEffect(() => {
    fetch("/docs-index.json").then(r => r.json()).then(json => {
      setDocs(json);
      mini.addAll(json);
    });
  }, [mini]);

  const results = q ? mini.search(q, { prefix: true }) : [];

  return (
    <div className="space-y-3">
      <input
        value={q} onChange={e => setQ(e.target.value)}
        placeholder="Αναζήτηση στα έγγραφα..."
        className="w-full border rounded px-3 py-2"
      />
      {q && (
        <ul className="space-y-2">
          {results.map((r: any) => (
            <li key={r.id} className="border rounded p-3">
              <a className="text-blue-600 hover:underline" href={r.url}>{r.title}</a>
              <div className="text-sm text-zinc-600 truncate">{r.match?.slice(0,120)}…</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
