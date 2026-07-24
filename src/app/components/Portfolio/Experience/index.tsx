"use client";
import { useEffect, useRef, useState } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import TerminalFrame from "@/components/ui/TerminalFrame";
import TerminalCursor from "@/components/ui/TerminalCursor";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

type Step =
  | { s: "cmd"; text: string }
  | { s: "out"; text: string; accent?: boolean; dim?: boolean }
  | { s: "link"; label: string; href: string }
  | { s: "blank" }
  | { s: "bullet"; text: string }
  | { s: "done" };

type Line =
  | { k: "cmd"; text: string }
  | { k: "out"; text: string; accent?: boolean; dim?: boolean }
  | { k: "link"; label: string; href: string }
  | { k: "blank" }
  | { k: "bullet"; text: string }
  | { k: "done" };

type ExperienceEntry = {
  file: string;
  title: string;
  script: Step[];
};

const EXPERIENCES: ExperienceEntry[] = [
  {
    file: "mindsigns.txt",
    title: "zsh — ekram@portfolio ~ experience/mindsigns",
    script: [
      { s: "cmd",   text: "cat mindsigns.txt" },
      { s: "blank" },
      { s: "out",   text: "Full Stack Software Developer @ MindSigns", accent: true },
      { s: "out",   text: "Feb 2026 – Present · Monash University (FIT) Initiative", dim: true },
      { s: "link",  label: "mindsigns.online", href: "https://mindsigns.online" },
      { s: "blank" },
      { s: "bullet", text: "Designed, built, and deployed the official MindSigns website end-to-end using Next.js, React, and TypeScript" },
      { s: "bullet", text: "Engineered a custom particle-based 3D hero animation (Three.js/React Three Fiber) — a procedurally generated hand model built via forward kinematics that morphs between sign-language poses, with cursor-reactive physics" },
      { s: "bullet", text: "Built a reusable editorial design system with scroll-driven animations and micro-interactions via Framer Motion" },
      { s: "bullet", text: "Extended interactivity to mobile with an IntersectionObserver-based scroll layer, ensuring feature parity for touch devices" },
      { s: "bullet", text: "Managed deployment and hosting via Vercel, handling the full release pipeline independently" },
      { s: "done" },
    ],
  },
  {
    file: "lynksphere.txt",
    title: "zsh — ekram@portfolio ~ experience/lynksphere",
    script: [
      { s: "cmd",   text: "cat lynksphere.txt" },
      { s: "blank" },
      { s: "out",   text: "Co-Founder @ LynkSphere", accent: true },
      { s: "out",   text: "Dec 2024 – Present", dim: true },
      { s: "link",  label: "lynksphere.com", href: "https://lynksphere.com" },
      { s: "blank" },
      { s: "bullet", text: "Co-founded a software studio delivering iOS, Android, and web apps to Australian startups and B2B clients using React Native, Next.js, SwiftUI, and Supabase" },
      { s: "bullet", text: "8 clients · 12+ end-to-end products shipped in under a year" },
      { s: "bullet", text: "Managed full client lifecycle: scoping, architecture, deployment, and post-launch support" },
      { s: "bullet", text: "Acquired clients via BNI Australia, StartSpace Library, and Entrepreneurs Summit 2026" },
      { s: "done" },
    ],
  },
];

function ExperienceCard({ entry, delay }: { entry: ExperienceEntry; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    alive.current = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const schedule = (fn: () => void, ms: number) => {
      if (!alive.current) return;
      const t = setTimeout(() => { timers.delete(t); fn(); }, ms);
      timers.add(t);
    };

    const script = entry.script;
    let si = 0;
    function next() {
      if (!alive.current || si >= script.length) return;
      const step = script[si++];

      if (step.s === "blank") {
        setLines(p => [...p, { k: "blank" }]);
        schedule(next, 60);
      } else if (step.s === "out") {
        schedule(() => {
          setLines(p => [...p, { k: "out", text: step.text, accent: step.accent, dim: step.dim }]);
          schedule(next, 120);
        }, 200);
      } else if (step.s === "link") {
        schedule(() => {
          setLines(p => [...p, { k: "link", label: step.label, href: step.href }]);
          schedule(next, 120);
        }, 120);
      } else if (step.s === "bullet") {
        schedule(() => {
          setLines(p => [...p, { k: "bullet", text: step.text }]);
          schedule(next, 180);
        }, 220);
      } else if (step.s === "cmd") {
        const full = step.text;
        setLines(p => [...p, { k: "cmd", text: "" }]);
        let ci = 0;
        function typeChar() {
          if (!alive.current) return;
          ci++;
          setLines(p => { const n = [...p]; n[n.length - 1] = { k: "cmd", text: full.slice(0, ci) }; return n; });
          if (ci < full.length) schedule(typeChar, 52);
          else schedule(next, 340);
        }
        schedule(typeChar, 160);
      } else if (step.s === "done") {
        setLines(p => [...p, { k: "done" }]);
        setFinished(true);
      }
    }

    schedule(next, 400);
    return () => { alive.current = false; timers.forEach(clearTimeout); };
  }, [started, entry]);

  return (
    <FadeInView delay={delay}>
      <TerminalFrame ref={cardRef} title={entry.title}>
        <div className="px-6 py-5 min-h-[320px] font-[family-name:var(--font-space-mono)]">

          {lines.length === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[#FF6600] text-[16px] leading-none select-none">❯</span>
              <TerminalCursor className="text-[16px] leading-none" />
            </div>
          )}

          {lines.map((line, i) => {
            if (line.k === "blank") return <div key={i} className="h-4" />;

            if (line.k === "cmd") {
              const isLast = i === lines.length - 1;
              return (
                <div key={i} className="flex items-center gap-2.5 mb-2">
                  <span className="text-[#FF6600] text-[16px] leading-none select-none">❯</span>
                  <span className="text-[#d0d0d0] text-[14px] leading-none">{line.text}</span>
                  {isLast && !finished && <TerminalCursor className="text-[14px] leading-none" />}
                </div>
              );
            }

            if (line.k === "out") {
              if (line.accent) return (
                <p key={i} className="text-[#FF6600] text-[18px] font-bold mb-1">{line.text}</p>
              );
              return (
                <p key={i} className="text-[#555] text-[12px] mb-0.5">{line.text}</p>
              );
            }

            if (line.k === "link") return (
              <a
                key={i}
                href={line.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6600] text-[12px] hover:underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity block mb-0.5"
              >
                ↗ {line.label}
              </a>
            );

            if (line.k === "bullet") return (
              <div key={i} className="flex gap-2.5 mb-2">
                <span className="text-[#FF6600] opacity-50 shrink-0 mt-[3px] text-[10px]">▸</span>
                <span className="text-[#888] text-[13px] leading-relaxed">{line.text}</span>
              </div>
            );

            if (line.k === "done") return (
              <div key={i} className="flex items-center gap-2.5 mt-2">
                <span className="text-[#FF6600] text-[16px] leading-none select-none">❯</span>
                <TerminalCursor className="text-[16px] leading-none" />
              </div>
            );

            return null;
          })}
        </div>
      </TerminalFrame>
    </FadeInView>
  );
}

export default function Experience() {
  return (
    <section id="Experience" className="relative py-24 overflow-hidden">
      <svg className="absolute inset-0 hidden w-full h-full pointer-events-none md:block" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M1200 100 L1000 100 L1000 400 L1100 400 L1100 700 L900 700" stroke="#FF6600" strokeWidth={1} opacity={0.25} dashed />
        <AnimatedPath d="M0 200 L200 200 L200 100 L400 100 L400 300 L600 300 L600 150 L800 150" stroke="#FF6600" strokeWidth={1} opacity={0.22} dashed />
        <AnimatedPath d="M0 500 L300 500 L300 650 L600 650 L600 500 L800 500 L800 700 L1000 700" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M1200 500 L1050 500 L1050 300 L850 300 L850 550 L650 550" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M400 0 L400 120 L700 120 L700 0" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M300 800 L300 680 L700 680 L700 800" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
      </svg>
      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionLabel>Work Experience</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Where I&apos;ve Worked
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            One studio. Real clients. Shipped end-to-end.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {EXPERIENCES.map((entry, i) => (
            <ExperienceCard key={entry.file} entry={entry} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
