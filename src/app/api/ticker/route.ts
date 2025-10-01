// src/app/api/ticker/route.ts
import Parser from "rss-parser";
import { NextResponse } from "next/server";

// Ensure Node runtime (rss-parser uses Node HTTP)
export const runtime = "nodejs";

const parser = new Parser({
  timeout: 8000,
  headers: { "User-Agent": "Veltistos/1.0 (+https://veltistos.com)" },
});

// Put your sources here
const FEEDS = [
  // Ελλάδα
  "https://www.protothema.gr/rss/",
  "https://www.in.gr/feed/",
  "https://www.ertnews.gr/feed/",
  // "https://www.skai.gr/rss/....", // pick a specific section feed from the SKAI RSS index
  "https://www.ekathimerini.com/feed/", // if this fails, try: "https://www.ekathimerini.com/infeeds/rss/nx-rss-feed.xml"

  // Διεθνή
  "http://feeds.bbci.co.uk/news/rss.xml",
  "https://www.theguardian.com/world/rss",
  "https://feeds.reuters.com/reuters/worldNews",
  "https://www.aljazeera.com/xml/rss/all.xml",

  // AI / Tech
  "https://ai.googleblog.com/feeds/posts/default?alt=rss",
  "https://openai.com/blog/rss.xml",
  "http://export.arxiv.org/rss/cs.AI",

  // Optional extras
  "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", // NYT
  "http://rss.cnn.com/rss/cnn_topstories.rss",                 // CNN

  // El País (Spanish)
  "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/ultimas-noticias/portada",
  "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/internacional/portada",
  "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/espana/portada",
  "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/economia/portada",

  // El País (English edition)
  "https://feeds.elpais.com/mrss-s/pages/ep/site/english.elpais.com/portada",

  "https://www.dr.dk/nyheder/service/feeds/allenyheder",

];

export async function GET() {
  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (url) => {
        const feed = await parser.parseURL(url);
        return (feed.items || []).map((i) => ({
          title: i.title?.trim() ?? "",
          url: (i.link as string) ?? "#",
          pubDate: i.isoDate || i.pubDate || "",
        }));
      })
    );

    const merged = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter((x) => x.title && x.url);

    // Sort newest first and keep a reasonable amount
    merged.sort((a, b) => (a.pubDate > b.pubDate ? -1 : 1));
    const items = merged.slice(0, 50).map(({ title, url }) => ({ title, url }));

    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

