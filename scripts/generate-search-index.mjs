"use client";
import MiniSearch from "minisearch";
import { useEffect, useMemo, useState } from "react";

type DocItem =
  | { type: "doc"; id: string; url: string; title: string; body: string }
  | { type: "page"; id: string; url: string; title: string; excerpt?: string; tags?: string[] };

export default function SiteSearch() {
  const [q, setQ] = useState("");
  const [loaded, setLoaded] = useState(false);

  const mini = useMemo(
    () =>
      new MiniSearch<DocItem>({
        fields: ["title", "body", "excerpt", "tags"],
        storeFields: ["title", "url", "type"],
        searchOptions: { prefix: true, boost: { title: 3 } },
      }),
    []
  );

  useEffect(() => {
    fetch("/site-search.json")
      .then((r) => r.json())
      .then((data: DocItem[]) => { mini.addAll(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, [mini]);

  const results = q ? mini.search(q) : [];

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
          {results.map((r) => {
            const url = (r as any).url as string;
            const title = (r as any).title as string;
            const type = (r as any).type as "doc" | "page";
            return (
              <li key={r.id} className="border rounded p-3">
                <a
                  className="text-blue-600 hover:underline"
                  href={url}
                  target={type === "doc" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
                <div className="text-xs text-zinc-600 mt-1">
                  {type === "doc" ? "Document" : "Page"} · {url}
                </div>
              </li>
            );
          })}
          {results.length === 0 && loaded && (
            <li className="text-sm text-zinc-600">Κανένα αποτέλεσμα.</li>
          )}
        </ul>
      )}
    </div>
  );
}
