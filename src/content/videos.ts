// src/content/videos.ts
export type Video = {
  slug: string;
  title: string;
  youtubeId?: string;
  src?: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  kicker?: string;
  date?: string;
  start?: number;
};

export const videos: Video[] = [
  {
    slug: "malakia",
    title: "περί μαλακίας • on callousness",
    youtubeId: "uukPFUzU_8s",
    start: 6,
    description: "—",
    date: "2025-10-11",
  },
];
