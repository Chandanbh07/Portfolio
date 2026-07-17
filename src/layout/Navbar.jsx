import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-4 md:inset-x-6 z-50 rounded-3xl overflow-hidden border border-white/20">
      {/* Much lighter tint, just enough for subtle contrast */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Lighter blur so the image behind reads clearly */}
      <div className="absolute inset-0 backdrop-blur-md backdrop-saturate-150" />

      <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.15)] pointer-events-none" />

      <nav className="relative flex items-center justify-between px-6 py-3 md:py-4">
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-extrabold text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]"
          >
            CH<span className="text-white/70">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-1.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-4 py-2 text-sm text-white font-medium hover:text-white rounded-full hover:bg-white/15 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="bg-white/15 border border-white/40 backdrop-blur-md text-white font-semibold
              hover:bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] transition-all"
          >
            Contact Me
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-white cursor-pointer drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl backdrop-saturate-150 border-t border-white/15 animate-fade-in">
          <div className="px-6 py-6 flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base text-white font-medium py-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-white/15 border border-white/40 text-white mt-1"
            >
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};