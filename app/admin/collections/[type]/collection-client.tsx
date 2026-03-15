"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { contentTypes, type ContentType, type FieldDef } from "@/lib/content-types";
import type { ContentItem } from "@/db/schema";

// ─── helpers ─────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function emptyForm(contentType: ContentType): Record<string, unknown> {
  return Object.fromEntries(
    contentType.fields.map((f) => [f.name, f.type === "boolean" ? false : ""]),
  );
}

function formFromItem(item: ContentItem): Record<string, unknown> {
  // All field values are stored in item.data (including slug & published).
  return { ...(item.data as Record<string, unknown>) };
}

// ─── field renderer ───────────────────────────────────────────────────────────

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const base =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[#95ef7f]/60";

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-[#95ef7f]"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        required={field.required}
        rows={8}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        className={`${base} resize-y`}
      />
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        required={field.required}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className={base}
      />
    );
  }

  // text | slug
  return (
    <input
      type="text"
      required={field.required}
      value={String(value ?? "")}
      onChange={(e) => onChange(e.target.value)}
      className={field.type === "slug" ? `${base} font-mono` : base}
    />
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function CollectionClient({
  contentType,
  items,
}: {
  contentType: ContentType;
  items: ContentItem[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm(contentType));
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── field change handler ──
  function handleFieldChange(field: FieldDef, value: unknown) {
    setForm((prev) => {
      const next = { ...prev, [field.name]: value };

      // Auto-generate slug from its source field (only when creating)
      if (!editing && field.type !== "slug") {
        const slugField = contentType.fields.find(
          (f) => f.type === "slug" && f.slugFrom === field.name,
        );
        if (slugField) {
          next[slugField.name] = slugify(String(value ?? ""));
        }
      }

      return next;
    });
  }

  // ── form submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = editing ? "PATCH" : "POST";
    const url = editing
      ? `/api/collections/${contentType.name}/${editing}`
      : `/api/collections/${contentType.name}`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm(emptyForm(contentType));
      setEditing(null);
      setShowForm(false);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    }
    setLoading(false);
  }

  // ── delete ──
  async function handleDelete(id: number) {
    if (!confirm(`Delete this ${contentType.singularLabel.toLowerCase()}?`)) return;
    await fetch(`/api/collections/${contentType.name}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  // ── edit ──
  function handleEdit(item: ContentItem) {
    setEditing(item.id);
    setForm(formFromItem(item));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── logout ──
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  // ── derive display fields ──
  const titleField = contentType.fields.find((f) => f.name === "title") ?? contentType.fields[0];
  const slugField = contentType.fields.find((f) => f.type === "slug");
  const publishedField = contentType.fields.find((f) => f.name === "published");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-white/10 px-4 py-8 flex flex-col gap-1">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Collections
        </p>
        {contentTypes.map((ct) => (
          <Link
            key={ct.name}
            href={`/admin/collections/${ct.name}`}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              ct.name === contentType.name
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {ct.label}
          </Link>
        ))}
        <div className="mt-auto pt-8">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/40 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">{contentType.label}</h1>
          <button
            onClick={() => {
              setEditing(null);
              setForm(emptyForm(contentType));
              setShowForm(true);
            }}
            className="rounded-full bg-[#95ef7f] px-5 py-2 text-sm font-medium text-black hover:bg-[#95ef7f]/90 transition-colors"
          >
            + New {contentType.singularLabel.toLowerCase()}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-5"
          >
            <h2 className="text-lg font-medium">
              {editing ? `Edit ${contentType.singularLabel}` : `New ${contentType.singularLabel}`}
            </h2>

            {contentType.fields.map((field) => (
              <div key={field.name}>
                {field.type !== "boolean" && (
                  <label className="mb-1 block text-sm text-white/60">{field.label}</label>
                )}
                <FieldInput
                  field={field}
                  value={form[field.name]}
                  onChange={(v) => handleFieldChange(field, v)}
                />
              </div>
            ))}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-[#95ef7f] px-6 py-2 text-sm font-medium text-black hover:bg-[#95ef7f]/90 disabled:opacity-50 transition-colors"
              >
                {loading ? "Saving…" : editing ? "Save changes" : `Create ${contentType.singularLabel.toLowerCase()}`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                  setForm(emptyForm(contentType));
                }}
                className="rounded-full border border-white/10 px-6 py-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="flex flex-col gap-3">
          {items.length === 0 && (
            <p className="py-12 text-center text-sm text-white/40">
              No {contentType.label.toLowerCase()} yet.
            </p>
          )}
          {items.map((item) => {
            const data = item.data as Record<string, unknown>;
            return (
              <div
                key={item.id}
                className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">
                      {String(data[titleField.name] ?? "—")}
                    </span>
                    {publishedField && (
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.published
                            ? "bg-[#95ef7f]/20 text-[#95ef7f]"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </span>
                    )}
                  </div>
                  {slugField && (
                    <p className="text-xs text-white/40 font-mono">{item.slug ?? "—"}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-400/70 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-400/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
