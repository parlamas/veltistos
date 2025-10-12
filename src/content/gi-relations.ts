// src/content/gi-relations.ts
export type RelationArticle = {
  slug: string;
  title: string;
  kicker?: string;
  date?: string;
  thumbnail?: string;
  excerpt?: string;
  body: string;      // simple HTML for now
  tags?: string[];
};

export const relations: RelationArticle[] = [
  {
    slug: "overview-2025-10-12",
    title: "Greek–Israeli Relations: An Overview",
    kicker: "Analysis",
    date: "2025-10-12",
    thumbnail: "/images/greek-israeli-relations/hero.jpg", // optional
    excerpt: "History, strategy, ethics, and current implications.",
    body: `
      <p>Write your article body here.</p>
      <h2>Background</h2><p>…</p>
      <h2>Strategy</h2><p>…</p>
      <h2>Ethics</h2><p>…</p>
      <h2>Conclusion</h2><p>…</p>
    `,
    tags: ["Greece", "Israel", "Foreign Policy"],
  },
];
