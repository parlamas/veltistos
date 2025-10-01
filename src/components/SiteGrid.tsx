// src/components/SiteGrid.tsx
"use client";

import type { ReactNode } from "react";

export default function SiteGrid({
  left,
  children,
  right,
}: {
  left?: ReactNode;
  children: ReactNode;   // center column (main stories)
  right?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1120px] px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr_1fr]">
        {/* On mobile: center first, then left, then right */}
        <main className="order-1 lg:order-2">{children}</main>
        <aside className="order-2 lg:order-1">{left}</aside>
        <aside className="order-3 lg:order-3">{right}</aside>
      </div>
    </div>
  );
}
