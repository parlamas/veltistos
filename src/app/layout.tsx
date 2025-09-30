// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import Image from "next/image";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="el"
      dir="ltr"
      className={`${notoSans.variable} ${notoSerif.variable}`}
    >
      <body className="font-sans antialiased text-zinc-900 bg-white">
        {/* Header with logo */}
        <header className="w-full shadow-sm border-b bg-white">
          <div className="max-w-6xl mx-auto flex items-center px-4 py-3">
            <Image
              src="/logo.png"
              alt="Veltistos Logo"
              width={160}
              height={40}
              priority
            />
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}



