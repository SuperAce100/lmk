import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  const { text, test } = (await request.json()) as { text?: unknown; test?: unknown };

  if (typeof text !== "string" || text.trim() === "") {
    return NextResponse.json({ ok: false, error: "text is required" }, { status: 400 });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !from) {
    return NextResponse.json(
      { ok: false, error: "missing Twilio env vars" },
      { status: 500 },
    );
  }

  try {
    const to = test === true ? "+18777804236" : "+14704952462";
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      from,
      to,
      body: text,
    });

    return NextResponse.json({
      ok: true,
      sid: message.sid,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "failed to send sms" }, { status: 500 });
  }
}
