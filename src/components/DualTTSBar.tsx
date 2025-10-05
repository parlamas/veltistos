// src/components/DualTTSBar.tsx
"use client";

import TTSButton from "@/components/TTSButton";

export default function DualTTSBar({
  targetEl,
  targetEn,
}: {
  targetEl: string;
  targetEn: string;
}) {
  return (
    <div className="not-prose mb-3 flex gap-2">
      <TTSButton targetSelector={targetEl} label="🔊 Ελληνικά" />
      <TTSButton targetSelector={targetEn} label="🔊 English" />
    </div>
  );
}
