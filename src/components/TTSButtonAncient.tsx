// src/components/TTSButtonAncient.tsx
"use client";

import { useState, useRef } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";

type EspeakApi = {
  speak: (t: string, o?: { voice?: string; rate?: number; pitch?: number }) => Uint8Array;
};
type EsModuleLike = Record<string, unknown> & {
  default?: unknown;
  init?: () => Promise<EspeakApi>;
};

function isFn(x: unknown): x is () => Promise<EspeakApi> {
  return typeof x === "function";
}
function isEspeakApi(x: unknown): x is EspeakApi {
  return !!x && typeof (x as Record<string, unknown>).speak === "function";
}

/** Import an ES module from a URL at runtime (avoid bundler touching it). */
async function importFromUrl(url: string): Promise<EsModuleLike> {
  const importer: (u: string) => Promise<EsModuleLike> = new Function(
    "u",
    "return import(u);"
  ) as unknown as (u: string) => Promise<EsModuleLike>;
  return importer(url);
}

async function loadEspeak(): Promise<EspeakApi> {
  const CDN_JS = "https://cdn.jsdelivr.net/npm/espeak-ng@1.0.2/dist/espeak-ng.js";
  const mod = await importFromUrl(CDN_JS);

  if (isFn(mod.init)) {
    const api = await mod.init();
    if (isEspeakApi(api)) return api;
  }
  const d = mod.default as EsModuleLike | undefined;
  if (d && isFn(d.init)) {
    const api = await d.init();
    if (isEspeakApi(api)) return api;
  }
  if (typeof mod.default === "function") {
    const api = await (mod.default as () => Promise<EspeakApi>)();
    if (isEspeakApi(api)) return api;
  }
  throw new Error("espeak-ng: could not obtain API");
}

export default function TTSButtonAncient({
  targetSelector,
  label = "🏺",
  rate = 120,   // slower default
  pitch = 45,   // a bit flatter
  breakMs = 180 // pause between phrases
}: {
  targetSelector: string;
  label?: string;
  rate?: number;
  pitch?: number;
  breakMs?: number;
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
    if (!root) { alert("Ancient TTS: target element not found."); return; }

    const text = collectAncientText(root);
    if (!text) { alert('Δεν βρέθηκε κείμενο με lang="grc".'); return; }

    try {
      const api = await loadEspeak();

      // chunk into short, punctuated phrases
      const phrases = phraseChunks(text, 220);
      setStatus("speaking");

      for (let i = 0; i < phrases.length; i++) {
        if (status === "idle") break; // stopped
        const bytes = api.speak(phrases[i], { voice: "grc", rate, pitch });
        await playWav(bytes);          // wait until it finishes
        if (i < phrases.length - 1) await sleep(breakMs);
      }

      setStatus("idle");
    } catch (err) {
      console.warn("eSpeak-NG load/synthesis failed; fallback to browser TTS.", err);
      fallbackBrowserTTS(text);
    }
  }

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    setStatus("idle");
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

  // ---- helpers ----

  function sleep(ms: number) {
    return new Promise<void>(res => setTimeout(res, ms));
  }

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

  function phraseChunks(text: string, maxLen = 220): string[] {
    // keep punctuation with the segment; include . ! ? Greek ; (question) and ano teleia (·, ·)
    const units = (text.replace(/\s+/g, " ").match(/[^\.!\?··;,:—–-]+[\.!\?··;,:—–-]?/gu)) || [text];
    const out: string[] = [];
    let buf = "";
    for (const u of units) {
      const next = (buf ? buf + " " : "") + u.trim();
      if (next.length > maxLen) {
        if (buf) out.push(buf);
        if (u.length > maxLen) {
          // hard split very long unit
          for (let i = 0; i < u.length; i += maxLen) out.push(u.slice(i, i + maxLen));
          buf = "";
        } else {
          buf = u.trim();
        }
      } else {
        buf = next;
      }
    }
    if (buf) out.push(buf);
    return out;
  }

  async function playWav(wavBytes: Uint8Array) {
    // convert to a real ArrayBuffer slice before Blob (type-safe)
    const arrayBuffer = wavBytes.buffer.slice(
      wavBytes.byteOffset,
      wavBytes.byteOffset + wavBytes.byteLength
    ) as ArrayBuffer;
    const blob = new Blob([arrayBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;

    await new Promise<void>((resolve) => {
      audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
      audio.onerror = () => { URL.revokeObjectURL(url); resolve(); };
      audio.play().catch(() => resolve());
    });
  }

  function fallbackBrowserTTS(text: string) {
    if (!("speechSynthesis" in window)) {
      alert("Δεν υποστηρίζεται το Web Speech API στον περιηγητή.");
      return;
    }
    try { window.speechSynthesis.cancel(); } catch {}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "el-GR"; // modern-Greek fallback
    u.rate = 0.9;     // slightly slower
    u.onerror = () => setStatus("idle");
    u.onend = () => setStatus("idle");
    setStatus("speaking");
    window.speechSynthesis.speak(u);
  }
}
