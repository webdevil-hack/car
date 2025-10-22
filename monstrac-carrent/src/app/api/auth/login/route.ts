import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: process.env.IRON_SESSION_COOKIE_NAME as string,
  cookieOptions: { secure: true },
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const res = new NextResponse();
  const session = await getIronSession<{ user?: any }>(req, res, sessionOptions as any);
  session.user = { id: user.id, role: user.role, name: user.name, email: user.email };
  await session.save();
  return NextResponse.json({ ok: true }, { headers: res.headers });
}
