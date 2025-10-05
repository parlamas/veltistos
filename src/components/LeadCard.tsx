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
  // Strip any HTML (e.g., <br>) for aria-labels
  const plainTitle = title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  return (
    <article className="rounded-xl overflow-hidden border border-zinc-200">
      {img && (
        <Link href={href} aria-label={plainTitle}>
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
        <h3 className="font-serif font-semibold leading-snug text-base md:text-lg lg:text-xl">
          <Link href={href} className="hover:text-red-600">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </h3>
        {excerpt && <p className="mt-2 text-sm text-zinc-600">{excerpt}</p>}
      </div>
    </article>
  );
}

