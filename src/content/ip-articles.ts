// src/content/ip-articles.ts
export type IpArticle = {
  slug: string;
  title: string;
  date?: string;
  thumbnail?: string;
  excerpt?: string;
  body: string;     // simple HTML for now
  tags?: string[];
};



export const ipArticles: IpArticle[] = [

  {
    slug: "my-first-article-2025-10-12",
    title: "μόνος, μούνος, ο όνυξ…",
    date: "Οκτ./Oct. 13, 2025",
    thumbnail: "/isidoros/munichia-thumb.jpg", // in /public/isidoros/
    excerpt: "Μια σύντομη εισαγωγή στο μούνυχος και τη Μουνιχία.",
    body: `...`, // your HTML/MDX-ish string
    tags: ["Opinion"],
  },

  {
    slug: "my-first-article-2025-10-12",
    title: "μόνος, μούνος, ο όνυξ, του όνυχος, μούνυχος, μουνιχία, μουνιχιών, μουν*ί, monos, munos, ho onyx, tou onychos, munichia, munichion, mouni",
    date: "Οκτ./Oct. 13, 2025",
    body: `
      
    <span hidden>aa7 αα7</span>
    <center>
    <div style="width:90%; text-align:justify; line-height:1.6; font-size:13pt;">
    <img src="/mouni/hoofm.png">

    
    <h2 id="greek">Greek version</h2>
    Πρωτα απ’ολα, εξ αντικειμένου, όλες οι ετυμολογίες μπορούν να θεωρούνται κατ’αρχην αβέβαιες.  <a href="#english" class="red" style="text-decoration: none;">
    Read in English</a><p>

    Ειναι σημαντικο να επισημανουμε οτι τους πρωτους φθογγους που ξεστομισε ο ανθρωπος, περα απο άναρθρες κραυγες, ηταν ηχοι που ακουγε στο περιβαλλον του. Ο ανθρωπος εμπνεεται 
    απο την φυση, και οχι αντιστροφα. Ακουει τους ηχους του νερου, του ανέμου, των φυλλων, των ζωων, των εντομων και τους μιμειται. Ετσι, σιγα-σιγα, σχηματιζονται οι 
    πρωτες λεξεις, των οποιων η προφορα εξελισσεται με τον χρονο.<p>

    Οπως βλεπετε στην εικονα, στην Ιωνικη διαλεκτο, η λεξη <span class="wow">μονος</span> ελεγετο <span class="wow">μουνος</span>. Στα Αρχαια, το νυχι ειναι αρσενικου γενους:
     ο όνυξ (ονομαστικη πτωση), του όνυχος (γενικη πτωση)&#903; <span class="ul">μουνος + ονυχος = μούνυχος</span>, δηλαδη <span class="ur">ενα και μοναδικο νυχι</span>, 
     δηλαδη <b>οπλη</b>.<p>

      Η οπλη δεν ειναι τιποτε αλλο παρα <span class="ub">ενα τεραστιο νυχι</span>. Τα αλογα ειναι μούνυχα ζωα. Οι κατσικες ειναι δίνυχα (δίχηλα) ζωα, διοτι εχουν 2 νυχια, δηλαδη 
      η οπλη της κατσικας ειναι δίνυχη (δίχηλη). <img src="/mouni/goat-hoof.webp" width=50 height=50 style="float:left; margin:0 .75rem .5rem 0; border-radius:6px;" /><p>

     Η ιστορια μας αρχιζει με τους ναυτικους. Επιστρεφοντας στον Πειραια, οταν περναγαν το ακρωτηριο του Σουνιου και οταν δεν υπηρχε συννεφιά και ο ηλιος ελαμπε, μετα 
     απο λιγη ωρα αρχισαν να βλεπουν κατι σαν οπλη αλογου στον οριζοντα, κατι σαν μούνυχο, ετσι λοιπον τον ονομασαν τον λοφο Μουνιχία, ο σημερινος λοφος της Καστελλας 
     στον Πειραια, ο οποιος εχει υψομετρο 90 μετρα.<p>

     Αργοτερα, δεν μπορουμε να ξερουμε ακριβως πότε, το <span class="r">υ</span> του μούνυχος εγινε <span class="r">ι</span>, και η Μουν<span class="r">υ</span>χία εγινε 
     Μουν<span class="r">ι</span>χία.<p>

     Λεγεται οτι ο πρωτος <span class="ur">μυθικος</span> ηρωας της Αθηνας ηταν ο Μούνιχος, ο οποιος ηταν συμμαχος του Θησεα, ενος αλλου ηρωα της Αθηνας, στις Αμαζονομαχίες. 
     Ο Μούνιχος πηρε το ονομα του απο την Μουνιχια, και οχι αντιστροφα. Προφανως, οι ντοπιοι του εδωσαν αυτο το ονομα για να τον τιμησουν.<p>

     Υπαρχει και η εκδοχη οτι ο Μούνιχος εδωσε το ονoμα του στην Μουνιχία. Αν δεχθουμε ομως αυτην την εκδοχή, τοτε πώς προέκυψε το ονομα Μούνιχος;<p>

     Οι κατοικοι της Μουνιχιας λατρευαν την θεά Αρτέμιδα, την θεά του κυνηγίου και της παρθενίας. Ακομη, στην Μουνιχία κατοικουσαν και πολλοι Θρακες, κυριως ως οικιακοι βοηθοι 
     και μισθοφοροι στρατιωτες. Οι Θρακες λατρευαν την θεά Βενδίδα, ονομαστικη πτωση Βενδίς, η οποια ηταν η αντιστοιχη θεά Αρτεμις των Θρακών. Με αυτην την εορτη προς τιμην 
     της Αρτέμιδος και της Βενδίδος αρχιζει και η αφηγηση της Πολιτειας του Πλατωνα.<p>
     
     Πιθανοτατα, ο ναος της θεάς Αρτεμιδος ηταν χτισμενος εκει που βρισκεται τωρα η εκκλησια του προφητη Ηλια. Αν σκαβαμε δηλαδη κατω απο την εκκλησια, καποια στιγμη 
     θα βρισκαμε τον αρχαιο ναο, αν εχουν αφησει τιποτα ορθιο οι αρχαιοκαπηλοι.<p>

     Αν αναρωτιεσθε γιατί δεν χρησιμοποιω τονους, ο λογος ειναι οτι οι Αρχαοι Ελληνες δεν χρησιμοποιουσαν ουτε τονους, ουτε μικρα γραμματα, ουτε διαστηματα μεταξυ των λεξεων. 
     Χρησιμοποιουσαν μονο κεφαλαια γραμματα. Τους τονους και τα μικρα γραμματα τα εφηύρε ο Αριστιφανης ο Βυζάντιος περιπου το 200 π.Χ., καμμία σχεση με τον Αριστοφανη που 
     εγραψε τις σπουδαιες κωμωδιες, αλλά αρχισαν να χρησιμοποιουνται το 800 μ. Χ. περιπου.<p>
     
     Τονους χρησιμοποιω τταν κρινω οτι ισως προκυψει συγχυση στον τονισμο.<p>

     Ακομη, ο Μουνυχιών ηταν ο 10ος μηνας του Αττικου σεληνιακου ετους, περιπου απο τις 15 Απριλιου εως τις 15 Μαϊου του Γρηγοριανου ημερολογίου. Επειδη τοτε εμπαινε η ανοιξη 
     και τα λουλουδια ανθιζαν και μυριζαν, και η θέα στην Μουνιχία ηταν πανεμορφη, πολυς κοσμος την επισκεπτοταν εκεινες τις ημερες&#903; και ετσι αυτος ο μηνας ονομασθηκε 
     Μουνυχιών.<p>

     Ο Αττικος μηνας εχει 29,5 ημερες, οσες δηλαδη μεσολαβουν απο την μία πανσεληνο στην επομενη.<p>

     Την ανοιξη και το καλοκαιρι λοιπον, η Μουνιχία ηταν γεματη κοσμο που απολαμβανε την ομορφια της φυσης και την πανεμορφη θέα. Και αυτο συνεχισθηκε για πολλους αιωνες.<p>

     Την εποχη του βασιλια Οθωνα (1832-1862), αφου ειχαμε διωξει τους Τουρκους, λεγεται οτι ο Οθων κανονισε να ερθουν στην Ελλαδα 500 Πολωνεζεςγια να παντρευτουν με τους 
     αξιωματικους του νεοσυστατου Ελληνικου στρατου, διοτι στην Αττικη δεν υπηρχαν αρκετες γυναικες καταλληλες γι αυτον τον σκοπο. Ὁ νοῶν, νοείτω (οποιος εχει μυαλο, 
     καταλαβαινει).<p>

     Πολλοι λοιπον αξιωματικοι γνωρισθηκαν με νεες γυναικες και πηγαιναν βολτα κατα μηκος του δρομου που εβλεπε στη θαλασσα, με τις ομπρελλες, τα ημιψηλα καπελλα, 
     <img src="/mouni/old-kastella-3.jpg" width= height= style="float:left; margin:0 .75rem .5rem 0; border-radius:6px;" /> τα κρινολινα και τις τουρνούρες α λα πολονέζ κλπ.<p>

     Οταν επεφτε το βραδακι ομως, ερωτοτροπουσαν τα ζευγαρακια κρυμμενα αναμεσα στους πελωριους βραχους. Εκει, ομως, παραμονευαν οι λιγοτερο τυχεροι ανδρες της εποχής που 
     δεν ειχαν δει ουτε θηλυκη γατα στη ζωη τους, και επιδιδοντο στην ηδονοβλεψια, δηλαδη <span class="wow">εκαναν μπανιστηρι</span>.<p>

     Με τον καιρο και με τις συζητησεις που διαδιδονταν μεταξύ ανδρων και γυναικων, καθιερωθηκε η Μουνιχία να ταυτισθει με τις ωραιες γυναικες και, σταδιακα, φτασσαμε να λεμε 
     το αιδείο μουν*ί. <span class="wow">Ετσι, λοιπον, φτασαμε απο την οπλη του αλογου στο μουν*ί.</span><p>
     
          <img src="/mouni/mounixia.jpg" alt="Old Kastella" style="display:block; height:auto; margin:0 auto; border-radius:6px;"><hr>

          <h2 id="english">English version</h2>

     First of all, objectively, all etymologies can be considered in principle uncertain. <a href="#greek" class="red" style="text-decoration: none;">
    Read in Greek</a><p>

It is important to point out that the first sounds uttered by human beings—beyond inarticulate cries—were the sounds they heard in their environment. 
Humans draw inspiration from nature, not the other way around. They hear the sounds of water, wind, leaves, animals, insects, and imitate them. Thus, 
little by little, the first words take shape, and their pronunciation evolves over time.<p>

As you can see in the image, in the Ionic dialect the word <span class="wow">monos</span> (“alone”) was pronounced <span class="wow">munos</span>. In Ancient Greek, 
“nail” is masculine: ho onyx (nominative), tou onychos (genitive); <span class="ul">munos + onychos = Mounychos</span>, that is, <span class="ur">a single nail</span>, i.e., 
<b>a hoof</b>.<p>

A hoof is nothing more than <span class="ub">a huge nail</span>. Horses are mononychal animals. Goats are dinychal animals, because they have two nails; that is, a goat’s hoof is dinychal.<p>

Our story begins with the sailors. Returning to Piraeus, when they rounded Cape Sounion—and when there were no clouds and the sun was shining—after a little while they 
began to see something on the horizon like a horse’s hoof, something like a mounychos. So they named the hill Munychia—today’s Kastella hill in Piraeus—which has an 
elevation of about 90 meters.<p>

Later—we cannot know exactly when—the u of Mounychos became i, and Munychia became Munichia.<p>

It is said that the first <span class="ur">mythical</span> hero of Athens was Mounychos, who was an ally of Theseus—another Athenian hero—in the Amazonomachies. Mounychos took his 
name from Munichia, not the other way around; obviously, the locals gave him this name to honor him.<p>

There is also the version that Mounychos gave his name to Munichia. But if we accept that version, then how did the name “Mounychos” arise in the first place?<p>

The inhabitants of Munichia worshipped the goddess Artemis, goddess of the hunt and of chastity. Also, many Thracians lived in Munichia, chiefly as domestic servants and 
mercenary soldiers. The Thracians worshipped the goddess Bendis, who was the Thracian counterpart of Artemis. With this festival in honor of Artemis 
and Bendis begins Plato’s Republic.<p>

It is likely that the temple of Artemis stood where the church of the prophet Elias is now located. If we were to dig beneath the church, at some point we would find 
the ancient temple—assuming the antiquities smugglers have left anything standing.<p>

If you are wondering why I don’t use accents, the reason is that the Ancient Greeks used neither accents nor lowercase letters nor spaces between words; 
they used only capital letters. Accents and lowercase letters were invented by Aristophanes of Byzantium around 200 BC (no relation to the comic playwright Aristophanes), 
but they began to be used around AD 800.<p>

I use accents when I judge there may be confusion about the stress.<p>

Also, Munychion was the 10th month of the Attic lunar year, roughly from April 15 to May 15 in the Gregorian calendar. Because spring arrived then and the flowers 
bloomed and gave off their scent, and because the view from Munichia was breathtaking, many people visited during those days; thus the month was named Munychion.<p>

The Attic month has about 29.5 days, the interval between one full moon and the next.<p>

In spring and summer, therefore, Munichia was full of people enjoying the beauty of nature and the magnificent view. And this continued for many centuries.<p>

In the time of King Otto (1832–1862), after we had expelled the Turks, it is said that Otto arranged for 500 Polish women to come to Greece to marry officers of the 
newly established Hellenic Army, because in Attica there were not enough women suitable for that purpose. Ὁ νοῶν, νοείτω (“Let those who understand, understand”).<p>

Thus many officers met young women and strolled along the road overlooking the sea, with their parasols, top hats, crinolines, bustles à la polonaise, etc.<p>

When evening fell, however, the couples flirted while hidden among the huge rocks. There, though, lurked the less fortunate men of the time—men who hadn’t seen even a 
female cat in their lives—and they engaged in voyeurism, that is, <span class="wow">they peeped</span>.<p>

Over time, as conversations spread among men and women, Munichia came to be identified with beautiful women and, gradually, we ended up calling the vulva “moun*i.” 
<span class="wow">Thus, we went from the horse’s hoof to the “moun*i” (vulgar for vulva).</span><p>




     











    `,
    tags: ["Opinion"],
  },
];
