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
        <TTSButton targetSelector="#parts-of-speech-tts" label="Ακρόαση" />
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

      
        {/* Only this block will be read by TTS */}
      <div id="parts-of-speech-tts">
        <span hidden>aa3 αα3</span>
        <div lang="el-GR">
          Τα μερη του λογου ειναι 10.<br />
          Οι καταλληλες ερωτησεις και οι σωστες απαντησεις μας οδηγουν στο σωστο μερος του λογου.<br />
          <ol className="list-decimal list-inside space-y-1">
      <li><span className="wow">Ουσιαστικα:</span> (α) Ειναι αυτη η λεξη το ονομα καποιας οντοτητας; &bull; (ναι) 
      (β) Ειναι αυτη η λεξη μερος καποιου χρονου; (οχι)</li>

      <li><span className="wow">Επιθετα:</span> (α) Προσδιοριζει αυτη η λεξη καποιο ουσιαστικο; (ναι) &bull; (β) Εισαγει αυτη η λεξη μια ελλειπτικη μετοχικη προταση; (οχι) &bull; 
      (γ) Ειναι η προελευση αυτης της λεξης καποιο ρημα η οποια ταυτοχρονα προσδιοριζει καποιο ουσιαστικο; (ναι)</li>

      <li><span className="wow">Αντωνυμιες:</span> Χρησιμοποιειται αυτη η λεξη αντι καποιου ουσιαστικου; (ναι)</li>
    </ol>
    
        </div>
      </div>

      <div data-tts-skip className="not-prose mt-4">
        <ShareBar href={href} title={title} />
      </div>
    </article>
  );
}
