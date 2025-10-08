// src/components/ShareBar.tsx
"use client";

import { useEffect, useState } from "react";
import { X, Linkedin, Facebook, Instagram } from "lucide-react";

export default function ShareBar({
  href,
  title,
  label = "SHARE ON:",
}: {
  href: string;
  title: string;
  label?: string;
}) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const url = href.startsWith("http") ? href : `${site}${href}`;
  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  const xUrl = `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`;

  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy link", url);
    }
  }

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    // not-prose prevents Typography plugin from underlining the links
    <div className="not-prose mt-2 flex items-center gap-2 text-zinc-500">
      {/* Label once, before the icons */}
      <span className="mr-2 text-[11px] uppercase tracking-wide text-zinc-600">
        {label}
      </span>

      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="p-1.5 rounded hover:bg-zinc-100 no-underline"
      >
        <X className="w-4 h-4" />
      </a>
      <a
        href={liUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-1.5 rounded hover:bg-zinc-100 no-underline"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="p-1.5 rounded hover:bg-zinc-100 no-underline"
      >
        <Facebook className="w-4 h-4" />
      </a>
      {/* Instagram has no web share; we copy the link */}
      <button
  type="button"
  onClick={shareToInstagram}
  aria-label="Share to Instagram (or copy link)"
  className="p-1.5 rounded hover:bg-zinc-100"
  title={typeof navigator !== "undefined" && navigator.share ? "Share" : "Copy link"}
>
  <Instagram className="w-4 h-4" />
</button>

      

      {copied && (
        <span className="ml-1 text-[11px] text-zinc-600">Αντιγράφηκε</span>
      )}
    </div>
  );
}


