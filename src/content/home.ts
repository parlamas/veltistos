// src/content/home.ts

// Types for each slot
export type LeftItem = {
  href: string;
  title: string;   // may contain inline HTML (e.g., <br />, <span>)
  img: string;
  kicker: string;
  number?: string;
};

export type LeadItem = {
  href: string;
  title: string;   // may contain inline HTML
  img: string;
  excerpt: string;
  number?: string;
};

export type RightItem = {
  href: string;
  title: string;   // may contain inline HTML
  img?: string;     // optional if not always needed
  kicker?: string;  // optional
  width?: number;   // optional display hint
  height?: number;  // optional display hint
  number?: string;
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
      href: "/stories/parathetika",
      title: "Τά παραθετικά τού <span class='wow'>ἀγαθός</span>",
      img: "",
      kicker: "Γραμματική",
      number: '<span class="r">Αναζήτηση/Search:</span> αα2 ή/or aa2',
    },
    {
      href: "/diethni/nobel-irony",
      title: "Δώστε το Νομπελ Ειρήνης στον Νετανιάχου<br />Give the Nobel Peace prize to Netanyahu",
      img: "",
      kicker: "Διεθνή/International",
      number: '<span class="r">Αναζήτηση/Search:</span> αα4 ή/or aa4',
    },
  ],

  middle: [
    {
      href: "/stories/union",
      title: "Ήρθε η ώρα η Ελλάδα και η Κύπρος να ενωθούν!<br />It is high time Greece and Cyprus united!",
      img: "/union/enosis-01.jpg",
      excerpt: "Οι διαδικασίες αρχίζουν αμέσως...",
      number: '<span class="r">Αναζήτηση/Search:</span> αα1 ή/or aa1',
    },
  ],

  right: [
    {
      href: "/stories/parts-of-speech",
      title: "Τα μέρη του λόγου.",
      kicker: "Γραμματική",
      number: '<span class="r">Αναζήτηση/Search:</span> αα3 ή/or aa3',
    },
    {
      href: "/stories/republic/b1-001",
      title: "ἡ Πολιτεία • Βιβλίο 1/1<br />The Republic • Book 1/1",
      kicker: "Γλώσσες/Languages",
      number: '<span class="r">Αναζήτηση/Search:</span> αα5 ή/or aa5',
    },
  ],
};


