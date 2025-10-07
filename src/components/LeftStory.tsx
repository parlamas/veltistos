// src/components/LeftStory.tsx

import Link from "next/link";
import Image from "next/image";
import type { LeftItem } from "@/content/home";

export default function LeftStory({ item }: { item: LeftItem }) {
  const { href, title, img, kicker, number } = item;

  return (
    <Link href={href} className="block group">
      <article className="flex items-start gap-3">
        {img ? (
          <Image
            src={img}
            alt={typeof title === "string" ? title.replace(/<[^>]+>/g, "") : ""}
            width={96}
            height={96}
            className="shrink-0 rounded object-cover"
          />
        ) : null}

        <div className="min-w-0">
          {kicker && (
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              {kicker}
            </div>
          )}

          {number && (
            <div className="text-xs text-zinc-600">
              {number}
            </div>
          )}

          {/* Render HTML in title (trusted from our own content file) */}
          <h3
            className="font-semibold leading-snug group-hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </article>
    </Link>
  );
}
