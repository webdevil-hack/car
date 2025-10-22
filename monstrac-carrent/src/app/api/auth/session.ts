import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";

const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: process.env.IRON_SESSION_COOKIE_NAME as string,
  cookieOptions: { secure: true },
};

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const session = await getIronSession<{ user?: any }>(req, res, sessionOptions as any);
  return NextResponse.json({ user: session.user ?? null }, { headers: res.headers });
}
