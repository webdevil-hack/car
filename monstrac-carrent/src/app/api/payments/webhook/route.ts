import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  // Stub webhook: acknowledge
  return NextResponse.json({ received: true });
}
