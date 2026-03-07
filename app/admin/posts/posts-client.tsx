"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/db/schema";

type PostForm = {
  title: string;
  slug: string;
  content: string;
  published: boolean;
};

const emptyForm: PostForm = { title: "", slug: "", content: "", published: false };

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PostsClient({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: editing ? f.slug : slugify(title) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = editing ? "PATCH" : "POST";
    const url = editing ? `/api/posts/${editing}` : "/api/posts";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm(emptyForm);
      setEditing(null);
      setShowForm(false);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    }
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function handleEdit(post: Post) {
    setEditing(post.id);
    setForm({ title: post.title, slug: post.slug, content: post.content, published: post.published });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">CMS – Posts</h1>
        <div className="flex gap-3">
          <button
            onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}
            className="rounded-full bg-[#95ef7f] px-5 py-2 text-sm font-medium text-black hover:bg-[#95ef7f]/90 transition-colors"
          >
            + New post
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
          <h2 className="text-lg font-medium">{editing ? "Edit post" : "New post"}</h2>
          <div>
            <label className="mb-1 block text-sm text-white/60">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[#95ef7f]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-mono outline-none focus:border-[#95ef7f]/60"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/60">Content</label>
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[#95ef7f]/60 resize-y"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="accent-[#95ef7f]"
            />
            Publish
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#95ef7f] px-6 py-2 text-sm font-medium text-black hover:bg-[#95ef7f]/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving…" : editing ? "Save changes" : "Create post"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm); }}
              className="rounded-full border border-white/10 px-6 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {posts.length === 0 && (
          <p className="text-sm text-white/40 py-8 text-center">No posts yet.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="flex items-start justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm truncate">{post.title}</span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${post.published ? "bg-[#95ef7f]/20 text-[#95ef7f]" : "bg-white/10 text-white/40"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-xs text-white/40 font-mono">{post.slug}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleEdit(post)}
                className="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-xs text-red-400/70 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-400/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
