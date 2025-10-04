// src/app/api/parents-question/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";   // ensure runtime execution
export const revalidate = 0;               // no ISR
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function checkMissing() {
  const mustHave = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_SECURE", "EMAIL_USER", "EMAIL_PASS"] as const;
  const missing = mustHave.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
  return { missing };
}

function toStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

// GET: quick env check (safe; redacts secrets)
export async function GET() {
  const { missing } = checkMissing();
  return NextResponse.json({
    ok: missing.length === 0,
    missing,
    present: {
      EMAIL_HOST: !!process.env.EMAIL_HOST,
      EMAIL_PORT: !!process.env.EMAIL_PORT,
      EMAIL_SECURE: !!process.env.EMAIL_SECURE,
      EMAIL_USER: !!process.env.EMAIL_USER,
      EMAIL_PASS: !!process.env.EMAIL_PASS,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1) Ensure required envs exist
    const { missing } = checkMissing();
    if (missing.length) {
      console.error("Missing SMTP env:", missing.join(", "));
      return NextResponse.json({ error: "Server email not configured.", missing }, { status: 500 });
    }

    // 2) Parse envs
    const host = String(process.env.EMAIL_HOST);
    const port = Number(process.env.EMAIL_PORT || 465);
    const secure = String(process.env.EMAIL_SECURE).toLowerCase() === "true";
    const user = String(process.env.EMAIL_USER);
    const pass = String(process.env.EMAIL_PASS);
    const from = String(process.env.EMAIL_FROM || process.env.EMAIL_USER);

    // 3) Read and validate body (no `any`)
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      raw = {};
    }
    const body = (raw && typeof raw === "object" && raw !== null) ? (raw as Record<string, unknown>) : {};

    // Honeypot
    if (toStr(body.website).trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = toStr(body.name);
    const email = toStr(body.email);
    const level = toStr(body.level);
    const grade = toStr(body.grade);
    const subject = toStr(body.subject);
    const book = toStr(body.book);
    const question = toStr(body.question);

    if (!name || !email || !level || !question) {
      return new NextResponse("Missing required fields.", { status: 400 });
    }
    if (question.length > 500) {
      return new NextResponse("Question too long.", { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new NextResponse("Invalid email.", { status: 400 });
    }

    // 4) Build message
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
    ]
      .filter(Boolean)
      .join("\n");

    // 5) Send via SMTP
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true: 465 SSL, false: 587 STARTTLS
      auth: { user, pass },
    });

    // Optional: verify auth
    // await transporter.verify();

    await transporter.sendMail({
      from, // e.g. "Veltistos" <mind@veltistos.com>
      to: "mind@veltistos.com",
      replyTo: `"${name}" <${email}>`,
      subject: "Νέα ερώτηση από γονέα/μαθητή",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("parents-question error:", msg);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
