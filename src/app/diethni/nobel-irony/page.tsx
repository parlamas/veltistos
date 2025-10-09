// src/app/diethni/nobel-irony/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import React, { ReactNode, isValidElement, ReactElement } from "react";
// import Image from "next/image";
// import ArticleExtras from "@/components/ArticleExtras";
import LangShow from "@/components/LangShow";
import DualTTSBar from "@/components/DualTTSBar";
import ShareBar from "@/components/ShareBar";
import ReadMore from "@/components/ReadMore";

function AutoLangGroups({ children }: { children: ReactNode }) {
  const nodes = React.Children
    .toArray(children)
    .filter(
      (n): n is ReactElement<{ lang?: "el" | "en"; "data-lang"?: "el" | "en" }> =>
        isValidElement(n)
    );

  const split = (code: "el" | "en") => {
    const arr = nodes.filter(
      (n) => n.props.lang === code || n.props["data-lang"] === code
    );
    const head = arr.slice(0, 2); // first 2 shown
    const tail = arr.slice(2); // rest behind “Read more…”
    return { head, tail };
  };

  const GR = split("el");
  const EN = split("en");

  return (
    <>
      <div lang="el" data-tts-el>
        {GR.head}
        {GR.tail.length > 0 && (
          <ReadMore
            moreLabel="Περισσότερα… / Read more…"
            lessLabel="Λιγότερα / Read less"
          >
            {GR.tail}
          </ReadMore>
        )}
      </div>

      <div lang="en" data-tts-en>
        {EN.head}
        {EN.tail.length > 0 && (
          <ReadMore moreLabel="Read more…" lessLabel="Read less">
            {EN.tail}
          </ReadMore>
        )}
      </div>
    </>
  );
}

export default function Page() {
  const href = "/diethni/nobel-irony";
  const titleGR = "Οσλο, δωστε το Νομπελ Ειρηνης στον Νετανιάχου";
  const titleEN = "Oslo, give the Nobel of Peace to Netanyahu";
  const shareTitle = titleGR; // use when a single string is needed (Share/TTS/etc.)
  // — small bilingual byline constants —
  const bylineDate = "09.10.25";
  const nameEL = "Ισίδωρος Παρλαμάς";
  const nameEN = "Isidoros Parlamas";

  return (
    <>
      {/* Small bilingual byline BEFORE the article */}
      <div className="mb-2 text-xs leading-tight text-zinc-500">
        <div lang="el">
          {bylineDate} • {nameEL}
        </div>
        <div lang="en">
          {bylineDate} • {nameEN}
        </div>
      </div>

      <article
        id="story-content"
        className="prose prose-zinc max-w-none text-zinc-900"
      >
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl font-bold leading-tight">
              <span lang="el" className="block">
                {titleGR}
              </span>
              <span lang="en" className="block text-zinc-600">
                {titleEN}
              </span>
            </h1>
            <p className="text-sm text-zinc-500">
                α4 &bull; a4<br />
              09.10.25 • Οσλο, δωστε το Νομπελ Ειρηνης στον Νετανιάχου
            </p>
          </div>
        </header>

        {/* Two speakers at the top (read hidden EL/EN blocks) */}
        <DualTTSBar
          targetEl="#story-content [data-tts-el]"
          targetEn="#story-content [data-tts-en]"
        />

        {/*
        (Optional) image block — keep/remove as you wish
        <figure className="my-4">
          <Image
            src="/union/enosis-01.jpg"
            alt="Ενωση τού Ελληνισμού"
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg"
            priority
          />
          <figcaption className="mt-2 text-xs text-zinc-500">
            Η ενιαία Ελλάδα
          </figcaption>
        </figure>
        */}

        <LangShow>
          <AutoLangGroups>
            <p lang="el">
              <span hidden>a1 α1</span>
              Η βρετανική προσφορά τού 1915 για παραχώρηση τής Κύπρου στην Ελλάδα
              (και γιατί η Ελλάδα αρνήθηκε).
            </p>

            <p lang="en">
              <br />
              Τι συνέβη:
              <br />
              <p>A Modest Proposal for the Next Nobel Peace Prize</p>

<p>It is time, surely, for the Nobel Committee to restore its old traditions. Traditions are sacred — and few are as venerable as the Committee’s habit of confusing peace with the efficient administration of violence. When history looks back on our age, it will find coherence in the chaos: the same institution that crowned Henry Kissinger for his delicate orchestration of bombings over Cambodia and Laos can now, with equal moral precision, honor Benjamin Netanyahu.</p>

<p>After all, consistency is the soul of credibility. Kissinger’s Peace Prize in 1973 recognized his tireless efforts to bring “peace with honor” — a phrase that aged as well as the jungles it napalmed. Why stop there? Netanyahu, too, has demonstrated that peace, properly defined, can only be achieved through the systematic erasure of whatever stands in its way.</p>

<p>Yes, Trump deserves mention — a mere enabler, a supplier of weapons and smiles — but not the spotlight. The true artisans of peace are those who pull the trigger, not those who sell the gun. Kissinger, Breivik, Netanyahu: a noble lineage of men who remind us that peace, to be taken seriously, must first be preceded by slaughter. The Oslo Committee should be proud of its heritage; it has long blurred the line between irony and insult with unparalleled grace.</p>

<p>Let us remember the precedent. In the same year Kissinger accepted his award — modestly, of course, and with only a few million casualties behind him — the world saw a coup in Chile, a genocide in Bangladesh, and invasions from Cyprus to East Timor. It was a golden age for peace, defined not by silence but by the thunder of well-intentioned explosions.</p>

<p>So why hesitate now? Netanyahu’s resume glitters. Flattened neighborhoods, children under rubble, an unshakable belief in his divine right to self-defense — these are the hallmarks of a true laureate. And if the Committee wishes to modernize, why not share the honor with Anders Behring Breivik, a lone practitioner of the same philosophy? Breivik was, in essence, a one-man foreign policy — the privatization of state violence, the entrepreneurial face of Western civilization’s finest exports.</p>

<p>Awarding the Nobel Peace Prize to Netanyahu and Breivik together would close the circle. It would tell the truth, at last, about what “peace” has come to mean in our time: the peace of submission, the peace of graves, the peace negotiated by drones and cement walls. The Nobel Committee, born of idealism, could die of honesty — and perhaps that would be its most peaceful act yet.</p>

            </p>

            
          </AutoLangGroups>
        </LangShow>

        {/* Client-only controls */}
        <ShareBar href={href} title={shareTitle} />
      </article>
    </>
  );
}
