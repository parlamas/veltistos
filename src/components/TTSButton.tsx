// src/components/TTSButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";

export default function TTSButton({
  targetSelector,
  lang = "el-GR",
  rate = 1,
  label = "",
}: {
  targetSelector: string;   // e.g. "#story-content" (an element whose innerText we’ll read)
  lang?: string;            // default Greek
  rate?: number;            // 0.5–1.5 is a comfy range
  label?: string;           // button text next to the icon
}) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!synth) setStatus("unavailable");
    return () => {
      try { synth?.cancel(); } catch {}
    };
  }, [synth]);

  function getText() {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) return "";
    // Grab plain text (skips images/links markup)
    return el.innerText.trim();
  }

  function play() {
    if (!synth) return;
    if (status === "paused") { synth.resume(); setStatus("speaking"); return; }

    const text = getText();
    if (!text) return;

    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.onend = () => setStatus("idle");
    u.onerror = () => setStatus("idle");
    utterRef.current = u;
    synth.speak(u);
    setStatus("speaking");
  }

  function pause() { if (synth && status === "speaking") { synth.pause(); setStatus("paused"); } }
  function stop()  { if (synth) { synth.cancel(); setStatus("idle"); } }

  const isSpeaking = status === "speaking";
  const isPaused   = status === "paused";

  return (
    <div className="not-prose flex items-center gap-1 text-zinc-700">
      <button
        type="button"
        onClick={isSpeaking ? pause : play}
        className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100"
        aria-label={isSpeaking ? "Παύση ανάγνωσης" : "Ανάγνωση άρθρου"}
        title={isSpeaking ? "Παύση" : "Ανάγνωση"}
        disabled={status === "unavailable"}
      >
        {isSpeaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {label && (
  <span className="text-xs">{isSpeaking ? "Παύση" : label}</span>
)}

      </button>

      {(isSpeaking || isPaused) && (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center px-2 py-1 rounded hover:bg-zinc-100"
          aria-label="Διακοπή ανάγνωσης"
          title="Διακοπή"
        >
          <Square className="w-4 h-4" />
        </button>
      )}

      {status === "unavailable" && (
        <span className="ml-2 text-xs text-zinc-500">TTS μη διαθέσιμο στον φυλλομετρητή</span>
      )}
    </div>
  );
}
