"use client";

import { useId, useState } from "react";

export default function ReadMore({
  children,
  initiallyOpen = false,
  moreLabel = "Περισσότερα… / Read more…",
  lessLabel = "Λιγότερα / Read less",
  collapsedMaxHeight = 320, // px
}: {
  children: React.ReactNode;
  initiallyOpen?: boolean;
  moreLabel?: string;
  lessLabel?: string;
  collapsedMaxHeight?: number;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const panelId = useId();

  return (
    <div className="mt-4">
      <div
        id={panelId}
        aria-hidden={!open}
        className="relative"
        style={!open ? { maxHeight: collapsedMaxHeight, overflow: "hidden" } : {}}
      >
        {children}
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mt-3 text-sm font-medium text-blue-600 underline-offset-2 hover:underline"
      >
        {open ? lessLabel : moreLabel}
      </button>
    </div>
  );
}
