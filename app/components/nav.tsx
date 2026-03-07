"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, startTransition } from "react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => setMenuOpen(false));
  }, [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="text-white font-semibold tracking-tight text-lg">
          My Company
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  pathname.startsWith(link.href)
                    ? "text-[#95ef7f]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/about#contact"
              className="text-sm tracking-wide border border-white/30 px-4 py-2 rounded-full text-white/80 hover:text-white hover:border-white/50 transition-all duration-200"
            >
              Contact us
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/5 px-6 pb-8">
          <ul className="flex flex-col gap-6 pt-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg tracking-wide ${pathname.startsWith(link.href) ? "text-white" : "text-white/60"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about#contact" className="inline-block text-lg border border-white/30 px-5 py-2.5 rounded-full text-white/80">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
