import { db } from "@/db";
import { contentItems } from "@/db/schema";
import { getContentType } from "@/lib/content-types";
import { getSession } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ type: string; id: string }> };

/** GET /api/collections/[type]/[id]
 *  - Published items: public.
 *  - Draft items: requires a valid session.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  const { type, id } = await params;
  if (!getContentType(type)) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  }

  const [item] = await db
    .select()
    .from(contentItems)
    .where(and(eq(contentItems.type, type), eq(contentItems.id, Number(id))))
    .limit(1);

  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!item.published) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(item);
}

/** PATCH /api/collections/[type]/[id]
 *  Updates an existing item. Requires a valid session.
 */
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type, id } = await params;
  const contentType = getContentType(type);
  if (!contentType) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  }

  const body: Record<string, unknown> = await req.json();

  // Rebuild full data from submitted fields
  const data: Record<string, unknown> = {};
  for (const field of contentType.fields) {
    if (field.name in body) {
      data[field.name] = body[field.name];
    }
  }

  const slug = (body.slug as string | undefined) || null;
  const published = (body.published as boolean | undefined) ?? false;

  const [updated] = await db
    .update(contentItems)
    .set({ data, slug, published, updatedAt: new Date() })
    .where(and(eq(contentItems.type, type), eq(contentItems.id, Number(id))))
    .returning();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

/** DELETE /api/collections/[type]/[id]
 *  Deletes an item. Requires a valid session.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type, id } = await params;
  if (!getContentType(type)) {
    return NextResponse.json({ error: "Unknown content type" }, { status: 404 });
  }

  await db
    .delete(contentItems)
    .where(and(eq(contentItems.type, type), eq(contentItems.id, Number(id))));

  return NextResponse.json({ ok: true });
}
