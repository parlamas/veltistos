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
    synth.onvoiceschanged = loadVoices;
    return () => {
      try { synth.cancel(); } catch {}
      synth.onvoiceschanged = null;
    };
  }, [synth]);

  // map first voice per primary language key (en/es/zh/el)
  const voiceMap = useMemo(() => {
    const map = new Map<string, SpeechSynthesisVoice>();
    for (const v of voices) {
      const lang = (v.lang || "").toLowerCase();
      const key = lang.split("-")[0];
      if (!map.has(key)) map.set(key, v);
    }
    return map;
  }, [voices]);

  const hasGreekVoice = useMemo(
    () =>
      voices.some(
        (v) =>
          (v.lang || "").toLowerCase().startsWith("el") ||
          /greek|ελλην/i.test(v.name)
      ),
    [voices]
  );

  // Detect language per text chunk
  function detectLang(text: string): LangKey {
    if (/[\u4E00-\u9FFF]/.test(text)) return "zh"; // CJK
    if (/[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)) return "el"; // Greek basic + extended
    if (/[¡¿]/.test(text)) return "es"; // quick Spanish
    const esStop = /\b(?:el|la|los|las|un|una|unos|unas|y|o|de|del|al|que|por|para|con|sin|pero|muy|mas|como|cuando|donde|porque|hola|gracias|voy|vas|va|vamos|van|escuela|hoy|ayer|manana)\b/i;
    let hits = 0;
    text.split(/\s+/).forEach((w) => { if (esStop.test(w)) hits++; });
    if (hits >= 2) return "es";
    return "en";
  }

  function getText() {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) return "";
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-tts-skip]").forEach((n) => n.remove());
    return (clone as HTMLElement).innerText?.trim() || clone.textContent?.trim() || "";
  }

  // Split text into manageable utterances (includes Greek punctuation)
  function chunk(text: string, maxLen = 300) {
    const parts = text
      .replace(/\s+/g, " ")
      .split(/(?<=[\.\!\?…。！？;;])\s+/); // includes Greek question mark (;) and ;
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

  // Prefer exact el-GR, then any Greek, then name match
  function pickVoiceForKey(key: LangKey): SpeechSynthesisVoice | null {
    const lc = (s: string | undefined) => (s || "").toLowerCase();
    if (key === "el") {
      return (
        voices.find((v) => lc(v.lang) === "el-gr") ||
        voices.find((v) => lc(v.lang).startsWith("el")) ||
        voices.find((v) => /greek|ελλην/i.test(v.name)) ||
        null
      );
    }
    if (key === "es") {
      return (
        voices.find((v) => lc(v.lang) === "es-es") ||
        voices.find((v) => lc(v.lang).startsWith("es")) ||
        voiceMap.get("es") ||
        null
      );
    }
    if (key === "zh") {
      return (
        voices.find((v) => lc(v.lang) === "zh-cn") ||
        voices.find((v) => lc(v.lang).startsWith("zh")) ||
        voiceMap.get("zh") ||
        null
      );
    }
    return (
      voices.find((v) => lc(v.lang) === "en-us") ||
      voices.find((v) => lc(v.lang).startsWith("en")) ||
      voiceMap.get("en") ||
      null
    );
  }

  function speakChunks(chunks: string[]) {
    if (!synth) return;

    // Bias to Greek if most of the article is Greek
    const whole = getText();
    const greekChars = (whole.match(/[\u0370-\u03FF\u1F00-\u1FFF]/g) || []).length;
    const latinChars = (whole.match(/[A-Za-z]/g) || []).length;
    const greekBias = greekChars > latinChars * 0.5;

    queueRef.current = chunks.map((t) => {
      const u = new SpeechSynthesisUtterance(t);
      u.rate = rate;

      let key: LangKey = detectLang(t);
      if (key === "en" && defaultLang) key = defaultLang;
      if (key === "en" && greekBias) key = "el";

      const bcp47 =
        key === "el" ? "el-GR" :
        key === "es" ? "es-ES" :
        key === "zh" ? "zh-CN" :
        "en-US";

      const v = pickVoiceForKey(key);

      u.lang = v?.lang || bcp47;
      if (v) {
        u.voice = v;
      } else if (key === "el" && !sessionStorage.getItem("noElVoiceWarned")) {
        sessionStorage.setItem("noElVoiceWarned", "1");
        const list = voices.map((vv) => `${vv.name} [${vv.lang}]`).join("\n");
        alert(
          "Δεν βρέθηκε ελληνική φωνή από τον περιηγητή.\n" +
            "• Σε Windows, προτίμησε Microsoft Edge (εκθέτει τις φωνές συστήματος καλύτερα από το Chrome).\n" +
            "• Βεβαιώσου ότι είναι εγκατεστημένη η φωνή Greek (el-GR) στα Windows και κάνε επανεκκίνηση του browser.\n\n" +
            "Φωνές που βλέπει ο περιηγητής:\n" + list
        );
      }

      u.onerror = () => {};
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
    if (status === "paused") {
      try { synth.resume(); } catch {}
      setStatus("speaking");
      return;
    }
    const text = getText();
    if (!text) return;
    try { synth.cancel(); } catch {}
    speakChunks(chunk(text));
  }

  function pause() {
    if (synth && status === "speaking") {
      try { synth.pause(); } catch {}
      setStatus("paused");
    }
  }

  function stop() {
    if (synth) {
      try { synth.cancel(); } catch {}
      queueRef.current = null;
      setStatus("idle");
    }
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

      {!hasGreekVoice && (
        <span className="ml-2 text-xs text-zinc-500">(Δεν βρέθηκε ελληνική φωνή)</span>
      )}
    </div>
  );
}
