"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import TerminalCursor from "@/components/ui/TerminalCursor";
import TerminalFrame from "@/components/ui/TerminalFrame";

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
  { s: "out", text: "Entrepreneur • AI • Bioinformatics • Computer Science • Data Science", accent: true },
  { s: "out", text: "Pursuing all in parallel." },
  { s: "blank" },
  { s: "cmd", text: "./launch --portfolio" },
  { s: "launch" },
  { s: "ready" },
];

// ── DNA Double Helix ──────────────────────────────────────────────────────────
const BIO_SKILLS = ["Python", "R", "PyTorch", "Biopython", "RNA-seq", "BLAST", "Genomics", "Pandas", "scikit-learn", "TensorFlow", "GATK", "Seurat"];
const CS_SKILLS  = ["Next.js", "React", "TypeScript", "Swift", "Figma", "Node.js", "PostgreSQL", "Docker", "Flutter", "AWS", "GraphQL", "Tailwind"];
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
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.003;
      const cx = canvas.width / 2;
      const radius = Math.min(canvas.width * 0.5, 640);
      const numNodes = 16;
      const helixH = canvas.height * 0.88;
      const spacing = helixH / numNodes;
      const startY = (canvas.height - helixH) / 2;
      const s1: { x: number; y: number; z: number }[] = [];
      const s2: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 3 + rotation;
        const y = startY + i * spacing;
        s1.push({ x: cx + radius * Math.cos(angle), y, z: Math.sin(angle) });
        s2.push({ x: cx + radius * Math.cos(angle + Math.PI), y, z: Math.sin(angle + Math.PI) });
      }
      [s1, s2].forEach(strand => {
        for (let i = 0; i < strand.length - 1; i++) {
          const a = strand[i], b = strand[i + 1];
          const alpha = 0.06 + 0.2 * ((a.z + 1) / 2);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,102,0,${alpha})`; ctx.lineWidth = 1.5; ctx.stroke();
        }
      });
      for (let i = 0; i < numNodes; i++) {
        const p1 = s1[i], p2 = s2[i];
        const avgZ = (p1.z + p2.z) / 2;
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,102,0,${0.04 + 0.12 * ((avgZ + 1) / 2)})`; ctx.lineWidth = 1; ctx.stroke();
        const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
        ctx.font = "8px monospace"; ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255,102,0,${0.08 + 0.22 * ((avgZ + 1) / 2)})`;
        ctx.fillText(RUNG_LABELS[i % RUNG_LABELS.length], mx, my + 3);
      }
      ctx.font = "10px monospace";
      for (let i = 0; i < numNodes; i++) {
        const p1 = s1[i], p2 = s2[i];
        const angle1 = (i / numNodes) * Math.PI * 3 + rotation;
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255,102,0,${0.15 + 0.55 * ((p1.z + 1) / 2)})`;
        ctx.fillText(BIO_SKILLS[i % BIO_SKILLS.length], p1.x + Math.cos(angle1) * 28, p1.y + 4);
        ctx.fillStyle = `rgba(180,180,180,${0.15 + 0.55 * ((p2.z + 1) / 2)})`;
        ctx.fillText(CS_SKILLS[i % CS_SKILLS.length], p2.x + Math.cos(angle1 + Math.PI) * 28, p2.y + 4);
        [[p1, "255,102,0"], [p2, "180,180,180"]].forEach(([p, rgb]) => {
          const pt = p as { x: number; y: number; z: number };
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${0.15 + 0.45 * ((pt.z + 1) / 2)})`; ctx.fill();
        });
      }
      rafId = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

type Line =
  | { k: "cmd"; text: string; large?: boolean }
  | { k: "out"; text: string; accent?: boolean; large?: boolean }
  | { k: "blank" }
  | { k: "bar"; pct: number }
  | { k: "ready" };

const LINKS = [
  { label: "ekramjim002@gmail.com", href: "mailto:ekramjim002@gmail.com", icon: "ion:mail-outline" },
  { label: "ekram@lynksphere.com",  href: "mailto:ekram@lynksphere.com",  icon: "ion:mail-outline" },
  { label: "lynksphere.com",        href: "https://lynksphere.com",        icon: "ion:globe-outline" },
  { label: "linkedin",              href: "https://www.linkedin.com/in/ekram02", icon: "ion:logo-linkedin" },
  { label: "github",                href: "https://github.com/ekramjim",   icon: "ion:logo-github" },
];

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
        const full = step.text; const large = step.large;
        setLines(p => [...p, { k: "cmd", text: "", large }]);
        let ci = 0;
        function typeChar() {
          if (!alive.current) return;
          ci++;
          setLines(p => { const n = [...p]; n[n.length - 1] = { k: "cmd", text: full.slice(0, ci), large }; return n; });
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
          setLines(p => { const n = [...p]; n[n.length - 1] = { k: "bar", pct }; return n; });
          if (pct < 100) schedule(tick, 30);
          else schedule(next, 480);
        }
        schedule(tick, 240);
      } else if (step.s === "ready") {
        setLines(p => [...p, { k: "ready" }]);
        setFinished(true);
      }
    }
    schedule(next, 800);
    return () => { alive.current = false; timers.forEach(clearTimeout); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden pt-20">
      <DNAHelix />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none z-10" />

      <span className="absolute top-8 left-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute top-8 left-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />
      <span className="absolute top-8 right-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute top-8 right-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 left-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 left-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 right-8 w-6 h-[2px] bg-[#FF6600] opacity-30" />
      <span className="absolute bottom-8 right-8 w-[2px] h-6 bg-[#FF6600] opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-3xl mx-auto px-4"
      >
        <TerminalFrame title="zsh — ekram@portfolio">
          <div className="px-6 py-5 min-h-[420px] font-[family-name:var(--font-space-mono)]">
            {lines.length === 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[#FF6600] text-[16px] leading-none select-none">❯</span>
                <TerminalCursor className="text-[16px] leading-none" />
              </div>
            )}
            {lines.map((line, i) => {
              if (line.k === "blank") return <div key={i} className="h-5" />;
              if (line.k === "cmd") {
                const isLast = i === lines.length - 1;
                return (
                  <div key={i} className={`flex items-center gap-2.5 ${line.large ? "mb-4" : "mb-1.5"}`}>
                    <span className={`text-[#FF6600] leading-none select-none ${line.large ? "text-[22px]" : "text-[16px]"}`}>❯</span>
                    <span className={`text-[#f0f0f0] leading-none ${line.large ? "text-[2rem] sm:text-[2.6rem] tracking-tight" : "text-[15px] text-[#d0d0d0]"}`}>
                      {line.text}
                    </span>
                    {isLast && !finished && <TerminalCursor className={`leading-none ${line.large ? "text-[2rem] sm:text-[2.6rem]" : "text-[15px]"}`} />}
                  </div>
                );
              }
              if (line.k === "out") {
                if (line.large) return <p key={i} className="ml-5 mb-1 text-[2.8rem] sm:text-[3.5rem] font-normal leading-none tracking-tight text-[#f0f0f0]">{line.text}</p>;
                if (line.accent) return <p key={i} className="ml-5 mb-2 text-[17px] font-normal text-[#FF6600] tracking-wide leading-snug border-l-2 border-[#FF6600] pl-3">{line.text}</p>;
                return <p key={i} className="ml-5 text-[14px] mb-1 leading-relaxed text-[#888]">{line.text}</p>;
              }
              if (line.k === "bar") {
                const filled = Math.round(line.pct / 5);
                return (
                  <div key={i} className="ml-5 mt-1 mb-1">
                    <p className="text-[#666] text-[13px] mb-2">Initializing...</p>
                    <p className="text-[14px]">[<span className="text-[#FF6600]">{"░".repeat(filled)}</span><span className="text-[#f0f0f0]">{"░".repeat(20 - filled)}</span>]{" "}<span className="text-[#888]">{line.pct}%</span></p>
                  </div>
                );
              }
              if (line.k === "ready") return (
                <div key={i} className="flex items-center gap-2.5 mt-2">
                  <span className="text-[#FF6600] text-[16px] leading-none select-none">❯</span>
                  <span className="text-[#888] text-[15px] leading-none">
                    Ready.{" "}
                    <a href="#About" className="text-[#FF6600] hover:underline underline-offset-4">↓ scroll to explore</a>
                  </span>
                  <TerminalCursor className="text-[15px] leading-none" />
                </div>
              );
              return null;
            })}
          </div>
        </TerminalFrame>
      </motion.div>

      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: finished ? 1 : 0 }}
          transition={{ delay: finished ? 0.3 : 0, duration: 0.5 }}
          className="relative z-10 flex flex-wrap items-center justify-center gap-6 mt-6 font-[family-name:var(--font-space-mono)] text-[12px]"
        >
          {LINKS.map(({ label, href, icon }) => (
            <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#444] hover:text-[#FF6600] transition-colors duration-200">
              <Icon icon={icon} className="text-[15px]" />
              {label}
            </a>
          ))}
        </motion.div>

      {finished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-[family-name:var(--font-space-mono)] uppercase tracking-[0.35em] text-[#2a2a2a]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#2a2a2a] to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
