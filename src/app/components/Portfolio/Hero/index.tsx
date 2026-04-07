"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const roles = ["Co-Founder & CEO", "Data Scientist", "Full-Stack Developer", "Bioinformatics Researcher", "ML Engineer"];

function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => {
    const full = roles[idx];
    if (!deleting && displayed.length < full.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === full.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-[#FF6600]">
      {displayed}
      <span className="inline-block w-0.5 h-5 bg-[#FF6600] ml-0.5 animate-pulse" />
    </span>
  );
}

export default function Hero() {
  return (
    <section className="glass relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated SVG background decorations */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Top-left circuit trace */}
        <AnimatedPath
          d="M0 120 L80 120 L80 60 L200 60 L200 160 L320 160"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.15}
          delay={400}
          duration={2000}
        />
        {/* Bottom-right circuit trace */}
        <AnimatedPath
          d="M1200 600 L1080 600 L1080 500 L900 500 L900 680 L750 680"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.12}
          delay={600}
          duration={2200}
        />
        {/* Center decorative curve */}
        <AnimatedPath
          d="M100 800 C200 600, 400 400, 600 300 C800 200, 1000 300, 1100 100"
          stroke="#FF6600"
          strokeWidth={0.8}
          opacity={0.08}
          delay={200}
          duration={3000}
        />
        {/* Top-right branch */}
        <AnimatedPath
          d="M1200 80 L1050 80 L1050 200 L950 200 M1050 140 L1150 140"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.1}
          delay={800}
          duration={1800}
        />
        {/* Grid dots (static) */}
        {[...Array(8)].map((_, i) =>
          [...Array(5)].map((__, j) => (
            <circle
              key={`${i}-${j}`}
              cx={150 * i + 100}
              cy={160 * j + 80}
              r={1.5}
              fill="#FF6600"
              opacity={0.06}
            />
          ))
        )}
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Main Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-6 flex items-center gap-3"
            >
              <span className="w-6 h-[2px] bg-[#FF6600]" />
              Software Engineer · CEO @LynkSphere
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[clamp(3.5rem,10vw,7rem)] font-normal leading-none tracking-tight text-[var(--text-heading)] mb-2"
            >
              EKRAMUL
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-[clamp(3.5rem,10vw,7rem)] font-normal leading-none tracking-tight text-[var(--text-heading)] mb-8"
            >
              ISLAM
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="h-8 mb-8 font-[family-name:var(--font-space-mono)] text-lg"
            >
              <TypewriterRole />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-[var(--text-body)] text-lg leading-relaxed max-w-md mb-10"
            >
              Co-Founder & CEO of{" "}
              <span className="text-[#FF6600] font-medium">LynkSphere</span> — building iOS, Android & web apps for businesses worldwide. Also completing a Master of Data Science at Monash, where my work spans ML, NLP, and bioinformatics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#Projects"
                className="group inline-flex items-center gap-3 bg-[#FF6600] text-white px-6 py-3 rounded-full hover:bg-[#e55500] transition-colors duration-300 font-[family-name:var(--font-space-mono)] text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(255,102,0,0.25)]"
              >
                View Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="mailto:ekramjim002@gmail.com"
                className="inline-flex items-center gap-3 border-2 border-[#242424] text-[#aaaaaa] px-6 py-3 rounded-full hover:border-[#FF6600] hover:text-[#FF6600] transition-colors duration-300 font-[family-name:var(--font-space-mono)] text-sm font-bold uppercase tracking-wider"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right: Stats + SVG Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            {/* Decorative SVG visual */}
            <svg viewBox="0 0 400 400" fill="none" className="w-full max-w-md mx-auto">
              {/* Outer ring */}
              <AnimatedPath
                d="M200 20 A180 180 0 0 1 380 200"
                stroke="#FF6600"
                strokeWidth={2}
                opacity={0.3}
                delay={1000}
                duration={1500}
              />
              <AnimatedPath
                d="M380 200 A180 180 0 0 1 200 380"
                stroke="#FF6600"
                strokeWidth={2}
                opacity={0.15}
                delay={1200}
                duration={1500}
              />
              <AnimatedPath
                d="M200 380 A180 180 0 0 1 20 200"
                stroke="#FF6600"
                strokeWidth={2}
                opacity={0.08}
                delay={1400}
                duration={1500}
              />
              <AnimatedPath
                d="M20 200 A180 180 0 0 1 200 20"
                stroke="#FF6600"
                strokeWidth={2}
                opacity={0.05}
                delay={1600}
                duration={1500}
              />
              {/* Inner cross */}
              <AnimatedPath
                d="M200 60 L200 340 M60 200 L340 200"
                stroke="#FF6600"
                strokeWidth={1}
                opacity={0.1}
                delay={1800}
                duration={800}
              />
              {/* Center */}
              <circle cx="200" cy="200" r="8" fill="#FF6600" opacity={0.6} />
              <circle cx="200" cy="200" r="20" stroke="#FF6600" strokeWidth={1.5} opacity={0.2} />
              <circle cx="200" cy="200" r="80" stroke="#FF6600" strokeWidth={1} opacity={0.1} strokeDasharray="4 8" />
            </svg>

            {/* Stat cards floating on the visual */}
            <div className="absolute top-8 right-0 bg-[#161616] border-2 border-[#242424] p-4 shadow-sm" style={{ borderRadius: 4 }}>
              <div className="text-3xl font-normal text-[#f5f5f5] leading-none">$30K</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] font-[family-name:var(--font-space-mono)] mt-1">Revenue Generated</div>
            </div>
            <div className="absolute bottom-12 left-0 bg-[#FF6600] p-4 shadow-sm" style={{ borderRadius: 4 }}>
              <div className="text-3xl font-normal text-white leading-none">8+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/80 font-[family-name:var(--font-space-mono)] mt-1">Clients Served</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-[family-name:var(--font-space-mono)] uppercase tracking-[0.3em] text-[#888888]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#888888] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
