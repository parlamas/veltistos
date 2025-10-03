// src/components/TTSButtonAncient.tsx
"use client";

import { useState, useRef } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";

type EspeakApi = {
  speak: (t: string, o?: { voice?: string; rate?: number; pitch?: number }) => Uint8Array;
};

type EspeakModule = {
  init?: () => Promise<EspeakApi>;
  default?: { init?: () => Promise<EspeakApi> };
};

function isEspeakApi(x: unknown): x is EspeakApi {
  return !!x && typeof (x as Record<string, unknown>).speak === "function";
}
function isEspeakModule(x: unknown): x is EspeakModule {
  if (!x) return false;
  const r = x as Record<string, unknown>;
  const init = r.init;
  const dinit = (r.default as Record<string, unknown> | undefined)?.init;
  return typeof init === "function" || typeof dinit === "function";
}

export default function TTSButtonAncient({
  targetSelector,
  label = "🏺",
  rate = 160,  // eSpeak-ng “wpm-ish”
  pitch = 50,  // 0–99
}: {
  targetSelector: string;
  label?: string;
  rate?: number;
  pitch?: number;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function onClick() {
    if (status === "paused") {
      audioRef.current?.play().catch(() => {});
      setStatus("speaking");
      return;
    }
    if (status === "speaking") {
      audioRef.current?.pause();
      setStatus("paused");
      return;
    }

    const root = document.querySelector<HTMLElement>(targetSelector);
    if (!root) {
      alert("Ancient TTS: target element not found.");
      return;
    }

    const text = collectAncientText(root);
    if (!text) {
      alert('Δεν βρέθηκε κείμενο με lang="grc".');
      return;
    }

    // Try eSpeak NG (WASM)
    try {
      const wav = await synthesizeWithEspeak(text, { voice: "grc", rate, pitch });
      await playWav(wav);
      return;
    } catch (err) {
      console.warn("eSpeak-NG import/synthesis failed; falling back to browser TTS.", err);
      fallbackBrowserTTS(text);
    }
  }

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setStatus("idle");
    } else {
      try { window.speechSynthesis.cancel(); } catch {}
      setStatus("idle");
    }
  }

  const isSpeaking = status === "speaking";
  const isPaused = status === "paused";

  return (
    <div className="not-prose flex items-center gap-1 text-zinc-700">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100"
        aria-label="Ανάγνωση αποσπασμάτων στα Αρχαία Ελληνικά"
        title="Αρχαία Ελληνικά"
      >
        {isSpeaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span className="text-xs">{isSpeaking ? "Παύση" : label}</span>
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
    </div>
  );

  // ---------- helpers ----------

  function collectAncientText(root: HTMLElement): string {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const parts: string[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue || "";
      const text = raw.replace(/\s+/g, " ").trim();
      if (!text) continue;

      const parent = (node.parentElement || root) as HTMLElement;
      if (parent.closest("[data-tts-skip]")) continue;

      const elWithLang = parent.closest("[lang]") as HTMLElement | null;
      const lang = (elWithLang?.getAttribute("lang") || "").toLowerCase();
      if (lang === "grc") parts.push(text);
    }
    return parts.join(" ").trim();
  }

  async function synthesizeWithEspeak(
    text: string,
    opts: { voice: string; rate: number; pitch: number }
  ): Promise<Uint8Array> {
    // dynamic import keeps it client-only
    const mod: unknown = await import("espeak-ng");
    if (!isEspeakModule(mod)) throw new Error("espeak-ng: invalid module shape");

    const maybeInit =
      (mod as EspeakModule).init ||
      (mod as EspeakModule).default?.init;

    if (!maybeInit) throw new Error("espeak-ng: init() not found");

    const api = await maybeInit();
    if (!isEspeakApi(api)) throw new Error("espeak-ng: invalid API from init()");
    const bytes = api.speak(text, { voice: opts.voice, rate: opts.rate, pitch: opts.pitch });
    if (!(bytes instanceof Uint8Array)) throw new Error("espeak-ng: speak() did not return Uint8Array");
    return bytes;
  }

  async function playWav(wavBytes: Uint8Array) {
    const blob = new Blob([wavBytes], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => {
      URL.revokeObjectURL(url);
      setStatus("idle");
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      setStatus("idle");
    };

    setStatus("speaking");
    await audio.play();
  }

  function fallbackBrowserTTS(text: string) {
    if (!("speechSynthesis" in window)) {
      alert("Δεν υποστηρίζεται το Web Speech API στον περιηγητή.");
      return;
    }
    try { window.speechSynthesis.cancel(); } catch {}
    const u = new SpeechSynthesisUtterance(text);
    // Fallback is Modern Greek (approximation)
    u.lang = "el-GR";
    u.rate = 1.0;
    u.onerror = () => setStatus("idle");
    u.onend = () => setStatus("idle");
    setStatus("speaking");
    window.speechSynthesis.speak(u);
  }
}
