// src/components/TTSButton.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";
type LangKey = "el" | "es" | "zh" | "en";

export default function TTSButton({
  targetSelector,
  rate = 1,
  label = "Ακρόαση",
  defaultLang,
}: {
  targetSelector: string;
  rate?: number;
  label?: string;
  defaultLang?: LangKey;
}) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const [status, setStatus] = useState<Status>("idle");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const queueRef = useRef<SpeechSynthesisUtterance[] | null>(null);

  // Load voices (Chrome populates async)
  useEffect(() => {
    if (!synth) {
      setStatus("unavailable");
      return;
    }
    const loadVoices = () => {
      const v = synth.getVoices();
      if (v && v.length) setVoices(v);
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices; // typed: ((this: SpeechSynthesis, ev: Event) => any) | null
    return () => {
      try { synth.cancel(); } catch {}
      synth.onvoiceschanged = null;
    };
  }, [synth]);

  // Map first voice per primary language key
  const voiceMap = useMemo(() => {
    const map = new Map<string, SpeechSynthesisVoice>();
    for (const v of voices) {
      const lang = (v.lang || "").toLowerCase(); // e.g. "es-es"
      const key = lang.split("-")[0];            // "es"
      if (!map.has(key)) map.set(key, v);
    }
    return map;
  }, [voices]);

  // Simple language detection
  function detectLang(text: string): LangKey {
    if (/[\u4E00-\u9FFF]/.test(text)) return "zh";   // CJK
    if (/[\u0370-\u03FF]/.test(text)) return "el";   // Greek
    if (/[¡¿]/.test(text)) return "es";              // Spanish punctuation

    const esStop = /\b(?:el|la|los|las|un|una|unos|unas|y|o|de|del|al|que|por|para|con|sin|pero|muy|mas|como|cuando|donde|porque|hola|gracias|voy|vas|va|vamos|van|escuela|hoy|ayer|manana)\b/i;
    let hits = 0;
    text.split(/\s+/).forEach(w => { if (esStop.test(w)) hits++; });
    if (hits >= 2) return "es";

    return "en";
  }

  function getText() {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) return "";
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-tts-skip]").forEach(n => n.remove());
    return clone.innerText.trim();
  }

  function chunk(text: string, maxLen = 300) {
    const parts = text.replace(/\s+/g, " ").split(/(?<=[\.\!\?…。！？])\s+/);
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

    queueRef.current = chunks.map((t) => {
      const u = new SpeechSynthesisUtterance(t);
      u.rate = rate;

      let key: LangKey = detectLang(t);
      if (key === "en" && defaultLang) key = defaultLang;

      const bcp47 =
        key === "el" ? "el-GR" :
        key === "es" ? "es-ES" :
        key === "zh" ? "zh-CN" :
        "en-US";

      // Prefer a voice whose lang starts with the key (el, es, zh, en)
      const v = voices.find(v => (v.lang || "").toLowerCase().startsWith(key)) || voiceMap.get(key) || null;

      // Always set lang so the engine attempts the right language even without a dedicated voice
      u.lang = v?.lang || bcp47;
      if (v) u.voice = v;

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
      synth!.speak(u);
    };

    setStatus("speaking");
    next();
  }

  function play() {
    if (!synth) return;
    if (status === "paused") { try { synth.resume(); } catch {} setStatus("speaking"); return; }
    const text = getText();
    if (!text) return;
    try { synth.cancel(); } catch {}
    speakChunks(chunk(text));
  }

  function pause() { if (synth && status === "speaking") { try { synth.pause(); } catch {} setStatus("paused"); } }
  function stop()  { if (synth) { try { synth.cancel(); } catch {} queueRef.current = null; setStatus("idle"); } }

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

      {!voiceMap.get("el") && <span className="ml-2 text-xs text-zinc-500">(Δεν βρέθηκε ελληνική φωνή)</span>}
    </div>
  );
}
