import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Stub: pretend to dispatch emails/WhatsApp/SMS
  return NextResponse.json({ ok: true, echo: body });
}
