"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TerminalCursor from "@/components/ui/TerminalCursor";
import TerminalFrame from "@/components/ui/TerminalFrame";

// ── Script definition ─────────────────────────────────────────────────────────
type Step =
  | { s: "cmd"; text: string; large?: boolean }
  | { s: "out"; text: string; accent?: boolean; large?: boolean }
  | { s: "blank" }
  | { s: "launch" }
  | { s: "ready" };

const SCRIPT: Step[] = [
  { s: "cmd", text: "Hi, I'm Ekram.", large: true },
  { s: "blank" },
  { s: "cmd", text: "cat about.txt" },
  { s: "out", text: "Founder • AI • Bioinformatics • Computer Science • Data Science", accent: true },
  { s: "out", text: "Pursuing all in parallel." },
  { s: "blank" },
  { s: "cmd", text: "./launch --portfolio" },
  { s: "launch" },
  { s: "ready" },
];

// ── DNA Double Helix ──────────────────────────────────────────────────────────
// Strand 1 — Bioinformatics / Data Science
const BIO_SKILLS = ["Python", "R", "PyTorch", "Biopython", "RNA-seq", "BLAST", "Genomics", "Pandas", "scikit-learn", "TensorFlow", "GATK", "Seurat"];
// Strand 2 — Software Engineering / CS
const CS_SKILLS  = ["Next.js", "React", "TypeScript", "Swift", "Figma", "Node.js", "PostgreSQL", "Docker", "Flutter", "AWS", "GraphQL", "Tailwind"];
// Rung labels — base pairs
const RUNG_LABELS = ["A–T", "G–C", "T–A", "C–G", "A–T", "G–C", "C–G", "T–A"];

function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.003;

      const cx       = canvas.width / 2;
      const radius   = Math.min(canvas.width * 0.5, 640);
      const numNodes = 16;
      const helixH   = canvas.height * 0.88;
      const spacing  = helixH / numNodes;
      const startY   = (canvas.height - helixH) / 2;

      const s1: { x: number; y: number; z: number }[] = [];
      const s2: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i <= numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 3 + rotation;
        const y = startY + i * spacing;
        s1.push({ x: cx + radius * Math.cos(angle),           y, z: Math.sin(angle) });
        s2.push({ x: cx + radius * Math.cos(angle + Math.PI), y, z: Math.sin(angle + Math.PI) });
      }

      // Backbone segments — depth-faded
      [s1, s2].forEach(strand => {
        for (let i = 0; i < strand.length - 1; i++) {
          const a = strand[i], b = strand[i + 1];
          const alpha = 0.06 + 0.2 * ((a.z + 1) / 2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,102,0,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Rungs
      for (let i = 0; i < numNodes; i++) {
        const p1 = s1[i], p2 = s2[i];
        const avgZ     = (p1.z + p2.z) / 2;
        const rungAlpha = 0.04 + 0.12 * ((avgZ + 1) / 2);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,102,0,${rungAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Base pair label at rung midpoint
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const labelAlpha = 0.08 + 0.22 * ((avgZ + 1) / 2);
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255,102,0,${labelAlpha})`;
        ctx.fillText(RUNG_LABELS[i % RUNG_LABELS.length], mx, my + 3);
      }

      // Skill labels + dots on each node
      ctx.font = "10px monospace";
      for (let i = 0; i < numNodes; i++) {
        const p1 = s1[i], p2 = s2[i];

        // Strand 1 — bio skills (orange)
        const angle1   = (i / numNodes) * Math.PI * 3 + rotation;
        const bioAlpha = 0.15 + 0.55 * ((p1.z + 1) / 2);
        const bioSkill = BIO_SKILLS[i % BIO_SKILLS.length];
        const bio_dx   = Math.cos(angle1) * 28; // smooth outward drift, no binary flip
        ctx.textAlign  = "center";
        ctx.fillStyle  = `rgba(255,102,0,${bioAlpha})`;
        ctx.fillText(bioSkill, p1.x + bio_dx, p1.y + 4);

        // Strand 2 — CS skills (grey)
        const angle2  = angle1 + Math.PI;
        const csAlpha = 0.15 + 0.55 * ((p2.z + 1) / 2);
        const csSkill = CS_SKILLS[i % CS_SKILLS.length];
        const cs_dx   = Math.cos(angle2) * 28;
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(180,180,180,${csAlpha})`;
        ctx.fillText(csSkill, p2.x + cs_dx, p2.y + 4);

        // Dots
        [[p1, "255,102,0"], [p2, "180,180,180"]].forEach(([p, rgb]) => {
          const pt = p as { x: number; y: number; z: number };
          const dotAlpha = 0.15 + 0.45 * ((pt.z + 1) / 2);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${dotAlpha})`;
          ctx.fill();
        });
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ── Terminal button ───────────────────────────────────────────────────────────
// ── Rendered line types ───────────────────────────────────────────────────────
type Line =
  | { k: "cmd"; text: string; large?: boolean }
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
        const large = step.large;
        setLines(p => [...p, { k: "cmd", text: "", large }]);
        let ci = 0;
        function typeChar() {
          if (!alive.current) return;
          ci++;
          setLines(p => {
            const n = [...p];
            n[n.length - 1] = { k: "cmd", text: full.slice(0, ci), large };
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
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden pt-20">

      <DNAHelix />

      {/* Fade mask under header */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-10" />

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
        className="relative z-10 w-full max-w-3xl mx-auto px-4"
      >
        <TerminalFrame title="zsh — ekram@portfolio">
          <div className="px-6 py-5 min-h-[420px] font-[family-name:var(--font-space-mono)]">

            {/* Initial empty cursor before animation starts */}
            {lines.length === 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[#FF6600] text-[16px] select-none">❯</span>
                <TerminalCursor className="text-[18px]" />
              </div>
            )}

            {lines.map((line, i) => {
              if (line.k === "blank") {
                return <div key={i} className="h-5" />;
              }

              if (line.k === "cmd") {
                const isLast = i === lines.length - 1;
                return (
                  <div key={i} className={`flex items-center gap-2.5 ${line.large ? "mb-4" : "mb-1.5"}`}>
                    <span className={`text-[#FF6600] select-none ${line.large ? "text-[22px]" : "text-[16px]"}`}>❯</span>
                    <span className={`text-[#f0f0f0] ${line.large ? "text-[2rem] sm:text-[2.6rem] leading-none tracking-tight" : "text-[15px] text-[#d0d0d0]"}`}>
                      {line.text}
                      {isLast && !finished && (
                        <TerminalCursor className={`ml-0.5 align-middle ${line.large ? "text-[32px]" : "text-[18px]"}`} />
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
                      <TerminalCursor className="ml-1 align-middle text-[18px]" />
                    </span>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </TerminalFrame>
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
