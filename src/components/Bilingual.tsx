// src/components/Bilingual.tsx
"use client";

import { useState } from "react";

export default function Bilingual({
  el,
  en,
}: {
  el: React.ReactNode;
  en: React.ReactNode;
}) {
  const [lang, setLang] = useState<"el" | "en">("el");

  return (
    <div>
      {/* Toggle buttons */}
      <div className="not-prose mb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLang("el")}
          aria-pressed={lang === "el"}
          className={`rounded-md border px-3 py-1.5 text-sm ${
            lang === "el"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50"
          }`}
        >
          Ελληνικά
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
          className={`rounded-md border px-3 py-1.5 text-sm ${
            lang === "en"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50"
          }`}
        >
          English
        </button>
      </div>

      {/* Render the selected language only */}
      {lang === "el" ? el : en}
    </div>
  );
}
