import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

const VIDEO_SRC =
  "https://res.cloudinary.com/oootvsib/video/upload/v1784313241/WhatsApp_Video_2026-07-18_at_12.03.26_AM_mrot6b.mp4";

/* ------------------------------------------------------------------ */
/* useTypewriter                                                       */
/* ------------------------------------------------------------------ */
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let intervalId;
    let index = 0;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ------------------------------------------------------------------ */
/* Background video with native scrubbing                              */
/* ------------------------------------------------------------------ */
function ScrubbingVideo() {
  const videoRef = useRef(null);
  const prevXRef = useRef(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);

  // Desktop mouse scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      let targetTime =
        targetTimeRef.current + (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      targetTimeRef.current = targetTime;

      if (!seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      seekingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Mobile autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.play().catch(() => {});
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        // className="w-full h-full object-cover object-right lg:object-right-bottom"
        className="w-full h-full object-cover object-[85%_15%]"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = ["Labs", "Studio", "Openings", "Shop"];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        <div className="flex flex-row items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>

        <nav className="hidden md:flex flex-row text-[23px] text-black">
          {navLinks.map((link, i) => (
            <React.Fragment key={link}>
              <a href="#" className="hover:opacity-60 transition-opacity">
                {link}
              </a>
              {i < navLinks.length - 1 && (
                <span className="opacity-40">,&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <a
          href="#"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="md:hidden relative z-10 flex flex-col justify-center items-center gap-[6px] w-6 h-6"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl text-black hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-3xl text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Service pills                                                       */
/* ------------------------------------------------------------------ */
function ServicePills() {
  const options = ["Brand", "Digital", "Campaign", "Other"];
  const [services, setServices] = useState([]);

  const toggleService = useCallback((option) => {
    setServices((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option]
    );
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight mb-2">
        What sort of service?
      </h2>
      <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const active = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleService(option)}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base transition-colors ${
                active
                  ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform"
                  : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
              }`}
            >
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center"
                  >
                    <Check size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="italic text-xs mt-6"
          >
            Please click to select services above.
          </motion.p>
        ) : (
          <motion.div
            key="active"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="overflow-hidden mt-6"
          >
            <div className="flex items-center justify-between gap-4 bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl px-5 py-4">
              <p className="text-sm text-[#1C2E1E]">
                Ready to inquire about: {services.join(", ")}
              </p>
              <button
                type="button"
                className="text-[#4D6D47] uppercase text-xs whitespace-nowrap flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                Let's Go <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main export                                                         */
/* ------------------------------------------------------------------ */
export function Hero() {
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>

      <Navbar />

      <ScrubbingVideo />

      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br />
              drop us a message and we'll get back to you as soon as
              possible.
            </p>
          </motion.div>

          <ServicePills />
        </main>
      </div>
    </div>
  );
}