// src/app/greek-israeli-relations/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { relations } from "@/content/gi-relations";

export function generateStaticParams() {
  return relations.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = relations.find((x) => x.slug === params.slug);
  if (!a) return {};
  const url = `https://veltistos.com/greek-israeli-relations/${a.slug}`;
  return {
    title: `${a.title} | Veltistos`,
    description: a.excerpt || "Article",
    openGraph: { title: a.title, description: a.excerpt, url, type: "article" },
  };
}

export default function RelationsArticle({ params }: { params: { slug: string } }) {
  const a = relations.find((x) => x.slug === params.slug);
  if (!a) return notFound();

  return (
    <article className="prose prose-zinc max-w-3xl mx-auto">
      <h1>{a.title}</h1>
      {(a.kicker || a.date) && (
        <p className="text-sm text-zinc-600">
          {a.kicker ? <span>{a.kicker}</span> : null}
          {a.kicker && a.date ? " • " : null}
          {a.date ? <span>{a.date}</span> : null}
        </p>
      )}
      {a.thumbnail ? <img src={a.thumbnail} alt="" /> : null}
      <div dangerouslySetInnerHTML={{ __html: a.body }} />
    </article>
  );
}
