// src/app/api/tts/route.ts
export const runtime = "nodejs"; // keep Node runtime for best compatibility

import { NextRequest } from "next/server";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type Segment = { text: string; lang: string };

const DEFAULT_VOICE_BY_LANG: Record<string, string> = {
  // You can change these defaults anytime
  "el": "el-GR-AthinaNeural",
  "el-gr": "el-GR-AthinaNeural",
  "es": "es-ES-ElviraNeural",
  "es-es": "es-ES-ElviraNeural",
  "zh": "zh-CN-XiaoyiNeural",
  "zh-cn": "zh-CN-XiaoyiNeural",
  "en": "en-US-JennyNeural",
  "en-us": "en-US-JennyNeural",
};

function normalizeLang(input: string | undefined) {
  const l = (input || "el-GR").toLowerCase();
  if (l === "el") return "el-GR";
  if (l === "es") return "es-ES";
  if (l === "en") return "en-US";
  if (l.startsWith("zh")) return "zh-CN";
  return input || "el-GR";
}

function voiceForLang(lang: string, override?: Record<string, string>) {
  const key = lang.toLowerCase();
  return override?.[key] || DEFAULT_VOICE_BY_LANG[key] || "el-GR-AthinaNeural";
}

function buildSSML({
  segments,
  ssml,
  text,
  defaultLang,
  voiceDefault,
  voiceOverrides,
}: {
  segments?: Segment[];
  ssml?: string;
  text?: string;
  defaultLang?: string;
  voiceDefault?: string;
  voiceOverrides?: Record<string, string>;
}) {
  if (ssml && ssml.trim()) return ssml;

  const xmlHeader =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${normalizeLang(defaultLang)}">`;

  if (segments && segments.length) {
    const blocks = segments
      .map((s) => {
        const lang = normalizeLang(s.lang);
        const voice = voiceDefault || voiceForLang(lang, voiceOverrides);
        return `<voice name="${voice}" xml:lang="${lang}">${escapeXml(s.text)}</voice>`;
      })
      .join("");
    return `${xmlHeader}${blocks}</speak>`;
  }

  if (text && text.trim()) {
    const lang = normalizeLang(defaultLang || "el-GR");
    const voice = voiceDefault || voiceForLang(lang, voiceOverrides);
    return `${xmlHeader}<voice name="${voice}">${escapeXml(text)}</voice></speak>`;
  }

  throw new Error("No text/segments/ssml provided.");
}

export async function POST(req: NextRequest) {
  const region = process.env.AZURE_SPEECH_REGION;
  const key = process.env.AZURE_SPEECH_KEY;

  if (!region || !key) {
    return new Response("Missing AZURE_SPEECH_REGION / AZURE_SPEECH_KEY", { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  try {
    const ssml = buildSSML({
      segments: body.segments,
      ssml: body.ssml,
      text: body.text,
      defaultLang: body.defaultLang || "el-GR",
      voiceDefault: body.voiceDefault,
      voiceOverrides: body.voiceOverrides,
    });

    const format = body.format || "audio-48khz-192kbitrate-mono-mp3";

    const r = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": format,
          "User-Agent": "veltistos-tts",
        },
        body: ssml,
      }
    );

    if (!r.ok) {
      const txt = await r.text();
      return new Response(`Azure TTS error ${r.status}: ${txt}`, { status: 500 });
    }

    const buf = await r.arrayBuffer();
    return new Response(buf, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return new Response(`TTS build error: ${e?.message || e}`, { status: 400 });
  }
}
