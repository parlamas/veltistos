// src/app/layout.tsx
import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import MainNav from "@/components/MainNav";
// keep your font imports & globals as before
import localFont from "next/font/local";
import "./globals.css";

const notoSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const notoSerif = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Veltistos",
  description: "News site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" dir="ltr" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased text-zinc-900 bg-white">
        <TopBar />
        <MainNav />
        {/* Zero top padding below the header */}
        <main className="mx-auto max-w-[1120px] px-6 pt-0 pb-6 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}

