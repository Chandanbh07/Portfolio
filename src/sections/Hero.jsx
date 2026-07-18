import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { Navbar } from "@/layout/Navbar";

const roles = [
  "Backend Developer",
  "Java Developer",
  "Full Stack Developer",
  "Problem Solver",
];

const VIDEO_SRC =
  "https://res.cloudinary.com/oootvsib/video/upload/v1784313241/WhatsApp_Video_2026-07-18_at_12.03.26_AM_mrot6b.mp4";

function ScrubbingVideo() {
  const videoRef = useRef(null);
  const prevXRef = useRef(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);

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
        targetTimeRef.current +
        (delta / window.innerWidth) * 0.8 * video.duration;
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
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-[85%_15%]"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative h-[1.4em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block italic text-white font-medium"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-start text-left px-6 md:px-16 max-w-3xl pt-24 md:pt-28">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-script font-semibold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.0] mb-6 tracking-tight"
      >
        Chandan
        <br />
        Hiregoudra
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-white/75 text-lg md:text-xl mb-3 flex items-baseline gap-2"
      >
        A <RotatingRole /> based in Bangalore, India.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-white/50 text-base md:text-lg max-w-lg mb-8 leading-relaxed"
      >
        Building modern, responsive, and scalable web applications that deliver
        seamless user experiences.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-4"
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
        >
          See Work
          <ArrowRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </a>
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 text-white/80 px-6 py-3 rounded-full font-medium text-sm border border-white/20 hover:border-white/40 hover:text-white transition-colors"
        >
          <Download size={16} />
          Resume
        </a>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black font-sans">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&display=swap');
          .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
          .font-script { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
      `}</style>

      <Navbar />
      <ScrubbingVideo />

      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black/85 via-black/20 to-transparent pointer-events-none" />

      <main className="relative z-10 w-full min-h-screen flex items-center px-0">
        <HeroText />
      </main>
    </div>
  );
}
