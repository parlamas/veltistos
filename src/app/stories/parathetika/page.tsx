// src/app/stories/parathetika/page.tsx
/*import Image from "next/image";*/
import ShareBar from "@/components/ShareBar";
import TTSButton from "@/components/TTSButton";

export default function Page() {
  const href = "/stories/parathetika";
  const title = "Τα παραθετικά τού 'ἀγαθός'";

  return (
    <article
      id="story-content"
      lang="el"
      className="prose prose-zinc max-w-none"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1
            className="font-serif text-2xl font-bold leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-sm text-zinc-500">05.10.25 • Γραμματική</p>
        </div>

        {/* TTS (browser voices only) */}
        <TTSButton targetSelector="#story-content" label="Ακρόαση" />
      </header>

      {/* 
      <figure className="my-4">
        <Image
          src="/sidewalk.jpeg"
          alt="Τα παραθετικά τού 'αγαθός'"
          width={1200}
          height={675}
          className="w-full h-auto rounded-lg"
          priority
        />
        <figcaption className="mt-2 text-xs text-zinc-500">
          λεζάντα
        </figcaption>
      </figure>
      */}

      <p>
        <span className="wow">θετικός βαθμός:</span> ὁ ἀγαθός • ἡ ἀγαθή • τό ἀγαθόν<br />
        <span className="wow">συγκριτικός βαθμός:</span> ὁ βελτίων • ἡ βελτίων • τό βέλτιον<br />
        <span className="wow">υπερθετικός βαθμός:</span> ὁ βέλτιστος • ἡ βελτίστη • τό βέλτιστον
      </p>

      <div data-tts-skip className="not-prose mt-4">
        <ShareBar href={href} title={title} />
      </div>
    </article>
  );
}
