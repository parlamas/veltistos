// src/app/stories/parts-of-speech/page.tsx
import ShareBar from "@/components/ShareBar";
import TTSButton from "@/components/TTSButton";

export default function Page() {
  const href = "/stories/parts-of-speech";
  const title = "Τά 10 Μέρη τού Λόγου";

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

        {/* TTS (browser voices only) */}
        <TTSButton targetSelector="#story-content" label="Ακρόαση" />
      </header>

      {/* 
      <figure className="my-4">
        <Image
          src="/parts-of-speech.png"
          alt="Τά 10 Μέρη τού Λόγου"
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
        <span lang="el-GR">
          Τά μέρη τού λόγου είναι 10.<br />
          Οι κατάλληλες ερωτήσεις μάς οδηγούν στο σωστό μέρος τού λόγου.<br />
        a2
        </span>
      </p>

      <div data-tts-skip className="not-prose mt-4">
        <ShareBar href={href} title={title} />
      </div>
    </article>
  );
}
