export type FieldType = "text" | "textarea" | "slug" | "boolean" | "number";

export interface FieldDef {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  /** For slug fields: auto-generate from this sibling field */
  slugFrom?: string;
}

export interface ContentType {
  /** URL-safe identifier used in routes, e.g. "posts" */
  name: string;
  label: string;
  singularLabel: string;
  /**
   * Field definitions for this content type.
   *
   * Special conventions:
   *   - A field named "slug" (type "slug") is extracted to its own DB column and
   *     used in public URLs.
   *   - A field named "published" (type "boolean") is extracted to its own DB
   *     column and used to filter public API responses.
   */
  fields: FieldDef[];
}

// ─── Register content types here ────────────────────────────────────────────
// Adding a new content type only requires a new entry in this array.
// No new API routes or admin pages are needed.
// ─────────────────────────────────────────────────────────────────────────────

export const contentTypes: ContentType[] = [
  {
    name: "posts",
    label: "Posts",
    singularLabel: "Post",
    fields: [
      { name: "title",     type: "text",     label: "Title",   required: true },
      { name: "slug",      type: "slug",     label: "Slug",    required: true, slugFrom: "title" },
      { name: "content",   type: "textarea", label: "Content", required: true },
      { name: "published", type: "boolean",  label: "Published" },
    ],
  },
  {
    name: "services",
    label: "Services",
    singularLabel: "Service",
    fields: [
      { name: "title",       type: "text",     label: "Title",       required: true },
      { name: "slug",        type: "slug",     label: "Slug",        required: true, slugFrom: "title" },
      { name: "description", type: "textarea", label: "Description", required: true },
      { name: "published",   type: "boolean",  label: "Published" },
    ],
  },
];

export function getContentType(name: string): ContentType | undefined {
  return contentTypes.find((ct) => ct.name === name);
}
