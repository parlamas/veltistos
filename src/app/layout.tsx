// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Noto_Serif } from "next/font/google";

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
      <body className="font-sans antialiased text-zinc-900 bg-white">{children}</body>
    </html>
  );
}


