export const metadata = {
  title: "About – My Company",
  description: "Learn more about who we are and what we stand for.",
};

const values = [
  {
    title: "Expertise",
    description: "We stay at the forefront of our field. Deep knowledge is the foundation of everything we do.",
  },
  {
    title: "Structure",
    description: "Good planning and clear project management ensure progress and predictability for everyone involved.",
  },
  {
    title: "Commitment",
    description: "We care deeply about our craft and work closely with clients to deliver lasting value.",
  },
  {
    title: "Quality",
    description: "Every deliverable meets the highest standard. We take pride in consistent, reliable quality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="text-white/50 uppercase tracking-widest text-xs mb-4">About</p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
          We are My Company
        </h1>
      </section>

      <div className="border-t border-white/5" />

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">
            Through expertise, structure, and commitment — from now to the future.
          </h2>
        </div>
        <div className="space-y-6 text-white/50 leading-relaxed">
          <p>
            My Company is a [type of company] based in [location] with experience across a broad
            range of projects — from [small scope] to [large scope].
          </p>
          <p>
            We are a growing team with exciting and varied projects. We work closely together to
            develop and motivate each other, both professionally and personally.
          </p>
          <p>
            We create connections between people, systems, and ideas — delivering solutions that
            bring efficiency, reliability, and inspiration.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <p className="text-white/50 uppercase tracking-widest text-xs mb-12">Our values</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {values.map((v) => (
            <div key={v.title} className="bg-[#0a0a0a] p-8 flex flex-col gap-4">
              <div className="w-8 h-px bg-[#95ef7f] mb-2" />
              <h3 className="text-white font-medium text-lg">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <p className="text-white/50 uppercase tracking-widest text-xs mb-12">Contact</p>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Get in touch</h2>
            <p className="text-white/50 leading-relaxed">
              Have a project in mind or want to learn more about what we do? We&apos;d love to hear from you.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-white/60">
            <a href="tel:+10000000000" className="hover:text-white transition-colors">+1 (000) 000-0000</a>
            <a href="mailto:hello@mycompany.com" className="hover:text-white transition-colors">hello@mycompany.com</a>
            <p className="text-white/40 text-sm">123 Main Street, City, Country</p>
          </div>
        </div>
      </section>
    </>
  );
}
