import { db } from "@/db";
import { contentItems } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post] = await db
    .select()
    .from(contentItems)
    .where(and(eq(contentItems.type, "posts"), eq(contentItems.slug, slug)))
    .limit(1);

  if (!post || !post.published) notFound();

  const data = post.data as Record<string, string>;

  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-3xl mx-auto">
        <Link href="/news" className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors mb-12">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All news
        </Link>
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
          {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
          {data.title}
        </h1>
      </section>

      <section className="border-t border-white/5 max-w-3xl mx-auto px-6 md:px-12 py-16">
        <div className="text-white/60 leading-relaxed whitespace-pre-wrap">{data.content}</div>
      </section>
    </>
  );
}
