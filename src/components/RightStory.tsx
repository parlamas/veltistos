import Image from "next/image";
import Link from "next/link";
import type { RightItem } from "@/content/home";

export default function RightStory({ item }: { item: RightItem }) {
  const { href, title, img, kicker, width, height } = item;

  const w = width ?? 85;
  const h = height ?? 167;

  return (
    <Link href={href} className="block group">
      <div className="flex items-start gap-3">
        {img && (
          <Image
            src={img}
            alt={title}
            width={w}
            height={h}
            className="shrink-0 rounded object-contain"
            style={{ width: `${w}px`, height: `${h}px` }}
          />
        )}

        <div className="min-w-0">
          {kicker && (
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              {kicker}
            </div>
          )}
          <h3 className="font-semibold leading-snug group-hover:underline">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
