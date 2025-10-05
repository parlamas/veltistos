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


export default function Page() {
  const href = "/stories/union";
  const titleGR = "Η Ελλάδα και η Κύπρος Ενώνονται";
  const titleEN = "Greece and Cyprus are set to unite.";
  const shareTitle = titleGR; // use when a single string is needed (Share/TTS/etc.)

  return (
    <article
      id="story-content"
      lang="el"
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
<DualTTSBar
  targetEl="#story-content [data-tts-el]"
  targetEn="#story-content [data-tts-en]"
/>


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
        <p lang="el">
          Η βρετανική προσφορά του 1915 για παραχώρηση της Κύπρου στην Ελλάδα (και γιατί η Ελλάδα αρνήθηκε)
        </p>

        <p lang="el">
          <br />Τι συνέβη.<br />
          Τον Οκτώβριο του 1915, καθώς ο Α΄ Παγκόσμιος Πόλεμος διευρυνόταν και η Σερβία δεχόταν επίθεση (έπειτα από την είσοδο της Βουλγαρίας στον πόλεμο),
          ο Βρετανός Υπουργός Εξωτερικών Έντουαρντ Γκρέι ενέκρινε μια πρόταση να παραχωρηθεί η Κύπρος στην Ελλάδα εφόσον η Ελλάδα θα έμπαινε στον πόλεμο
          στο πλευρό των Συμμάχων (ουσιαστικά, για να συνδράμει τη Σερβία).
          Η προσφορά διαβιβάστηκε στην Αθήνα από τον Βρετανό πρεσβευτή σερ Φράνσις Έλιοτ.
          Ο πρωθυπουργός Ελευθέριος Βενιζέλος τάχθηκε υπέρ της αποδοχής· ο βασιλιάς Κωνσταντίνος Α&rsquo;&mdash;προσηλωμένος στην ουδετερότητα&mdash;αρνήθηκε,
          οπότε η Ελλάδα δεν την αποδέχθηκε και η προσφορά ξεχάσθηκε.
        </p>

        <p lang="en">
          The 1915 British offer of Cyprus to Greece (and why Greece declined)
        </p>

        <p lang="en">
          <br />What happened.<br />
          In October 1915, as World War I widened and Serbia was under attack (after Bulgaria entered the war), 
          British Foreign Secretary Edward Grey authorized an offer to cede Cyprus to Greece if Greece would enter the war on 
          the Allied side (effectively, come to Serbia’s aid).
          The offer was conveyed in Athens by the British minister Sir Francis Elliot.
          Prime Minister Eleftherios Venizelos favored accepting; King Constantine I&mdash;committed to neutrality&mdash;refused, so Greece declined 
          and the offer lapsed.
        </p>

        <p lang="el">
          Όταν η Ελλάδα και η Κύπρος αποφασίσουν να ενωθούν, αυτό δεν θα είναι μια
          χειρονομία συμφιλίωσης αλλά μια διακήρυξη συνέχειας. Η ιδέα της <em>Enosis</em>
          —ένωσης— αιωρείται επί μακρόν στη συλλογική συνείδηση και των δύο λαών,
          που μοιράζονται την ίδια γλώσσα, πίστη και πολιτιστική κληρονομιά. Η ένωσή
          τους δεν θα θεράπευε ένα ρήγμα αλλά θα <strong>ολοκλήρωνε μια φυσική πορεία
          της ιστορίας</strong> που διακόπηκε από την αποικιοκρατία, την κατοχή και τις
          γεωπολιτικές συγκυρίες. Για να κατανοήσει κανείς τόσο το μέγεθος όσο και
          τη μηχανική μιας τέτοιας ένωσης, μπορεί να στραφεί στο παράδειγμα της
          Γερμανίας—ενός έθνους που, παρά δεκαετίες πολιτικού διαχωρισμού, πέτυχε
          την εθνική ολοκλήρωση με ειρηνικά και μεθοδικά μέσα.
        </p>

        <p lang="en">
          When Greece and Cyprus decide to unite, it would not be a gesture of
          reconciliation but a declaration of continuity. The idea of <em>Enosis</em>
          —union—has long lingered in the collective consciousness of both peoples,
          who share the same language, faith, and heritage. Their unity would not
          heal a rift but <strong>complete a natural arc of history</strong> that
          was interrupted by colonialism, occupation, and geopolitical circumstance.
          To understand both the magnitude and the mechanics of such a union, one
          may turn to the example of Germany—a nation that, despite decades of
          political separation, achieved national integration through peaceful and
          deliberate means.
        </p>

        <p lang="el">
          Η επανένωση της Γερμανίας το 1990 αποτελεί προηγούμενο όχι επειδή ο
          γερμανικός λαός ήταν προηγουμένως εχθρικός μεταξύ του, αλλά επειδή και εκείνοι
          ήταν{" "}
          <strong>
            διαιρεμένοι από εξωτερικές δυνάμεις παρά την εσωτερική τους ομοιογένεια
          </strong>
          . Μετά τον Δεύτερο Παγκόσμιο Πόλεμο, η Γερμανία διαιρέθηκε σε Ανατολή και
          Δύση, δύο κράτη που αντανακλούσαν ανταγωνιστικές ιδεολογίες. Ωστόσο, η
          πολιτισμική και γλωσσική ενότητα του γερμανικού έθνους δεν έπαψε ποτέ να
          υπάρχει. Όταν έπεσε το Τείχος του Βερολίνου, συμβόλισε την{" "}
          <strong>
            αποκατάσταση της πολιτικής συνοχής ενός λαού που είχε παραμείνει ένας στην
            ουσία
          </strong>.
        </p>

        <p lang="en">
          Germany’s reunification in 1990 stands as a precedent not because the
          German people were enemies before, but because they too were{" "}
          <strong>divided by external forces despite internal sameness</strong>.
          After the Second World War, Germany was partitioned into East and West,
          two states reflecting competing ideologies. Yet the cultural and linguistic
          unity of the German nation never ceased to exist. When the Berlin Wall
          fell, it symbolized the{" "}
          <strong>
            restoration of political coherence to a people who had remained one in
            essence
          </strong>.
        </p>

        <p lang="el">
          Για την Ελλάδα και την Κύπρο, η πορεία θα έμοιαζε με αυτή τη διαδικασία—όχι
          ως προς τα κίνητρα αλλά ως προς τη μέθοδο. Θα προϋπέθετε πολιτικό συντονισμό,
          συνταγματικό σχεδιασμό και διεθνή διπλωματία στο πλαίσιο της κοινής
          ευρωπαϊκής ιδιότητας μέλους. Ο στόχος θα ήταν να{" "}
          <strong>μεταφραστεί ένα πολιτισμικό δεδομένο σε πολιτική μορφή</strong>.
        </p>

        <p lang="en">
          For Greece and Cyprus, the journey would resemble this process—not in
          motivation but in method. It would involve political coordination,
          constitutional design, and international diplomacy within the framework
          of shared European membership. The objective would be to{" "}
          <strong>translate a cultural fact into a political form</strong>.
        </p>

        <h2 lang="el">Η Πορεία προς την Ένωση</h2>
        <p lang="el">
          Εάν η Ελλάδα και η Κύπρος επρόκειτο να ενωθούν, η διαδικασία θα έπρεπε να είναι
          νομικά αυστηρή, διπλωματικά διεκδικητική και ιστορικά συνειδητή. Τα βήματα
          είναι σαφή, αν και απαιτητικά.
        </p>

        <h2 lang="en">The Path Toward Unification</h2>
        <p lang="en">
          If Greece and Cyprus were to unite, the process would have to be legally
          rigorous, diplomatically assertive, and historically conscious. The
          steps are clear, though demanding.
        </p>

        <h3 lang="el">1. Συνταγματικές Τροποποιήσεις και στις Δύο Χώρες</h3>
        <p lang="el">
          Η πρώτη προϋπόθεση είναι η συνταγματική μεταρρύθμιση. Τόσο το{" "}
          <span className="font-semibold">Σύνταγμα της Ελλάδας</span> όσο και το{" "}
          <span className="font-semibold">Σύνταγμα της Κυπριακής Δημοκρατίας</span>{" "}
          θα χρειάζονταν τροποποίηση ώστε να επιτραπεί ένα ενιαίο κυρίαρχο κρατικό σχήμα.
        </p>

        <h3 lang="en">1. Constitutional Amendments in Both Countries</h3>
        <p lang="en">
          The first requirement is constitutional reform. Both the{" "}
          <span className="font-semibold">Hellenic Constitution</span> and the{" "}
          <span className="font-semibold">Constitution of the Republic of Cyprus</span>{" "}
          would need amendment to permit a single sovereign structure.
        </p>

        <p lang="el">
          Στην περίπτωση της Ελλάδας, <strong>Άρθρο 27</strong> απαιτεί κάθε
          μεταβολή της εθνικής επικράτειας να εγκρίνεται από τη Βουλή, και{" "}
          <strong>Άρθρο 28</strong> ρυθμίζει τη συμμετοχή της χώρας σε
          υπερεθνικούς οργανισμούς. Για να αποτυπωθεί η νομική διαδρομή, μπορεί
          να γίνει αναφορά στο <strong>Άρθρο 23 του Γερμανικού Θεμελιώδους Νόμου</strong> (
          <em>Grundgesetz</em>, εφεξής <em>GG</em>), το οποίο επέτρεψε στην
          Ομοσπονδιακή Δημοκρατία της Γερμανίας να επεκτείνει τη συνταγματική της
          τάξη σε άλλα γερμανικά εδάφη που επιθυμούσαν προσχώρηση. Δυνάμει του
          άρθρου αυτού, η Γερμανική Λαοκρατική Δημοκρατία (Ανατολική Γερμανία)
          προσχώρησε στην Ομοσπονδιακή Δημοκρατία χωρίς να δημιουργηθεί νέο κράτος·
          το υφιστάμενο απλώς επεκτάθηκε <em>[Art. 23 GG]</em>.
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
        </p>

        <p lang="el">
          Η Κύπρος θα χρειαζόταν να καταργήσει ή να αντικαταστήσει το
          <strong>Άρθρο 186</strong> του Συντάγματός της, το οποίο ρητώς απαγορεύει
          «την ολική ή μερική ένωση της Κύπρου με οποιοδήποτε άλλο κράτος»{" "}
          <em>[Art. 186 Cyprus Const.]</em>. Η διάταξη αυτή, που εισήχθη στο
          συνταγματικό πλαίσιο του 1960, αποσκοπούσε στη διατήρηση της ανεξαρτησίας
          βάσει της <span className="font-semibold">Συνθήκης Εγγυήσεως</span>. Ωστόσο,
          η εισβολή της Τουρκίας το 1974 και η συνεχιζόμενη κατοχή συνιστούν σοβαρή
          παραβίαση της ίδιας αυτής συνθήκης. Συνεπώς, η Κύπρος θα μπορούσε να
          υποστηρίξει ενώπιον του{" "}
          <span className="font-semibold">Διεθνούς Δικαστηρίου της Δικαιοσύνης</span>{" "}
          (ICJ) ότι το Άρθρο 186 έχει απολέσει τη δεσμευτική του ισχύ, διότι το
          θεμέλιό του — η διαφύλαξη της κυριαρχίας και της εδαφικής ακεραιότητας —
          έχει παραβιαστεί από μία εκ των ίδιων των εγγυητριών δυνάμεων.
        </p>

        <p lang="en">
          Cyprus would need to remove or supersede <strong>Article 186</strong> of
          its Constitution, which explicitly forbids “the integral or partial union
          of Cyprus with any other State” <em>[Art. 186 Cyprus Const.]</em>. This
          provision, introduced under the 1960 constitutional framework, was meant
          to preserve independence under the <span className="font-semibold">Treaty of Guarantee</span>.
          Yet Turkey’s 1974 invasion and continued occupation constitute a grave
          breach of that very treaty. Cyprus could therefore argue before the{" "}
          <span className="font-semibold">International Court of Justice</span>{" "}
          (ICJ) that Article 186 has lost its binding force because its foundation—
          the preservation of sovereignty and territorial integrity—has been violated
          by one of the guarantor powers itself.
        </p>

        <p lang="el">
          Μόλις αυτό το εμπόδιο αρθεί μέσω δικαστικής ή συνταγματικής αναθεώρησης,
          οι δύο χώρες θα μπορούσαν να συντάξουν εξουσιοδοτικές τροποποιήσεις που να
          προβλέπουν ένα ενιαίο πολιτειακό σχήμα υπό την{" "}
          <span className="font-semibold">Ελληνική Δημοκρατία</span>, με διοικητική
          αυτονομία για την Κύπρο εντός ενός ενιαίου κράτους.
        </p>

        <p lang="en">
          Once this obstacle is lifted through judicial or constitutional revision,
          both countries could draft enabling amendments providing for a single
          polity under the <span className="font-semibold">Hellenic Republic</span>, with
          administrative autonomy for Cyprus within a unified state.
        </p>

        <h3 lang="el">2. Διπλά Δημοψηφίσματα και το Δικαίωμα της Αυτοδιάθεσης</h3>
        <p lang="el">
          Η δημοκρατία πρέπει να επισφραγίσει την ένωση. Ξεχωριστά δημοψηφίσματα στην
          Ελλάδα και στην Κύπρο θα απαιτούνταν για να εκφραστεί η κυρίαρχη βούληση των
          λαών. Αυτές οι λαϊκές ψηφοφορίες θα επιβεβαίωναν ότι η ενοποίηση προκύπτει από
          ελεύθερη επιλογή και όχι από εξωτερική επιβολή.
        </p>

        <h3 lang="en">2. Dual Referenda and the Right of Self-Determination</h3>
        <p lang="en">
          Democracy must consecrate unity. Separate referenda in Greece and Cyprus
          would be required to express the peoples’ sovereign will. These plebiscites
          would affirm that unification arises from free choice, not external
          imposition.
        </p>

        <blockquote lang="el">
          <p>
            <strong>Άρθρο 1(2) του Χάρτη των Ηνωμένων Εθνών</strong>: «Να αναπτύσσει φιλικές σχέσεις μεταξύ των εθνών με βάση τον σεβασμό της αρχής της ισότητας των δικαιωμάτων και της <strong>αυτοδιάθεσης των λαών</strong>, και να λαμβάνει άλλα κατάλληλα μέτρα για την ενίσχυση της παγκόσμιας ειρήνης.» <em> [Art. 1(2) UN Charter]</em>
          </p>
        </blockquote>

        <blockquote lang="en">
          <p>
            <strong>Article 1(2) of the Charter of the United Nations</strong>: “To develop friendly relations among nations based on respect for the principle of equal rights and <strong>self-determination of peoples</strong>, and to take other appropriate measures to strengthen universal peace.” <em> [Art. 1(2) UN Charter]</em>
          </p>
        </blockquote>

        <p lang="el">
          Αυτή η αρχή παρέχει σε κάθε λαό το δικαίωμα να καθορίζει το πολιτικό του
          καθεστώς και να επιδιώκει την ανάπτυξή του. Για τους Έλληνες της Κύπρου—
          που μοιράζονται αδιάσπαστη γλωσσική, πολιτιστική, και εθνική ταυτότητα με
          την Ελλάδα—η αυτοδιάθεση σημαίνει το δικαίωμα να επιλέξουν ελεύθερα την
          πολιτική ένωση με τη μητέρα πατρίδα.
        </p>

        <p lang="en">
          This principle grants every people the right to determine their political
          status and to pursue their development. For the Greek people of Cyprus—
          sharing an unbroken linguistic, cultural, and national identity with Greece—
          self-determination means the right to freely choose political union with
          the motherland.
        </p>

        <p lang="el">
          Με αυτή την έννοια, η ενοποίηση δεν θα παραβίαζε το διεθνές δίκαιο αλλά{" "}
          <strong>θα το εκπλήρωνε</strong>. Θα μετέτρεπε μια ήδη υπάρχουσα
          πολιτισμική ενότητα σε συνταγματική πραγματικότητα, ακριβώς όπως συνέβη
          στη Γερμανία όταν Ανατολικοί και Δυτικοί Γερμανοί εξέφρασαν τη βούλησή τους
          μέσω ελεύθερων κοινοβουλευτικών και λαϊκών ψηφοφοριών το 1990.
        </p>

        <p lang="en">
          In this sense, unification would not contravene international law but{" "}
          <strong>fulfill it</strong>. It would transform an existing cultural unity
          into constitutional reality, exactly as Germany did when East and West
          Germans expressed their will through free parliamentary and popular votes
          in 1990.
        </p>

        <h3 lang="el">3. Η Συνθήκη Εγγυήσεως και το Διεθνές Δικαστήριο</h3>
        <p lang="el">
          Η <span className="font-semibold">Συνθήκη Εγγυήσεως</span> του 1960, που
          υπογράφηκε από την Ελλάδα, την Τουρκία και το Ηνωμένο Βασίλειο, αποσκοπούσε
          στη διασφάλιση της ανεξαρτησίας και της εδαφικής ακεραιότητας της Κύπρου.
          Ωστόσο, <strong>το Άρθρο I</strong>{" "} της συνθήκης απαγορεύει σε οποιαδήποτε
          από τις εγγυήτριες δυνάμεις να προωθεί τη διχοτόμηση ή την ένωση. Με τη
          διατήρηση στρατιωτικής κατοχής του βόρειου τμήματος της Κύπρου επί μισό
          αιώνα, η Τουρκία έχει ουσιωδώς παραβιάσει αυτήν την υποχρέωση,{" "}
          καθιστώντας έτσι <strong>τη συνθήκη άκυρη λόγω παραβίασης</strong>.
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

        <p lang="el">
          Η νόμιμη ενέργεια θα ήταν η Ελλάδα και η Κύπρος να φέρουν από κοινού το
          ζήτημα ενώπιον του{" "}
          <span className="font-semibold">Διεθνούς Δικαστηρίου της Δικαιοσύνης</span>.
          Το Δικαστήριο θα μπορούσε να κρίνει ότι η συνθήκη δεν είναι πλέον έγκυρη,
          επειδή ένας εκ των συμβαλλομένων την έχει κατ’ επανάληψη παραβιάσει.
          Μια τέτοια απόφαση θα αφαιρούσε το τελευταίο νομικό εμπόδιο για την ένωση
          και θα επαναβεβαίωνε το δικαίωμα του κυπριακού λαού να ασκήσει την
          αυτοδιάθεση υπό το <em>Art. 1(2) of the UN Charter</em>.
        </p>

        <p lang="en">
          The lawful response would be for Greece and Cyprus jointly to bring the
          matter before the <span className="font-semibold">International Court of Justice</span>.
          The Court could determine that the treaty is no longer valid because one
          of its signatories has persistently violated it. Such a ruling would remove
          the final legal barrier to unification and reaffirm the right of the Cypriot
          people to exercise self-determination under <em>Art. 1(2) of the UN Charter</em>.
        </p>

        <h3 lang="el">4. Διάλυση της Κυπριακής Δημοκρατίας</h3>
        <p lang="el">
          Μετά τις συνταγματικές και διεθνείς προσαρμογές, η{" "}
          <span className="font-semibold">Κυπριακή Δημοκρατία</span> θα διαλυόταν με
          πράξη του κοινοβουλίου της, μεταβιβάζοντας όλα τα κυριαρχικά δικαιώματα και
          υποχρεώσεις στην{" "}
          <span className="font-semibold">Ελληνική Δημοκρατία</span>. Όλοι οι Κύπριοι
          πολίτες θα αποκτούσαν αυτομάτως την ελληνική ιθαγένεια.
        </p>

        <h3 lang="en">4. Dissolution of the Republic of Cyprus</h3>
        <p lang="en">
          Following the constitutional and international adjustments, the{" "}
          <span className="font-semibold">Republic of Cyprus</span> would dissolve by
          act of its parliament, transferring all sovereign rights and obligations to
          the <span className="font-semibold">Hellenic Republic</span>. All Cypriot
          citizens would automatically acquire Greek citizenship.
        </p>

        <p lang="el">
          Αυτό θα αντανακλούσε τον νομικό μηχανισμό που χρησιμοποιήθηκε από την
          Ανατολική Γερμανία το 1990, όπου η Γερμανική Λαοκρατική Δημοκρατία{" "}
          <em>προσχώρησε</em> στην Ομοσπονδιακή Δημοκρατία βάσει του{" "}
          <strong>Art. 23 GG</strong>, αντί να δημιουργηθεί νέο κράτος. Η Ελλάδα θα
          παρέμενε το συνεχές υποκείμενο του διεθνούς δικαίου, διευρυμένο εδαφικά ώστε
          να περιλαμβάνει την Κύπρο.
        </p>

        <p lang="en">
          This would mirror the legal mechanism used by East Germany in 1990, where
          the German Democratic Republic <em>acceded</em> to the Federal Republic under{" "}
          <strong>Art. 23 GG</strong>, rather than creating a new entity. Greece would
          remain the continuous subject of international law, enlarged territorially
          to include Cyprus.
        </p>

        <h3 lang="el">5. Επαναδιαπραγμάτευση των Βρετανικών Βάσεων</h3>
        <p lang="el">
          Η ενοποίηση θα απαιτούσε την επανεξέταση της{" "}
          <span className="font-semibold">Συνθήκης Εγκαθίδρυσης</span> του 1960, η οποία
          παραχώρησε στο Ηνωμένο Βασίλειο δύο Περιοχές Κυρίαρχων Βάσεων—Ακρωτήρι και
          Δεκέλεια. Δεδομένου ότι η πολιτική πραγματικότητα του νησιού θα είχε αλλάξει,
          η Ελλάδα, ως το συνεχές κράτος, θα μπορούσε νόμιμα να επιδιώξει{" "}
          <strong>την επαναδιαπραγμάτευση των όρων</strong> αυτών των βάσεων, είτε μέσω
          ρυθμίσεων αμοιβαίας άμυνας εντός του ΝΑΤΟ είτε μέσω σταδιακής ανάκτησης
          δικαιοδοσίας. Στόχος δεν θα ήταν η αντιπαράθεση αλλά ο επανακαθορισμός, ώστε
          οι βάσεις να μην συμβολίζουν πλέον εξάρτηση αλλά συνεργασία.
        </p>

        <h3 lang="en">5. Renegotiation of the British Bases</h3>
        <p lang="en">
          Unification would require revisiting the 1960{" "}
          <span className="font-semibold">Treaty of Establishment</span>, which granted
          Britain two Sovereign Base Areas—Akrotiri and Dhekelia. Since the political
          reality of the island would have changed, Greece, as the continuing state,
          could legitimately seek to <strong>renegotiate the terms</strong> of these
          bases, either by mutual defense arrangements within NATO or by gradual
          reclamation of jurisdiction. The goal would not be confrontation but
          redefinition, ensuring that the bases no longer symbolize dependency but
          cooperation.
        </p>

        <h3 lang="el">6. Συνέχεια των Διεθνών Συμμετοχών της Ελλάδας</h3>
        <p lang="el">
          Επειδή η Κυπριακή Δημοκρατία θα προσχωρούσε στην Ελλάδα και δεν θα
          συγχωνευόταν ως ισότιμος εταίρος, <strong>η Ελλάδα θα διατηρούσε τις
          υφιστάμενες έδρες της</strong> στα Ηνωμένα Έθνη, την Ευρωπαϊκή Ένωση και
          το ΝΑΤΟ. Η ενοποίηση θα αναγνωριζόταν διεθνώς ως εσωτερική διεύρυνση
          υφιστάμενου κράτους-μέλους, ακριβώς όπως στην περίπτωση της Γερμανίας.
          Αυτό διασφαλίζει θεσμική συνέχεια και αποτρέπει διπλωματικές αναταράξεις.
        </p>

        <h3 lang="en">6. Continuity of Greece’s International Memberships</h3>
        <p lang="en">
          Because the Republic of Cyprus would accede to Greece, not merge as an
          equal partner, <strong>Greece would retain its existing seats</strong> in
          the United Nations, European Union, and NATO. The unification would be
          recognized internationally as an internal enlargement of an existing member
          state, exactly as in Germany’s case. This ensures institutional continuity
          and prevents diplomatic disruption.
        </p>

        <h3 lang="el">7. Συμπερίληψη του Κατεχόμενου Τμήματος</h3>
        <p lang="el">
          Τέλος, το κατεχόμενο βόρειο τμήμα της Κύπρου πρέπει να αντιμετωπίζεται ως
          αναπόσπαστο μέρος του ενιαίου κράτους. Νομικά, η Κυπριακή Δημοκρατία ήδη
          διατηρεί κυριαρχία επί ολόκληρου του νησιού, και μια απόφαση του
          Διεθνούς Δικαστηρίου της Δικαιοσύνης (ICJ) θα ενίσχυε αυτή τη θέση. Με την
          ενοποίηση, η Ελληνική Δημοκρατία θα κληρονομούσε τα ίδια νομικά δικαιώματα
          και υποχρεώσεις, με τελική αποκατάσταση της πλήρους διοίκησης όταν
          εφαρμοστεί το διεθνές δίκαιο.
        </p>

        <h3 lang="en">7. Inclusion of the Occupied Territory</h3>
        <p lang="en">
          Finally, the occupied northern part of Cyprus must be treated as an
          inseparable part of the unified state. Legally, the Republic of Cyprus
          already retains sovereignty over the whole island, and a ruling from the
          ICJ would strengthen this position. Upon unification, the Hellenic Republic
          would inherit the same legal rights and responsibilities, with eventual
          restoration of full administration when international law is enforced.
        </p>

        <h2 lang="el">Συμπέρασμα</h2>
        <p lang="el">
          Μια ένωση μεταξύ Ελλάδας και Κύπρου δεν θα δημιουργούσε ένα νέο έθνος αλλά{" "}
          <strong>
            θα αποκαθιστούσε την πολιτική συνοχή ενός λαού που είναι ήδη ενωμένος από
            τη γλώσσα, την πίστη και την ιστορία
          </strong>
          . Η εμπειρία της Γερμανίας δείχνει ότι η ενότητα που επιτυγχάνεται μέσω
          της νομιμότητας, της δημοκρατίας και της συναίνεσης διαρκεί. Το
          συνταγματικό πρότυπο του{" "}
          <strong>Art. 23 GG</strong>, η άρση του κωλύματος που θέτει το{" "}
          <strong>Art. 186 του Κυπριακού Συντάγματος</strong>, και η καθολική
          αρχή της <strong>αυτοδιάθεσης κατά Art. 1(2) του Χάρτη των Ηνωμένων Εθνών</strong>{" "}
          παρέχουν από κοινού το πλαίσιο για νόμιμη και ειρηνική ενοποίηση.
        </p>

        <h2 lang="en">Conclusion</h2>
        <p lang="en">
          A union between Greece and Cyprus would not create a new nation but{" "}
          <strong>
            restore political coherence to a people already united by language, faith, and history
          </strong>
          . Germany’s experience demonstrates that unity achieved through legality, democracy, and consent endures.
          The constitutional model of{" "}
          <strong>Art. 23 GG</strong>, the rectification of{" "}
          <strong>Art. 186 of the Cypriot Constitution</strong>, and the universal principle of{" "}
          <strong>self-determination under Art. 1(2) of the UN Charter</strong>{" "}
          together provide the framework for lawful and peaceful unification.
        </p>

        <p lang="el">
          Μέσω συνταγματικής αναθεώρησης, δημοψηφισμάτων, διεθνούς δικαστικής
          επίλυσης και διπλωματικής διαπραγμάτευσης, η Ελλάδα και η Κύπρος θα
          μπορούσαν νόμιμα και ειρηνικά να επιτύχουν την ενότητα που η ιστορία έχει
          επί μακρόν αναβάλει. Η ένωσή τους δεν θα εξαφάνιζε τις διαφορές αλλά θα
          ολοκλήρωνε τη συνέχεια—<strong>μια φυσική ολοκλήρωση</strong>.
        </p>

        <p lang="en">
          Through constitutional amendment, referenda, international adjudication,
          and diplomatic negotiation, Greece and Cyprus could lawfully and peacefully
          achieve the unity that history has long postponed. Their union would not
          erase differences but complete continuity—<strong>μια φυσική ολοκλήρωση</strong>.
        </p>
      </LangShow>

      {/* Client-only controls */}
      <ShareBar href={href} title={shareTitle} />
    </article>
  );
}
