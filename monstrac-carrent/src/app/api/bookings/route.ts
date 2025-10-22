import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const booking = await prisma.booking.create({ data });
  return NextResponse.json({ booking });
}
