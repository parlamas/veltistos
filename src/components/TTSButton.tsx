// src/components/TTSButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";

type Segment = { text: string; lang: string };

// Expand common Greek abbreviations for clearer TTS output
function expandGreekAbbreviations(text: string): string {
  const rules: Array<[RegExp, string]> = [
    // κλπ. / κ.λ.π. / κτλ. / κ.τ.λ. → και τα λοιπά
    [/\bκ\.?\s*λ\.?\s*π\.?/gi, "και τα λοιπά"],
    [/\bκτλ\.?/gi, "και τα λοιπά"],
    [/\bκ\.?\s*τ\.?\s*λ\.?\.?/gi, "και τα λοιπά"],

    // π.χ. → παραδείγματος χάριν
    [/\bπ\.?\s*χ\.?\.?/gi, "παραδείγματος χάριν"],

    // δηλ. → δηλαδή
    [/\bδηλ\.?\.?/gi, "δηλαδή"],
  ];

  let out = text;
  for (const [re, rep] of rules) out = out.replace(re, rep);
  return out;
}


export default function TTSButton({
  targetSelector,
  label = "Ακρόαση",
  rate = 1,
}: {
  targetSelector: string;
  label?: string;
  rate?: number;
}) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const [status, setStatus] = useState<Status>(synth ? "idle" : "unavailable");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const queueRef = useRef<SpeechSynthesisUtterance[] | null>(null);

  // --- Utilities -------------------------------------------------------------

  function awaitVoices(timeoutMs = 3000): Promise<SpeechSynthesisVoice[]> {
    if (!synth) return Promise.resolve([]);
    const existing = synth.getVoices();
    if (existing.length) return Promise.resolve(existing);

    return new Promise((resolve) => {
      const start = Date.now();
      const handle = () => {
        const v = synth.getVoices();
        if (v.length || Date.now() - start > timeoutMs) {
          synth.onvoiceschanged = null;
          resolve(v);
        }
      };
      synth.onvoiceschanged = handle;
      // Safety timer in case voiceschanged never fires
      const id = setInterval(() => {
        const v = synth.getVoices();
        if (v.length || Date.now() - start > timeoutMs) {
          clearInterval(id);
          synth.onvoiceschanged = null;
          resolve(v);
        }
      }, 150);
    });
  }

  function textNodesWithLang(root: HTMLElement, defaultLang = "el-GR"): Segment[] {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const out: Segment[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue || "";
      const text = raw.replace(/\s+/g, " ").trim();
      if (!text) continue;

      const parent = (node.parentElement || root) as HTMLElement;
      if (parent.closest("[data-tts-skip]")) continue;

      const elWithLang = parent.closest("[lang]") as HTMLElement | null;
      const lang =
        elWithLang?.getAttribute("lang") ||
        root.getAttribute("lang") ||
        document.documentElement.getAttribute("lang") ||
        defaultLang;

      out.push({ text, lang });
    }

    // merge adjacent same-lang segments to reduce utterance count
    const merged: Segment[] = [];
    for (const seg of out) {
      const last = merged[merged.length - 1];
      if (last && sameLang(last.lang, seg.lang)) {
        last.text += " " + seg.text;
      } else {
        merged.push(seg);
      }
    }
    return merged;
  }

  function sameLang(a: string, b: string) {
    const na = (a || "").toLowerCase();
    const nb = (b || "").toLowerCase();
    if (na === nb) return true;
    return na.split("-")[0] === nb.split("-")[0]; // el == el-GR
  }

  function chunkSentences(text: string, maxLen = 300): string[] {
    const parts = text
      .replace(/\s+/g, " ")
      .split(/(?<=[\.\!\?…。！？;;])\s+/); // includes Greek question mark ; and ;
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

  function pickVoice(lang: string, list: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    const lc = (s?: string) => (s || "").toLowerCase();
    const L = lc(lang);

    // Prefer exact locale
    const exact = list.find(v => lc(v.lang) === L);
    if (exact) return exact;

    // Prefer base language (el, es, zh, en)
    const base = L.split("-")[0];
    const byBase = list.find(v => lc(v.lang).startsWith(base));
    if (byBase) return byBase;

    // Greek: try name substrings (Edge/Chrome often expose long names)
    if (base === "el") {
      const byName =
        list.find(v => /greek|ελλην/i.test(v.name)) ||
        list.find(v => /el[-_ ]?gr/i.test(v.name));
      if (byName) return byName;
    }

    return null;
  }

  // --- Effects ---------------------------------------------------------------

  useEffect(() => {
    if (!synth) {
      setStatus("unavailable");
      return;
    }
    let mounted = true;
    (async () => {
      const v = await awaitVoices(3000);
      if (!mounted) return;
      setVoices(v);
    })();
    return () => {
      mounted = false;
    };
  }, [synth]);

  // --- Controls --------------------------------------------------------------

  async function play() {
    if (!synth) return;
    if (status === "paused") {
      try { synth.resume(); } catch {}
      setStatus("speaking");
      return;
    }

    // Ensure voices are there before we build utterances
    const v = voices.length ? voices : await awaitVoices(3000);
    if (!v.length) {
      alert("Δεν φορτώθηκαν φωνές από τον περιηγητή. Δοκίμασε Microsoft Edge ή κάνε επανεκκίνηση του browser.");
      return;
    }

    const root = document.querySelector(targetSelector) as HTMLElement | null;
    if (!root) return;

    const segments = textNodesWithLang(root, "el-GR");
    if (!segments.length) return;

    // Build utterances per segment, chunked by sentence
    const queue: SpeechSynthesisUtterance[] = [];

    for (const seg of segments) {
      const lang = normalizeLang(seg.lang);
const voice = pickVoice(lang, v);

// Expand abbreviations for Greek segments only
const preparedText = lang.toLowerCase().startsWith("el")
  ? expandGreekAbbreviations(seg.text)
  : seg.text;

const chunks = chunkSentences(preparedText, 400);

      for (const chunk of chunks) {
        const u = new SpeechSynthesisUtterance(chunk);
        u.lang = voice?.lang || lang;   // always set lang
        if (voice) u.voice = voice;     // prefer explicit voice if found
        u.rate = rate;
        // Fail/finish handlers
        u.onerror = () => {};
        queue.push(u);
      }
    }

    // If we have no Greek voice specifically, warn once (but still try)
    const hasGreek = v.some(vv => (vv.lang || "").toLowerCase().startsWith("el") || /greek|ελλην/i.test(vv.name));
    if (!hasGreek && !sessionStorage.getItem("noElVoiceWarned")) {
      sessionStorage.setItem("noElVoiceWarned", "1");
      const list = v.map(vv => `${vv.name} [${vv.lang}]`).join("\n");
      alert("Δεν βρέθηκε ελληνική φωνή από τον περιηγητή.\n" +
            "• Σε Windows, προτίμησε Microsoft Edge.\n" +
            "• Βεβαιώσου ότι το el-GR είναι εγκατεστημένο και κάνε επανεκκίνηση του browser.\n\n" +
            "Φωνές που βλέπει ο περιηγητής:\n" + list);
    }

    // Speak sequentially
    queueRef.current = queue;
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

    try { synth.cancel(); } catch {}
    setStatus("speaking");
    next();
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

  // --- Render ----------------------------------------------------------------

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
    </div>
  );
}

// Helpers
function normalizeLang(input?: string) {
  const l = (input || "el-GR").toLowerCase();
  if (l === "el") return "el-GR";
  if (l === "es") return "es-ES";
  if (l === "en") return "en-US";
  if (l.startsWith("zh")) return "zh-CN";
  return input || "el-GR";
}
