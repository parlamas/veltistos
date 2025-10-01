// src/components/LeadCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function LeadCard({
  href,
  title,
  img,
  excerpt,
}: {
  href: string;
  title: string;
  img?: string;
  excerpt?: string;
}) {
  return (
    <article className="rounded-xl overflow-hidden border border-zinc-200">
      {img && (
        <Link href={href} aria-label={title}>
          <Image
            src={img}
            alt=""
            width={960}
            height={540}
            className="w-full h-auto"
            priority
          />
        </Link>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold leading-snug">
          <Link href={href} className="hover:text-red-600">{title}</Link>
        </h3>
        {excerpt && <p className="mt-2 text-sm text-zinc-600">{excerpt}</p>}
      </div>
    </article>
  );
}
