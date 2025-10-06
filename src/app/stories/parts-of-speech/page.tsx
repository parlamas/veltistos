// src/app/stories/syntagma/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';
import Image from "next/image";
import ShareBar from "@/components/ShareBar";
import TTSButton from "@/components/TTSButton";

export default function Page() {
  const href = "/stories/syntagma";
  const title = "Τα 10 Μέρη του Λόγου";

  return (
    <article
      id="story-content"
      lang="el"
      className="prose prose-zinc max-w-none"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold leading-tight">
            {title}
          </h1>
          <p className="text-sm text-zinc-500">05.10.25 • Γραμματική</p>
        </div>

        
      </header>

      <figure className="my-4">
        <Image
          src="/parts-of-speech.png"
          alt="Τηα 10 Μέρη τού Λόγου"
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
        <span lang="el-GR">Τα μέρη του λόγου είναι 10.<br />
        Οι κατάλληλες ερωτήσεις μας οδηγούν στο σωστό μέρος του λόγου.
        </span>
      </p>
{/* TTS (browser voices only) */}
        <TTSButton targetSelector="#story-content" label="" />
      <div data-tts-skip className="not-prose mt-4">
        <ShareBar href={href} title={title} />
      </div>
    </article>
  );
}
