// src/components/ParentsFormModal.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const LEVELS = ["Δημοτικό", "Γυμνάσιο", "Λύκειο"] as const;
type Level = typeof LEVELS[number];

const MAX_CHARS = 500;

// runtime type guard for select value
function isLevel(x: string): x is Level {
  return (LEVELS as readonly string[]).includes(x);
}

export default function ParentsFormModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);

  // fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState<Level | "">("");
  const [grade, setGrade] = useState("");       // Τάξη
  const [details, setDetails] = useState("");   // Μάθημα, Βιβλίο, Σελίδα, Ερώτηση (ένα πεδίο)

  // reset when closed
  useEffect(() => {
    if (!open) {
      setSubmitting(false);
      setOk(null);
      setErr(null);
      setName("");
      setEmail("");
      setLevel("");
      setGrade("");
      setDetails("");
    }
  }, [open]);

  // close on Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const remaining = MAX_CHARS - details.length;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const requiredOk =
    name.trim().length > 0 &&
    emailOk &&
    !!level &&
    details.trim().length > 0;
  const tooLong = details.length > MAX_CHARS;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    if (!requiredOk || tooLong) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/parents-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          level,
          grade,
          subject: "",            // no separate fields anymore
          book: "",               // keep API shape; leave empty
          question: details,      // put EVERYTHING here
          website: "",            // honeypot
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Αποτυχία αποστολής.");
      }

      setOk("Ευχαριστούμε! Το μήνυμά σας εστάλη.");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Κάτι πήγε στραβά. Προσπαθήστε ξανά.";
      setErr(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      id="parents-form-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* dialog panel */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-[560px] rounded-2xl bg-white text-zinc-900 shadow-xl ring-1 ring-zinc-200"
      >
        <div className="px-5 py-3 border-b border-zinc-200">
          <h2 id={titleId} className="text-base font-semibold text-zinc-900">
            Επικοινωνία για γονείς / μαθητές
          </h2>
          <p className="mt-1 text-[11px] text-zinc-600">
            Συμπληρώστε τα στοιχεία και την ερώτησή σας (μέχρι {MAX_CHARS} χαρακτήρες).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">
          {/* Row: Ονοματεπώνυμο + Email */}
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-800">
                Ονοματεπώνυμο *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
                placeholder="π.χ. Μαρία Παπαδοπούλου"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-800">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
                placeholder="you@example.com"
                autoComplete="email"
              />
              {!emailOk && email.length > 0 && (
                <p className="mt-1 text-[11px] text-red-600">Παρακαλώ εισάγετε έγκυρο email.</p>
              )}
            </div>
          </fieldset>

          {/* Row: Επίπεδο + Τάξη */}
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-800">
                Το παιδί φοιτά στο *
              </label>
              <select
                value={level}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const v = e.target.value;
                  setLevel(isLevel(v) ? v : "");
                }}
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600 bg-white"
              >
                <option value="">— Επιλέξτε —</option>
                <option value="Δημοτικό">Δημοτικό</option>
                <option value="Γυμνάσιο">Γυμνάσιο</option>
                <option value="Λύκειο">Λύκειο</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-800">Τάξη</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600"
                placeholder="π.χ. Α΄, Β΄, Γ΄…"
              />
            </div>
          </fieldset>

          {/* Single field: Μάθημα, Βιβλίο, Σελίδα, Ερώτηση */}
          <fieldset>
            <label className="block text-xs font-medium text-zinc-800">
              Μάθημα, Βιβλίο, Σελίδα, Ερώτηση *
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value.slice(0, MAX_CHARS))}
              required
              maxLength={MAX_CHARS}
              rows={4}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-600 resize-y"
              placeholder="π.χ. Γραμματική | Νεοελληνική Γλώσσα | σελ. 42 | Γράψτε εδώ την ερώτηση…"
            />
            <div className="mt-1 text-[11px] text-zinc-600 text-right">
              {remaining} χαρακτήρες υπόλοιπο
            </div>
          </fieldset>

          {/* honeypot (hidden) */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

          {/* messages */}
          {ok && <p className="text-sm text-green-600">{ok}</p>}
          {err && <p className="text-sm text-red-600">{err}</p>}

          {/* actions */}
          <div className="pt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50"
              disabled={submitting}
            >
              Κλείσιμο
            </button>
            <button
              type="submit"
              disabled={submitting || !requiredOk || tooLong}
              className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Αποστολή…" : "Αποστολή"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
