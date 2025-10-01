// src/components/MainNav.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, ChevronDown } from "lucide-react";
import Image from "next/image";


export default function MainNav() {
  const [elladaOpen, setElladaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for the burger event from TopBar
  useEffect(() => {
    const handler = () => setMobileOpen((v) => !v);
    // TypeScript-safe enough for a custom event name
    (document as unknown as { addEventListener: (t: string, cb: () => void) => void; removeEventListener: (t: string, cb: () => void) => void; })
      .addEventListener("toggle-mainnav", handler);
    return () =>
      (document as unknown as { removeEventListener: (t: string, cb: () => void) => void; })
        .removeEventListener("toggle-mainnav", handler);
  }, []);

  return (
    // sticky nav under the topbar
    <nav className="w-full bg-red-600 text-white sticky top-0 z-30" role="navigation" aria-label="Κύριο Μενού">
      <div className="max-w-[1120px] mx-auto px-6">
        <ul className="hidden sm:flex items-center gap-6 h-11 whitespace-nowrap">
          {/* 1) Home */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold hover:opacity-90"
              aria-label="Αρχική"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">Αρχική</span>
            </Link>
          </li>

          {/* 2) ΕΛΛΑΔΑ with dropdown (desktop) */}
<li
  className="relative group before:absolute before:left-0 before:right-0 before:top-full before:h-2 before:content-['']"
  onMouseEnter={() => setElladaOpen(true)}
  onMouseLeave={() => setElladaOpen(false)}
>
  <button
    type="button"
    className="flex items-center gap-1 font-semibold hover:opacity-90"
    aria-haspopup="menu"
    aria-expanded={elladaOpen}
    onClick={() => setElladaOpen(v => !v)} // tap/click fallback
  >
    ΕΛΛΑΔΑ<Image src="/flags/30x20-hel-kyp.png" alt="" width={30} height={20} className="block" aria-hidden="true" />

    <ChevronDown className="w-4 h-4" aria-hidden="true" />
  </button>

  {/* NOTE: removed mt-2 to eliminate the hover gap */}
  <div
    className={`absolute left-0 top-full z-20 min-w-[240px] rounded-lg bg-white text-zinc-900 shadow-lg ring-1 ring-zinc-200
                ${elladaOpen ? "block" : "hidden"} group-hover:block`}
    role="menu"
    aria-label="Υπομενού: ΕΛΛΑΔΑ"
  >
    <ul className="py-1">
      <li><Link href="/ellada/kypros" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Κύπρος</Link></li>
      <li><Link href="/ellada/politiki" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Πολιτική</Link></li>
      <li><Link href="/ellada/paideia" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Παιδεία</Link></li>
      <li><Link href="/ellada/ygeia" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Υγεία</Link></li>
      <li><Link href="/ellada/oikonomia" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Οικονομία</Link></li>
      <li><Link href="/ellada/athlitismos" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Αθλητισμός</Link></li>
    </ul>
  </div>
</li>





          {/* 3) ΔΙΕΘΝΗ */}
          <li><Link href="/diethni" className="font-semibold hover:opacity-90">ΔΙΕΘΝΗ</Link></li>

          {/* 4) ΙΣΙΔΩΡΟΣ ΠΑΡΛΑΜΑΣ */}
          <li><Link href="/isidoros-parlamas" className="font-semibold hover:opacity-90">ΙΣΙΔΩΡΟΣ ΠΑΡΛΑΜΑΣ</Link></li>

          {/* 5) ΑΙ */}
          <li><Link href="/ai" className="font-semibold hover:opacity-90">ΑΙ</Link></li>

          {/* 6) VIDEOS */}
          <li><Link href="/videos" className="font-semibold hover:opacity-90">VIDEOS</Link></li>

          {/* 7) Greek–Israeli Relations (flags) */}
<li>
  <Link
    href="/greek-israeli-relations"
    className="hover:opacity-90 flex items-center gap-1"
    aria-label="Greek–Israeli Relations"
  >
    <Image
  src="/flags/hl.svg"             // if your file is still hl.svg, keep it as "/flags/hl.svg"
  alt=""
  width={18}
  height={12}
  className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600"
  aria-hidden="true"
/>
<Image
  src="/flags/il.svg"
  alt=""
  width={18}
  height={12}
  className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600"
  aria-hidden="true"
/>

  </Link>
</li>

{/* 8) Greek–Turkish Relations (flags) */}
<li>
  <Link
    href="/greek-turkish-relations"
    className="hover:opacity-90 flex items-center gap-1"
    aria-label="Greek–Turkish Relations"
  >
    <Image
  src="/flags/hl.svg"             // if your file is still hl.svg, keep it as "/flags/hl.svg"
  alt=""
  width={18}
  height={12}
  className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600"
  aria-hidden="true"
/>
<Image
  src="/flags/tr.svg"
  alt=""
  width={18}
  height={12}
  className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600"
  aria-hidden="true"
/>
  </Link>
</li>

        </ul>

        

{/* Mobile panel — no socials here */}
        <div className="sm:hidden py-2">
          {mobileOpen && (
            <div className="rounded-md bg-white text-zinc-900 shadow-md ring-1 ring-zinc-200">
              <ul className="py-2">
                <li><Link href="/" className="block px-4 py-2 hover:bg-zinc-50">Αρχική</Link></li>
                <li className="px-4 py-2 font-semibold">ΕΛΛΑΔΑ</li>
                <ul className="pb-2">
                  <li><Link href="/ellada/kypros" className="block px-8 py-2 hover:bg-zinc-50">Κύπρος</Link></li>
                  <li><Link href="/ellada/politiki-paideia" className="block px-8 py-2 hover:bg-zinc-50">ΠολιτικήΠαιδεία</Link></li>
                  <li><Link href="/ellada/ygeia" className="block px-8 py-2 hover:bg-zinc-50">Υγεία</Link></li>
                  <li><Link href="/ellada/oikonomia" className="block px-8 py-2 hover:bg-zinc-50">Οικονομία</Link></li>
                  <li><Link href="/ellada/athlitismos" className="block px-8 py-2 hover:bg-zinc-50">Αθλητισμός</Link></li>
                </ul>
                <li><Link href="/diethni" className="block px-4 py-2 hover:bg-zinc-50">ΔΙΕΘΝΗ</Link></li>
                <li><Link href="/isidoros-parlamas" className="block px-4 py-2 hover:bg-zinc-50">ΙΣΙΔΩΡΟΣ ΠΑΡΛΑΜΑΣ</Link></li>
                <li><Link href="/ai" className="block px-4 py-2 hover:bg-zinc-50">ΑΙ</Link></li>
                <li><Link href="/videos" className="block px-4 py-2 hover:bg-zinc-50">VIDEOS</Link></li>
                <li><Link href="/greek-israeli-relations" className="block px-4 py-2 hover:bg-zinc-50">Ελληνοϊσραηλινές Σχέσεις</Link></li>
                <li><Link href="/greek-turkish-relations" className="block px-4 py-2 hover:bg-zinc-50">Ελληνοτουρκικές Σχέσεις</Link></li>
              </ul>
            </div>
          )}


        </div>
      </div>
    </nav>
  );
}
