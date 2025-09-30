// src/components/TopBar.tsx

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
    .replace("Ί", "Ι"); // normalize uppercase accent
  const date = new Intl.DateTimeFormat("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: tz,
  }).format(now);
  const time = new Intl.DateTimeFormat("el-GR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  }).format(now);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Veltistos Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Middle: Weather + Time + Search */}
        <div className="flex items-center gap-6 text-sm text-zinc-700">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Image src="/cloud.png" alt="Weather" width={24} height={24} />
              <span>26°C Αθήνα</span>
            </div>
            <div>
              {weekday} {date} | {time}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <input
                type="text"
                placeholder="Αναζήτηση..."
                className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <button onClick={() => setSearchOpen(true)}>
                <Search className="w-5 h-5 text-zinc-700" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Support + Socials */}
        <div className="flex items-center gap-4">
          <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700">
            Support Veltistos
          </button>
          <div className="flex items-center gap-3 text-zinc-600">
            <span>X</span>
            <Linkedin className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}

