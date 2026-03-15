import { db } from "@/db";
import { contentItems } from "@/db/schema";
import { getContentType } from "@/lib/content-types";
import { getSession } from "@/lib/auth";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/** GET /api/collections/[type]
 *  - Public: returns published items only.
 *  - ?admin=1 with a valid session: returns all items (published + drafts).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  if (!getContentType(type)) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  }

  const session = await getSession();
  const wantsAdmin = req.nextUrl.searchParams.get("admin") === "1";

  const items =
    wantsAdmin && session
      ? await db
          .select()
          .from(contentItems)
          .where(eq(contentItems.type, type))
          .orderBy(desc(contentItems.createdAt))
      : await db
          .select()
          .from(contentItems)
          .where(and(eq(contentItems.type, type), eq(contentItems.published, true)))
          .orderBy(desc(contentItems.createdAt));

  return NextResponse.json(items);
}

/** POST /api/collections/[type]
 *  Creates a new item. Requires a valid session.
 *  Body should contain all field values defined in the content type schema.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type } = await params;
  const contentType = getContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  }

  const body: Record<string, unknown> = await req.json();

  for (const field of contentType.fields) {
    if (field.required && !body[field.name]) {
      return NextResponse.json({ error: `${field.label} is required` }, { status: 400 });
    }
  }

  // All field values live in the data JSON blob.
  // slug and published are also stored separately for efficient querying.
  const data: Record<string, unknown> = {};
  for (const field of contentType.fields) {
    data[field.name] = body[field.name] ?? (field.type === "boolean" ? false : "");
  }

  const slug = (body.slug as string | undefined) || null;
  const published = (body.published as boolean | undefined) ?? false;

  const [item] = await db
    .insert(contentItems)
    .values({ type, data, slug, published })
    .returning();

  return NextResponse.json(item, { status: 201 });
}
