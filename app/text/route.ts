import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  const text = await request.text();

  if (text.trim() === "") {
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

  const testHeader = request.headers.get("x-lmk-test");
  const isTest = ["true", "1", "yes"].includes(testHeader?.toLowerCase() ?? "");

  try {
    const to = isTest ? "+18777804236" : "+14704952462";
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
