// src/components/RightStory.tsx

import Link from "next/link";
import type { RightItem } from "@/content/home";

export default function RightStory({ item }: { item: RightItem }) {
  return (
    <article className="border border-[brown] rounded-md p-3 space-y-2">
      {item.img ? (
        <a href={item.href}>
          <img
            src={item.img}
            alt=""
            className="w-full rounded-md"
            width={item.width}
            height={item.height}
          />
        </a>
      ) : null}

      {item.kicker ? (
        <div className="text-xs text-zinc-600">{item.kicker}</div>
      ) : null}

      <Link href={item.href} className="block">
        <h3
          className="font-semibold leading-snug"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
      </Link>

      {item.number ? (
        <div
          className="text-xs text-zinc-700"
          dangerouslySetInnerHTML={{ __html: item.number }}
        />
      ) : null}
    </article>
  );
}
