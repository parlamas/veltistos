// src/app/api/parents-question/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    // 1) Check required envs
    const mustHave = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_SECURE", "EMAIL_USER", "EMAIL_PASS"] as const;
    const missing = mustHave.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
    if (missing.length) {
      console.error("Missing SMTP env:", missing.join(", "));
      return new NextResponse("Server email not configured.", { status: 500 });
    }

    // 2) Parse envs
    const host = String(process.env.EMAIL_HOST);
    const port = Number(process.env.EMAIL_PORT) || 465;
    const secure = String(process.env.EMAIL_SECURE).toLowerCase() === "true";
    const user = String(process.env.EMAIL_USER);
    const pass = String(process.env.EMAIL_PASS);
    const from = String(process.env.EMAIL_FROM || process.env.EMAIL_USER);

    // 3) Read and validate body
    const body = await req.json().catch(() => ({}));
    // simple honeypot
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const {
      name = "",
      email = "",
      level = "",
      grade = "",
      subject = "",
      book = "",
      question = "",
    } = body || {};

    if (!name || !email || !level || !question) {
      return new NextResponse("Missing required fields.", { status: 400 });
    }
    if (String(question).length > 500) {
      return new NextResponse("Question too long.", { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new NextResponse("Invalid email.", { status: 400 });
    }

    // 4) Build email text
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
      secure, // true -> 465 SSL, false -> 587 STARTTLS
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,                                 // e.g. "Veltistos" <mind@veltistos.com>
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
