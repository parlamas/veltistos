// src/components/TopBar.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  Menu,
  Facebook,
  Linkedin,
  Instagram,
  Sun,
  Cloud,
  CloudSun,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
} from "lucide-react";

// Map Open-Meteo weathercode -> Lucide icon
function iconForOpenMeteo(code: number) {
  if (code === 0) return Sun; // clear
  if (code === 1 || code === 2 || code === 3) return CloudSun; // mainly clear → overcast
  if (code === 45 || code === 48) return CloudFog; // fog
  if (code >= 51 && code <= 57) return CloudDrizzle; // drizzle
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain; // rain
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return CloudSnow; // snow
  if (code === 95 || code === 96 || code === 99) return CloudLightning; // thunder
  return Cloud; // fallback
}

type CurrentWeather = {
  temp: number; // °C
  code: number; // Open-Meteo weather code
};

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const [weather, setWeather] = useState<CurrentWeather | null>(null);

  // live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // fetch weather for Athens (fixed for all visitors)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.72&current=temperature_2m,weather_code&timezone=Europe%2FAthens";
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        const temp = data?.current?.temperature_2m;
        const code = data?.current?.weather_code;
        if (!cancelled && typeof temp === "number" && typeof code === "number") {
          setWeather({ temp, code });
        }
      } catch {
        // silent fail → fallback icon/blank temp
      }
    }
    load();
    const id = setInterval(load, 10 * 60 * 1000); // refresh every 10 min
    return () => {
      cancelled = true;
      clearInterval(id);
    };
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

  const WeatherIcon = weather ? iconForOpenMeteo(weather.code) : Cloud;

  // (Optional) hook this to your drawer later
  function openMenu() {
  document.dispatchEvent(new CustomEvent("toggle-mainnav"));
}


  return (
      <header className="w-full bg-white border-b border-zinc-200 z-40 relative" role="banner">

      <div className="max-w-[1120px] mx-auto px-6">
        {/* ───────────────── MOBILE: two rows ───────────────── */}
        <div className="sm:hidden py-2">
          {/* Row 1: logo + support */}
          <div className="flex items-center justify-between gap-3">
            <Link href="/" aria-label="Veltistos - Αρχική" className="block">
              <Image
                src="/logo.svg"
                alt="Veltistos"
                width={148}
                height={60}
                priority
                className="block w-[148px] h-[60px] shrink-0"
              />
            </Link>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-1.5 rounded-full">
              Support Veltistos
            </button>
          </div>

          {/* Row 2: either compact controls OR the search field (when open) */}
          {!searchOpen ? (
            <div className="mt-2 flex items-center justify-between gap-3">
              {/* 1) Magnifying glass only */}
              <button
                onClick={() => setSearchOpen(true)}
                className="grid place-items-center w-9 h-9 rounded-full border border-zinc-200 hover:bg-zinc-50"
                aria-label="Άνοιγμα αναζήτησης"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* 2) Weather */}
              <div className="flex items-center gap-2 text-sm" aria-label="Καιρός">
                <WeatherIcon className="w-5 h-5 text-zinc-800" aria-hidden="true" />
                <div className="leading-tight">
                  <div className="font-semibold text-zinc-900">
                    {typeof weather?.temp === "number" ? Math.round(weather.temp) : "—"}°C{" "}
                    <span className="text-zinc-500 font-medium">Αθήνα</span>
                  </div>
                </div>
              </div>

              {/* 3) Date (weekday + DD/MM/YYYY) */}
              <div className="min-w-0 flex-1 text-right text-xs text-zinc-500">
                {weekday} {date}
              </div>

              {/* 4) Burger menu */}
              <button
                onClick={openMenu}
                className="grid place-items-center w-9 h-9 rounded-full border border-zinc-200 hover:bg-zinc-50"
                aria-label="Μενού"
              >
                <Menu className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            // Search field replaces the second row on mobile when open
            <div className="mt-2 flex items-center gap-2 border border-zinc-200 rounded-lg px-3 py-1" role="search">
              <Search className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              <input
                autoFocus
                type="text"
                placeholder="Αναζήτηση…"
                className="text-sm outline-none border-none flex-1 bg-transparent"
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                aria-label="Πεδίο αναζήτησης"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="grid place-items-center w-7 h-7 rounded-md hover:bg-zinc-100"
                aria-label="Κλείσιμο αναζήτησης"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* ───────────────── DESKTOP: original single row ───────────────── */}
        <div className="hidden sm:flex items-center justify-between gap-6 py-0">
          {/* LEFT: logo + weather */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Veltistos - Αρχική" className="block">
              <Image
                src="/logo.svg"
                alt="Veltistos"
                width={148}
                height={60}
                priority
                className="block w-[148px] h-[60px] shrink-0"
              />
            </Link>

            <div className="flex items-start gap-2 text-sm" aria-label="Καιρός και ώρα">
              <WeatherIcon className="w-5 h-5 text-zinc-800" aria-hidden="true" />
              <div className="leading-tight">
                <div className="font-semibold text-zinc-900">
                  {typeof weather?.temp === "number" ? Math.round(weather.temp) : "—"}°C{" "}
                  <span className="text-zinc-500 font-medium">Αθήνα</span>
                </div>
                <div className="text-xs text-zinc-500">
                  {weekday} {date} | {time}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: search (button → field) */}
          <div className="flex-1 flex justify-center">
            {!searchOpen ? (
              <button
                className="flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                onClick={() => setSearchOpen(true)}
                aria-label="Άνοιγμα αναζήτησης"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Αναζήτηση</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 border border-zinc-200 rounded-lg px-3 py-1" role="search">
                <Search className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Αναζήτηση…"
                  className="text-sm outline-none border-none min-w-[260px] bg-transparent"
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  aria-label="Πεδίο αναζήτησης"
                />
              </div>
            )}
          </div>

          {/* RIGHT: support + socials */}
          <div className="flex items-center gap-3">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-4 py-1.5 rounded-full">
              Support Veltistos
            </button>
            <div className="flex items-center gap-2 text-zinc-700" aria-label="Κοινωνικά Δίκτυα">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="X"
                className="grid place-items-center w-8 h-8 border border-zinc-200 rounded-full font-bold text-xs"
                aria-label="X"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="grid place-items-center w-8 h-8 border border-zinc-200 rounded-full"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="grid place-items-center w-8 h-8 border border-zinc-200 rounded-full"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="grid place-items-center w-8 h-8 border border-zinc-200 rounded-full"
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

