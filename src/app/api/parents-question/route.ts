// src/app/api/parents-question/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function toStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export async function POST(req: NextRequest) {
  try {
    // Required envs
    const needed = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_SECURE", "EMAIL_USER", "EMAIL_PASS"] as const;
    const missing = needed.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
    if (missing.length) {
      console.error("Missing SMTP env:", missing.join(", "));
      return new NextResponse("Server email not configured.", { status: 500 });
    }

    const host = String(process.env.EMAIL_HOST);
    const port = Number(process.env.EMAIL_PORT || 465);
    const secure = String(process.env.EMAIL_SECURE).toLowerCase() === "true";
    const user = String(process.env.EMAIL_USER);
    const pass = String(process.env.EMAIL_PASS);
    const from = String(process.env.EMAIL_FROM || process.env.EMAIL_USER);

    // Body
    let raw: unknown = {};
    try { raw = await req.json(); } catch {}
    const body = (raw && typeof raw === "object") ? (raw as Record<string, unknown>) : {};

    // Honeypot
    if (toStr(body.website).trim() !== "") return NextResponse.json({ ok: true });

    const name = toStr(body.name);
    const email = toStr(body.email);
    const level = toStr(body.level);
    const grade = toStr(body.grade);
    const subject = toStr(body.subject);
    const book = toStr(body.book);
    const question = toStr(body.question);

    if (!name || !email || !level || !question) return new NextResponse("Missing required fields.", { status: 400 });
    if (question.length > 500) return new NextResponse("Question too long.", { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return new NextResponse("Invalid email.", { status: 400 });

    const text = [
      `Ονοματεπώνυμο: ${name}`,
      `Email: ${email}`,
      `Επίπεδο: ${level}`,
      grade ? `Τάξη: ${grade}` : null,
      subject ? `Μάθημα: ${subject}` : null,
      book ? `Βιβλίο/Σελίδα: ${book}` : null,
      "",
      "Ερώτηση:",
      question,
    ].filter(Boolean).join("\n");

    const transporter = nodemailer.createTransport({
      host, port, secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from, to: "mind@veltistos.com",
      replyTo: `"${name}" <${email}>`,
      subject: "Νέα ερώτηση από γονέα/μαθητή",
      text,
    });

    // --- Auto-reply to the sender (best-effort) ---
try {
  const ackText = `Ευχαριστώ πολύ.

Θα λάβετε απάντηση μέσα σε 48 ώρες.

Ισίδωρος Παρλαμάς`;

  await transporter.sendMail({
    from,                 // e.g. "Veltistos" <mind@veltistos.com>
    to: email,            // parent’s email
    subject: "Λάβαμε το μήνυμά σας – Veltistos",
    text: ackText,
  });
} catch (ackErr) {
  console.error("Auto-reply failed:", ackErr);
  // don't fail the whole request if the acknowledgement fails
}


    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("parents-question error:", err instanceof Error ? err.message : String(err));
    return new NextResponse("Internal error.", { status: 500 });
  }
}
