// src/app/videos/malakia/page.tsx

import { notFound } from "next/navigation";
import { videos } from "@/content/videos";

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export default function VideoDetail({ params }: { params: { slug: string } }) {
  const video = videos.find((v) => v.slug === params.slug);
  if (!video) return notFound();

  return (
    <article className="prose prose-zinc max-w-3xl mx-auto">
      <h1>{video.title}</h1>
      <div className="aspect-video w-full overflow-hidden rounded-md shadow">
        {/* Prefer YouTube embed; fall back to local file if provided */}
        {video.youtubeId ? (
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/uukPFUzU_8s?start=6&rel=0&modestbranding=1"
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : video.src ? (
          <video controls className="h-full w-full">
            <source src={video.src} />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>

      {video.description && <p>{video.description}</p>}
      {video.tags?.length ? (
        <p className="text-sm text-zinc-600">Tags: {video.tags.join(", ")}</p>
      ) : null}
    </article>
  );
}