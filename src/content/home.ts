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
  href: "/stories/sidewalk",         // must match the folder name
  title: "Τα παραθετικά τού 'αγαθός'",    // you choose what headline shows
  img: "",             // must match the file in /public
  kicker: "Γραμματική",                  // short label/category
},

  ],


  middle: [

    {
      href: "/stories/union",
      title: "Ηρθε η ώρα η Ελλάδα και η Κύπρος να ενωθούν!<br>It is high time Greece and Cyprus united!",
      img: "/union/enosis-01.jpg",
      excerpt: "Τό 1ο άρθρο.",
    },
    

  ],


  right: [

    {
    href: "/stories/parts-of-speech",         // must match the folder name
  title: "Τα μέρη του λόγου.",    // you choose what headline shows
  img: "/parts-of-speech.png",             // must match the file in /public
  kicker: "Γραμματική",                  // short label/category
},
    

  ],
};

