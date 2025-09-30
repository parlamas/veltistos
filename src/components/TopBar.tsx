// src/components/TopBar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Facebook, Linkedin, Instagram } from "lucide-react";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());

  // Simple, precise clock updater
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const tz = "Europe/Athens";

  const { weekday, date, time } = useMemo(() => {
    const weekdayStr = new Intl.DateTimeFormat("el-GR", {
      weekday: "short",
      timeZone: tz,
    })
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
    <header className="topbar-wrap" role="banner">
      <div className="topbar">
        {/* LEFT: logo + weather */}
        <div className="left">
          <Link href="/" aria-label="Veltistos - Αρχική">
            <Image
              src="/logo.png"
              alt="Veltistos"
              // Large intrinsic size for crispness
              width={640}
              height={160}
              priority
              className="logo"
              // 🔒 Force displayed size so it won't appear tiny
              style={{ width: "320px", height: "auto" }}
            />
          </Link>

          <div className="weather" aria-label="Καιρός και ώρα">
            <Image
              src="/cloud.png"
              alt=""
              width={35}
              height={35}
              className="cloud"
              aria-hidden="true"
            />
            <div className="weatherText">
              <div className="temp">
                26°C <span className="city">Αθήνα</span>
              </div>
              <div className="datetime">
                {weekday} {date} | {time}
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: search */}
        <div className="center">
          {!searchOpen ? (
            <button
              className="searchButton"
              onClick={() => setSearchOpen(true)}
              aria-label="Άνοιγμα αναζήτησης"
            >
              <Search className="icon" aria-hidden="true" />
              <span className="searchLabel">Αναζήτηση</span>
            </button>
          ) : (
            <div className="searchBox" role="search">
              <Search className="icon muted" aria-hidden="true" />
              <input
                autoFocus
                type="text"
                placeholder="Αναζήτηση…"
                className="searchInput"
                onBlur={() => setSearchOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                aria-label="Πεδίο αναζήτησης"
              />
            </div>
          )}
        </div>

        {/* RIGHT: support + socials */}
        <div className="right">
          <button className="support">Support Veltistos</button>
          <div className="socials" aria-label="Κοινωνικά Δίκτυα">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="X"
              className="socialCircle"
              aria-label="X"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="socialCircle"
              aria-label="LinkedIn"
            >
              <Linkedin className="smicon" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="socialCircle"
              aria-label="Facebook"
            >
              <Facebook className="smicon" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="socialCircle"
              aria-label="Instagram"
            >
              <Instagram className="smicon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}


