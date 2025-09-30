// src/components/TopBar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Facebook, Linkedin, Instagram } from "lucide-react";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());

  // keep time fresh (Athens)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const tz = "Europe/Athens";
  const { weekday, date, time } = useMemo(() => {
    const weekdayStr = new Intl.DateTimeFormat("el-GR", { weekday: "short", timeZone: tz })
      .format(now)
      .toUpperCase()
      .replace("Ί", "Ι");
    const dateStr = new Intl.DateTimeFormat("el-GR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: tz,
    }).format(now);
    const timeStr = new Intl.DateTimeFormat("el-GR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(now);
    return { weekday: weekdayStr, date: dateStr, time: timeStr };
  }, [now]);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-5 py-1.5 border-b border-zinc-200">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: logo + weather */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Veltistos - Αρχική" className="block">
              {/* force displayed width with Tailwind */}
              <Image
                src="/logo.png"
                alt="Veltistos"
                width={640}
                height={160}
                priority
                className="block w-[320px] h-auto"
              />
            </Link>

            {/* Weather (hidden on xs) */}
            <div className="hidden sm:flex items-start gap-2" aria-label="Καιρός και ώρα">
              <Image src="/cloud.png" alt="" width={28} height={28} className="block" aria-hidden="true" />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-zinc-900">
                  26°C <span className="text-zinc-500 font-medium">Αθήνα</span>
                </div>
                <div className="text-xs text-zinc-500">
                  {weekday} {date} | {time}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: search */}
          <div className="flex-1 flex justify-center">
            {!searchOpen ? (
              <button
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50"
                onClick={() => setSearchOpen(true)}
                aria-label="Άνοιγμα αναζήτησης"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Αναζήτηση</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 border border-zinc-200 rounded-md px-2.5 py-1.5" role="search">
                <Search className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Αναζήτηση…"
                  className="text-sm outline-none border-0 min-w-[260px] bg-transparent"
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  aria-label="Πεδίο αναζήτησης"
                />
              </div>
            )}
          </div>

          {/* RIGHT: support + socials */}
          <div className="flex items-center gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-3.5 py-1.5 rounded-full">
              Support Veltistos
            </button>
            <div className="flex items-center gap-2 text-zinc-700">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="X"
                className="grid place-items-center w-8 h-8 rounded-full border border-zinc-200 text-[12px] font-black"
                aria-label="X"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="grid place-items-center w-8 h-8 rounded-full border border-zinc-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="grid place-items-center w-8 h-8 rounded-full border border-zinc-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="grid place-items-center w-8 h-8 rounded-full border border-zinc-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


