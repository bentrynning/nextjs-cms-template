import { db } from "@/db";
import { users } from "@/db/schema";
import { signSession, setSessionCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const existing = await db.select().from(users).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Setup already completed" }, { status: 403 });
  }

  const { email, password } = await req.json();

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Valid email and password (min 8 chars) required" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [user] = await db.insert(users).values({ email, passwordHash }).returning();

  const token = await signSession({ userId: user.id, email: user.email });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
