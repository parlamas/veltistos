// src/app/videos/[slug]/page.tsx
import { notFound } from "next/navigation";
import { videos } from "@/content/videos";

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export default function VideoDetail({ params }: { params: { slug: string } }) {
  const video = videos.find((v) => v.slug === params.slug);
  if (!video) return notFound();

  const start = typeof video.start === "number" ? video.start : 0;

  return (
    <article className="prose prose-zinc max-w-3xl mx-auto">
      <h1>{video.title}</h1>

      <div className="aspect-video w-full overflow-hidden rounded-md shadow">
        {video.youtubeId ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?start=${start}&rel=0&modestbranding=1`}
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
