// src/components/LeftStory.tsx

import Link from "next/link";
import type { LeftItem } from "@/content/home";

export default function LeftStory({ item }: { item: LeftItem }) {
  return (
    <article className="border border-[brown] rounded-md p-3 space-y-2">
      {item.img ? (
        // Use a plain img so we don't need fixed width/height
        <a href={item.href}>
          <img src={item.img} alt="" className="w-full rounded-md" />
        </a>
      ) : null}

      <div className="text-xs text-zinc-600">{item.kicker}</div>

      <Link href={item.href} className="block">
        <h3
          className="font-semibold leading-snug"
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
        <div className="text-xs text-zinc-500">{item.date}</div>
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



