import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    status: "received",
    type: "image",
    timestamp: new Date().toISOString(),
    payload: body,
  });
}
