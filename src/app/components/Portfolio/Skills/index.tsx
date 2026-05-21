"use client";
import { useEffect, useRef, useState } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import { useMobileScrollActive } from "@/app/hooks/useMobileScrollActive";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const BAR_LEN_MOBILE = 12;
const BAR_LEN_DESKTOP = 20;

function HtopBar({ pct, trigger, delay = 0 }: { pct: number; trigger: boolean; delay?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCurrent(0);
      return;
    }
    let intervalId: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      let val = 0;
      intervalId = setInterval(() => {
        val = Math.min(val + 2, pct);
        setCurrent(val);
        if (val >= pct) clearInterval(intervalId);
      }, 18);
    }, delay);
    return () => { clearTimeout(t); clearInterval(intervalId); };
  }, [trigger, pct, delay]);

  const filledMobile = Math.round((current / 100) * BAR_LEN_MOBILE);
  const emptyMobile = BAR_LEN_MOBILE - filledMobile;
  const filledDesktop = Math.round((current / 100) * BAR_LEN_DESKTOP);
  const emptyDesktop = BAR_LEN_DESKTOP - filledDesktop;
  const color = current > 75 ? "#FF6600" : current > 45 ? "#FF8833" : "#cc5500";

  const intensity = 0.35 + ((pct - 50) / 50) * 0.65;
  const fillColor = `rgba(255,255,255,${intensity.toFixed(2)})`;
  const glow = `0 0 ${Math.round(4 + intensity * 8)}px rgba(255,255,255,${(intensity * 0.7).toFixed(2)})`;

  return (
    <span className="min-w-0 flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[11px] sm:text-[12px]">
      <span className="sm:hidden whitespace-nowrap">[<span style={{ color }}>{"░".repeat(filledMobile)}</span><span style={{ color: fillColor, textShadow: glow }}>{"░".repeat(emptyMobile)}</span>]</span>
      <span className="hidden sm:inline whitespace-nowrap">[<span style={{ color }}>{"░".repeat(filledDesktop)}</span><span style={{ color: fillColor, textShadow: glow }}>{"░".repeat(emptyDesktop)}</span>]</span>
      <span className="text-[#aaa] shrink-0 tabular-nums">{current}%</span>
    </span>
  );
}

const skillGroups: { label: string; color: string; skills: { name: string; pct: number }[] }[] = [
  {
    label: "Languages",
    color: "#FF6600",
    skills: [
      { name: "Python",           pct: 92 },
      { name: "TypeScript",       pct: 88 },
      { name: "JavaScript",       pct: 86 },
      { name: "Swift",            pct: 80 },
      { name: "SQL",              pct: 80 },
      { name: "HTML/CSS/Tailwind",pct: 88 },
      { name: "R",                pct: 74 },
      { name: "Java",             pct: 72 },
      { name: "Kotlin",           pct: 68 },
      { name: "Bash",             pct: 62 },
    ],
  },
  {
    label: "Technologies",
    color: "#0a0a0a",
    skills: [
      { name: "Next.js",      pct: 92 },
      { name: "ReactJS",      pct: 88 },
      { name: "iOS",          pct: 82 },
      { name: "NodeJS",       pct: 80 },
      { name: "Android",      pct: 74 },
      { name: "MongoDB",      pct: 74 },
      { name: "Flutter",      pct: 68 },
      { name: "AWS",          pct: 58 },
      { name: "Google Cloud", pct: 54 },
    ],
  },
  {
    label: "Data & Bioinformatics",
    color: "#FF6600",
    skills: [
      { name: "Pandas",               pct: 88 },
      { name: "NumPy",                pct: 86 },
      { name: "Scikit-learn",         pct: 76 },
      { name: "PyTorch",              pct: 70 },
      { name: "TensorFlow",           pct: 66 },
      { name: "RNA-seq analysis",     pct: 74 },
      { name: "limma",                pct: 70 },
      { name: "DESeq2",               pct: 70 },
      { name: "GO enrichment",        pct: 66 },
      { name: "Bioconductor",         pct: 64 },
    ],
  },
  {
    label: "Tools",
    color: "#0a0a0a",
    skills: [
      { name: "VS Code",    pct: 92 },
      { name: "Git/GitHub", pct: 90 },
      { name: "RStudio",    pct: 84 },
      { name: "Jupyter",    pct: 84 },
      { name: "Xcode",      pct: 76 },
      { name: "Tableau",    pct: 74 },
      { name: "Firebase",   pct: 72 },
      { name: "Docker",     pct: 64 },
      { name: "GeminiAPI",  pct: 70 },
    ],
  },
  {
    label: "Soft Skills",
    color: "#FF6600",
    skills: [
      { name: "Leadership",               pct: 90 },
      { name: "Technical Communication",  pct: 88 },
      { name: "Decision Making",          pct: 84 },
      { name: "Public Speaking",          pct: 80 },
      { name: "Agile Methodologies",      pct: 78 },
      { name: "Mentorship",               pct: 76 },
      { name: "Negotiation",              pct: 70 },
      { name: "Conflict Resolution",      pct: 68 },
    ],
  },
];

function SkillCard({ group, startIndex }: { group: typeof skillGroups[0]; startIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, isActive } = useMobileScrollActive<HTMLDivElement>();
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTriggered(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={(node) => {
        cardRef.current = node;
        scrollRef.current = node;
      }}
      className={`border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-6 relative overflow-hidden hover:border-[#FF6600] transition-colors duration-300 group ${isActive ? "border-[#FF6600]" : ""}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: group.color === "#FF6600" ? "#FF6600" : "transparent" }} />
      <div className={`absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? "opacity-100" : ""}`}
        style={{ background: "#FF6600" }} />

      <p className="text-[10px] font-bold tracking-[0.4em] uppercase font-[family-name:var(--font-space-mono)] mb-5 flex items-center gap-2"
        style={{ color: group.color === "#FF6600" ? "#FF6600" : "#888888" }}>
        <span className="w-3 h-[2px]" style={{ background: group.color }} />
        {group.label}
      </p>

      <div className="space-y-2">
        {group.skills.map((skill, si) => (
          <div key={skill.name} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[160px_auto] items-center gap-3">
            <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[#aaa] min-w-0 sm:w-[160px] truncate">
              {skill.name}
            </span>
            <HtopBar pct={skill.pct} trigger={triggered} delay={si * 55} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="Skills" className="relative py-24 overflow-hidden">
      <svg className="absolute inset-0 hidden w-full h-full pointer-events-none md:block" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M0 200 L200 200 L200 100 L500 100 L500 400 L800 400" stroke="#FF6600" strokeWidth={1} opacity={0.25} dashed />
        <AnimatedPath d="M1200 600 L1000 600 L1000 400 L700 400 L700 700 L400 700" stroke="#FF6600" strokeWidth={1} opacity={0.22} dashed />
        <AnimatedPath d="M0 500 L150 500 L150 300 L350 300 L350 600 L550 600 L550 450" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
        <AnimatedPath d="M1200 300 L1050 300 L1050 150 L850 150 L850 350 L650 350 L650 200" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
        <AnimatedPath d="M300 0 L300 150 L600 150 L600 0" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M600 800 L600 650 L900 650 L900 800" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionLabel>Core Skills</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Technical Expertise
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            Picked up across two degrees, too many side projects, and a genuine inability to stop learning new things.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <FadeInView key={group.label} delay={gi * 0.12}>
              <SkillCard group={group} startIndex={gi} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
