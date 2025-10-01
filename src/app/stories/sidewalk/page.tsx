// src/app/stories/sidewalk/page.tsx
import Image from "next/image";
import ShareBar from "@/components/ShareBar";
import TTSButton from "@/components/TTSButton";

export default function Page() {
  const href = "/stories/sidewalk";
  const title = "Νέα για τα πεζοδρόμια";

  return (
    <article id="story-content" className="prose prose-zinc max-w-none">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold leading-tight">{title}</h1>
          <p className="text-sm text-zinc-500">01.10.25 • Ελλάδα</p>
        </div>

        {/* Read the entire article */}
        <TTSButton targetSelector="#story-content" label="" />
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
        με παραγράφους, υποτίτλους, λίστες κ.λπ. 今天是雨天。Me voy a la escuela.
      </p>

      <div data-tts-skip className="not-prose mt-4">
  <ShareBar href={href} title={title} />
</div>

    </article>
  );
}


