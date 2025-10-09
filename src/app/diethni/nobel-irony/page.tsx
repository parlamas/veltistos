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
  const bylineDate = "05.10.25";
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
              05.10.25 • Οσλο, δωστε το Νομπελ Ειρηνης στον Νετανιάχου
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

            <p lang="el">
              <br />
              Τι συνέβη:
              <br />
              Τόν Οκτώβριο τού 1915, καθώς ο Α΄ Παγκόσμιος Πόλεμος διευρυνόταν και
              η Σερβία δεχόταν επίθεση (έπειτα από τήν είσοδο τής Βουλγαρίας στον
              πόλεμο), ο Βρετανός Υπουργός Εξωτερικών Έντουαρντ Γκρέι ενέκρινε μία
              πρόταση να παραχωρηθεί η Κύπρος στην Ελλάδα εφόσον η Ελλάδα θα έμπαινε
              στον πόλεμο στο πλευρό τών Συμμάχων (ουσιαστικά, για να συνδράμει τήν
              Σερβία). Η προσφορά διαβιβάστηκε στην Αθήνα από τόν Βρετανό πρεσβευτή
              σερ Φράνσις Έλιοτ. Ο πρωθυπουργός Ελευθέριος Βενιζέλος τάχθηκε υπέρ
              τής αποδοχής· ο βασιλιάς Κωνσταντίνος Α&rsquo;&mdash;προσηλωμένος στην
              ουδετερότητα&mdash;αρνήθηκε, οπότε η Ελλάδα δεν την αποδέχθηκε και η
              προσφορά ξεχάσθηκε.
            </p>

            <p lang="en">
              The 1915 British offer of Cyprus to Greece (and why Greece
              declined).
            </p>

            <p lang="en">
              <br />
              What happened:
              <br />
              In October 1915, as World War I widened and Serbia was under attack
              (after Bulgaria entered the war), British Foreign Secretary Edward
              Grey authorized an offer to cede Cyprus to Greece if Greece would
              enter the war on the Allied side (effectively, come to Serbia’s aid).
              The offer was conveyed in Athens by the British minister Sir Francis
              Elliot. Prime Minister Eleftherios Venizelos favored accepting; King
              Constantine I&mdash;committed to neutrality&mdash;refused, so Greece
              declined and the offer lapsed.
            </p>

            <p lang="el">
              Τό ότι η Ελλάδα και η Κύπρος έχουν αποφασίσει να ενωθούν δεν είναι μία
              χειρονομία συμφιλίωσης αλλά μία διακήρυξη συνέχειας. Η ιδέα της{" "}
              <em>Ενωσης</em> αιωρείται επί μακρόν στη συλλογική συνείδηση και των
              δύο λαών, που μοιράζονται την ίδια γλώσσα, πίστη και πολιτιστική
              κληρονομιά. Η ένωσή τους δεν θεραπεύει ένα ρήγμα αλλά{" "}
              <strong>ολοκληρώνει μία φυσική πορεία τής ιστορίας</strong> που
              διακόπηκε από τήν αποικιοκρατία, τήν κατοχή και τίς γεωπολιτικές
              συγκυρίες. Για να κατανοήσει κανείς τόσο τό μέγεθος όσο και τήν
              μηχανική μίας τέτοιας ένωσης, μπορεί να στραφεί στο παράδειγμα τής
              Γερμανίας—ενός έθνους που, παρά δεκαετίες πολιτικού διαχωρισμού,
              πέτυχε τήν εθνική ολοκλήρωση με ειρηνικά και μεθοδικά μέσα.
            </p>

            <p lang="el">
              Μέσω συνταγματικής αναθεώρησης, δημοψηφισμάτων, διεθνούς δικαστικής
              επίλυσης και διπλωματικής διαπραγμάτευσης, η Ελλάδα και η Κύπρος
              μπορούν νόμιμα και ειρηνικά να επιτύχουν τήν ενότητα που η ιστορία
              έχει επί μακρόν αναβάλει. Η ένωσή τους δεν θα εξαφανίσει τίς ιδομορφίες
              αλλά θα ολοκληρώσει τήν συνέχεια του Ελληνισμού&mdash;
              <strong>μια φυσική ολοκλήρωση</strong>.
            </p>

            <p lang="en">
              Through constitutional amendment, referenda, international
              adjudication, and diplomatic negotiation, Greece and Cyprus can
              lawfully and peacefully achieve the unity that history has long
              postponed. Their union will not erase peculiarities but complete the
              continuity of Hellenism—<strong>a natural continuity</strong>.
              <br />
              {/*αριθμός 1 • number 1*/}
            </p>
          </AutoLangGroups>
        </LangShow>

        {/* Client-only controls */}
        <ShareBar href={href} title={shareTitle} />
      </article>
    </>
  );
}
