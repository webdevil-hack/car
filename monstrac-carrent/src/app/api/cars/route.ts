import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const cars = await prisma.car.findMany({ take: 50 });
  return NextResponse.json({ cars });
}
