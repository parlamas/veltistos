// src/app/stories/union/page.tsx
import Image from "next/image";
import ArticleExtras from "@/components/ArticleExtras";

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

      {/* Make sure this image exists at /public/union/enosis-01.jpg */}
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

      <p>
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

      <p>
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
        </strong>
        .
      </p>

      <p>
        For Greece and Cyprus, the journey would resemble this process—not in
        motivation but in method. It would involve political coordination,
        constitutional design, and international diplomacy within the framework
        of shared European membership. The objective would be to{" "}
        <strong>translate a cultural fact into a political form</strong>.
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
      <p>
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
      <p>
        Once this obstacle is lifted through judicial or constitutional revision,
        both countries could draft enabling amendments providing for a single
        polity under the <span className="font-semibold">Hellenic Republic</span>, with
        administrative autonomy for Cyprus within a unified state.
      </p>

      <h3>2. Dual Referenda and the Right of Self-Determination</h3>
      <p>
        Democracy must consecrate unity. Separate referenda in Greece and Cyprus
        would be required to express the peoples’ sovereign will. These plebiscites
        would affirm that unification arises from free choice, not external
        imposition.
      </p>
      <blockquote>
        <p>
          <strong>Article 1(2) of the Charter of the United Nations</strong>:
          “To develop friendly relations among nations based on respect for the
          principle of equal rights and <strong>self-determination of peoples</strong>,
          and to take other appropriate measures to strengthen universal peace.”
          <em> [Art. 1(2) UN Charter]</em>
        </p>
      </blockquote>
      <p>
        This principle grants every people the right to determine their political
        status and to pursue their development. For the Greek people of Cyprus—
        sharing an unbroken linguistic, cultural, and national identity with Greece—
        self-determination means the right to freely choose political union with
        the motherland.
      </p>
      <p>
        In this sense, unification would not contravene international law but{" "}
        <strong>fulfill it</strong>. It would transform an existing cultural unity
        into constitutional reality, exactly as Germany did when East and West
        Germans expressed their will through free parliamentary and popular votes
        in 1990.
      </p>

      <h3>3. The Treaty of Guarantee and the International Court</h3>
      <p>
        The 1960 <span className="font-semibold">Treaty of Guarantee</span>, signed
        by Greece, Turkey, and the United Kingdom, sought to protect Cyprus’s
        independence and territorial integrity. However, <strong>Article I</strong>{" "}
        of that treaty forbids any of the guarantor powers from promoting partition
        or union. By maintaining a military occupation of Northern Cyprus for half
        a century, Turkey has materially violated this obligation, thereby{" "}
        <strong>nullifying the treaty through breach</strong>.
      </p>
      <p>
        The lawful response would be for Greece and Cyprus jointly to bring the
        matter before the <span className="font-semibold">International Court of Justice</span>.
        The Court could determine that the treaty is no longer valid because one
        of its signatories has persistently violated it. Such a ruling would remove
        the final legal barrier to unification and reaffirm the right of the Cypriot
        people to exercise self-determination under <em>Art. 1(2) of the UN Charter</em>.
      </p>

      <h3>4. Dissolution of the Republic of Cyprus</h3>
      <p>
        Following the constitutional and international adjustments, the{" "}
        <span className="font-semibold">Republic of Cyprus</span> would dissolve by
        act of its parliament, transferring all sovereign rights and obligations to
        the <span className="font-semibold">Hellenic Republic</span>. All Cypriot
        citizens would automatically acquire Greek citizenship.
      </p>
      <p>
        This would mirror the legal mechanism used by East Germany in 1990, where
        the German Democratic Republic <em>acceded</em> to the Federal Republic under{" "}
        <strong>Art. 23 GG</strong>, rather than creating a new entity. Greece would
        remain the continuous subject of international law, enlarged territorially
        to include Cyprus.
      </p>

      <h3>5. Renegotiation of the British Bases</h3>
      <p>
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

      <h3>6. Continuity of Greece’s International Memberships</h3>
      <p>
        Because the Republic of Cyprus would accede to Greece, not merge as an
        equal partner, <strong>Greece would retain its existing seats</strong> in
        the United Nations, European Union, and NATO. The unification would be
        recognized internationally as an internal enlargement of an existing member
        state, exactly as in Germany’s case. This ensures institutional continuity
        and prevents diplomatic disruption.
      </p>

      <h3>7. Inclusion of the Occupied Territory</h3>
      <p>
        Finally, the occupied northern part of Cyprus must be treated as an
        inseparable part of the unified state. Legally, the Republic of Cyprus
        already retains sovereignty over the whole island, and a ruling from the
        ICJ would strengthen this position. Upon unification, the Hellenic Republic
        would inherit the same legal rights and responsibilities, with eventual
        restoration of full administration when international law is enforced.
      </p>

      <hr />

      <h2>Conclusion</h2>
      <p>
        A union between Greece and Cyprus would not create a new nation but{" "}
        <strong>
          restore political coherence to a people already united by language,
          faith, and history
        </strong>
        . Germany’s experience demonstrates that unity achieved through legality,
        democracy, and consent endures. The constitutional model of{" "}
        <strong>Art. 23 GG</strong>, the rectification of{" "}
        <strong>Art. 186 of the Cypriot Constitution</strong>, and the universal
        principle of <strong>self-determination under Art. 1(2) of the UN Charter</strong>{" "}
        together provide the framework for lawful and peaceful unification.
      </p>
      <p>
        Through constitutional amendment, referenda, international adjudication,
        and diplomatic negotiation, Greece and Cyprus could lawfully and peacefully
        achieve the unity that history has long postponed. Their union would not
        erase differences but complete continuity—<strong>μια φυσική ολοκλήρωση</strong>.
      </p>

      {/* Client-only controls */}
      <ArticleExtras href={href} title={title} targetSelector="#story-content" />
    </article>
  );
}
