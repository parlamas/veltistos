// src/app/diethni/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import Link from "next/link";

type Post = {
  slug: string;
  titleGR: string;
  titleEN?: string;
  date: string; // e.g. 2025-10-05
};

const posts: Post[] = [
  {
    slug: "nobel-irony",
    titleGR: "Οσλο, δωστε το Νομπελ Ειρηνης στον Νετανιάχου",
    titleEN: "Oslo, give the Nobel of Peace to Netanyahu",
    date: "2025-10-05",
  },
  // Add future posts here:
  // { slug: "my-next-article", titleGR: "Τίτλος", titleEN: "Title", date: "YYYY-MM-DD" },
];

export default function DiethniIndex() {
  return (
    <main className="max-w-[1120px] mx-auto px-6 py-6">
      <header className="mb-6">
        <h1 className="font-serif text-2xl font-bold">ΔΙΕΘΝΗ</h1>
        <p className="text-sm text-zinc-500">Τελευταία άρθρα</p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50">
            <h2 className="font-semibold leading-snug">
              <Link href={`/diethni/${p.slug}`} className="hover:underline">
                <span lang="el" className="block">{p.titleGR}</span>
                {p.titleEN && (
                  <span lang="en" className="block text-zinc-600">{p.titleEN}</span>
                )}
              </Link>
            </h2>
            <p className="mt-1 text-xs text-zinc-500">{p.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
