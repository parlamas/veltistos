// src/components/LeadCard.tsx

import Link from "next/link";
import Image from "next/image";
import type { LeadItem } from "@/content/home";

export default function LeadCard({ item }: { item: LeadItem }) {
  const { href, title, img, excerpt, number } = item;

  return (
    <Link href={href} className="block group">
      <article className="overflow-hidden rounded-lg border">
        {img && (
          <Image
            src={img}
            alt={title.replace(/<[^>]*>/g, "")}
            width={1200}
            height={675}
            className="w-full h-auto"
            priority={false}
          />
        )}
        <div className="p-3">
          <h2
            className="font-serif text-xl font-bold leading-tight"
            // title can include <br/>, so render as HTML:
            dangerouslySetInnerHTML={{ __html: title }}
            {number && <div className="mt-1 text-xs text-zinc-600">{number}</div>}
          />
          {excerpt && (
            <p className="mt-1 text-sm text-zinc-600">{excerpt}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
