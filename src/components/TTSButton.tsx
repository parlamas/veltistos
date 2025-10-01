// src/components/TTSButton.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";

export default function TTSButton({
  targetSelector,
  rate = 1,
  label = "Ακρόαση",
}: {
  targetSelector: string;   // e.g. "#story-content"
  rate?: number;            // 0.5–1.5 comfy range
  label?: string;           // empty string => icon-only
}) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const [status, setStatus] = useState<Status>("idle");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const queueRef = useRef<SpeechSynthesisUtterance[] | null>(null);

  // Load voices (Chrome/Safari populate them async)
  useEffect(() => {
    if (!synth) { setStatus("unavailable"); return; }

    const load = () => {
      const v = synth.getVoices();
      if (v && v.length) setVoices(v);
    };

    load();
    synth.onvoiceschanged = load;

    return () => {
      try { synth.cancel(); } catch {}
      if (synth) synth.onvoiceschanged = null;
    };
  }, [synth]);

  // Build quick lookups by primary code ("el", "zh", "es", etc.)
  const voiceMap = useMemo(() => {
    const map = new Map<string, SpeechSynthesisVoice>();
    for (const v of voices) {
      const lang = (v.lang || "").toLowerCase();   // e.g. "el-gr"
      const key = lang.split("-")[0];              // "el"
      if (!map.has(key)) map.set(key, v);
    }
    return map;
  }, [voices]);

  function detectLang(text: string): "el" | "zh" | "es" | "en" {
    // CJK block → Chinese
    if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
    // Greek block
    if (/[\u0370-\u03FF]/.test(text)) return "el";
    // Heuristic for Spanish (accents/ñ/ü)
    if (/[áéíóúñüÁÉÍÓÚÑÜ]/.test(text)) return "es";
    return "en";
  }

  function getText() {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) return "";
    return el.innerText.trim();
  }

  // Split into manageable chunks (sentence-ish, supports Chinese “。！？” too)
  function chunk(text: string, maxLen = 300) {
    const parts = text
      .replace(/\s+/g, " ")
      .split(/(?<=[\.\!\?…。！？])\s+/);
    const out: string[] = [];
    let buf = "";

    for (const s of parts) {
      const next = (buf ? buf + " " : "") + s;
      if (next.length > maxLen) {
        if (buf) out.push(buf);
        if (s.length > maxLen) {
          for (let i = 0; i < s.length; i += maxLen) out.push(s.slice(i, i + maxLen));
          buf = "";
        } else {
          buf = s;
        }
      } else {
        buf = next;
      }
    }
    if (buf) out.push(buf);
    return out.filter(Boolean);
  }

  function speakChunks(chunks: string[]) {
    if (!synth) return;

    // Build utterances with per-chunk language when a voice exists
    queueRef.current = chunks.map((t) => {
      const u = new SpeechSynthesisUtterance(t);
      u.rate = rate;

      const langKey = detectLang(t);                 // "el" | "zh" | "es" | "en"
      const v = voiceMap.get(langKey);               // matching voice if present

      if (v) {
        u.voice = v;
        u.lang = v.lang;                             // e.g. "el-GR"
      } else {
        // No matching voice → DO NOT force u.lang.
        // Let the default engine speak it so it doesn’t go silent.
        // (Optional) nudge with navigator.language if you want:
        // u.lang = navigator.language;
      }
      return u;
    });

    let i = 0;
    const next = () => {
      if (!queueRef.current || i >= queueRef.current.length) {
        setStatus("idle");
        return;
      }
      const u = queueRef.current[i++];
      u.onend = next;
      u.onerror = next;
      synth.speak(u);
    };

    setStatus("speaking");
    next();
  }

  function play() {
    if (!synth) return;

    if (status === "paused") {
      try { synth.resume(); } catch {}
      setStatus("speaking");
      return;
    }

    const text = getText();
    if (!text) return;

    try { synth.cancel(); } catch {}

    const chunks = chunk(text);
    speakChunks(chunks);
  }

  function pause() {
    if (!synth) return;
    if (status === "speaking") {
      try { synth.pause(); } catch {}
      setStatus("paused");
    }
  }

  function stop() {
    if (!synth) return;
    try { synth.cancel(); } catch {}
    queueRef.current = null;
    setStatus("idle");
  }

  const isSpeaking = status === "speaking";
  const isPaused = status === "paused";

  return (
    <div className="not-prose flex items-center gap-1 text-zinc-700">
      <button
        type="button"
        onClick={isSpeaking ? pause : play}
        className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100"
        aria-label={isSpeaking ? "Παύση ανάγνωσης" : "Ανάγνωση άρθρου"}
        title={isSpeaking ? "Παύση" : "Ανάγνωση"}
        disabled={!synth}
      >
        {isSpeaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {label && <span className="text-xs">{isSpeaking ? "Παύση" : label}</span>}
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

      {/* Optional hint if no Greek voice is present */}
      {!voiceMap.get("el") && (
        <span className="ml-2 text-xs text-zinc-500">(Δεν βρέθηκε ελληνική φωνή)</span>
      )}
    </div>
  );
}

