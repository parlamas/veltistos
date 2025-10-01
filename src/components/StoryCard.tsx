// src/components/StoryCard.tsx
import Link from "next/link";

export default function StoryCard({ href, title }: { href: string; title: string }) {
  return (
    <article className="py-2 first:pt-0 border-b border-zinc-200 last:border-none">
      <h4 className="text-sm font-semibold leading-snug">
        <Link href={href} className="hover:text-red-600">{title}</Link>
      </h4>
    </article>
  );
}
