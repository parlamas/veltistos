// src/components/ArticleLangWrapper.tsx
"use client";

import { useState } from "react";

export default function ArticleLangWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<"el" | "en">("el"); // default: Greek

  return (
    <div data-lang={lang}>
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

      {children}

      {/* Simple CSS switch: hide the other language */}
      <style jsx>{`
        [data-lang='el'] .lang-en { display: none; }
        [data-lang='en'] .lang-el { display: none; }
      `}</style>
    </div>
  );
}
