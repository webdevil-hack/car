import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";

const sessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: process.env.IRON_SESSION_COOKIE_NAME as string,
  cookieOptions: { secure: true },
};

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const session = await getIronSession<{ user?: any }>(req, res, sessionOptions as any);
  session.destroy();
  return NextResponse.json({ ok: true }, { headers: res.headers });
}
