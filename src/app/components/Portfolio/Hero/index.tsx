"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

// ─── Terminal card ────────────────────────────────────────────────────────────
const LINES = [
  { cmd: "whoami",     out: "ekram"                  },
  { cmd: "location",   out: "melbourne, au"           },
  { cmd: "degree",     out: "master of data science" },
  { cmd: "university", out: "monash university"       },
  { cmd: "status",     out: "building..."             },
];

type TLine = { partial: string; out: string; showOut: boolean };

function TerminalCard() {
  const [rows, setRows] = useState<TLine[]>([
    { partial: "", out: LINES[0].out, showOut: false },
  ]);
  const [finished, setFinished] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let li = 0, ci = 0;
    type Phase = "typing" | "output" | "next";
    let phase: Phase = "typing";

    const tick = () => {
      if (!mounted.current) return;
      if (li >= LINES.length) { setFinished(true); return; }

      if (phase === "typing") {
        ci++;
        setRows(prev => {
          const next = [...prev];
          next[li] = { ...next[li], partial: LINES[li].cmd.slice(0, ci) };
          return next;
        });
        if (ci >= LINES[li].cmd.length) { phase = "output"; setTimeout(tick, 380); }
        else setTimeout(tick, 68);

      } else if (phase === "output") {
        setRows(prev => {
          const next = [...prev];
          next[li] = { ...next[li], showOut: true };
          return next;
        });
        phase = "next";
        setTimeout(tick, 520);

      } else {
        li++; ci = 0; phase = "typing";
        if (li < LINES.length) {
          setRows(prev => [...prev, { partial: "", out: LINES[li].out, showOut: false }]);
          setTimeout(tick, 90);
        } else {
          setFinished(true);
        }
      }
    };

    const t = setTimeout(tick, 700);
    return () => { mounted.current = false; clearTimeout(t); };
  }, []);

  return (
    <div
      className="bg-[#0a0a0a] border-2 border-[#1e1e1e] p-4 h-full flex flex-col font-[family-name:var(--font-space-mono)]"
      style={{ borderRadius: 4 }}
    >
      {/* Fake window chrome */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[#1e1e1e]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600] opacity-80" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
        <span className="text-[8px] uppercase tracking-[0.3em] text-[#333] ml-2">zsh</span>
      </div>

      {/* Lines */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {rows.map((row, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <span className="text-[#FF6600] text-[11px] select-none">❯</span>
              <span className="text-[#e0e0e0] text-[11px]">
                {row.partial}
                {i === rows.length - 1 && !finished && (
                  <span className="inline-block w-[7px] h-[13px] bg-[#FF6600] ml-0.5 align-middle animate-pulse" />
                )}
              </span>
            </div>
            {row.showOut && (
              <p className="text-[#555] text-[10px] ml-5 mt-0.5 leading-relaxed">{row.out}</p>
            )}
          </div>
        ))}
        {finished && (
          <div className="flex items-center gap-2">
            <span className="text-[#FF6600] text-[11px] select-none">❯</span>
            <span className="inline-block w-[7px] h-[13px] bg-[#FF6600] align-middle animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Bento + Terminal ─────────────────────────────────────────────────────────
function BentoGrid() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">

      {/* Terminal — full width, corner-bracket hover */}
      <motion.div {...fadeUp(0.6)} className="group relative" style={{ borderRadius: 4, height: 220 }}>
        {/* Top-left bracket */}
        <span className="pointer-events-none absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="absolute top-0 left-0 w-4 h-[2px] bg-[#FF6600]" />
          <span className="absolute top-0 left-0 w-[2px] h-4 bg-[#FF6600]" />
        </span>
        {/* Top-right bracket */}
        <span className="pointer-events-none absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="absolute top-0 right-0 w-4 h-[2px] bg-[#FF6600]" />
          <span className="absolute top-0 right-0 w-[2px] h-4 bg-[#FF6600]" />
        </span>
        {/* Bottom-left bracket */}
        <span className="pointer-events-none absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#FF6600]" />
          <span className="absolute bottom-0 left-0 w-[2px] h-4 bg-[#FF6600]" />
        </span>
        {/* Bottom-right bracket */}
        <span className="pointer-events-none absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#FF6600]" />
          <span className="absolute bottom-0 right-0 w-[2px] h-4 bg-[#FF6600]" />
        </span>
        <TerminalCard />
      </motion.div>

      {/* 2×2 role cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div {...fadeUp(0.66)}
          className="bg-[#161616] border-2 border-[#242424] p-5 flex flex-col justify-end"
          style={{ borderRadius: 4, minHeight: 120 }}
        >
          <h3 className="text-base font-normal text-[#f5f5f5] leading-snug">Data Scientist</h3>
        </motion.div>
        <motion.div {...fadeUp(0.68)}
          className="bg-[#FF6600] border-2 border-[#FF6600] p-5 flex flex-col justify-end"
          style={{ borderRadius: 4, minHeight: 120 }}
        >
          <h3 className="text-base font-normal text-black leading-snug">Full Stack<br />Developer</h3>
        </motion.div>
        <motion.div {...fadeUp(0.7)}
          className="bg-[#FF6600] border-2 border-[#FF6600] p-5 flex flex-col justify-end"
          style={{ borderRadius: 4, minHeight: 120 }}
        >
          <h3 className="text-base font-normal text-black leading-snug">Bioinformatician</h3>
        </motion.div>
        <motion.div {...fadeUp(0.72)}
          className="bg-[#161616] border-2 border-[#242424] p-5 flex flex-col justify-end"
          style={{ borderRadius: 4, minHeight: 120 }}
        >
          <h3 className="text-base font-normal text-[#f5f5f5] leading-snug">Co-Founder</h3>
          <p className="text-[#444] text-[10px] font-[family-name:var(--font-space-mono)] mt-1">LynkSphere</p>
        </motion.div>
      </div>

    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M0 120 L80 120 L80 60 L200 60 L200 160 L320 160" stroke="#FF6600" strokeWidth={1} opacity={0.15} delay={400} duration={2000} />
        <AnimatedPath d="M1200 600 L1080 600 L1080 500 L900 500 L900 680 L750 680" stroke="#FF6600" strokeWidth={1} opacity={0.12} delay={600} duration={2200} />
        <AnimatedPath d="M100 800 C200 600, 400 400, 600 300 C800 200, 1000 300, 1100 100" stroke="#FF6600" strokeWidth={0.8} opacity={0.08} delay={200} duration={3000} />
        <AnimatedPath d="M1200 80 L1050 80 L1050 200 L950 200 M1050 140 L1150 140" stroke="#FF6600" strokeWidth={1} opacity={0.1} delay={800} duration={1800} />
        {[...Array(8)].map((_, i) =>
          [...Array(5)].map((__, j) => (
            <circle key={`${i}-${j}`} cx={150 * i + 100} cy={160 * j + 80} r={1.5} fill="#FF6600" opacity={0.06} />
          ))
        )}
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[clamp(4rem,12vw,8rem)] font-normal leading-none tracking-tight text-[var(--text-heading)] mb-8"
            >
              EKRAM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[#333] text-4xl font-[family-name:var(--font-space-mono)] leading-none max-w-md mb-10"
            >
              [ Placeholder ]
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#Projects" className="group inline-flex items-center gap-3 bg-[#FF6600] text-white px-6 py-3 rounded-full hover:bg-[#e55500] transition-colors duration-300 font-[family-name:var(--font-space-mono)] text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(255,102,0,0.25)]">
                View Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="mailto:ekramjim002@gmail.com" className="inline-flex items-center gap-3 border-2 border-[#242424] text-[#aaaaaa] px-6 py-3 rounded-full hover:border-[#FF6600] hover:text-[#FF6600] transition-colors duration-300 font-[family-name:var(--font-space-mono)] text-sm font-bold uppercase tracking-wider">
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right: Bento + Terminal */}
          <div className="flex items-center justify-center">
            <BentoGrid />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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
