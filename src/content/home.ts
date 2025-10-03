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
      href: "/story-1",
      title: "Left column story 1",
      img: "/images/story-1.jpg",
      kicker: "World",
    },
    {
      href: "/story-2",
      title: "Left column story 2",
      img: "/images/story-2.jpg",
      kicker: "Politics",
    },
  ],
  middle: [
    {
      href: "/lead-1",
      title: "Main story 1",
      img: "/images/lead-1.jpg",
      excerpt: "This is the excerpt for the first main story.",
    },
    {
      href: "/lead-2",
      title: "Main story 2",
      img: "/images/lead-2.jpg",
      excerpt: "This is the excerpt for the second main story.",
    },
  ],
  right: [
    {
      href: "/widget-1",
      title: "Right column item 1",
    },
    {
      href: "/widget-2",
      title: "Right column item 2",
    },
  ],
};

