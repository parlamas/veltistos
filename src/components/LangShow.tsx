// src/components/LangShow.tsx
"use client";

import React, { useState, Children, isValidElement } from "react";

type Lang = "el" | "en";

export default function LangShow({
  children,
  defaultLang = "el",
}: {
  children: React.ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const kids = Children.toArray(children);

  // Visible to the reader: elements with matching lang OR no lang
  const visible = kids.filter((child) => {
    if (!isValidElement(child)) return true;
    const childLang = (child.props as { lang?: string }).lang;
    return !childLang || childLang === lang;
  });

  // Hidden duplicates for TTS targets
  const only = (l: Lang) =>
    kids.filter(
      (child) => isValidElement(child) && (child.props as { lang?: string }).lang === l
    );

  return (
    <div data-lang={lang}>
      {/* Language toggle buttons */}
      <div className="not-prose mb-4 flex gap-2">
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

      {/* Visible content */}
      {visible}

      {/* Hidden full copies for TTS (stay in DOM, not visible) */}
      <div className="sr-only" aria-hidden="true" data-tts-el>
        {only("el")}
      </div>
      <div className="sr-only" aria-hidden="true" data-tts-en>
        {only("en")}
      </div>
    </div>
  );
}
