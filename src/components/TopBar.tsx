// src/components/TopBar.tsx

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Search, Facebook, Linkedin, Instagram } from "lucide-react";

export default function TopBar() {
  // --- temperature (manual for now; we can wire live data later)
  const [tempC] = useState<number>(26); // Athens °C — change as needed

  // --- Athens time in Greek, refresh every minute
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const athensString = useMemo(() => {
    // Example: ΤΡΙ 30/09/2025 | 20:18
    const tz = "Europe/Athens";
    const weekday = new Intl.DateTimeFormat("el-GR", { weekday: "short", timeZone: tz })
      .format(now)
      .toUpperCase(); // ΤΡΙ, ΤΕΤ, ΠΕΜ...
    const day = new Intl.DateTimeFormat("el-GR", { day: "2-digit", timeZone: tz }).format(now);
    const month = new Intl.DateTimeFormat("el-GR", { month: "2-digit", timeZone: tz }).format(now);
    const year = new Intl.DateTimeFormat("el-GR", { year: "numeric", timeZone: tz }).format(now);
    const time = new Intl.DateTimeFormat("el-GR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(now);
    return `${weekday} ${day}/${month}/${year} | ${time}`;
  }, [now]);

  // --- search toggle
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* logical padding top/bottom */}
        <div className="py-3">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: logo + weather block */}
            <div className="flex items-center gap-4">
              {/* logo */}
              <Image
                src="/logo.png"
                alt="Veltistos"
                width={164}
                height={42}
                priority
                className="h-10 w-auto"
              />

              {/* weather + date (stacked) */}
              <div className="flex items-start gap-2">
                <Image
                  src="/cloud.png"
                  alt="Cloud"
                  width={28}
                  height={28}
                  className="mt-0.5 h-7 w-7 select-none"
                />
                <div className="leading-tight">
                  <div className="text-sm font-medium text-zinc-800">
                    {tempC}°C <span className="text-zinc-500">Αθήνα</span>
                  </div>
                  <div className="text-xs text-zinc-500">{athensString}</div>
                </div>
              </div>
            </div>

            {/* MIDDLE: search icon -> input */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                {!searchOpen ? (
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Άνοιγμα αναζήτησης"
                    className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50"
                  >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Αναζήτηση</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-zinc-500" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Αναζήτηση…"
                      className="w-full rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-zinc-300"
                      onBlur={() => setSearchOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Support button + social icons (icons only) */}
            <div className="flex items-center gap-3">
              <button
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                aria-label="Support Veltistos"
              >
                Support Veltistos
              </button>

              {/* Icons only (no links) */}
              <div className="flex items-center gap-2 text-zinc-700">
                {/* X icon substitute: bold X inside a circle */}
                <div
                  title="X"
                  className="grid h-8 w-8 place-items-center rounded-full border text-xs font-black"
                >
                  X
                </div>
                <div title="LinkedIn" className="grid h-8 w-8 place-items-center rounded-full border">
                  <Linkedin className="h-4 w-4" />
                </div>
                <div title="Facebook" className="grid h-8 w-8 place-items-center rounded-full border">
                  <Facebook className="h-4 w-4" />
                </div>
                <div title="Instagram" className="grid h-8 w-8 place-items-center rounded-full border">
                  <Instagram className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
