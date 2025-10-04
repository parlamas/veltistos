// src/app/api/parents-question/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function checkMissing() {
  const mustHave = ["EMAIL_HOST","EMAIL_PORT","EMAIL_SECURE","EMAIL_USER","EMAIL_PASS"] as const;
  const missing = mustHave.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
  return { mustHave, missing };
}

// GET: quick env check (safe, redacts secrets)
export async function GET() {
  const { missing } = checkMissing();
  return NextResponse.json({
    ok: missing.length === 0,
    missing,                                   // tells you which keys are empty/missing
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

// POST: send email (unchanged except clearer error if envs are missing)
export async function POST(req: NextRequest) {
  try {
    const { missing } = checkMissing();
    if (missing.length) {
      console.error("Missing SMTP env:", missing.join(", "));
      return NextResponse.json(
        { error: "Server email not configured.", missing },
        { status: 500 }
      );
    }

    const host = String(process.env.EMAIL_HOST);
    const port = Number(process.env.EMAIL_PORT) || 465;
    const secure = String(process.env.EMAIL_SECURE).toLowerCase() === "true";
    const user = String(process.env.EMAIL_USER);
    const pass = String(process.env.EMAIL_PASS);
    const from = String(process.env.EMAIL_FROM || process.env.EMAIL_USER);

    const body = await req.json().catch(() => ({} as any));

    // honeypot
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const { name = "", email = "", level = "", grade = "", subject = "", book = "", question = "" } = body || {};
    if (!name || !email || !level || !question) return new NextResponse("Missing required fields.", { status: 400 });
    if (String(question).length > 500) return new NextResponse("Question too long.", { status: 400 });
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

    const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

    // Optional: uncomment to verify auth before sending
    // await transporter.verify();

    await transporter.sendMail({
      from,
      to: "mind@veltistos.com",
      replyTo: `"${name}" <${email}>`,
      subject: "Νέα ερώτηση από γονέα/μαθητή",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("parents-question error:", err);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
