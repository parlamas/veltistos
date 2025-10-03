// src/content/home.ts

type LeftItem = {
  href: string;
  title: string;
  img?: string;
  kicker?: string;
};

type LeadItem = {
  href: string;
  title: string;
  img?: string;
  excerpt?: string;
};

// Export a single object you can tweak without touching JSX
export const homeSlots: {
  left: LeftItem[];
  middle: LeadItem[]; // center column
  // right?: RightItem[]; // add later if you wire a right column
} = {
  left: [
    { href: "/stories/sidewalk", title: "Νέα για τα πεζοδρόμια", img: "/sidewalk.jpeg", kicker: "Ελλάδα" },
    { href: "/stories/ellada-2", title: "Σύντομη είδηση χωρίς εικόνα για εξοικονόμηση χώρου" },
    { href: "/stories/ellada-3", title: "Παράδειγμα ιστορίας με μικρή εικόνα", img: "/placeholder.jpg" },
  ],
  middle: [
    { href: "/stories/lead-1", title: "Κεντρικό θέμα 1", img: "/placeholder.jpg", excerpt: "Σύντομη περιγραφή του κύριου θέματος." },
    { href: "/stories/lead-2", title: "Κεντρικό θέμα 2", img: "/placeholder.jpg" },
  ],
};

