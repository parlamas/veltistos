// src/components/LeadCard.tsx

import Link from "next/link";
import type { LeadItem } from "@/content/home";

export default function LeadCard({ item }: { item: LeadItem }) {
  return (
    <article className="border border-[brown] rounded-md p-4 md:p-5 space-y-3">
      {item.img ? (
        <a href={item.href}>
          <img src={item.img} alt="" className="w-full rounded-md" />
        </a>
      ) : null}

      <Link href={item.href} className="block">
        <h2
          className="text-lg md:text-xl font-semibold leading-snug"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
      </Link>

      {item.author && (
        <div
          className="text-xs text-zinc-600"
          dangerouslySetInnerHTML={{ __html: item.author }}
        />
      )}

      {item.date && (
  <div
    className="text-xs text-zinc-500"
    dangerouslySetInnerHTML={{ __html: item.date }}
  />
)}


      {item.excerpt && (
        <p className="text-sm text-zinc-700">{item.excerpt}</p>
      )}

      {item.number ? (
        <div
          className="text-xs text-zinc-700"
          dangerouslySetInnerHTML={{ __html: item.number }}
        />
      ) : null}
    </article>
  );
}


