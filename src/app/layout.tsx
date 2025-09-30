// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import TopBar from "@/components/TopBar";

const notoSans = Noto_Sans({
  subsets: ["greek"],
  variable: "--font-sans",
  display: "swap",
});
const notoSerif = Noto_Serif({
  subsets: ["greek"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veltistos",
  description: "Ειδήσεις & αναλύσεις στα ελληνικά",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" dir="ltr" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased text-zinc-900 bg-white">
        <TopBar />
        {/* Zero top padding below the header */}
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-0 pb-6">
          {children}
        </main>
      </body>
    </html>
  );
}



