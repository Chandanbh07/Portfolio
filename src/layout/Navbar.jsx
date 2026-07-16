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
    <header className="fixed top-4 inset-x-4 md:inset-x-6 z-50 rounded-2xl overflow-hidden border border-white/10">
      {/* Base red-left / black-right gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(190,18,30,0.5) 0%, rgba(190,18,30,0.3) 35%, rgba(10,10,12,0.4) 65%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Spider web pattern layer, sits ABOVE gradient, BELOW blur */}
      <svg
        className="absolute inset-0 w-full h-full -z-[9] opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="webPattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <g stroke="white" strokeWidth="0.6" fill="none">
              <path d="M40,40 L0,0 M40,40 L80,0 M40,40 L0,80 M40,40 L80,80 M40,40 L40,0 M40,40 L40,80 M40,40 L0,40 M40,40 L80,40" />
              <circle cx="40" cy="40" r="10" />
              <circle cx="40" cy="40" r="20" />
              <circle cx="40" cy="40" r="30" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#webPattern)" />
      </svg>

      {/* Blur layer, must be LOWER opacity blur so web pattern stays visible */}
      <div className="absolute inset-0 -z-[8] backdrop-blur-sm backdrop-saturate-150" />
      <div className="absolute inset-0 -z-[7] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />

      <nav className="relative flex items-center justify-between px-5 py-3">
        {/* Left: logo + nav links together */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 text-lg font-extrabold text-white">
            CH<span className="text-red-500">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1.5 py-1">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-3.5 py-1.5 text-sm text-white/75 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="bg-white/10 border border-red-400/40 backdrop-blur-md text-white
              hover:bg-red-600/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all"
          >
            Contact Me
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-xl border-t border-white/10 animate-fade-in">
          <div className="px-5 py-5 flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base text-white/80 hover:text-white py-1.5"
              >
                {link.label}
              </a>
            ))}
            <Button onClick={() => setIsMobileMenuOpen(false)} className="bg-white/10 border border-red-400/40 text-white mt-1">
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};