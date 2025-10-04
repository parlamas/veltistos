// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import TopBar from "@/components/TopBar";
import MainNav from "@/components/MainNav";
import Ticker from "@/components/Ticker";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";

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
  icons: {
    icon: [
      { url: "/favicon-red.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-red-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-red-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/favicon-red-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,       // prevent iOS zoom-on-focus + weird scale after rotate
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" dir="ltr" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased text-zinc-900 bg-white">
        <TopBar />
        <MainNav />
        <Ticker speedSec={24} /> {/* adjust if you want slower/faster */}
        <main className="mx-auto max-w-[1120px] px-6 pt-0 pb-6">
          {children}
        </main>
      </body>
    </html>
  );
}



