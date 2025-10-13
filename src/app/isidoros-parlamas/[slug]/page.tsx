// src/app/isidoros-parlamas/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ipArticles } from "@/content/ip-articles";

export function generateStaticParams() {
  return ipArticles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = ipArticles.find((x) => x.slug === params.slug);
  if (!a) return {};
  const url = `https://veltistos.com/isidoros-parlamas/${a.slug}`;
  return {
    title: `${a.title} | Ισίδωρος Παρλαμάς | Veltistos`,
    description: a.excerpt || "Άρθρο",
    openGraph: { title: a.title, description: a.excerpt, url, type: "article" },
  };
}

export default function IpArticlePage({ params }: { params: { slug: string } }) {
  const a = ipArticles.find((x) => x.slug === params.slug);
  if (!a) return notFound();

  return (
    <article className="prose prose-zinc max-w-3xl mx-auto">
      <h2>{a.title}</h2>
      {a.date && <p className="text-sm text-zinc-600">{a.date}</p>}
      {a.thumbnail ? <img src={a.thumbnail} alt="" /> : null}
      <div dangerouslySetInnerHTML={{ __html: a.body }} />
      

    </article>
  );
}
