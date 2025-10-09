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
  const titleEN = "Oslo, give the Nobel Peace Prize to Netanyahu";

  const shareTitle = titleGR; // use when a single string is needed (Share/TTS/etc.)
  // — small bilingual byline constants —
  const bylineDate = "09.10.25";
  const nameEL = "Ισίδωρος Παρλαμάς • Isidoros Parlamas";

  return (
    <>
      {/* Small bilingual byline BEFORE the article */}
      <div className="mb-2 text-xs leading-tight text-zinc-500">
        <div lang="el">
          {bylineDate} • {nameEL}
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
  <span data-tts-skip hidden>α4 • a4</span></p>
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
              <span data-tts-skip hidden>a4 α4</span>
            <p>Μια Σεμνη Προταση για το Επομενο Νομπελ Ειρηνης.</p>

<p>
Ειναι καιρος, αναμφιβολα, η Νορβηγικη Επιτροπη Νομπελ να αποκαταστησει τις παλιες της παραδοσεις. Οι παραδοσεις ειναι ιερες — και λιγες ειναι 
τοσο σεβαστες οσο η συνηθεια της Επιτροπης να συγχεει την ειρηνη με την αποτελεσματικη διαχειριση της βιας. 
Οταν η ιστορια κοιταξει πισω στη δικη μας εποχη, θα βρει συνοχη μεσα στο χαος: το ιδιο ιδρυμα που στεφανωσε τον Χενρι Κισινγκερ 
για την εκλεπτυσμενη του ορχηστρωση των βομβαρδισμων στην Καμποτζη και το Λαος, μπορει τωρα, με την ιδια ηθικη ακριβεια, να τιμησει τον Βενιαμιν Νετανιαχου.
</p>

<p>
Αλλωστε, η συνεπεια ειναι η ψυχη της αξιοπιστιας. Το Νομπελ Ειρηνης του Κισινγκερ το 1973 αναγνωρισε τις ακουραστες προσπαθειες του να 
φερει «ειρηνη με τιμη» — μια φραση που γηρεσε οσο και οι ζουγκλες που δεχτηκαν ναπαλμ. Γιατι να σταματησουμε εκει; Και ο Νετανιαχου 
απεδειξε οτι η ειρηνη, αν οριστει σωστα, μπορει να επιτευχθει μονο μεσω της συστηματικης εξαλειψης οτιδηποτε στεκεται εμποδιο στον δρομο της.
</p>

<p>
Ναι, ο Τραμπ αξιζει μια μνεια — απλος διευκολυντης, προμηθευτης οπλων και χαμογελων — αλλα οχι τα φωτα της σκηνης. 
Οι αληθινοι τεχνιτες της ειρηνης ειναι εκεινοι που τραβουν τη σκανδαλη, οχι εκεινοι που πουλουν το οπλο. Κισινγκερ, Μπρειβικ, 
Νετανιαχου: μια ευγενης γενεαλογια ανδρων που μας θυμιζουν οτι η ειρηνη, για να ληφθει στα σοβαρα, πρεπει πρωτα να προηγηθει απο τη σφαγη. 
Η Επιτροπη του Οσλο πρεπει να ειναι περηφανη για την κληρονομια της· εδω και καιρο εχει καταφερει να θολωσει το οριο αναμεσα στην ειρωνεια 
και την προσβολη με απαραμιλλη χαρη.
</p>

<p>
Ας θυμηθουμε το προηγουμενο. Την ιδια χρονια που ο Κισινγκερ αποδεχτηκε το βραβειο του — σεμνα, φυσικα, και με μονο μερικα εκατομμυρια 
θυματα πισω του — ο κοσμος ειδε ενα πραξικοπημα στη Χιλη, μια γενοκτονια στο Μπανγκλαντες και εισβολες απο την Κυπρο μεχρι το Ανατολικο Τιμορ. 
Ηταν μια χρυση εποχη της ειρηνης, ορισμενη οχι απο τη σιωπη αλλα απο τον βροντο των καλων προθεσεων που εκρηγνυνται.
</p>

<p>
Γιατι, λοιπον, η διστακτικοτητα σημερα; Το βιογραφικο του Νετανιαχου αστραφτει. Ισοπεδωμενες γειτονιες, παιδια κατω απο ερειπια, 
ακλονιτη πιστη στο θεικο του δικαιωμα στην αυτοαμυνα — αυτα ειναι τα διακριτικα γνωρισματα ενος αληθινου βραβευμενου. Και αν η Επιτροπη επιθυμει 
να εκσυγχρονιστει, γιατι να μη μοιραστει την τιμη με τον Αντερς Μπερινγκ Μπρειβικ, εναν μοναχικο ασκητη της ιδιας φιλοσοφιας; Ο Μπρειβικ ηταν, στην ουσια, 
μια ολοκληρη εξωτερικη πολιτικη ενσαρκωμενη σε ενα ατομο — η ιδιωτικοποιηση της κρατικης βιας, το επιχειρηματικο προσωπο των καλυτερων εξαγωγων του δυτικου πολιτισμου.
</p>

<p>
Η απονομη του Νομπελ Ειρηνης στον Νετανιαχου και τον Μπρειβικ απο κοινου θα εκλεινε τον κυκλο. Θα ελεγε, επιτελους, την αληθεια 
για το τι σημαινει «ειρηνη» στην εποχη μας: η ειρηνη της υποταγης, η ειρηνη των ταφων, η ειρηνη που διαπραγματευονται τα drones 
και οι τσιμεντενιοι τοιχοι. Η Επιτροπη Νομπελ, γεννημενη απο ιδεαλισμο, θα μπορουσε να πεθανει απο ειλικρινεια — και ισως αυτο να ηταν η πιο ειρηνικη της πραξη.
</p>


            </p>

            <p lang="en">
            
              <p>A Modest Proposal for the Next Nobel Peace Prize.</p>

<p>It is time, surely, for the Nobel Committee to restore its old traditions. Traditions are sacred — and few are as venerable as the 
    Committee’s habit of confusing peace with the efficient administration of violence. When history looks back on our age, it will find 
    coherence in the chaos: the same institution that crowned Henry Kissinger for his delicate orchestration of bombings over Cambodia and 
    Laos can now, with equal moral precision, honor Benjamin Netanyahu.</p>

<p>After all, consistency is the soul of credibility. Kissinger’s Peace Prize in 1973 recognized his tireless efforts to bring 
    “peace with honor” — a phrase that aged as well as the jungles it napalmed. Why stop there? Netanyahu, too, has demonstrated that peace, 
    properly defined, can only be achieved through the systematic erasure of whatever stands in its way.</p>

<p>Yes, Trump deserves mention — a mere enabler, a supplier of weapons and smiles — but not the spotlight. The true artisans of peace are 
    those who pull the trigger, not those who sell the gun. Kissinger, Breivik, Netanyahu: a noble lineage of men who remind us that peace, 
    to be taken seriously, must first be preceded by slaughter. The Oslo Committee should be proud of its heritage; it has long blurred the 
    line between irony and insult with unparalleled grace.</p>

<p>Let us remember the precedent. In the same year Kissinger accepted his award — modestly, of course, and with only a few million casualties 
    behind him — the world saw a coup in Chile, a genocide in Bangladesh, and invasions from Cyprus to East Timor. It was a golden age for peace, 
    defined not by silence but by the thunder of well-intentioned explosions.</p>

<p>So why hesitate now? Netanyahu’s resume glitters. Flattened neighborhoods, children under rubble, an unshakable belief in his divine right 
    to self-defense — these are the hallmarks of a true laureate. And if the Committee wishes to modernize, why not share the honor with Anders 
    Behring Breivik, a lone practitioner of the same philosophy? Breivik was, in essence, a one-man foreign policy — the privatization of state 
    violence, the entrepreneurial face of Western civilization’s finest exports.</p>

<p>Awarding the Nobel Peace Prize to Netanyahu and Breivik together would close the circle. It would tell the truth, at last, about what “peace” has 
    come to mean in our time: the peace of submission, the peace of graves, the peace negotiated by drones and cement walls. 
    The Nobel Committee, born of idealism, could die of honesty — and perhaps that would be its most peaceful act yet.</p>

            </p>

            
          </AutoLangGroups>
        </LangShow>

        {/* Client-only controls */}
        <ShareBar href={href} title={shareTitle} />
      </article>
    </>
  );
}
