import { db } from "@/db";
import { contentItems } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";

export const metadata = {
  title: "News – My Company",
  description: "Latest news and updates.",
};

export default async function NewsPage() {
  const publishedPosts = await db
    .select()
    .from(contentItems)
    .where(and(eq(contentItems.type, "posts"), eq(contentItems.published, true)))
    .orderBy(desc(contentItems.createdAt));

  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="text-white/50 uppercase tracking-widest text-xs mb-4">News</p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
          Latest updates
        </h1>
      </section>

      <section className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {publishedPosts.length === 0 ? (
          <p className="text-white/40 text-sm">No posts yet. Check back soon.</p>
        ) : (
          <div className="flex flex-col divide-y divide-white/5">
            {publishedPosts.map((post, i) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 group"
              >
                <span className="text-white/30 text-sm font-mono w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-white/40 text-xs uppercase tracking-widest w-40 shrink-0">
                  {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <h2 className="text-white text-xl md:text-2xl font-medium flex-1 group-hover:text-white/80 transition-colors">
                  {String((post.data as Record<string, unknown>).title ?? "")}
                </h2>
                <svg className="hidden md:block text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
