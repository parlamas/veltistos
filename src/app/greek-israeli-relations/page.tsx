// src/app/greek-israeli-relations/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { relations } from "@/content/gi-relations"; // <- note the path

export const metadata: Metadata = {
  title: "Greek–Israeli Relations | Veltistos",
  description: "Articles on Greek–Israeli relations.",
};

export default function RelationsIndex() {
  const items = [...relations].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return (
    <main className="prose prose-zinc max-w-5xl mx-auto">
      <h1>Greek–Israeli Relations</h1>
      <ul className="not-prose grid gap-4 md:grid-cols-2">
        {items.map((a) => (
          <li key={a.slug} className="border rounded-md p-3">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-black">
              <Link href={`/greek-israeli-relations/${a.slug}`} aria-label={a.title}>
                {a.thumbnail ? (
                  <img src={a.thumbnail} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-zinc-400 text-sm">
                    No thumbnail
                  </div>
                )}
              </Link>
            </div>
            <h3 className="mt-2 font-semibold">
              <Link href={`/greek-israeli-relations/${a.slug}`}>{a.title}</Link>
            </h3>
            {a.kicker && <div className="text-xs text-zinc-600">{a.kicker}</div>}
            {a.date && <div className="text-xs text-zinc-500">{a.date}</div>}
            {a.excerpt && <p className="text-sm mt-1">{a.excerpt}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
