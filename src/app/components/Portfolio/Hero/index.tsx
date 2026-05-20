"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Script definition ─────────────────────────────────────────────────────────
type Step =
  | { s: "cmd"; text: string }
  | { s: "out"; text: string; accent?: boolean; large?: boolean }
  | { s: "blank" }
  | { s: "launch" }
  | { s: "ready" };

const SCRIPT: Step[] = [
  { s: "cmd", text: "whoami" },
  { s: "out", text: "EKRAM", large: true },
  { s: "blank" },
  { s: "cmd", text: "cat about.txt" },
  { s: "out", text: "Founder • AI • Bioinformatics • Software Engineering", accent: true },
  { s: "out", text: "Pursuing all in parallel." },
  { s: "blank" },
  { s: "cmd", text: "./launch --portfolio" },
  { s: "launch" },
  { s: "ready" },
];

// ── Matrix rain ───────────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|;.,/\\^~アイウエオカキクケコ";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 13;
    let drops: number[] = [];
    let speeds: number[] = [];
    let rafId: number;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -80);
      speeds = Array.from({ length: cols }, () => 0.3 + Math.random() * 0.5);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(10,10,10,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      drops.forEach((drop, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = Math.floor(drop) * FONT_SIZE;

        // Head character — brighter
        ctx.fillStyle = "#FF9944";
        ctx.fillText(char, x, y);

        drops[i] += speeds[i];

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      });

      rafId = requestAnimationFrame(draw);
    };

    init();
    window.addEventListener("resize", init);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.18 }}
    />
  );
}

// ── Rendered line types ───────────────────────────────────────────────────────
type Line =
  | { k: "cmd"; text: string }
  | { k: "out"; text: string; accent?: boolean; large?: boolean }
  | { k: "blank" }
  | { k: "bar"; pct: number }
  | { k: "ready" };

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [lines, setLines] = useState<Line[]>([]);
  const [finished, setFinished] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const schedule = (fn: () => void, ms: number) => {
      if (!alive.current) return;
      const t = setTimeout(() => { timers.delete(t); fn(); }, ms);
      timers.add(t);
    };

    let si = 0;

    function next() {
      if (!alive.current || si >= SCRIPT.length) return;
      const step = SCRIPT[si++];

      if (step.s === "blank") {
        setLines(p => [...p, { k: "blank" }]);
        schedule(next, 60);

      } else if (step.s === "out") {
        schedule(() => {
          setLines(p => [...p, { k: "out", text: step.text, accent: step.accent, large: step.large }]);
          schedule(next, step.large ? 300 : 160);
        }, 320);

      } else if (step.s === "cmd") {
        const full = step.text;
        setLines(p => [...p, { k: "cmd", text: "" }]);
        let ci = 0;
        function typeChar() {
          if (!alive.current) return;
          ci++;
          setLines(p => {
            const n = [...p];
            n[n.length - 1] = { k: "cmd", text: full.slice(0, ci) };
            return n;
          });
          if (ci < full.length) schedule(typeChar, 52);
          else schedule(next, 380);
        }
        schedule(typeChar, 160);

      } else if (step.s === "launch") {
        setLines(p => [...p, { k: "bar", pct: 0 }]);
        let pct = 0;
        function tick() {
          if (!alive.current) return;
          pct = Math.min(pct + 4, 100);
          setLines(p => {
            const n = [...p];
            n[n.length - 1] = { k: "bar", pct };
            return n;
          });
          if (pct < 100) schedule(tick, 30);
          else schedule(next, 480);
        }
        schedule(tick, 240);

      } else if (step.s === "ready") {
        setLines(p => [...p, { k: "ready" }]);
        setFinished(true);
      }
    }

    const t = setTimeout(next, 800);
    timers.add(t);

    return () => {
      alive.current = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">

      <MatrixRain />

      {/* Faint corner accents */}
      <span className="absolute top-8 left-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute top-8 left-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />
      <span className="absolute top-8 right-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute top-8 right-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 left-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 left-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 right-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 right-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-2xl mx-auto px-4"
      >
        <div
          className="bg-[#0d0d0d] border border-[#1e1e1e]"
          style={{ borderRadius: 6 }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#191919]">
            <span className="w-3 h-3 rounded-full bg-[#FF6600] opacity-75" />
            <span className="w-3 h-3 rounded-full bg-[#222]" />
            <span className="w-3 h-3 rounded-full bg-[#222]" />
            <span className="ml-3 text-[9px] uppercase tracking-[0.35em] text-[#666] font-[family-name:var(--font-space-mono)]">
              zsh — ekram@portfolio
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-6 py-5 min-h-[420px] font-[family-name:var(--font-space-mono)]">

            {/* Initial empty cursor before animation starts */}
            {lines.length === 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[#FF6600] text-[16px] select-none">❯</span>
                <span className="inline-block w-[9px] h-[18px] bg-[#FF6600] align-middle animate-pulse" />
              </div>
            )}

            {lines.map((line, i) => {
              if (line.k === "blank") {
                return <div key={i} className="h-5" />;
              }

              if (line.k === "cmd") {
                const isLast = i === lines.length - 1;
                return (
                  <div key={i} className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[#FF6600] text-[16px] select-none">❯</span>
                    <span className="text-[#d0d0d0] text-[15px]">
                      {line.text}
                      {isLast && !finished && (
                        <span className="inline-block w-[9px] h-[18px] bg-[#FF6600] ml-0.5 align-middle animate-pulse" />
                      )}
                    </span>
                  </div>
                );
              }

              if (line.k === "out") {
                if (line.large) {
                  return (
                    <p
                      key={i}
                      className="ml-5 mb-1 text-[2.8rem] sm:text-[3.5rem] font-normal leading-none tracking-tight text-[#f0f0f0]"
                    >
                      {line.text}
                    </p>
                  );
                }
                if (line.accent) {
                  return (
                    <p
                      key={i}
                      className="ml-5 mb-2 text-[17px] font-normal text-[#FF6600] tracking-wide leading-snug border-l-2 border-[#FF6600] pl-3"
                    >
                      {line.text}
                    </p>
                  );
                }
                return (
                  <p
                    key={i}
                    className="ml-5 text-[14px] mb-1 leading-relaxed text-[#888]"
                  >
                    {line.text}
                  </p>
                );
              }

              if (line.k === "bar") {
                const filled = Math.round(line.pct / 5);
                const empty = 20 - filled;
                return (
                  <div key={i} className="ml-5 mt-1 mb-1">
                    <p className="text-[#666] text-[13px] mb-2">Initializing...</p>
                    <p className="text-[14px] text-[#FF6600]">
                      [{"█".repeat(filled)}{"░".repeat(empty)}]{" "}
                      <span className="text-[#888]">{line.pct}%</span>
                    </p>
                  </div>
                );
              }

              if (line.k === "ready") {
                return (
                  <div key={i} className="flex items-center gap-2.5 mt-2">
                    <span className="text-[#FF6600] text-[16px] select-none">❯</span>
                    <span className="text-[#888] text-[15px]">
                      Ready.{" "}
                      <a
                        href="#Projects"
                        className="text-[#FF6600] hover:underline underline-offset-4"
                      >
                        ↓ scroll to explore
                      </a>
                      <span className="inline-block w-[9px] h-[18px] bg-[#FF6600] ml-1 align-middle animate-pulse" />
                    </span>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — appears after animation finishes */}
      {finished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-[family-name:var(--font-space-mono)] uppercase tracking-[0.35em] text-[#2a2a2a]">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#2a2a2a] to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
