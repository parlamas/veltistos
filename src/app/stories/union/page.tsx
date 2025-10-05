// src/app/stories/union/page.tsx
import Image from "next/image";
import ArticleExtras from "@/components/ArticleExtras";
import Bilingual from "@/components/Bilingual";

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
          src="/union/enosis-01.jpg" // ensure exists under /public/union/
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

      {/* Language switcher + content */}
      <Bilingual
        el={
          <section lang="el">
            <p>
              Η βρετανική προσφορά του 1915 για παραχώρηση της Κύπρου στην Ελλάδα
              (και γιατί η Ελλάδα αρνήθηκε)
            </p>

            <p>
              <br />
              Τι συνέβη.
              <br />
              Τον Οκτώβριο του 1915, καθώς ο Α΄ Παγκόσμιος Πόλεμος διευρυνόταν και
              η Σερβία δεχόταν επίθεση (έπειτα από την είσοδο της Βουλγαρίας στον
              πόλεμο), ο Βρετανός Υπουργός Εξωτερικών Έντουαρντ Γκρέι ενέκρινε μια
              πρόταση να παραχωρηθεί η Κύπρος στην Ελλάδα εφόσον η Ελλάδα θα έμπαινε
              στον πόλεμο στο πλευρό των Συμμάχων (ουσιαστικά, για να συνδράμει τη
              Σερβία). Η προσφορά διαβιβάστηκε στην Αθήνα από τον Βρετανό πρεσβευτή
              σερ Φράνσις Έλιοτ. Ο πρωθυπουργός Ελευθέριος Βενιζέλος τάχθηκε υπέρ
              της αποδοχής· ο βασιλιάς Κωνσταντίνος Α’—προσηλωμένος στην
              ουδετερότητα—αρνήθηκε, οπότε η Ελλάδα δεν την αποδέχθηκε και η
              προσφορά ξεχάσθηκε.
            </p>

            <p>
              Όταν η Ελλάδα και η Κύπρος αποφασίσουν να ενωθούν, αυτό δεν θα είναι
              μια χειρονομία συμφιλίωσης αλλά μια διακήρυξη συνέχειας. Η ιδέα της{" "}
              <em>Enosis</em>—ένωσης— αιωρείται επί μακρόν στη συλλογική συνείδηση
              και των δύο λαών, που μοιράζονται την ίδια γλώσσα, πίστη και
              πολιτιστική κληρονομιά. Η ένωσή τους δεν θα θεράπευε ένα ρήγμα αλλά
              <strong> ολοκλήρωνε μια φυσική πορεία της ιστορίας</strong> …
            </p>

            <p>
              Η επανένωση της Γερμανίας το 1990 αποτελεί προηγούμενο όχι επειδή ο
              γερμανικός λαός ήταν προηγουμένως εχθρικός μεταξύ του, αλλά επειδή και
              εκείνοι ήταν{" "}
              <strong>
                διαιρεμένοι από εξωτερικές δυνάμεις παρά την εσωτερική τους
                ομοιογένεια
              </strong>
              . …{" "}
              <strong>
                αποκατάσταση της πολιτικής συνοχής ενός λαού που είχε παραμείνει ένας
                στην ουσία
              </strong>
              .
            </p>

            <p>
              Για την Ελλάδα και την Κύπρο, η πορεία θα έμοιαζε με αυτή τη
              διαδικασία—όχι ως προς τα κίνητρα αλλά ως προς τη μέθοδο…{" "}
              <strong>μεταφραστεί ένα πολιτισμικό δεδομένο σε πολιτική μορφή</strong>.
            </p>

            <hr />

            <h2>Η Πορεία προς την Ένωση</h2>
            <p>
              Εάν η Ελλάδα και η Κύπρος επρόκειτο να ενωθούν, η διαδικασία θα
              έπρεπε να είναι νομικά αυστηρή, διπλωματικά διεκδικητική και
              ιστορικά συνειδητή. Τα βήματα είναι σαφή, αν και απαιτητικά.
            </p>

            <h3>1. Συνταγματικές Τροποποιήσεις και στις Δύο Χώρες</h3>
            <p>
              Η πρώτη προϋπόθεση είναι η συνταγματική μεταρρύθμιση…{" "}
              <span className="font-semibold">Σύνταγμα της Ελλάδας</span> …{" "}
              <span className="font-semibold">Σύνταγμα της Κυπριακής Δημοκρατίας</span>.
            </p>

            <p>
              Στην περίπτωση της Ελλάδας, <strong>Άρθρο 27</strong> …{" "}
              <strong>Άρθρο 28</strong> …{" "}
              <strong>Άρθρο 23 του Γερμανικού Θεμελιώδους Νόμου</strong> …{" "}
              <em>[Art. 23 GG]</em>.
            </p>

            <p>
              Η Κύπρος θα χρειαζόταν να καταργήσει ή να αντικαταστήσει το{" "}
              <strong>Άρθρο 186</strong> … <em>[Art. 186 Cyprus Const.]</em> …
            </p>

            <p>
              Μόλις αυτό το εμπόδιο αρθεί …{" "}
              <span className="font-semibold">Ελληνική Δημοκρατία</span> …
            </p>

            <h3>2. Διπλά Δημοψηφίσματα και το Δικαίωμα της Αυτοδιάθεσης</h3>
            <p>Η δημοκρατία πρέπει να επισφραγίσει την ένωση…</p>

            <blockquote>
              <p>
                <strong>Άρθρο 1(2) του Χάρτη των Ηνωμένων Εθνών</strong>: …{" "}
                <strong>αυτοδιάθεσης των λαών</strong> …{" "}
                <em>[Art. 1(2) UN Charter]</em>
              </p>
            </blockquote>

            <p>… Με αυτή την έννοια, η ενοποίηση δεν θα παραβίαζε το διεθνές δίκαιο αλλά <strong>θα το εκπλήρωνε</strong>…</p>

            <h3>3. Η Συνθήκη Εγγυήσεως και το Διεθνές Δικαστήριο</h3>
            <p>
              Η <span className="font-semibold">Συνθήκη Εγγυήσεως</span> του 1960 …{" "}
              <strong>τη συνθήκη άκυρη λόγω παραβίασης</strong>.
            </p>

            <p>Η νόμιμη ενέργεια θα ήταν … ICJ …</p>

            <h3>4. Διάλυση της Κυπριακής Δημοκρατίας</h3>
            <p>Μετά τις προσαρμογές … <span className="font-semibold">Ελληνική Δημοκρατία</span> …</p>

            <h3>5. Επαναδιαπραγμάτευση των Βρετανικών Βάσεων</h3>
            <p>Η ενοποίηση θα απαιτούσε … <strong>την επαναδιαπραγμάτευση</strong> …</p>

            <h3>6. Συνέχεια των Διεθνών Συμμετοχών της Ελλάδας</h3>
            <p>… <strong>η Ελλάδα θα διατηρούσε τις υφιστάμενες έδρες της</strong> …</p>

            <h3>7. Συμπερίληψη του Κατεχόμενου Τμήματος</h3>
            <p>Τέλος, το κατεχόμενο βόρειο τμήμα …</p>

            <hr />

            <h2>Συμπέρασμα</h2>
            <p>Μια ένωση μεταξύ Ελλάδας και Κύπρου … <strong>θα αποκαθιστούσε την πολιτική συνοχή</strong> …</p>
            <p>Μέσω συνταγματικής αναθεώρησης, δημοψηφισμάτων … <strong>μια φυσική ολοκλήρωση</strong>.</p>
          </section>
        }
        en={
          <section lang="en">
            <p>
              The 1915 British offer of Cyprus to Greece (and why Greece declined)
            </p>

            <p>
              <br />
              What happened.
              <br />
              In October 1915 … Edward Grey authorized an offer to cede Cyprus to Greece
              if Greece would enter the war on the Allied side … Sir Francis Elliot
              conveyed the offer … Venizelos favored accepting; King Constantine I—committed
              to neutrality—refused, so Greece declined and the offer lapsed.
            </p>

            <p>
              When Greece and Cyprus decide to unite, it would not be a gesture of reconciliation
              but a declaration of continuity. The idea of <em>Enosis</em>—union—has long
              lingered … <strong>complete a natural arc of history</strong> …
            </p>

            <p>
              Germany’s reunification in 1990 stands as a precedent not because the Germans
              were enemies, but because they were{" "}
              <strong>divided by external forces despite internal sameness</strong> …{" "}
              <strong>restoration of political coherence</strong>.
            </p>

            <p>
              For Greece and Cyprus … <strong>translate a cultural fact into a political form</strong>.
            </p>

            <hr />

            <h2>The Path Toward Unification</h2>
            <p>If Greece and Cyprus were to unite … steps are clear, though demanding.</p>

            <h3>1. Constitutional Amendments in Both Countries</h3>
            <p>
              The first requirement is constitutional reform …{" "}
              <span className="font-semibold">Hellenic Constitution</span> and{" "}
              <span className="font-semibold">Constitution of the Republic of Cyprus</span>.
            </p>

            <p>
              In Greece’s case, <strong>Article 27</strong> … <strong>Article 28</strong> …
              see <strong>Article 23 of the German Basic Law</strong> (<em>GG</em>) …{" "}
              <em>[Art. 23 GG]</em>.
            </p>

            <p>
              Cyprus would need to remove/supersede <strong>Article 186</strong> …{" "}
              <em>[Art. 186 Cyprus Const.]</em> … ICJ …
            </p>

            <p>
              Once this obstacle is lifted … enabling amendments …{" "}
              <span className="font-semibold">Hellenic Republic</span> … administrative autonomy.
            </p>

            <h3>2. Dual Referenda and the Right of Self-Determination</h3>
            <p>Democracy must consecrate unity … free choice …</p>

            <blockquote>
              <p>
                <strong>Article 1(2) UN Charter</strong>: “… equal rights and{" "}
                <strong>self-determination of peoples</strong> …”
              </p>
            </blockquote>

            <p>This principle grants every people … freely choose union with the motherland.</p>

            <p>In this sense, unification would not contravene international law but <strong>fulfill it</strong> …</p>

            <h3>3. The Treaty of Guarantee and the International Court</h3>
            <p>The 1960 <span className="font-semibold">Treaty of Guarantee</span> … breach …</p>

            <p>The lawful response … bring to ICJ … remove the final barrier …</p>

            <h3>4. Dissolution of the Republic of Cyprus</h3>
            <p>Following the adjustments … transfer to the{" "}
              <span className="font-semibold">Hellenic Republic</span> …</p>

            <h3>5. Renegotiation of the British Bases</h3>
            <p>Revisit the 1960 <span className="font-semibold">Treaty of Establishment</span> …</p>

            <h3>6. Continuity of Greece’s International Memberships</h3>
            <p>Accession model … <strong>retain existing seats</strong> …</p>

            <h3>7. Inclusion of the Occupied Territory</h3>
            <p>Occupied north as inseparable part … restoration when law is enforced.</p>

            <hr />

            <h2>Conclusion</h2>
            <p>
              A union between Greece and Cyprus would{" "}
              <strong>restore political coherence</strong> … durable through legality,
              democracy, consent.
            </p>
            <p>Through amendment, referenda, adjudication, diplomacy … <strong>a natural completion</strong>.</p>
          </section>
        }
      />

      {/* Client-only controls */}
      <ArticleExtras href={href} title={title} targetSelector="#story-content" />
    </article>
  );
}
