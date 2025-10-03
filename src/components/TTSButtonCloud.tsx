// src/components/TTSButtonCloud.tsx
"use client";

import { useState } from "react";

export default function TTSButtonCloud({
  targetSelector,
  label = "🔊",
  defaultLang = "el-GR",
  voiceOverrides,
}: {
  targetSelector: string;               // e.g. "#story-content"
  label?: string;
  defaultLang?: string;                 // fallback if no [lang] on elements
  voiceOverrides?: Record<string, string>; // lang -> Azure voice name
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const root = document.querySelector(targetSelector) as HTMLElement | null;
    if (!root) return alert("TTS: target element not found.");

    // 1) Collect text segments with language
    const segments = collectSegments(root, defaultLang)
      // merge adjacent same-lang segments to reduce SSML size
      .reduce<{ text: string; lang: string }[]>((acc, seg) => {
        const last = acc[acc.length - 1];
        if (last && last.lang === seg.lang) {
          last.text += " " + seg.text;
        } else {
          acc.push(seg);
        }
        return acc;
      }, [])
      // Optional: limit extreme length (Azure handles ~few thousand chars)
      .slice(0, 2000);

    if (segments.length === 0) return;

    setLoading(true);
    try {
      // 2) Call your API
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segments,
          defaultLang,
          voiceOverrides,
          // format: "audio-24khz-48kbitrate-mono-mp3", // optional
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      // 3) Play the audio
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
      audio.onended = () => URL.revokeObjectURL(url);
} catch (e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  alert("TTS failed: " + msg);
} finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-busy={loading}
      className="rounded-md px-2 py-1 text-sm ring-1 ring-zinc-300 hover:bg-zinc-50"
      title="Read the article"
    >
      {loading ? "…" : label}
    </button>
  );
}

function collectSegments(root: HTMLElement, defaultLang = "el-GR") {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const out: { text: string; lang: string }[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const raw = node.nodeValue || "";
    const text = raw.replace(/\s+/g, " ").trim();
    if (!text) continue;

    const parent = (node.parentElement || root) as HTMLElement;
    // Skip anything marked with data-tts-skip
    if (parent.closest("[data-tts-skip]")) continue;

    // Find nearest lang, fallback to root/article/html or given default
    const elWithLang = parent.closest("[lang]") as HTMLElement | null;
    const lang =
      elWithLang?.getAttribute("lang") ||
      root.getAttribute("lang") ||
      document.documentElement.getAttribute("lang") ||
      defaultLang;

    out.push({ text, lang });
  }

  return out;
}
