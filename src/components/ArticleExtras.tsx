// src/components/ArticleExtras.tsx
"use client";

import ShareBar from "@/components/ShareBar";
import TTSButton from "@/components/TTSButton";

export default function ArticleExtras({
  href,
  title,
  targetSelector = "#story-content",
}: {
  href: string;
  title: string;
  targetSelector?: string;
}) {
  return (
    <>
      <TTSButton targetSelector={targetSelector} label="" />
      <div data-tts-skip className="not-prose mt-4">
        <ShareBar href={href} title={title} />
      </div>
    </>
  );
}
