import { db } from "@/db";
import { posts } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import PostsClient from "./posts-client";

export default async function AdminPostsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return <PostsClient posts={allPosts} />;
}
