// src/app/api/parents-question/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // simple honeypot
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
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

    // validate
    if (!name || !email || !level || !question) {
      return new NextResponse("Missing required fields.", { status: 400 });
    }
    if (String(question).length > 500) {
      return new NextResponse("Question too long.", { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new NextResponse("Invalid email.", { status: 400 });
    }

    // Build message
    const text = [
      `Ονοματεπώνυμο: ${name}`,
      `Email: ${email}`,
      `Επίπεδο: ${level}`,
      grade ? `Τάξη: ${grade}` : null,
      subject ? `Μάθημα: ${subject}` : null,
      book ? `Βιβλίο: ${book}` : null,
      "",
      "Ερώτηση:",
      question,
    ].filter(Boolean).join("\n");

    // Transporter (use your SMTP)
    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_USER,
      EMAIL_PASS,
      EMAIL_SECURE, // "true" | "false" (optional)
      EMAIL_FROM,   // e.g. '"Veltistos" <no-reply@veltistos.com>'
    } = process.env as Record<string, string | undefined>;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      console.error("Missing SMTP env vars.");
      return new NextResponse("Server email not configured.", { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: EMAIL_SECURE === "true", // true for 465, false for 587
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_FROM || EMAIL_USER!,
      to: "mind@veltistos.com",
      replyTo: `"${name}" <${email}>`,
      subject: "Νέα ερώτηση από γονέα/μαθητή",
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
