import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 text-white/50 text-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-white font-semibold text-lg mb-4">My Company</p>
          <p className="leading-relaxed">
            123 Main Street<br />
            City, Country
          </p>
        </div>

        <div>
          <p className="text-white/60 uppercase tracking-widest text-xs mb-4">Navigation</p>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/projects", label: "Projects" },
              { href: "/news", label: "News" },
              { href: "/about", label: "About" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/60 uppercase tracking-widest text-xs mb-4">Contact</p>
          <ul className="space-y-2">
            <li><a href="tel:+10000000000" className="hover:text-white transition-colors">+1 (000) 000-0000</a></li>
            <li><a href="mailto:hello@mycompany.com" className="hover:text-white transition-colors">hello@mycompany.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 mx-auto max-w-7xl px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} My Company</p>
      </div>
    </footer>
  );
}
