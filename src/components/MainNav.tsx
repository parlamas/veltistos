// src/components/MainNav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Home, ChevronDown } from "lucide-react";

export default function MainNav() {
  const [elladaOpen, setElladaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [gnoseisOpen, setGnoseisOpen] = useState(false);

  // Toggle from TopBar burger
  useEffect(() => {
    const handler = () => setMobileOpen((v) => !v);
    document.addEventListener("toggle-mainnav", handler as EventListener);
    return () => document.removeEventListener("toggle-mainnav", handler as EventListener);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="w-full bg-red-600 text-white sticky top-0 z-30" role="navigation" aria-label="Κύριο Μενού">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Desktop */}
        <ul className="hidden sm:flex items-center gap-3 md:gap-4 lg:gap-5 h-10 whitespace-nowrap text-sm tracking-tight">
          {/* 1) Home */}
          <li>
            <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-90" aria-label="Αρχική">
              <Home className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">Αρχική</span>
            </Link>
          </li>

          {/* 2) ΕΛΛΑΔΑ with dropdown (white panel, no hover gap) */}
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
              onClick={() => setElladaOpen((v) => !v)}
            >
              ΕΛΛΑΔΑ
              <Image
                src="/flags/30x20-hel-kyp.png"
                alt=""
                width={16}
                height={11}
                className="ml-1 inline-block rounded-[2px] ring-1 ring-white/95 ring-offset-[1px] ring-offset-red-600"
                aria-hidden="true"
              />
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>

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
          <li><Link href="/isidoros-parlamas" className="font-semibold hover:opacity-90">Ι. ΠΑΡΛΑΜΑΣ</Link></li>

          {/* 5) ΓΝΩΣΕΙΣ (dropdown) */}
          <li
            className="relative group before:absolute before:left-0 before:right-0 before:top-full before:h-2 before:content-['']"
            onMouseEnter={() => setGnoseisOpen(true)}
            onMouseLeave={() => setGnoseisOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 font-semibold hover:opacity-90"
              aria-haspopup="menu"
              aria-expanded={gnoseisOpen}
              onClick={() => setGnoseisOpen(v => !v)}
            >
              γνώσεις
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>

            <div
              className={`absolute left-0 top-full z-20 min-w-[220px] rounded-lg bg-white text-zinc-900 shadow-lg ring-1 ring-zinc-200
                          ${gnoseisOpen ? "block" : "hidden"} group-hover:block`}
              role="menu"
              aria-label="Υπομενού: γνώσεις"
            >
              <ul className="py-1">
                <li><Link href="/gnoseis/dialektiki" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Διαλεκτική</Link></li>
                <li><Link href="/gnoseis/oristiki"   className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Οριστική</Link></li>
                <li><Link href="/gnoseis/grammatiki" className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Γραμματική</Link></li>
                <li><Link href="/gnoseis/glosses"    className="block px-4 py-2 hover:bg-zinc-50" role="menuitem">Γλώσσες</Link></li>
              </ul>
            </div>
          </li>

          {/* 6) γονείς/μαθητές */}
          <li><Link href="/parents-students" className="font-semibold hover:opacity-90">γονείς / μαθητές</Link></li>

          {/* 7) ΑΙ */}
          <li><Link href="/ai" className="font-semibold hover:opacity-90">ΑΙ</Link></li>

          {/* 8) VIDEOS */}
          <li><Link href="/videos" className="font-semibold hover:opacity-90">VIDEOS</Link></li>

          {/* 9) Greek–Israeli Relations (flags) */}
          <li>
            <Link
              href="/greek-israeli-relations"
              className="hover:opacity-90 flex items-center gap-1"
              aria-label="Greek–Israeli Relations"
            >
              <Image src="/flags/hl.svg" alt="" width={16} height={11}
                     className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600" aria-hidden="true" />
              <Image src="/flags/il.svg" alt="" width={16} height={11}
                     className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600" aria-hidden="true" />
            </Link>
          </li>

          {/* 10) Greek–Turkish Relations (flags) */}
          <li>
            <Link
              href="/greek-turkish-relations"
              className="hover:opacity-90 flex items-center gap-1"
              aria-label="Greek–Turkish Relations"
            >
              <Image src="/flags/hl.svg" alt="" width={16} height={11}
                     className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600" aria-hidden="true" />
              <Image src="/flags/tr.svg" alt="" width={16} height={11}
                     className="block rounded-[2px] ring-1 ring-white/95 ring-offset-[1.5px] ring-offset-red-600" aria-hidden="true" />
            </Link>
          </li>
        </ul>

        {/* Mobile panel */}
        <div className="sm:hidden py-2">
          {mobileOpen && (
              
          <div className="rounded-md bg-white text-zinc-900 shadow-md ring-1 ring-zinc-200 text-[12px] leading-[1.2] [text-size-adjust:100%] [-webkit-text-size-adjust:100%]">
              <ul className="py-2">
                <li><Link href="/" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">Αρχική</Link></li>

                {/* ΕΛΛΑΔΑ subtree */}
                <li className="px-3 py-1.5 font-semibold text-[12px]">ΕΛΛΑΔΑ</li>

                <li>
                  <ul className="pb-2 text-xs">
                    <li><Link href="/ellada/kypros" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Κύπρος</Link></li>
                    <li><Link href="/ellada/politiki-paideia" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">ΠολιτικήΠαιδεία</Link></li>
                    <li><Link href="/ellada/ygeia" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Υγεία</Link></li>
                    <li><Link href="/ellada/oikonomia" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Οικονομία</Link></li>
                    <li><Link href="/ellada/athlitismos" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Αθλητισμός</Link></li>
                  </ul>
                </li>

                {/* γνώσεις subtree */}
                <li className="px-3 py-1.5 font-semibold text-[12px]">γνώσεις</li>

                <li>
                  <ul className="pb-2 text-xs">
                    <li><Link href="/gnoseis/dialektiki" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Διαλεκτική</Link></li>
                    <li><Link href="/gnoseis/oristiki"   onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Οριστική</Link></li>
                    <li><Link href="/gnoseis/grammatiki" onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Γραμματική</Link></li>
                    <li><Link href="/gnoseis/glosses"    onClick={closeMobile} className="block px-5 py-1.25 hover:bg-zinc-50 text-[11px]">Γλώσσες</Link></li>
                  </ul>
                </li>

                <li><Link href="/diethni" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">ΔΙΕΘΝΗ</Link></li>
                <li><Link href="/isidoros-parlamas" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">ΙΣΙΔΩΡΟΣ ΠΑΡΛΑΜΑΣ</Link></li>
                <li><Link href="/parents-students" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">γονείς/μαθητές</Link></li>
                <li><Link href="/ai" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">ΑΙ</Link></li>
                <li><Link href="/videos" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">VIDEOS</Link></li>
                <li><Link href="/greek-israeli-relations" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">Ελληνοϊσραηλινές Σχέσεις</Link></li>
                <li><Link href="/greek-turkish-relations" onClick={closeMobile} className="block px-3 py-1.5 hover:bg-zinc-50 text-[12px]">Ελληνοτουρκικές Σχέσεις</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}


