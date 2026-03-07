export const metadata = {
  title: "Projects – My Company",
  description: "Browse our portfolio of completed projects.",
};

const projects = [
  {
    name: "Project Alpha",
    category: "Category",
    year: "2024",
    description: "A detailed description of this project, the challenge, the approach, and the result.",
  },
  {
    name: "Project Beta",
    category: "Category",
    year: "2024",
    description: "A detailed description of this project, the challenge, the approach, and the result.",
  },
  {
    name: "Project Gamma",
    category: "Category",
    year: "2023",
    description: "A detailed description of this project, the challenge, the approach, and the result.",
  },
  {
    name: "Project Delta",
    category: "Category",
    year: "2023",
    description: "A detailed description of this project, the challenge, the approach, and the result.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="text-white/50 uppercase tracking-widest text-xs mb-4">Projects</p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
          Our work
        </h1>
      </section>

      <section className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col divide-y divide-white/5">
          {projects.map((p, i) => (
            <div key={p.name} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-12 group">
              <span className="text-white/30 text-sm font-mono w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-12 flex-1">
                <div className="md:w-48 shrink-0">
                  <span className="text-white/40 text-xs uppercase tracking-widest">{p.category}</span>
                  <span className="block text-white/30 text-xs mt-1">{p.year}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-white text-2xl md:text-3xl font-medium mb-3 group-hover:text-white/80 transition-colors">{p.name}</h2>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xl">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
