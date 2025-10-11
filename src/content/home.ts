// src/content/home.ts

// Types for each slot
export type LeftItem = {
  href: string;
  title: string;   // may contain inline HTML (e.g., <br />, <span>)
  img: string;
  kicker: string;
  number?: string;
  date?: string;
  author?: string;
};

export type LeadItem = {
  href: string;
  title: string;   // may contain inline HTML
  img: string;
  excerpt: string;
  number?: string;
  date?: string;
  author?: string;
};

export type RightItem = {
  href: string;
  title: string;   // may contain inline HTML
  img?: string;     // optional if not always needed
  kicker?: string;  // optional
  width?: number;   // optional display hint
  height?: number;  // optional display hint
  number?: string;
  date?: string;
  author?: string;
};

// Combined slots type
export type HomeSlots = {
  left: LeftItem[];
  middle: LeadItem[];
  right: RightItem[];
};

// Content
export const homeSlots: HomeSlots = {
  left: [
    {
      author: "Ισίδωρος Παρλαμάς<br />Isidoros Parlamas",
      href: "/stories/parathetika",
      title: "Τά παραθετικά τού <span class='wow'>ἀγαθός</span>",
      img: "",
      kicker: "Γραμματική",
      date: '<span class="r">Σωκρατικό Ημερολόγιο:</span><br />Πυανεψιώνος 3, 2495<br /><span class="r">Socratic Calendar:</span><br />3 Pyanepsion, 2495<br />Γρηγοριανό/Gregorian<br />Οκτ./Oct. 3, 2025',
      number: '<span class="r">Αναζήτηση/Search:</span> αα2 ή/or aa2',
    },
    {
      author: "Ισίδωρος Παρλαμάς<br />Isidoros Parlamas",
      href: "/diethni/nobel-irony",
      title: "Δώστε το Νομπελ Ειρήνης στον Νετανιάχου<br />Give the Nobel Peace prize to Netanyahu",
      img: "",
      kicker: "Διεθνή/International",
      date: '<span class="r">Σωκρατικό Ημερολόγιο:</span><br />Πυανεψιώνος 7, 2495<br /><span class="r">Socratic Calendar:</span><br />7 Pyanepsion, 2495<br />Γρηγοριανό/Gregorian<br />Οκτ./Oct. 7, 2025',
      number: '<span class="r">Αναζήτηση/Search:</span> αα4 ή/or aa4',
    },
  ],

  middle: [
    {
      author: "Ισίδωρος Παρλαμάς<br />Isidoros Parlamas",
      href: "/stories/union",
      title: "Ήρθε η ώρα η Ελλάδα και η Κύπρος να ενωθούν!<br />It is high time Greece and Cyprus united!",
      img: "/union/enosis-01.jpg",
      excerpt: "Οι διαδικασίες αρχίζουν αμέσως...",
      date: '<span class="r">Σωκρατικό Ημερολόγιο:</span><br />Πυανεψιώνος 1, 2495<br /><span class="r">Socratic Calendar:</span><br />1 Pyanepsion, 2495<br />Γρηγοριανό/Gregorian<br />Οκτ./Oct. 1, 2025',
      number: '<span class="r">Αναζήτηση/Search:</span> αα1 ή/or aa1',
    },
  ],

  right: [
    {
      author: "Ισίδωρος Παρλαμάς<br />Isidoros Parlamas",
      href: "/stories/parts-of-speech",
      title: "Τα μέρη του λόγου.",
      kicker: "Γραμματική",
      date: '<span class="r">Σωκρατικό Ημερολόγιο:</span><br />Πυανεψιώνος 5, 2495<br /><span class="r">Socratic Calendar:</span><br />5 Pyanepsion, 2495<br />Γρηγοριανό/Gregorian<br />Οκτ./Oct. 5, 2025',
      number: '<span class="r">Αναζήτηση/Search:</span> αα3 ή/or aa3',
    },
    {
      author: "Ισίδωρος Παρλαμάς<br />Isidoros Parlamas",
      href: "/stories/republic/b1-001",
      title: "ἡ Πολιτεία • Βιβλίο 1/1<br />The Republic • Book 1/1",
      kicker: "Γλώσσες/Languages",
      date: '<span class="r">Σωκρατικό Ημερολόγιο:</span><br />Πυανεψιώνος 9, 2495<br /><span class="r">Socratic Calendar:</span><br />9 Pyanepsion, 2495<br />Γρηγοριανό/Gregorian<br />Οκτ./Oct. 9, 2025',
      number: '<span class="r">Αναζήτηση/Search:</span> αα5 ή/or aa5',
    },
  ],
};


