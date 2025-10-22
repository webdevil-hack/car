import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Stub payment: return a fake URL
  return NextResponse.json({ url: "/confirmation?id=fake" });
}
