// src/app/stories/sidewalk/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import ShareBar from "@/components/ShareBar";

export const metadata: Metadata = {
  title: "Νέα για τα πεζοδρόμια",
  description: "Σύντομη περιγραφή του θέματος για SEO/preview.",
  openGraph: {
    title: "Νέα για τα πεζοδρόμια",
    description: "Σύντομη περιγραφή του θέματος για SEO/preview.",
    images: ["/sidewalk.jpeg"], // lives in /public
    url: "/stories/sidewalk",
  },
};

export default function Page() {
  const href = "/stories/sidewalk";
  const title = "Νέα για τα πεζοδρόμια";

  return (
    <article className="prose prose-zinc max-w-none">
      <header className="mb-4">
        <h1 className="font-serif text-3xl font-bold leading-tight">{title}</h1>
        <p className="text-sm text-zinc-500">01.10.25 • Ελλάδα</p>
      </header>

      <figure className="my-4">
        <Image
          src="/sidewalk.jpeg"
          alt="Πεζοδρόμιο στο κέντρο της Αθήνας"
          width={1200}
          height={675}
          className="w-full h-auto rounded-lg"
          priority
        />
        <figcaption className="mt-2 text-xs text-zinc-500">
          Λεζάντα φωτογραφίας (προαιρετική).
        </figcaption>
      </figure>

      <p>
        Εισαγωγική παράγραφος… Γράψε εδώ το περιεχόμενο του άρθρου σου
        με παραγράφους, υποτίτλους, λίστες κ.λπ.
      </p>

      {/* Share buttons */}
      <ShareBar href={href} title={title} />
    </article>
  );
}
