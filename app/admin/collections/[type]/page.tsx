import { db } from "@/db";
import { contentItems } from "@/db/schema";
import { getContentType } from "@/lib/content-types";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";
import CollectionClient from "./collection-client";

export default async function AdminCollectionPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { type } = await params;
  const contentType = getContentType(type);
  if (!contentType) notFound();

  const items = await db
    .select()
    .from(contentItems)
    .where(eq(contentItems.type, type))
    .orderBy(desc(contentItems.createdAt));

  return <CollectionClient contentType={contentType} items={items} />;
}
