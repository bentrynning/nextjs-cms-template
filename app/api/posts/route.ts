import { db } from "@/db";
import { posts } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));

  return NextResponse.json(allPosts);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, slug, content, published } = await req.json();

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
  }

  const [post] = await db
    .insert(posts)
    .values({ title, slug, content, published: published ?? false })
    .returning();

  return NextResponse.json(post, { status: 201 });
}
