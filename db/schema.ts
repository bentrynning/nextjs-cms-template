import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

/**
 * Generic content items table.
 * Each row stores one item of any content type defined in lib/content-types.ts.
 *
 * - `type`      — content type name (e.g. "posts", "services")
 * - `data`      — all field values as a JSON blob
 * - `slug`      — extracted from data for efficient URL queries (nullable)
 * - `published` — extracted from data for efficient public/draft filtering
 *
 * A unique index on (type, slug) ensures slugs are unique within a type.
 * SQLite treats multiple NULLs as distinct, so slug-less types are fine.
 */
export const contentItems = sqliteTable(
  "content_items",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    type: text("type").notNull(),
    data: text("data", { mode: "json" }).notNull().$type<Record<string, unknown>>(),
    slug: text("slug"),
    published: int("published", { mode: "boolean" }).notNull().default(false),
    createdAt: int("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [uniqueIndex("content_items_type_slug_unique").on(t.type, t.slug)],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ContentItem = typeof contentItems.$inferSelect;
export type NewContentItem = typeof contentItems.$inferInsert;
