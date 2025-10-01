// src/app/stories/sidewalk/page.tsx

export default function Page() {
  const href = "/stories/sidewalk";
  const title = "Νέα για τα πεζοδρόμια";

  return (
    <article className="prose prose-zinc max-w-none">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold leading-tight">{title}</h1>
          <p className="text-sm text-zinc-500">01.10.25 • Ελλάδα</p>
        </div>

        {/* Speaker/TTS button – target the body below */}
        <TTSButton targetSelector="#story-body" lang="el-GR" label="" />
      </header>

      <figure className="my-4">…</figure>

      {/* Give the readable text its own container (valid HTML) */}
      <div id="story-body">
        <p>
          Εισαγωγική παράγραφος… Γράψε εδώ το περιεχόμενο του άρθρου σου
          με παραγράφους, υποτίτλους, λίστες κ.λπ.
        </p>
      </div>

      <ShareBar href={href} title={title} />
    </article>
  );
}

