//src/app/videos/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { videos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Βίντεο | Videos",
  description: "Όλα τα βίντεο του veltistos",
};

export default function VideosPage() {
  return (
    <main className="prose prose-zinc max-w-5xl mx-auto">
      <h1>Βίντεο • Videos</h1>
      <ul className="not-prose grid gap-4 md:grid-cols-2">
        {videos.map((v) => (
          <li key={v.slug} className="border border-[brown] rounded-md p-3">
            <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
              {/* Thumbnail links to detail page */}
              <Link href={`/videos/${v.slug}`} aria-label={v.title}>
                {/* If you have a thumbnail: */}
                <img
                  src={v.thumbnail ?? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>

            <h3 className="mt-2 font-semibold">{v.title}</h3>
            {v.kicker && <div className="text-xs text-zinc-600">{v.kicker}</div>}
            {v.date && <div className="text-xs text-zinc-500">{v.date}</div>}
          </li>
        ))}
      </ul>
    </main>
  );
}
