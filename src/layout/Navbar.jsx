import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

      <nav className="relative flex items-center justify-between px-6 md:px-10 py-6">
        <a href="#" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white tracking-tight">
            Chandan<span className="text-white/50">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-sm text-white border border-white/25 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
        >
          Contact Me
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center text-sm text-white border border-white/25 rounded-full px-5 py-2.5 mt-2"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};