// src/app/stories/union/page.tsx
import Image from "next/image";
import ArticleExtras from "@/components/ArticleExtras";
import ArticleLangWrapper from "@/components/ArticleLangWrapper";

export default function Page() {
  const href = "/stories/union";
  const title = "Η Ελλάδα και η Κύπρος Ενώνονται";

  return (
    <article
      id="story-content"
      lang="el"
      className="prose prose-zinc max-w-none text-zinc-900"
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold leading-tight">
            {title}
          </h1>
          <p className="text-sm text-zinc-500">
            05.10.25 • Ενωση Ελλάδας και Κύπρου
          </p>
        </div>
      </header>

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

      {/* Language switch + content */}
      <ArticleLangWrapper>
        {/* GREEK VERSION */}
        <section className="lang-el" lang="el">
          <p>
            Η βρετανική προσφορά του 1915 για παραχώρηση της Κύπρου στην Ελλάδα (και γιατί η Ελλάδα αρνήθηκε)
          </p>

          <p>
            <br />Τι συνέβη.<br />
            Τον Οκτώβριο του 1915, καθώς ο Α΄ Παγκόσμιος Πόλεμος διευρυνόταν και η Σερβία δεχόταν επίθεση (έπειτα από την είσοδο της Βουλγαρίας στον πόλεμο),
            ο Βρετανός Υπουργός Εξωτερικών Έντουαρντ Γκρέι ενέκρινε μια πρόταση να παραχωρηθεί η Κύπρος στην Ελλάδα εφόσον η Ελλάδα θα έμπαινε στον πόλεμο
            στο πλευρό των Συμμάχων (ουσιαστικά, για να συνδράμει τη Σερβία).
            Η προσφορά διαβιβάστηκε στην Αθήνα από τον Βρετανό πρεσβευτή σερ Φράνσις Έλιοτ.
            Ο πρωθυπουργός Ελευθέριος Βενιζέλος τάχθηκε υπέρ της αποδοχής· ο βασιλιάς Κωνσταντίνος Α’—προσηλωμένος στην ουδετερότητα—αρνήθηκε,
            οπότε η Ελλάδα δεν την αποδέχθηκε και η προσφορά ξεχάσθηκε.
          </p>

          <p>
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

          <p>
            Η επανένωση της Γερμανίας το 1990 αποτελεί προηγούμενο όχι επειδή ο
            γερμανικός λαός ήταν προηγουμένως εχθρικός μεταξύ του, αλλά επειδή και εκείνοι
            ήταν <strong>διαιρεμένοι από εξωτερικές δυνάμεις παρά την εσωτερική τους ομοιογένεια</strong>.
            Μετά τον Δεύτερο Παγκόσμιο Πόλεμο, η Γερμανία διαιρέθηκε σε Ανατολή και
            Δύση, δύο κράτη που αντανακλούσαν ανταγωνιστικές ιδεολογίες. Ωστόσο, η
            πολιτισμική και γλωσσική ενότητα του γερμανικού έθνους δεν έπαψε ποτέ να
            υπάρχει. Όταν έπεσε το Τείχος του Βερολίνου, συμβόλισε την
            <strong> αποκατάσταση της πολιτικής συνοχής ενός λαού που είχε παραμείνει ένας στην ουσία</strong>.
          </p>

          <p>
            Για την Ελλάδα και την Κύπρο, η πορεία θα έμοιαζε με αυτή τη διαδικασία—όχι
            ως προς τα κίνητρα αλλά ως προς τη μέθοδο. Θα προϋπέθετε πολιτικό συντονισμό,
            συνταγματικό σχεδιασμό και διεθνή διπλωματία στο πλαίσιο της κοινής
            ευρωπαϊκής ιδιότητας μέλους. Ο στόχος θα ήταν να
            <strong> μεταφραστεί ένα πολιτισμικό δεδομένο σε πολιτική μορφή</strong>.
          </p>

          <hr />

          <h2>Η Πορεία προς την Ένωση</h2>
          <p>
            Εάν η Ελλάδα και η Κύπρος επρόκειτο να ενωθούν, η διαδικασία θα έπρεπε να είναι
            νομικά αυστηρή, διπλωματικά διεκδικητική και ιστορικά συνειδητή. Τα βήματα
            είναι σαφή, αν και απαιτητικά.
          </p>

          <h3>1. Συνταγματικές Τροποποιήσεις και στις Δύο Χώρες</h3>
          <p>
            Η πρώτη προϋπόθεση είναι η συνταγματική μεταρρύθμιση. Τόσο το{" "}
            <span className="font-semibold">Σύνταγμα της Ελλάδας</span> όσο και το{" "}
            <span className="font-semibold">Σύνταγμα της Κυπριακής Δημοκρατίας</span>{" "}
            θα χρειάζονταν τροποποίηση ώστε να επιτραπεί ένα ενιαίο κυρίαρχο κρατικό σχήμα.
          </p>

          <p>
            Στην περίπτωση της Ελλάδας, <strong>Άρθρο 27</strong> απαιτεί κάθε
            μεταβολή της εθνικής επικράτειας να εγκρίνεται από τη Βουλή, και{" "}
            <strong>Άρθρο 28</strong> ρυθμίζει τη συμμετοχή της χώρας σε
            υπερεθνικούς οργανισμούς. Για να αποτυπωθεί η νομική διαδρομή, μπορεί
            να γίνει αναφορά στο <strong>Άρθρο 23 του Γερμανικού Θεμελιώδους Νόμου</strong> (
            <em>Grundgesetz</em>, εφεξής <em>GG</em>), το οποίο επέτρεψε στην
            Ομοσπονδιακή Δημοκρατία της Γερμανίας να επεκτείνει τη συνταγματική της
            τάξη σε άλλα γερμανικά εδάφη που επιθυμούσαν προσχώρηση… <em>[Art. 23 GG]</em>.
          </p>

          <p>
            Η Κύπρος θα χρειαζόταν να καταργήσει ή να αντικαταστήσει το{" "}
            <strong>Άρθρο 186</strong> του Συντάγματός της, το οποίο ρητώς απαγορεύει
            «την ολική ή μερική ένωση της Κύπρου με οποιοδήποτε άλλο κράτος»{" "}
            <em>[Art. 186 Cyprus Const.]</em>. … (ICJ) ότι το Άρθρο 186 έχει απολέσει τη
            δεσμευτική του ισχύ διότι το θεμέλιό του παραβιάστηκε από εγγυήτρια δύναμη.
          </p>

          <p>
            Μόλις αυτό το εμπόδιο αρθεί μέσω δικαστικής ή συνταγματικής αναθεώρησης,
            οι δύο χώρες θα μπορούσαν να συντάξουν εξουσιοδοτικές τροποποιήσεις που να
            προβλέπουν ένα ενιαίο πολιτειακό σχήμα υπό την{" "}
            <span className="font-semibold">Ελληνική Δημοκρατία</span>, με διοικητική
            αυτονομία για την Κύπρο εντός ενός ενιαίου κράτους.
          </p>

          <h3>2. Διπλά Δημοψηφίσματα και το Δικαίωμα της Αυτοδιάθεσης</h3>
          <p>
            Η δημοκρατία πρέπει να επισφραγίσει την ένωση. Ξεχωριστά δημοψηφίσματα στην
            Ελλάδα και στην Κύπρο θα απαιτούνταν για να εκφραστεί η κυρίαρχη βούληση των
            λαών. …
          </p>

          <blockquote>
            <p>
              <strong>Άρθρο 1(2) του Χάρτη των Ηνωμένων Εθνών</strong>: «Να αναπτύσσει
              φιλικές σχέσεις … <strong>αυτοδιάθεσης των λαών</strong> …»
              <em> [Art. 1(2) UN Charter]</em>
            </p>
          </blockquote>

          <p>
            Αυτή η αρχή παρέχει σε κάθε λαό το δικαίωμα … πολιτική ένωση με τη μητέρα πατρίδα.
          </p>

          <p>
            Με αυτή την έννοια, η ενοποίηση δεν θα παραβίαζε το διεθνές δίκαιο αλλά{" "}
            <strong>θα το εκπλήρωνε</strong>. …
          </p>

          <h3>3. Η Συνθήκη Εγγυήσεως και το Διεθνές Δικαστήριο</h3>
          <p>
            Η <span className="font-semibold">Συνθήκη Εγγυήσεως</span> του 1960 …{" "}
            <strong>τη συνθήκη άκυρη λόγω παραβίασης</strong>.
          </p>

          <p>
            Η νόμιμη ενέργεια θα ήταν η Ελλάδα και η Κύπρος να φέρουν … ICJ … να αφαιρούσε
            το τελευταίο νομικό εμπόδιο για την ένωση…
          </p>

          <h3>4. Διάλυση της Κυπριακής Δημοκρατίας</h3>
          <p>
            Μετά τις συνταγματικές και διεθνείς προσαρμογές, η{" "}
            <span className="font-semibold">Κυπριακή Δημοκρατία</span> θα διαλυόταν… Όλοι οι
            Κύπριοι πολίτες θα αποκτούσαν αυτομάτως την ελληνική ιθαγένεια.
          </p>

          <p>
            Αυτό θα αντανακλούσε τον νομικό μηχανισμό της Γερμανίας το 1990… <strong>Art. 23 GG</strong>.
          </p>

          <h3>5. Επαναδιαπραγμάτευση των Βρετανικών Βάσεων</h3>
          <p>
            Η ενοποίηση θα απαιτούσε επανεξέταση της{" "}
            <span className="font-semibold">Συνθήκης Εγκαθίδρυσης</span> του 1960 …{" "}
            <strong>την επαναδιαπραγμάτευση των όρων</strong> … συνεργασία.
          </p>

          <h3>6. Συνέχεια των Διεθνών Συμμετοχών της Ελλάδας</h3>
          <p>
            … <strong>η Ελλάδα θα διατηρούσε τις υφιστάμενες έδρες της</strong> … θεσμική συνέχεια.
          </p>

          <h3>7. Συμπερίληψη του Κατεχόμενου Τμήματος</h3>
          <p>
            Τέλος, το κατεχόμενο βόρειο τμήμα … όταν εφαρμοστεί το διεθνές δίκαιο.
          </p>

          <hr />

          <h2>Συμπέρασμα</h2>
          <p>
            Μια ένωση μεταξύ Ελλάδας και Κύπρου δεν θα δημιουργούσε ένα νέο έθνος αλλά{" "}
            <strong>θα αποκαθιστούσε την πολιτική συνοχή …</strong> …
          </p>
          <p>
            Μέσω συνταγματικής αναθεώρησης, δημοψηφισμάτων …{" "}
            <strong>μια φυσική ολοκλήρωση</strong>.
          </p>
        </section>

        {/* ENGLISH VERSION */}
        <section className="lang-en" lang="en">
          <p>
            The 1915 British offer of Cyprus to Greece (and why Greece declined)
          </p>

          <p>
            <br />What happened.<br />
            In October 1915, as World War I widened and Serbia was under attack (after Bulgaria entered the war),
            British Foreign Secretary Edward Grey authorized an offer to cede Cyprus to Greece if Greece would enter the war on
            the Allied side (effectively, come to Serbia’s aid).
            The offer was conveyed in Athens by the British minister Sir Francis Elliot.
            Prime Minister Eleftherios Venizelos favored accepting; King Constantine I—committed to neutrality—refused,
            so Greece declined and the offer lapsed.
          </p>

          <p>
            When Greece and Cyprus decide to unite, it would not be a gesture of
            reconciliation but a declaration of continuity. The idea of <em>Enosis</em>
            —union—has long lingered in the collective consciousness of both peoples,
            who share the same language, faith, and heritage. Their unity would not
            heal a rift but <strong>complete a natural arc of history</strong> that
            was interrupted by colonialism, occupation, and geopolitical circumstance…
          </p>

          <p>
            Germany’s reunification in 1990 stands as a precedent not because the
            German people were enemies before, but because they too were{" "}
            <strong>divided by external forces despite internal sameness</strong>…
            When the Berlin Wall fell, it symbolized the{" "}
            <strong>restoration of political coherence to a people who had remained one in essence</strong>.
          </p>

          <p>
            For Greece and Cyprus, the journey would resemble this process—not in
            motivation but in method… <strong>translate a cultural fact into a political form</strong>.
          </p>

          <hr />

          <h2>The Path Toward Unification</h2>
          <p>
            If Greece and Cyprus were to unite, the process would have to be legally
            rigorous, diplomatically assertive, and historically conscious. The
            steps are clear, though demanding.
          </p>

          <h3>1. Constitutional Amendments in Both Countries</h3>
          <p>
            The first requirement is constitutional reform. Both the{" "}
            <span className="font-semibold">Hellenic Constitution</span> and the{" "}
            <span className="font-semibold">Constitution of the Republic of Cyprus</span>{" "}
            would need amendment to permit a single sovereign structure.
          </p>

          <p>
            In Greece’s case, <strong>Article 27</strong> … and{" "}
            <strong>Article 28</strong> … See <strong>Article 23 of the German Basic Law</strong> (
            <em>Grundgesetz</em>, <em>GG</em>) which enabled the GDR to accede … <em>[Art. 23 GG]</em>.
          </p>

          <p>
            Cyprus would need to remove or supersede <strong>Article 186</strong> … forbids “the integral or partial union
            of Cyprus with any other State” <em>[Art. 186 Cyprus Const.]</em>. … ICJ … foundation breached by a guarantor power.
          </p>

          <p>
            Once this obstacle is lifted … enabling amendments …{" "}
            <span className="font-semibold">Hellenic Republic</span> … administrative autonomy for Cyprus.
          </p>

          <h3>2. Dual Referenda and the Right of Self-Determination</h3>
          <p>
            Democracy must consecrate unity. Separate referenda … free choice, not external imposition.
          </p>

          <blockquote>
            <p>
              <strong>Article 1(2) of the Charter of the United Nations</strong>: “… equal rights and
              <strong> self-determination of peoples</strong> …” <em>[Art. 1(2) UN Charter]</em>
            </p>
          </blockquote>

          <p>
            This principle grants every people the right … freely choose political union with the motherland.
          </p>

          <p>
            In this sense, unification would not contravene international law but{" "}
            <strong>fulfill it</strong>. … as in Germany in 1990.
          </p>

          <h3>3. The Treaty of Guarantee and the International Court</h3>
          <p>
            The 1960 <span className="font-semibold">Treaty of Guarantee</span> …{" "}
            <strong>nullifying the treaty through breach</strong>.
          </p>

          <p>
            The lawful response would be … bring the matter to the ICJ … remove the final legal barrier …
          </p>

          <h3>4. Dissolution of the Republic of Cyprus</h3>
          <p>
            Following the constitutional and international adjustments … transfer to the{" "}
            <span className="font-semibold">Hellenic Republic</span> … Greek citizenship to all Cypriot citizens.
          </p>

          <p>
            This mirrors East Germany’s accession in 1990 under <strong>Art. 23 GG</strong>… Greece remains the continuous subject.
          </p>

          <h3>5. Renegotiation of the British Bases</h3>
          <p>
            Unification would require revisiting the 1960{" "}
            <span className="font-semibold">Treaty of Establishment</span>…{" "}
            <strong>renegotiate the terms</strong> … cooperation, not dependency.
          </p>

          <h3>6. Continuity of Greece’s International Memberships</h3>
          <p>
            Because Cyprus would accede to Greece … <strong>Greece would retain its existing seats</strong> … ensure continuity.
          </p>

          <h3>7. Inclusion of the Occupied Territory</h3>
          <p>
            Finally, the occupied northern part … unified state … restoration of full administration when international law is enforced.
          </p>

          <hr />

          <h2>Conclusion</h2>
          <p>
            A union between Greece and Cyprus would not create a new nation but{" "}
            <strong>restore political coherence</strong> … durable unity through legality, democracy, consent…
          </p>
          <p>
            Through constitutional amendment, referenda, international adjudication, and diplomacy …{" "}
            <strong>a natural completion</strong>.
          </p>
        </section>
      </ArticleLangWrapper>

      {/* Client-only controls */}
      <ArticleExtras href={href} title={title} targetSelector="#story-content" />
    </article>
  );
}
