import { db } from "@/db";
import { posts } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return NextResponse.json(allPosts);
}
