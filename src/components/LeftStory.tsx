// src/components/LeftStory.tsx
import Link from "next/link";
import Image from "next/image";



export default function LeftStory({
  href,
  title,
  img,              // optional
  kicker,           // optional small label above the title
}: {
  href: string;
  title: string;
  img?: string;
  kicker?: string;
}) {
  return (
    <article className="flex gap-3 py-2 first:pt-0 border-b border-zinc-200 last:border-none">
      {img ? (
        <Link href={href} className="shrink-0 rounded-md overflow-hidden ring-1 ring-zinc-200">
          <Image
            src={img}
            alt=""
            width={160}
            height={90}
            className="block w-[120px] h-auto"
            sizes="160px"
          />
        </Link>
      ) : null}

      <div className="min-w-0">
  {kicker && <div className="text-[11px] uppercase tracking-wide text-red-600 font-semibold">{kicker}</div>}
  <h4 className="text-sm font-semibold leading-snug">
    <Link href={href} className="hover:text-red-600">{title}</Link>
  </h4>
  
</div>

    </article>
  );
}
