// src/components/TopBar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Facebook, Linkedin, Instagram } from "lucide-react";

export default function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const tz = "Europe/Athens";
  const now = new Date();
  const weekday = new Intl.DateTimeFormat("el-GR", { weekday: "short", timeZone: tz })
    .format(now)
    .toUpperCase()
    .replace("Ί", "Ι");
  const date = new Intl.DateTimeFormat("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: tz,
  }).format(now);
  const time = new Intl.DateTimeFormat("el-GR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(now);

  return (
    <header className="topbar-wrap">
      <div className="topbar">
        {/* LEFT: logo + weather */}
        <div className="left">
          <Image
            src="/logo.png"
            alt="Veltistos Logo"
            width={800}
            height={200}
            className="logo"
            priority
          />
          <div className="weather">
            <Image src="/cloud.png" alt="Cloud" width={28} height={28} className="cloud" />
            <div className="weatherText">
              <div className="temp">26°C <span className="city">Αθήνα</span></div>
              <div className="datetime">{weekday} {date} | {time}</div>
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
              <Search className="icon" />
              <span className="searchLabel">Αναζήτηση</span>
            </button>
          ) : (
            <div className="searchBox">
              <Search className="icon muted" />
              <input
                autoFocus
                type="text"
                placeholder="Αναζήτηση…"
                className="searchInput"
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          )}
        </div>

        {/* RIGHT: support + socials */}
        <div className="right">
          <button className="support">Support Veltistos</button>
          <div className="socials">
            <div title="X" className="socialCircle">X</div>
            <div title="LinkedIn" className="socialCircle"><Linkedin className="smicon" /></div>
            <div title="Facebook" className="socialCircle"><Facebook className="smicon" /></div>
            <div title="Instagram" className="socialCircle"><Instagram className="smicon" /></div>
          </div>
        </div>
      </div>
    </header>
  );
}

