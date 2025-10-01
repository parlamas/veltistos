// src/components/Ticker.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type TickerItem = { title: string; url: string };

export default function Ticker({ speedSec = 36 }: { speedSec?: number }) {
  const [items, setItems] = useState<TickerItem[]>([]);

  // measure-driven animation timing
  const trackRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState(speedSec);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/ticker", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && Array.isArray(data?.items)) {
          setItems(data.items as TickerItem[]);
        }
      } catch {
        // ignore — will use fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fallback: TickerItem[] = [
    { title: "Δοκιμαστικό νέο #1", url: "/" },
    { title: "Δοκιμαστικό νέο #2", url: "/" },
    { title: "Δοκιμαστικό νέο #3", url: "/" },
  ];

  const data = items.length ? items : fallback;

  // Duplicate once so the animation can loop seamlessly.
  // (Keyframes below move -100%, so the travel distance is the full width.)
  const loop = [...data, ...data];

  // Recalculate duration based on actual rendered width, so pixel speed stays constant
  useEffect(() => {
    function recalc() {
      const el = trackRef.current;
      if (!el) return;

      // With translateX(-100%) we travel the full element width per loop.
      const travelPx = el.scrollWidth;

      // Tweak these two to your taste:
      const PX_PER_SEC = 60; // smaller = slower overall (try 50–70)
      const MIN_SEC = 16;    // never faster than this (seconds per loop)

      const sec = Math.max(MIN_SEC, travelPx / PX_PER_SEC);
      setDurationSec(sec);
    }

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [data.length]); // rerun when feed size changes

  const now = useMemo(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear() % 100).padStart(2, "0");
    return `${dd}.${mm}.${yy}`;
  }, []);

  return (
    <div className="w-full bg-white border-b border-zinc-200">
      <div className="max-w-[1120px] mx-auto px-6 py-2">
        <div className="flex items-stretch gap-4">
          {/* Left label */}
          <div className="flex flex-col justify-center">
            <div className="text-red-600 font-bold leading-tight">ΕΝ ΕΞΕΛΙΞΕΙ</div>
            <div className="text-xs text-zinc-500 leading-tight">{now}</div>
          </div>

          {/* Vertical pipe */}
          <div className="self-stretch w-px bg-zinc-200" aria-hidden="true" />

          {/* Ticker track */}
          <div className="relative overflow-hidden flex-1">
            <div
              ref={trackRef}
              className="inline-flex items-center gap-8 whitespace-nowrap will-change-transform"
              style={{
                animationName: "ticker",
                animationDuration: `${durationSec}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {loop.map((it, i) => (
                <Link
                  href={it.url || "#"}
                  key={`${i}-${it.title}`}
                  className="text-sm text-zinc-900 hover:text-red-600 transition-colors"
                >
                  {it.title}
                </Link>
              ))}
            </div>

            {/* keyframes local to this component */}
            <style jsx>{`
              @keyframes ticker {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
