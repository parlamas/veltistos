// src/components/TTSButton.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Square } from "lucide-react";

type Status = "idle" | "speaking" | "paused" | "unavailable";
type Segment = { text: string; lang: string; raw?: boolean };

// --- Abbreviation expansion --------------------------------------------------

// Expand common Greek abbreviations for clearer TTS output
function expandGreekAbbreviations(text: string): string {
  // We’ll use unicode-aware boundaries to avoid hitting inside longer words
  // Prefix: start or whitespace/punct; Suffix: end or whitespace/punct
  const P = String.raw`(^|[\s([«“"'\-])`;
  const S = String.raw`(?=$|[\s,.;:)\]»”"'!?\-])`;

  const rules: Array<[RegExp, string]> = [
    // κλπ. / κ.λ.π. / κ.λπ / κτλ. / κ.τ.λ.
    [new RegExp(`${P}κ\\.?\\s*λ\\.?\\s*π\\.?${S}`, "giu"), "και τα λοιπά"],
    [new RegExp(`${P}κτλ\\.?${S}`, "giu"), "και τα λοιπά"],
    [new RegExp(`${P}κ\\.?\\s*τ\\.?\\s*λ\\.?${S}`, "giu"), "και τα λοιπά"],

    // π.χ. → παραδείγματος χάριν
    [new RegExp(`${P}π\\.?\\s*χ\\.?${S}`, "giu"), "παραδείγματος χάριν"],

    // δηλ. → δηλαδή
    [new RegExp(`${P}δηλ\\.?${S}`, "giu"), "δηλαδή"],
  ];

  let out = text;
  for (const [re, rep] of rules) out = out.replace(re, (_, pre = "") => (pre ? `${pre}${rep}` : rep));
  return out;
}

// --- Helpers ----------------------------------------------------------------

function normalizeLang(input?: string) {
  const l = (input || "el-GR").toLowerCase();
  if (l === "el") return "el-GR";
  if (l === "es") return "es-ES";
  if (l === "en") return "en-US";
  if (l.startsWith("zh")) return "zh-CN";
  return input || "el-GR";
}

function sameLang(a: string, b: string) {
  const na = (a || "").toLowerCase();
  const nb = (b || "").toLowerCase();
  if (na === nb) return true;
  return na.split("-")[0] === nb.split("-")[0]; // el == el-GR
}

function chunkSentences(text: string, maxLen = 400): string[] {
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

  const exact = list.find(v => lc(v.lang) === L);
  if (exact) return exact;

  const base = L.split("-")[0];
  const byBase = list.find(v => lc(v.lang).startsWith(base));
  if (byBase) return byBase;

  if (base === "el") {
    const byName =
      list.find(v => /greek|ελλην/i.test(v.name)) ||
      list.find(v => /el[-_ ]?gr/i.test(v.name));
    if (byName) return byName;
  }
  return null;
}

function awaitVoices(synth: SpeechSynthesis | null, timeoutMs = 3000): Promise<SpeechSynthesisVoice[]> {
  if (!synth) return Promise.resolve([]);
  const existing = synth.getVoices();
  if (existing.length) return Promise.resolve(existing);

  return new Promise((resolve) => {
    const start = Date.now();
    const handler = () => {
      const v = synth.getVoices();
      if (v.length || Date.now() - start > timeoutMs) {
        synth.onvoiceschanged = null;
        resolve(v);
      }
    };
    synth.onvoiceschanged = handler;
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

// Walk the DOM and collect text nodes with the nearest lang.
// Skips anything inside [data-tts-skip].
// If inside [data-tts-raw], we mark the segment to prevent expansion.
function textNodesWithLang(root: HTMLElement, defaultLang = "el-GR"): Segment[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const rawSegments: Segment[] = [];
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const raw = node.nodeValue || "";
    const text = raw.replace(/\s+/g, " ").trim();
    if (!text) continue;

    const parent = (node.parentElement || root) as HTMLElement;

    if (parent.closest("[data-tts-skip]")) continue;

    const noExpand = !!parent.closest("[data-tts-raw]");

    const elWithLang = parent.closest("[lang]") as HTMLElement | null;
    const lang =
      elWithLang?.getAttribute("lang") ||
      root.getAttribute("lang") ||
      document.documentElement.getAttribute("lang") ||
      defaultLang;

    rawSegments.push({ text, lang, raw: noExpand });
  }

  // Merge adjacent same-lang segments (but don't merge across raw/non-raw)
  const merged: Segment[] = [];
  for (const seg of rawSegments) {
    const last = merged[merged.length - 1];
    if (last && last.raw === seg.raw && sameLang(last.lang, seg.lang)) {
      last.text += " " + seg.text;
    } else {
      merged.push(seg);
    }
  }
  return merged;
}

// --- Component ---------------------------------------------------------------

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

  useEffect(() => {
    let mounted = true;
    (async () => {
      const v = await awaitVoices(synth, 3000);
      if (!mounted) return;
      setVoices(v);
    })();
    return () => { mounted = false; };
  }, [synth]);

  async function play() {
    if (!synth) return;

    if (status === "paused") {
      try { synth.resume(); } catch {}
      setStatus("speaking");
      return;
    }

    const v = voices.length ? voices : await awaitVoices(synth, 3000);
    if (!v.length) {
      alert("Δεν φορτώθηκαν φωνές από τον περιηγητή. Δοκίμασε Microsoft Edge ή κάνε επανεκκίνηση του browser.");
      return;
    }

    const root = document.querySelector(targetSelector) as HTMLElement | null;
    if (!root) return;

    const segments = textNodesWithLang(root, "el-GR");
    if (!segments.length) return;

    // Build utterances
    const queue: SpeechSynthesisUtterance[] = [];

    for (const seg of segments) {
      const lang = normalizeLang(seg.lang);
      const voice = pickVoice(lang, v);

      // Expand abbreviations for Greek segments unless marked raw
      const prepared = lang.toLowerCase().startsWith("el") && !seg.raw
        ? expandGreekAbbreviations(seg.text)
        : seg.text;

      const chunks = chunkSentences(prepared, 400);
      for (const chunk of chunks) {
        const u = new SpeechSynthesisUtterance(chunk);
        u.lang = voice?.lang || lang;   // always set a language
        if (voice) u.voice = voice;     // prefer explicit voice when available
        u.rate = rate;
        u.onerror = () => {};
        queue.push(u);
      }
    }

    // Warn once if no Greek voice is visible (we still try to speak)
    const hasGreek = v.some(vv => (vv.lang || "").toLowerCase().startsWith("el") || /greek|ελλην/i.test(vv.name));
    if (!hasGreek && !sessionStorage.getItem("noElVoiceWarned")) {
      sessionStorage.setItem("noElVoiceWarned", "1");
      const list = v.map(vv => `${vv.name} [${vv.lang}]`).join("\n");
      alert("Δεν βρέθηκε ελληνική φωνή από τον περιηγητή.\n" +
            "• Σε Windows, προτίμησε Microsoft Edge.\n" +
            "• Βεβαιώσου ότι είναι εγκατεστημένη η φωνή el-GR και κάνε επανεκκίνηση του browser.\n\n" +
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
