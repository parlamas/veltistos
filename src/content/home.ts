// src/content/home.ts

// Types for each slot
export type LeftItem = {
  href: string;
  title: string;
  img: string;
  kicker: string;
};

export type LeadItem = {
  href: string;
  title: string;
  img: string;
  excerpt: string;
};

export type RightItem = {
  href: string;
  title: string;
  img?: string;     // optional if not always needed
  kicker?: string;  // optional
  width?: number;   // optional display hint
  height?: number;  // optional display hint
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
      title: "Τά παραθετικά τού 'αγαθός'",
      img: "", // OK to leave blank if your component handles it
      kicker: "Γραμματική",
    },
  ],

  middle: [
    {
      href: "/stories/union",
      title:
        "Ήρθε η ώρα η Ελλάδα και η Κύπρος να ενωθούν!<br>It is high time Greece and Cyprus united!",
      img: "/union/enosis-01.jpg",
      excerpt: "Τό 1ο άρθρο.",
    },
  ],

  right: [
    {
      href: "/stories/parts-of-speech",
      title: "Τά μέρη τού λόγου.",
      img: "/parts-of-speech.png",
      width: 43,   // ← your requested size
      height: 84, // ← your requested size
      kicker: "Γραμματική",
    },
  ],
};
