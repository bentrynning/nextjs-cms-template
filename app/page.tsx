import Link from "next/link";

const services = [
  {
    title: "Service One",
    description: "A brief description of your first service offering and the value it delivers.",
  },
  {
    title: "Service Two",
    description: "A brief description of your second service offering and the value it delivers.",
  },
  {
    title: "Service Three",
    description: "A brief description of your third service offering and the value it delivers.",
  },
  {
    title: "Service Four",
    description: "A brief description of your fourth service offering and the value it delivers.",
  },
];

const featuredProjects = [
  {
    name: "Project Alpha",
    category: "Category",
    description: "A short summary of this project and the outcome delivered.",
  },
  {
    name: "Project Beta",
    category: "Category",
    description: "A short summary of this project and the outcome delivered.",
  },
  {
    name: "Project Gamma",
    category: "Category",
    description: "A short summary of this project and the outcome delivered.",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
        {/* Replace this div with a <video> or <Image> background */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-[#0a0a0a]" />

        <div className="relative flex h-full flex-col justify-end px-6 pb-24 md:px-12 max-w-7xl mx-auto">
          <p className="text-[#95ef7f]/80 uppercase tracking-widest text-xs mb-6">
            My Company – Location
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-white max-w-3xl">
            Your compelling
            <span className="italic font-light text-white/70"> hero headline</span>
          </h1>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#95ef7f] text-black text-sm font-medium px-6 py-3.5 rounded-full hover:bg-[#95ef7f]/90 transition-colors w-fit"
            >
              View projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/70 text-sm border border-white/30 px-6 py-3.5 rounded-full hover:text-white hover:border-white/40 transition-colors w-fit"
            >
              Our services
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="block h-8 w-px bg-[#95ef7f]/40" />
        </div>
      </section>

      {/* ─── Intro strip ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-white">
            Solutions that deliver efficiency, reliability, and impact.
          </h2>
          <div className="pt-2">
            <p className="text-white/50 text-lg leading-relaxed">
              Through expertise, structure, and commitment we deliver tailored solutions
              for our clients — from concept to completion.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm text-white/60 hover:text-white transition-colors group"
            >
              Learn more about us
              <svg
                className="group-hover:translate-x-1 transition-transform"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Services ─────────────────────────────────────────── */}
      <section className="border-t border-white/5 mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-white/50 uppercase tracking-widest text-xs mb-3">Services</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">What we offer</h2>
          </div>
          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
          >
            See all
            <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {services.map((s) => (
            <div key={s.title} className="bg-[#0a0a0a] p-8 flex flex-col gap-4 hover:bg-[#111] transition-colors">
              <div className="w-8 h-px bg-[#95ef7f] mb-2" />
              <h3 className="text-white font-medium text-lg">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed flex-1">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Projects ────────────────────────────────── */}
      <section className="border-t border-white/5 mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-white/50 uppercase tracking-widest text-xs mb-3">Projects</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Featured work</h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
          >
            See all
            <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-white/5">
          {featuredProjects.map((p, i) => (
            <div key={p.name} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 group">
              <span className="text-white/30 text-sm font-mono w-6">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-white/40 text-xs uppercase tracking-widest w-32">{p.category}</span>
              <h3 className="text-white text-xl md:text-2xl font-medium flex-1 group-hover:text-white/80 transition-colors">{p.name}</h3>
              <p className="text-white/50 text-sm max-w-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-[#0f0f0f]">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-40 text-center">
          <p className="text-[#95ef7f]/60 uppercase tracking-widest text-xs mb-6">Contact</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-8 max-w-2xl mx-auto">
            Let&apos;s find the best solution for you.
          </h2>
          <Link
            href="/about#contact"
            className="inline-flex items-center gap-2 bg-[#95ef7f] text-black text-sm font-medium px-8 py-4 rounded-full hover:bg-[#95ef7f]/90 transition-colors"
          >
            Get in touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
