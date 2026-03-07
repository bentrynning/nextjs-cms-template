export const metadata = {
  title: "Services – My Company",
  description: "Explore the services we offer.",
};

const services = [
  {
    title: "Service One",
    description: "Detailed description of your first service. What problem does it solve? Who is it for?",
    details: ["Feature A", "Feature B", "Feature C"],
  },
  {
    title: "Service Two",
    description: "Detailed description of your second service. What problem does it solve? Who is it for?",
    details: ["Feature A", "Feature B", "Feature C"],
  },
  {
    title: "Service Three",
    description: "Detailed description of your third service. What problem does it solve? Who is it for?",
    details: ["Feature A", "Feature B", "Feature C"],
  },
  {
    title: "Service Four",
    description: "Detailed description of your fourth service. What problem does it solve? Who is it for?",
    details: ["Feature A", "Feature B", "Feature C"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="text-white/50 uppercase tracking-widest text-xs mb-4">Services</p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
          What we offer
        </h1>
      </section>

      <section className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col divide-y divide-white/5">
          {services.map((s, i) => (
            <div key={s.title} className="flex flex-col md:flex-row gap-8 md:gap-16 py-16">
              <div className="md:w-1/3">
                <span className="text-white/20 text-sm font-mono block mb-4">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">{s.title}</h2>
              </div>
              <div className="md:w-2/3">
                <p className="text-white/50 leading-relaxed mb-6">{s.description}</p>
                <ul className="flex flex-col gap-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#95ef7f] shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
