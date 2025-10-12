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
    title: "My First Article",
    date: "2025-10-12",
    thumbnail: "/images/isidoros-parlamas/hero.jpg", // optional
    excerpt: "A short teaser for the article…",
    body: `
      <p>Write your full article here in simple HTML.</p>
      <h2>Section</h2><p>…content…</p>
      <h2>Another Section</h2><p>…content…</p>
    `,
    tags: ["Opinion"],
  },
];
