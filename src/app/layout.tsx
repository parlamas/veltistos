// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import TopBar from "@/components/TopBar";
import MainNav from "@/components/MainNav";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import Ticker from "@/components/Ticker";

const notoSans = Noto_Sans({
  subsets: ["greek", "latin"],
  variable: "--font-noto-sans",
  weight: ["400", "700"],
});

const notoSerif = Noto_Serif({
  subsets: ["greek", "latin"],
  variable: "--font-noto-serif",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Veltistos",
  description: "News site",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" dir="ltr" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased text-zinc-900 bg-white">
        <TopBar />
        <MainNav />

<Ticker speedSec={12} /> {/* quick scroll */}
        <main className="mx-auto max-w-[1120px] px-6 pt-0 pb-6 overflow-hidden">{children}</main>
        </main>
      </body>
    </html>
  );
}

