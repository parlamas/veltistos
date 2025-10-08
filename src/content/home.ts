// src/content/home.ts

// Types for each slot
export type LeftItem = {
  href: string;
  title: string;
  img: string;
  kicker: string;
  number?: string;
};

export type LeadItem = {
  href: string;
  title: string;
  img: string;
  excerpt: string;
  number?: string;
};

export type RightItem = {
  href: string;
  title: string;
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

// Example content
export const homeSlots: HomeSlots = {
  
  left: [
    {
      href: "/stories/parathetika", // must match the folder name
      title: "Τά παραθετικά τού <span class='wow'>ἀγαθός</span>",
      img: "", // OK to leave blank if your component handles it
      kicker: "Γραμματική",
      number: "α2 • a2",
    },
  ],

  middle: [
    {
      href: "/stories/union",
      title:
        "Ήρθε η ώρα η Ελλάδα και η Κύπρος να ενωθούν!<br>It is high time Greece and Cyprus united!",
      img: "/union/enosis-01.jpg",
      excerpt: "Οι διαδικασίες αρχίζουν αμέσως...",
      number: "α1 • a1",
    },
  ],

  right: [
    {
      href: "/stories/parts-of-speech",
      title: "Τα μερη του λογου.",
      img: "/parts-of-speech.png",
      width: 85,   // ← your requested size
      height: 167, // ← your requested size
      kicker: "Γραμματική",
      number: "α3 • a3",
    },
  ],
};

