// src/app/stories/sidewalk/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';
import Image from "next/image";
import ShareBar from "@/components/ShareBar";
import TTSButton from "@/components/TTSButton";

export default function Page() {
  const href = "/stories/parathetika";
  const title = "Τα παραθετικά τού <b>ἀγαθός</b>";

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
        <TTSButton targetSelector="#story-content" label="" />
      </header>

{/*
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
*/}

      <p>
        θετικός βαθμός: ὁ ἀγαθός • ἡ ἀγαθή • τό ἀγαθόν<br />
        συγκριτικός βαθμός: ὁ βελτίων • ἡ βελτίων • τό βέλτιον<br />
        υπερθετικός βαθμός: ὁ βέλτιστος • ἡ βελτίστη • τό βέλτιστον


      {/*

        <span lang="zh-CN">今天是雨天。</span>{" "}
        <span lang="es-ES">Me voy a la escuela.</span>
        */}
      </p>

      <div data-tts-skip className="not-prose mt-4">
        <ShareBar href={href} title={title} />
      </div>
    </article>
  );
}



