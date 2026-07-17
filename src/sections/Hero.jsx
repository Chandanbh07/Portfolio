import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "@/layout/Navbar";

const roles = ["Backend Developer", "Java Developer", "Full Stack Developer", "Problem Solver"];

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
    <span className="inline-block relative h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block text-red-400 font-semibold"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-start text-left px-8 md:px-16 max-w-xl">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white/80 text-lg md:text-xl font-medium mb-3 tracking-wide"
      >
        Hi, I'm Chandan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-5 text-white"
      >
        A Passionate Developer
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-white font-semibold flex items-center gap-2"
      >
        I'm a <RotatingRole />
      </motion.p>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      <Navbar />
      <ScrubbingVideo />

      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

      <main className="relative z-10 w-full min-h-screen flex items-center px-6">
        <HeroText />
      </main>
    </div>
  );
}