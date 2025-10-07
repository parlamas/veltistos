// src/app/stories/union/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';
//import Image from "next/image";
//import ArticleExtras from "@/components/ArticleExtras";
import LangShow from "@/components/LangShow";
import DualTTSBar from "@/components/DualTTSBar";
import ShareBar from "@/components/ShareBar";









import React, { ReactNode, isValidElement, ReactElement } from "react";



import ReadMore from "@/components/ReadMore";

function AutoLangGroups({ children }: { children: ReactNode }) {
  const nodes = React.Children
    .toArray(children)
    .filter(
      (n): n is ReactElement<{ lang?: "el" | "en"; ["data-lang"]?: "el" | "en" }> =>
        isValidElement(n)
    );

  const split = (code: "el" | "en") => {
    const arr = nodes.filter(
      (n) => n.props.lang === code || n.props["data-lang"] === code
    );
    const head = arr.slice(0, 2); // first 2 shown
    const tail = arr.slice(2);    // rest behind “Read more…”
    return { head, tail };
  };

  const GR = split("el");
  const EN = split("en");

  return (
    <>
      <div lang="el" data-tts-el>
        {GR.head}
        {GR.tail.length > 0 && (
          <>
            <ReadMore moreLabel="Περισσότερα… / Read more…" lessLabel="Λιγότερα / Read less">
              {GR.tail}
            </ReadMore>
            {/* Search-only duplicate in server HTML (hidden) */}
            <div className="hidden" aria-hidden="true" data-search-only>
              {GR.tail.map((node, i) =>
                isValidElement(node)
                  ? React.cloneElement(node as ReactElement, { key: `dup-gr-${i}`, "data-search-dup": "1" } as any)
                  : node
              )}
            </div>
          </>
        )}
      </div>

      <div lang="en" data-tts-en>
        {EN.head}
        {EN.tail.length > 0 && (
          <>
            <ReadMore moreLabel="Read more…" lessLabel="Read less">
              {EN.tail}
            </ReadMore>
            {/* Search-only duplicate in server HTML (hidden) */}
            <div className="hidden" aria-hidden="true" data-search-only>
              {EN.tail.map((node, i) =>
                isValidElement(node)
                  ? React.cloneElement(node as ReactElement, { key: `dup-en-${i}`, "data-search-dup": "1" } as any)
                  : node
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}


  const href = "/stories/union";
  const titleGR = "Η Ελλάδα και η Κύπρος Ενώνονται";
  const titleEN = "Greece and Cyprus are set to unite.";
  const shareTitle = titleGR; // use when a single string is needed (Share/TTS/etc.)

  return (
    <article
      id="story-content"
      className="prose prose-zinc max-w-none text-zinc-900"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold leading-tight">
  <span lang="el" className="block">{titleGR}</span>
  <span lang="en" className="block text-zinc-600">{titleEN}</span>
</h1>
          <p className="text-sm text-zinc-500">
            05.10.25 • Ενωση Ελλάδας και Κύπρου
          </p>
        </div>
      </header>

      {/* Two speakers at the top (read hidden EL/EN blocks) */}

<DualTTSBar targetEl='#story-content [data-tts-el]' targetEn='#story-content [data-tts-en]' />





      {/* (Optional) image block — keep/remove as you wish
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
          Η βρετανική προσφορά τού 1915 για παραχώρηση τής Κύπρου στην Ελλάδα (και γιατί η Ελλάδα αρνήθηκε).
          <div data-search-only className="hidden">a1 α1</div>
        </p>

        <p lang="el">
          <br />Τι συνέβη:<br />
          Τόν Οκτώβριο τού 1915, καθώς ο Α΄ Παγκόσμιος Πόλεμος διευρυνόταν και η Σερβία δεχόταν επίθεση (έπειτα από τήν είσοδο τής Βουλγαρίας στον πόλεμο),
          ο Βρετανός Υπουργός Εξωτερικών Έντουαρντ Γκρέι ενέκρινε μία πρόταση να παραχωρηθεί η Κύπρος στην Ελλάδα εφόσον η Ελλάδα θα έμπαινε στον πόλεμο
          στο πλευρό τών Συμμάχων (ουσιαστικά, για να συνδράμει τήν Σερβία).
          Η προσφορά διαβιβάστηκε στην Αθήνα από τόν Βρετανό πρεσβευτή σερ Φράνσις Έλιοτ.
          Ο πρωθυπουργός Ελευθέριος Βενιζέλος τάχθηκε υπέρ τής αποδοχής· ο βασιλιάς Κωνσταντίνος Α&rsquo;&mdash;προσηλωμένος στην ουδετερότητα&mdash;αρνήθηκε,
          οπότε η Ελλάδα δεν την αποδέχθηκε και η προσφορά ξεχάσθηκε.
        </p>

        <p lang="en">
          The 1915 British offer of Cyprus to Greece (and why Greece declined).
        </p>

        <p lang="en">
          <br />What happened:<br />
          In October 1915, as World War I widened and Serbia was under attack (after Bulgaria entered the war), 
          British Foreign Secretary Edward Grey authorized an offer to cede Cyprus to Greece if Greece would enter the war on 
          the Allied side (effectively, come to Serbia’s aid).
          The offer was conveyed in Athens by the British minister Sir Francis Elliot.
          Prime Minister Eleftherios Venizelos favored accepting; King Constantine I&mdash;committed to neutrality&mdash;refused, so Greece declined 
          and the offer lapsed.
        </p>

        <p lang="el">
          Τό ότι η Ελλάδα και η Κύπρος έχουν αποφασίσει να ενωθούν δεν είναι μία
          χειρονομία συμφιλίωσης αλλά μία διακήρυξη συνέχειας. Η ιδέα της <em>Ενωσης</em>
          αιωρείται επί μακρόν στη συλλογική συνείδηση και των δύο λαών,
          που μοιράζονται την ίδια γλώσσα, πίστη και πολιτιστική κληρονομιά. Η ένωσή
          τους δεν θεραπεύει ένα ρήγμα αλλά <strong>ολοκληρώνει μία φυσική πορεία
          τής ιστορίας</strong> που διακόπηκε από τήν αποικιοκρατία, τήν κατοχή και τίς
          γεωπολιτικές συγκυρίες. Για να κατανοήσει κανείς τόσο τό μέγεθος όσο και
          τήν μηχανική μίας τέτοιας ένωσης, μπορεί να στραφεί στο παράδειγμα τής
          Γερμανίας—ενός έθνους που, παρά δεκαετίες πολιτικού διαχωρισμού, πέτυχε
          τήν εθνική ολοκλήρωση με ειρηνικά και μεθοδικά μέσα.
        </p>
    


        <p lang="en">
          The fact that Greece and Cyprus are set to unite is not a gesture of
          reconciliation but a declaration of continuity. The idea of <em>Enosis</em>
          &mdash;union&mdash;has long lingered in the collective consciousness of both peoples,
          who share the same language, faith, and heritage. Their unity will not
          heal a rift but <strong>complete a natural arc of history</strong> that
          was interrupted by colonialism, occupation, and geopolitical circumstance.
          To understand both the magnitude and the mechanics of such a union, one
          may turn to the example of Germany&mdash;a nation that, despite decades of
          political separation, achieved national integration through peaceful and
          deliberate means.
        </p>
        

        <p lang="el">
          Η επανένωση τής Γερμανίας τό 1990 αποτελεί προηγούμενο επειδή και εκείνοι
          ήταν{" "}
          <strong>
            διηρημένοι από εξωτερικές δυνάμεις παρά τήν εσωτερική τους ομοιογένεια
          </strong>
          . Μετά τόν Δεύτερο Παγκόσμιο Πόλεμο, η Γερμανία διαιρέθηκε σε Ανατολή και
          Δύση, δύο κράτη που αντανακλούσαν ανταγωνιστικές ιδεολογίες. Ωστόσο, η
          πολιτισμική και γλωσσική ενότητα του γερμανικού έθνους δεν έπαψε ποτέ να
          υπάρχει. Η πτώση τού Τείχους τού Βερολίνου, σηματοδότησε τήν{" "}
          <strong>
            αποκατάσταση τής πολιτικής συνοχής ενός λαού που στην ουσία είχε παραμείνει ένας
          </strong>.
        </p>

        <p lang="en">
          Germany’s reunification in 1990 stands as a precedent because they too were{" "}
          <strong>divided by external forces despite internal sameness</strong>.
          After the Second World War, Germany was partitioned into East and West,
          two states reflecting competing ideologies. Yet the cultural and linguistic
          unity of the German nation never ceased to exist. When the Berlin Wall
          fell, it signaled the{" "}
          <strong>
            restoration of political coherence to a people who, in essence, had remained one
          </strong>.
        </p>

        <p lang="el">
          Για τήν Ελλάδα και τήν Κύπρο, η πορεία μοιάζει με αυτή τήν διαδικασία&mdash;όχι
          ως προς τά κίνητρα αλλά ως προς τήν μέθοδο. Προϋποθέτει πολιτικό συντονισμό,
          συνταγματικό σχεδιασμό και διεθνή διπλωματία στο πλαίσιο τής κοινής
          ευρωπαϊκής ιδιότητας μέλους. Ο στόχος είναι{" "}
          <strong>ένα δεδομένο πολιτισμικό φαινόμενο να αποκτήσει πολιτική υπόσταση</strong>.
        </p>

        <p lang="en">
          For Greece and Cyprus, the journey resembles this process&mdash;not in
          motivation but in method. It involves political coordination,
          constitutional design, and international diplomacy within the framework
          of shared European membership. The objective is to{" "}
          <strong>translate a cultural and historical fact into a political entity</strong>.
        </p>

        <h2 lang="el">Η Πορεία προς την Ένωση</h2>
        <p lang="el">
          Εφ’όσον η Ελλάδα και η Κύπρος ενώνονται, η διαδικασία πρέπει να είναι
          νομικά αυστηρή, διπλωματικά διεκδικητική και ιστορικά συνειδητή. Τα βήματα
          είναι σαφή, αν και απαιτητικά.
        </p>

        <h2 lang="en">The Path Toward Unification</h2>
        <p lang="en">
          Since Greece and Cyprus are set to unite, the process is to be legally
          rigorous, diplomatically assertive, and historically conscious. The
          steps are clear, though demanding.
        </p>

        <h3 lang="el">1. Συνταγματικές Τροποποιήσεις και στις Δύο Χώρες</h3>
        <p lang="el">
          Η πρώτη προϋπόθεση είναι η συνταγματική μεταρρύθμιση. Τόσο το{" "}
          <span className="font-semibold">Σύνταγμα τής Ελλάδας</span> όσο και το{" "}
          <span className="font-semibold">Σύνταγμα τής Κυπριακής Δημοκρατίας</span>{" "}
          χρειάζονται τροποποίηση ώστε να επιτραπεί ένα ενιαίο κυρίαρχο κρατικό σχήμα.
        </p>

        <h3 lang="en">1. Constitutional Amendments in Both Countries</h3>
        <p lang="en">
          The first requirement is constitutional reform. Both the{" "}
          <span className="font-semibold">Hellenic Constitution</span> and the{" "}
          <span className="font-semibold">Constitution of the Republic of Cyprus</span>{" "}
          need amendments to permit a single sovereign structure.
        </p>

        <p lang="el">
          Στην περίπτωση τής Ελλάδας, τό <strong>Άρθρο 27</strong> απαιτεί κάθε
          μεταβολή τής εθνικής επικράτειας να εγκρίνεται από τήν Βουλή, και{" "}
          τό <strong>Άρθρο 28</strong> ρυθμίζει τήν συμμετοχή τής χώρας σε
          υπερεθνικούς οργανισμούς. Για να αποτυπωθεί η νομική διαδρομή, μπορεί
          να γίνει αναφορά στο <strong>Άρθρο 23 τού Γερμανικού Συντάγματος</strong> (
          <em>Grundgesetz</em>, εφ’εξής<em>GG</em>), τό οποίο επέτρεψε στην
          Ομοσπονδιακή Δημοκρατία τής Γερμανίας να επεκτείνει τήν συνταγματική της
          τάξη σε άλλα γερμανικά εδάφη που επιθυμούσαν προσχώρηση. Δυνάμει τού
          άρθρου αυτού, η Γερμανική Λαϊκή Δημοκρατία (Ανατολική Γερμανία)
          προσχώρησε στην Ομοσπονδιακή Δημοκρατία χωρίς να δημιουργηθεί νέο κράτος·
          τό υφιστάμενο απλώς επεκτάθηκε <em>[Art. 23 GG]</em>. Δηλαδή, η Ελλάδα θα 
          υπερψηφίσει άμεσα μία τροποποίηση τού Συντάγματος παρόμοια με το άρθρο 23 τού Γερμανικού Συντάγματος.
        </p>

        <p lang="en">
          In Greece’s case, <strong>Article 27</strong> requires that any
          alteration of national territory be approved by Parliament, and{" "}
          <strong>Article 28</strong> governs the country’s participation in
          supranational organizations. To model the legal pathway, one may refer
          to <strong>Article 23 of the German Basic Law</strong> (
          <em>Grundgesetz</em>, hereafter <em>GG</em>), which allowed the Federal
          Republic of Germany to extend its constitutional order to other German
          territories that desired accession. Under that article, the German
          Democratic Republic (East Germany) entered the Federal Republic without
          creating a new state; the existing one merely expanded <em>[Art. 23 GG]</em>. 
          That is, Greece is about to promptly pass a constitutional amendment similar to Article 23 of the German Constitution.
        </p>

        <p lang="el">
          Η Κύπρος θα καταργήσει ή θα αντικαταστήσει τό 
          <strong>Άρθρο 186</strong> τού Συντάγματός της, τό οποίο ρητώς απαγορεύει
          «τήν ολική ή μερική ένωση τής Κύπρου με οποιοδήποτε άλλο κράτος»{" "}
          <em>[Αρθρο 186 Σύνταγμα τής Κυπριακής Δημοκρατίας.]</em>. Η διάταξη αυτή, που εισήχθη στο
          συνταγματικό πλαίσιο τού 1960, αποσκοπούσε στη διατήρηση τής ανεξαρτησίας
          βάσει της <span className="font-semibold">Συνθήκης Εγγυήσεως</span>. Ωστόσο,
          η εισβολή της Τουρκίας τό 1974 στην Κύπρο και η συνεχιζόμενη κατοχή συνιστούν σοβαρή
          παραβίαση τής ίδιας αυτής συνθήκης. Συνεπώς, η Ελλάδα και η Κύπρος μπορούν να
          υποστηρίξουν ενώπιον του{" "}
          <span className="font-semibold">Διεθνούς Δικαστηρίου τής Δικαιοσύνης</span>{" "}
          (ICJ) ότι τό Άρθρο 186 έχει απολέσει τήν δεσμευτική του ισχύ, διότι το
          θεμέλιό του &mdash; η διαφύλαξη τής κυριαρχίας και τής εδαφικής ακεραιότητας &mdash; 
          έχει παραβιαστεί από μία εκ τών ιδίων εγγυητριών δυνάμεων.
        </p>

        <p lang="en">
          Cyprus is set to remove or supersede <strong>Article 186</strong> of
          its Constitution, which explicitly forbids “the integral or partial union
          of Cyprus with any other State” <em>[Art. 186 Cyprus Const.]</em>. This
          provision, introduced under the 1960 constitutional framework, was meant
          to preserve independence under the <span className="font-semibold">Treaty of Guarantee</span>.
          Yet Turkey’s 1974 invasion and continued occupation constitute a grave
          breach of that very treaty. Cyprus can therefore argue before the{" "}
          <span className="font-semibold">International Court of Justice</span>{" "}
          (ICJ) that Article 186 has lost its binding force because its foundation&mdash;
          the preservation of sovereignty and territorial integrity&mdash;has been violated
          by one of the guarantor powers itself.
        </p>

        <p lang="el">
          Μόλις αυτό τό εμπόδιο αρθεί μέσω δικαστικής και συνταγματικής αναθεώρησης,
          οι δύο χώρες θα συντάξουν εξουσιοδοτικές τροποποιήσεις που θα 
          προβλέπουν ένα ενιαίο πολιτειακό σχήμα υπό την{" "}
          <span className="font-semibold">Ελληνική Δημοκρατία</span>, με διοικητική
          αυτονομία για τήν Κύπρο εντός ενός ενιαίου κράτους.
        </p>

        <p lang="en">
          Once this obstacle is lifted through judicial and constitutional revision,
          both countries could draft enabling amendments providing for a single
          polity under the <span className="font-semibold">Hellenic Republic</span>, with
          administrative autonomy for Cyprus within a unified state.
        </p>

        <h3 lang="el">2. Διπλά Δημοψηφίσματα και το Δικαίωμα τής Αυτοδιάθεσης</h3>
        <p lang="el">
          Η δημοκρατία πρέπει να επισφραγίσει τήν ένωση. Ξεχωριστά δημοψηφίσματα στην
          Ελλάδα και στην Κύπρο παιτούνται για να εκφραστεί η κυρίαρχη βούληση τών
          λαών. Αυτές οι λαϊκές ψηφοφορίες θα επιβεβαίωναν ότι η ενοποίηση προκύπτει από
          ελεύθερη επιλογή και όχι από εξωτερική επιβολή.
        </p>

        <h3 lang="en">2. Dual Referenda and the Right of Self-Determination</h3>
        <p lang="en">
          Democracy must consecrate unity. Separate referenda in Greece and Cyprus
          αρε required to express the peoples’ sovereign will. These plebiscites
          would affirm that unification arises from free choice, not external
          imposition.
        </p>

        <blockquote lang="el">
          <p>
            <strong>Άρθρο 1(2) τού Χάρτη των Ηνωμένων Εθνών</strong>: «Να αναπτύσσονται φιλικές σχέσεις μεταξύ τών εθνών με βάση τόν σεβασμό 
            τής αρχής τής ισότητας τών δικαιωμάτων και τής <strong>αυτοδιάθεσης τών λαών</strong>, και να λαμβάνει άλλα κατάλληλα μέτρα για τήν ενίσχυση 
            τής παγκόσμιας ειρήνης.» <em> [Art. 1(2) UN Charter]</em>
          </p>
        </blockquote>

        <blockquote lang="en">
          <p>
            <strong>Article 1(2) of the Charter of the United Nations</strong>: “To develop friendly relations among 
            nations based on respect for the principle of equal rights and <strong>self-determination of peoples</strong>, and to take 
            other appropriate measures to strengthen universal peace.” <em> [Art. 1(2) UN Charter]</em>
          </p>
        </blockquote>

        <p lang="el">
          Αυτή η αρχή παρέχει σε κάθε λαό τό δικαίωμα να καθορίζει τό πολιτικό του
          καθεστώς και να επιδιώκει τήν ανάπτυξή του. Για τούς Έλληνες τής Κύπρου, συμπεριλαμβανομένων και τών γνησίων Τουρκοκυπρίων&mdash;
          που μοιράζονται αδιάσπαστη γλωσσική, πολιτιστική, και εθνική ταυτότητα με
          τήν Ελλάδα&mdash;η αυτοδιάθεση σημαίνει τό δικαίωμα να επιλέξουν ελεύθερα τήν
          πολιτική ένωση με τήν μητέρα πατρίδα.
        </p>

        <p lang="en">
          This principle grants every people the right to determine their political
          status and to pursue their development. For the Greek people of Cyprus, including genuine Turkish Cypriots&mdash;
          sharing an unbroken linguistic, cultural, and national identity with Greece&mdash;
          self-determination means the right to freely choose political union with
          the motherland.
        </p>

        <p lang="el">
          Με αυτή την έννοια, η ενοποίηση δεν παραβιάζει τό διεθνές δίκαιο αλλά{" "}
          <strong>το εκπληρώνει</strong>. Μετατρέπει μία ήδη υπάρχουσα
          πολιτισμική ενότητα σε συνταγματική πραγματικότητα, ακριβώς όπως συνέβη
          στη Γερμανία όταν Ανατολικοί και Δυτικοί Γερμανοί εξέφρασαν τήν βούλησή τους
          μέσω ελεύθερων κοινοβουλευτικών και λαϊκών ψηφοφοριών τό 1990.
        </p>

        <p lang="en">
          In this sense, unification does not contravene international law but{" "}
          <strong>fulfills it</strong>. It transforms an existing cultural unity
          into constitutional reality, exactly as Germany did when East and West
          Germans expressed their will through free parliamentary and popular votes
          in 1990.
        </p>

        <h3 lang="el">3. Η Συνθήκη Εγγυήσεως και το Διεθνές Δικαστήριο</h3>
        <p lang="el">
          Η <span className="font-semibold">Συνθήκη Εγγυήσεως</span> τού 1960, που
          υπογράφηκε από τήν Ελλάδα, τήν Τουρκία και τό Ηνωμένο Βασίλειο, αποσκοπούσε
          στη διασφάλιση τής ανεξαρτησίας και τής εδαφικής ακεραιότητας τής Κύπρου.
          Ωστόσο, <strong>τό Άρθρο I</strong>{" "} τής συνθήκης απαγορεύει σε οποιαδήποτε
          από τίς εγγυήτριες δυνάμεις να προωθεί τήν διχοτόμηση ή τήν ένωση. Με τήν 
          διατήρηση στρατιωτικής κατοχής τού βόρειου τμήματος τής Κύπρου επί μισό
          αιώνα, η Τουρκία έχει ουσιωδώς παραβιάσει αυτήν τήν υποχρέωση,{" "}
          καθιστώντας έτσι <strong>τήν συνθήκη άκυρη λόγω παραβίασης της</strong>.
        </p>



        <h3 lang="en">3. The Treaty of Guarantee and the International Court</h3>
        <p lang="en">
          The 1960 <span className="font-semibold">Treaty of Guarantee</span>, signed
          by Greece, Turkey, and the United Kingdom, sought to protect Cyprus’s
          independence and territorial integrity. However, <strong>Article I</strong>{" "}
          of that treaty forbids any of the guarantor powers from promoting partition
          or union. By maintaining a military occupation of Northern Cyprus for half
          a century, Turkey has materially violated this obligation, thereby{" "}
          <strong>nullifying the treaty through breach</strong>.
        </p>












{/* Pair 1 */}
      <p lang="el">
        Ο υποκριτικός ισχυρισμός τής Τουρκίας ότι εισέβαλε στην Κύπρο διότι
        πρώτη η Ελλάδα παραβίασε τήν Συνθήκη επιχειρώντας πραξικόπημα για να
        επιτύχει τήν Ένωση με τήν Ελλάδα δεν αντέχει στη λογική, διότι είναι
        γνωστά γεγονότα ότι οι ΗΠΑ ενορχήστρωσαν τό στρατιωτικό πραξικόπημα
        στην Αθήνα, υπό τήν άγρυπνη επιτήρηση τού σοβαρά ηθικά
        ακρωτηριασμένου Κίσινγκερ, ακριβώς για να διχοτομήσουν τήν Κύπρο. Η
        ελληνική ψευδοκυβέρνηση τών δικτατόρων δεν ήταν νόμιμη. Τόσο ο Νίξον
        όσο και ο Κίσινγκερ ήταν παγκοσμίως γνωστοί για την ελεεινή τους
        ηθική υπόσταση.
      </p>
      <p lang="en">
        The hypocritical claim by Turkey that it invaded Cyprus because Greece
        first violated the Treaty by attempting a coup to achieve Union with
        Greece does not withstand logic, because it is well known that the
        United States orchestrated the military coup in Athens&mdash;under the
        watchful supervision of Kissinger&mdash;an individual severely maimed in ethical terms&mdash;
        precisely to partition Cyprus. The Greek pseudo-government of the
        dictators was not legitimate. Both Nixon and Kissinger were globally
        known for their wretched moral standing of lowlifes.
      </p>

      {/* Pair 2 */}
      <p lang="el">
        Τό σκάνδαλο Γουότεργκεϊτ ανάγκασε τόν Νίξον να παραιτηθεί, για να
        αποφύγει τή φυλακή και τήν διασυρμό ή και τή δολοφονία του. Ήταν η πρώτη φορά&mdash;και έως τώρα η τελευταία&mdash;που
        Αμερικανός πρόεδρος εν ενεργεία παραιτήθηκε.
      </p>
      <p lang="en">
        The Watergate scandal forced Nixon to resign to avoid prison and 
        disgrace, or even his own assassination. It was the first time&mdash;and so far the last&mdash;an acting U.S. president resigned.
      </p>

      {/* Pair 3 */}
      <p lang="el">
        Ο αντιπρόεδρος επί Νίξον, Σπύρος Άγκνιου, παραιτήθηκε επίσης έναν χρόνο
        πριν από τόν Νίξον, επειδή του απαγγέλθηκαν κατηγορίες για
        φοροδιαφυγή και δωροδοκία.
      </p>
      <p lang="en">
        Vice President under Nixon, Spiro Agnew, also resigned a year before
        Nixon did because he was charged with tax evasion and bribery.
      </p>



      {/* Pairs for the points (A–H) as paragraphs */}
            <p lang="el">O Κίσινγκερ είναι υπεύθυνος:</p>

            <p lang="en">Kissinger is responsible for:</p>

      <p lang="el">
        <strong>Α.</strong> Για φρικαλεότητες στο Βιετνάμ και στην Καμπότζη
        (1969–1973).
      </p>
      <p lang="en">
        <strong>A.</strong> Atrocities in Vietnam and Cambodia (1969–1973).
      </p>

      <p lang="el">
        <strong>Β.</strong> Για τό πραξικόπημα στη Χιλή (1973).
      </p>
      <p lang="en">
        <strong>B.</strong> The coup in Chile (1973).
      </p>

      <p lang="el">
        <strong>Γ.</strong> Για τίς σφαγές στο Μπαγκλαντές
        (1971).
      </p>
      <p lang="en">
        <strong>C.</strong> For the massacres in Bangladesh (1971).
      </p>

      <p lang="el">
        <strong>Δ.</strong> Για τήν εισβολή τής Τουρκίας στην Κύπρο.
      </p>
      <p lang="en">
        <strong>D.</strong> Turkey’s invasion of Cyprus.
      </p>

      <p lang="el">
        <strong>Ε.</strong> Για τήν οργάνωση και έγκριση τής εισβολή τής Ινδονησίας στο
        Ανατολικό Τιμόρ.
      </p>
      <p lang="en">
        <strong>E.</strong> Organizing and approving Indonesia’s invasion of East
        Timor.
      </p>

      <p lang="el">
        <strong>Ζ.</strong> Για τόν Συντονισμό τής επιχείρησης «Κόνδωρ» στην Λατινική
        Αμερική (1975–1990).
      </p>
      <p lang="en">
        <strong>F.</strong> The coordination of Operation Condor in Latin America
        (1975–1990).
      </p>

      

      <p lang="el">
        <strong>Η.</strong> Υπάρχουν αδιάσειστες αποδείξεις ότι ο Κίσινγκερ
        διευκόλυνε παράνομες δραστηριότητες τών ισραηλινών μυστικών υπηρεσιών·
        γι’ αυτό το Ισραήλ εξήγαγε μεγάλες ποσότητες όπλων στην Λατινική Αμερική
        κατά τη διάρκεια τής επιχείρησης «Κόνδωρ». Είχε στενές και κρυφές
        επαφές με τήν Γκόλντα Μέιρ, τόν Γιτσάκ Ράμπιν και τόν Μοσέ Νταγιάν.
        Ο Κίσινγκερ θεωρείται υπεύθυνος για τήν ενσωμάτωση τών ισραηλινών
        μυστικών υπηρεσιών στην επίσημη αμερικανική εξωτερική πολιτική.
      </p>
      <p lang="en">
        <strong>G.</strong> There is irrefutable evidence that Kissinger
        facilitated illegal activities of Israeli intelligence services; hence
        Israel exported large quantities of weapons to Latin America during
        Operation Condor. He had close and secret contacts with Golda Meir,
        Yitzhak Rabin, and Moshe Dayan. Kissinger is regarded as responsible for
        integrating Israeli intelligence into official U.S. foreign policy.
      </p>

      {/* Conclusion pair */}
      <p lang="el">
        Το συμπέρασμα είναι ότι οι δικτατορικές κυβερνήσεις στην Ελλάδα
        (1967–1974) ήταν παράνομες και υποκινούμενες από άτομα ευτελούς αξίας
        στις Ηνωμένες Πολιτείες, και οι δικαστές στο Διεθνές Δικαστήριο τά
        γνωρίζουν αυτά και δεν θα δεχθούν τήν υποκριτική επιχειρηματολογία τής
        Τουρκίας.
      </p>
      <p lang="en">
        The conclusion is that the dictatorial governments in Greece
        (1967–1974) were illegal and instigated by people of paltry worth in
        the United States, and the judges at the International Court are aware
        of these facts and will not accept Turkey’s hypocritical argumentation.
      </p>


<p lang="el">
        <strong>Ζ.</strong> Είναι πάντως αλήθεια ότι όπως κι αν προσεγγίσουμε το ζήτημα της Συνθήκης των Εγγυητριών Δυνάμεων, 
        η συνθήκη έχει εκ των πραγμάτων καταλυθεί και ο ελληνικός, ο ελληνοκυπριακός και ο τουρκοκυπριακός λαός αξίζουν καλύτερη τύχη.
      </p>
      <p lang="en">
        <strong>F.</strong> It is true though that however we approach the issue of the Treaty of the Guarantor Powers, the treaty has, in effect, 
        been nullified, and the Greek, Greek Cypriot, and Turkish Cypriot peoples deserve a better future.
      </p>












        <p lang="el">
          Η νόμιμη ενέργεια, λοιπόν, είναι η Ελλάδα και η Κύπρος να φέρουν από κοινού το
          ζήτημα ενώπιον τού{" "}
          <span className="font-semibold">Διεθνούς Δικαστηρίου</span>.
          Τό Δικαστήριο θα κρίνει ότι η συνθήκη δεν είναι πλέον έγκυρη,
          επειδή ένας εκ τών συμβαλλομένων τήν παραβιάζει 50 συνεχόμενα χρόνια και επιδιώκει απροκάλυπτα ανεξάρτητο Τουρκοκυπριακό κράτος.
          Μία τέτοια απόφαση θα αφαιρούσε τό τελευταίο νομικό εμπόδιο για τήν ένωση
          και θα επαναβεβαίωνε τό δικαίωμα τού κυπριακού λαού να ασκήσει τό δικαίωμα αυτοδιάθεσης 
          σύμφωνα με τό άρθρο <em>Art. 1(2) τού Χάρτη τών Ηνωμένων Εθνών</em>.
        </p>

        <p lang="en">
          The lawful response, then, is for Greece and Cyprus jointly to bring the
          matter before the <span className="font-semibold">International Court of Justice</span>.
          The Court will determine that the treaty is no longer valid because one
          of its signatories has persistently violated it for 50 consecutive years. Such a ruling will remove
          the final legal barrier to unification and reaffirm the right of the Cypriot
          people to exercise self-determination under <em>Art. 1(2) of the UN Charter</em>.
        </p>

        <h3 lang="el">4. Διάλυση τής Κυπριακής Δημοκρατίας</h3>
        <p lang="el">
          Μετά τίς συνταγματικές και διεθνείς διευθετήσεις, η{" "}
          <span className="font-semibold">Κυπριακή Δημοκρατία</span> διαλύεται με
          πράξη τού κοινοβουλίου της, μεταβιβάζοντας όλα τά κυριαρχικά δικαιώματα και
          υποχρεώσεις στην{" "}
          <span className="font-semibold">Ελληνική Δημοκρατία</span>. Όλοι οι Κύπριοι
          πολίτες θα αποκτούσαν αυτομάτως τήν ελληνική ιθαγένεια.
        </p>

        <h3 lang="en">4. Dissolution of the Republic of Cyprus</h3>
        <p lang="en">
          Following the constitutional and international adjustments, the{" "}
          <span className="font-semibold">Republic of Cyprus</span> ςιλλ dissolve by
          act of its parliament, transferring all sovereign rights and obligations to
          the <span className="font-semibold">Hellenic Republic</span>. All Cypriot
          citizens wιλλ automatically acquire Greek citizenship.
        </p>

        <p lang="el">
          Αυτό θα αντανακλά τόν νομικό μηχανισμό που χρησιμοποιήθηκε από τήν
          Ανατολική Γερμανία τό 1990, όπου η Γερμανική Λαοκρατική Δημοκρατία{" "}
          <em>προσχώρησε</em> στην Ομοσπονδιακή Δημοκρατία βάσει τού{" "}
          <strong>Art. 23 GG</strong>, αντί να δημιουργηθεί νέο κράτος. Η Ελλάδα θα
          παραμείνει η συνεχής οντότητα τού διεθνούς δικαίου, διευρυμένο εδαφικά ώστε
          να περιλαμβάνει τήν Κύπρο.
        </p>

        <p lang="en">
          This will mirror the legal mechanism used by East Germany in 1990, where
          the German Democratic Republic <em>acceded</em> to the Federal Republic under{" "}
          <strong>Art. 23 GG</strong>, rather than creating a new entity. Greece will
          remain the continuous entity with regard to international law, enlarged territorially
          to include Cyprus.
        </p>

        <h3 lang="el">5. Επαναδιαπραγμάτευση τών Βρετανικών Βάσεων</h3>
        <p lang="el">
          Η ενοποίηση απαιτεί τήν επανεξέταση τής{" "}
          <span className="font-semibold">Συνθήκης Εγκαθίδρυσης</span> τού 1960, η οποία
          παραχώρησε στο Ηνωμένο Βασίλειο δύο Περιοχές Κυρίαρχων Βάσεων&mdash;Ακρωτήρι και
          Δεκέλεια. Δεδομένου ότι η πολιτική πραγματικότητα τού νησιού θα έχει αλλάξει,
          η Ελλάδα, ως τό συνεχές κράτος, θα μπορέσει να επιδιώξει νόμιμα{" "}
          <strong>τήν επαναδιαπραγμάτευση τών όρων</strong> αυτών τών βάσεων, είτε μέσω
          ρυθμίσεων αμοιβαίας άμυνας εντός τού ΝΑΤΟ είτε μέσω σταδιακής ανάκτησης
          δικαιοδοσίας. Στόχος δεν είναι η αντιπαράθεση αλλά ο επανακαθορισμός, ώστε
          οι βάσεις να μην συμβολίζουν πλέον εξάρτηση αλλά συνεργασία.
        </p>

        <h3 lang="en">5. Renegotiation of the British Bases</h3>
        <p lang="en">
          Unification requireσ revisiting the 1960{" "}
          <span className="font-semibold">Treaty of Establishment</span>, which granted
          Britain two Sovereign Base Areas&mdash;Akrotiri and Dhekelia. Since the political
          reality of the island will have changed, Greece, as the continuing state,
          could legitimately seek to <strong>renegotiate the terms</strong> of these
          bases, either by mutual defense arrangements within NATO or by gradual
          reclamation of jurisdiction. The goal would not be confrontation but
          redefinition, ensuring that the bases no longer symbolize dependency but
          cooperation.
        </p>

        <h3 lang="el">6. Συνέχεια τής Συμμετοχής τής Ελλάδας στους Διεθνείς Οργανισμούς</h3>
        <p lang="el">
          Επειδή η Κυπριακή Δημοκρατία θα προσχωρήσει στην Ελλάδα και δεν θα
          συγχωνευθεί ως ισότιμος εταίρος, <strong>η Ελλάδα θα διατηρήσει τίς
          υφιστάμενες έδρες της</strong> στα Ηνωμένα Έθνη, τήν Ευρωπαϊκή Ένωση και
          τό ΝΑΤΟ. Η ενοποίηση θα αναγνωρισθεί διεθνώς ως εσωτερική διεύρυνση
          υφιστάμενου κράτους-μέλους, ακριβώς όπως στην περίπτωση τής Γερμανίας.
          Αυτό διασφαλίζει θεσμική συνέχεια και αποτρέπει διπλωματικές αναταράξεις.
        </p>

        <h3 lang="en">6. Continuity of Greece’s International Memberships</h3>
        <p lang="en">
          Because the Republic of Cyprus wιλλ accede to Greece, not merge as an
          equal partner, <strong>Greece wιλλ retain its existing seats</strong> in
          the United Nations, European Union, and NATO. The unification wιλλ be
          recognized internationally as an internal enlargement of an existing member
          state, exactly as in Germany’s case. This ensures institutional continuity
          and prevents diplomatic disruption.
        </p>

        <h3 lang="el">7. Συμπερίληψη τού Κατεχόμενου Τμήματος</h3>
        <p lang="el">
          Τέλος, τό κατεχόμενο βόρειο τμήμα τής Κύπρου αντιμετωπίζεται ως
          αναπόσπαστο μέρος τού ενιαίου κράτους. Νομικά, η Κυπριακή Δημοκρατία ήδη
          διατηρεί κυριαρχία επί ολόκληρου τού νησιού, και μία απόφαση τού
          Διεθνούς Δικαστηρίου (ICJ) θα ενισχύσει αυτή τήν θέση. Με τήν
          ενοποίηση, η Ελληνική Δημοκρατία θα κληρονομήσει τά ίδια νομικά δικαιώματα
          και υποχρεώσεις, με τελική αποκατάσταση τής πλήρους διοίκησης σύμφωνα με τό διεθνές δίκαιο.
        </p>

        <h3 lang="en">7. Inclusion of the Occupied Territory</h3>
        <p lang="en">
          Finally, the occupied northern part of Cyprus is treated as an
          inseparable part of the unified state. Legally, the Republic of Cyprus
          already retains sovereignty over the whole island, and a ruling from the
          ICJ will strengthen this position. Upon unification, the Hellenic Republic
          will inherit the same legal rights and responsibilities, with eventual
          restoration of full administration according to international law.
        </p>

        <h2 lang="el">Συμπέρασμα</h2>
        <p lang="el">
          Η ένωση μεταξύ Ελλάδας και Κύπρου δεν δημιουργεί ένα νέο έθνος αλλά{" "}
          <strong>
            αποκαθιστά τήν πολιτική συνοχή ενός λαού που είναι ήδη ενωμένος μέσω  
            γλώσσας, ιστορίας, παραδόσεων και πίστης
          </strong>
          . Η εμπειρία τής Γερμανίας δείχνει ότι η ενότητα που επιτυγχάνεται μέσω
          τής νομιμότητας, τής δημοκρατίας και τής συναίνεσης διαρκεί. Τό
          συνταγματικό πρότυπο τού{" "}
          <strong>Αρθρου 23 τού Γερμανικού Συντάγματος</strong>, η άρση τού κωλύματος που θέτει τό{" "}
          <strong>Αρθρο 186 τού Κυπριακού Συντάγματος</strong>, και η αδιαπραγμάτευτη
          αρχή τής <strong>αυτοδιάθεσης κατά το Αρθορ  1(2) τού Χάρτη τών Ηνωμένων Εθνών</strong>{" "}
          παρέχουν από κοινού τό πλαίσιο για νόμιμη και ειρηνική ενοποίηση.
        </p>

        <h2 lang="en">Conclusion</h2>
        <p lang="en">
          A union between Greece and Cyprus does not create a new nation but{" "}
          <strong>
            restores political coherence to a people already united by language, history, traditions, and faith
          </strong>
          . Germany’s experience demonstrates that unity achieved through legality, democracy, and consent endures.
          The constitutional paradigm of{" "}
          <strong>Art. 23 GG</strong>, the rectification of{" "}
          <strong>Art. 186 of the Cypriot Constitution</strong>, and the universal principle of{" "}
          <strong>self-determination under Art. 1(2) of the UN Charter</strong>{" "}
          together provide the framework for lawful and peaceful unification.
        </p>

        <p lang="el">
          Μέσω συνταγματικής αναθεώρησης, δημοψηφισμάτων, διεθνούς δικαστικής
          επίλυσης και διπλωματικής διαπραγμάτευσης, η Ελλάδα και η Κύπρος μπορούν νόμιμα και ειρηνικά να επιτύχουν τήν ενότητα που η ιστορία έχει
          επί μακρόν αναβάλει. Η ένωσή τους δεν θα εξαφανίσει τίς ιδομορφίες αλλά θα
          ολοκληρώσει τήν συνέχεια του Ελληνισμού&mdash;<strong>μια φυσική ολοκλήρωση</strong>.
        </p>

        <p lang="en">
          Through constitutional amendment, referenda, international adjudication,
          and diplomatic negotiation, Greece and Cyprus can lawfully and peacefully
          achieve the unity that history has long postponed. Their union will not
          erase peculiarities but complete the continuity of Hellenism—<strong>a natural continuity</strong>.
        </p>
      
  </AutoLangGroups>

      </LangShow>


      {/* Client-only controls */}
      <ShareBar href={href} title={shareTitle} />
    </article>
  );
}
