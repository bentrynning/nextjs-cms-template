import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const existing = await db.select().from(users).limit(1);
  return NextResponse.json({ setupDone: existing.length > 0 });
}
