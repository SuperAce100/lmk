import twilio from "twilio";

export async function POST(request: Request) {
  const text = await request.text();

  if (text.trim() === "") {
    return new Response("text is required", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const toNumber = process.env.LMK_TO_NUMBER;
  const testNumber = process.env.LMK_TEST_NUMBER;

  if (!accountSid || !authToken || !from || !toNumber || !testNumber) {
    return new Response("server misconfigured", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const testHeader = request.headers.get("x-lmk-test");
  const isTest = ["true", "1", "yes"].includes(testHeader?.toLowerCase() ?? "");

  try {
    const to = isTest ? testNumber : toNumber;
    const client = twilio(accountSid, authToken);
    const message = await client.messages.create({
      from,
      to,
      body: text,
    });

    return new Response("Notified!", {
      headers: { "Content-Type": "text/plain" },
    });
  } catch {
    return new Response("failed to send", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
