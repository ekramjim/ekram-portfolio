"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const ASCII_LINES = [
  "███████╗██╗  ██╗",
  "██╔════╝██║ ██╔╝",
  "█████╗  █████╔╝ ",
  "██╔══╝  ██╔═██╗ ",
  "███████╗██║  ██╗",
  "╚══════╝╚═╝  ╚═╝",
];

const FIELDS: { key: string; value: string; orange?: boolean }[] = [
  { key: "User",     value: "Ekram Islam" },
  { key: "Location", value: "Melbourne, Australia" },
  { key: "Role",     value: "Co-Founder @ LynkSphere",                           orange: true },
  { key: "Study",    value: "MSc Data Science · Monash · Jul 2025 – Nov 2026" },
  { key: "",         value: "BSc Computer Science · Monash · High Achievers Scholar" },
  { key: "Research", value: "Bioinformatics · ML · NLP · Deep Learning",          orange: true },
  { key: "Stack",    value: "Python · TypeScript · Swift · R · Java" },
  { key: "Tools",    value: "PyTorch · TensorFlow · DESeq2 · limma · Next.js" },
  { key: "Clients",  value: "8+ across Australia" },
  { key: "Status",   value: "Open to hire",                                        orange: true },
];

const PALETTE = ["#FF6600", "#FF8833", "#cc5500", "#ff9966", "#2a2a2a", "#333", "#555", "#888"];

export default function About() {
  return (
    <section id="About" className="relative py-24 overflow-hidden">
      {/* Decorative SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath
          d="M0 50 L100 50 L100 200 L300 200 L300 100 L500 100"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.1}
          delay={100}
          duration={2500}
        />
        <AnimatedPath
          d="M1200 550 L1100 550 L1100 400 L900 400 L900 550 L700 550"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.08}
          delay={400}
          duration={2000}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-6 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#FF6600]" />
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-normal text-[var(--text-heading)] leading-tight mb-4 max-w-2xl">
            Co-founder building software.<br />
            Currently exploring AI &amp; Bioinformatics.
          </h2>
          <p className="text-[var(--text-body)] text-base leading-relaxed max-w-2xl mb-10">
            Studying a Master of Data Science at Monash — diving into machine learning, bioinformatics, NLP, and deep learning.
            Alongside that, I run <span className="text-[#FF6600]">LynkSphere</span>, a software studio in Melbourne shipping iOS, Android, and web apps to Australian startups.
            Code by day, papers by night.
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div
            className="bg-[#0d0d0d] border border-[#1e1e1e] max-w-4xl"
            style={{ borderRadius: 6 }}
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#191919]">
              <span className="w-3 h-3 rounded-full bg-[#FF6600] opacity-75" />
              <span className="w-3 h-3 rounded-full bg-[#222]" />
              <span className="w-3 h-3 rounded-full bg-[#222]" />
              <span className="ml-3 text-[9px] uppercase tracking-[0.35em] text-[#666] font-[family-name:var(--font-space-mono)]">
                zsh — ekram@portfolio ~ neofetch
              </span>
            </div>

            {/* Neofetch body */}
            <div className="px-6 py-6 flex gap-10 font-[family-name:var(--font-space-mono)]">

              {/* Left: ASCII art + palette */}
              <div className="hidden sm:flex flex-col gap-4 shrink-0 select-none">
                <div className="leading-[1.45]">
                  {ASCII_LINES.map((line, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-[#FF6600]"
                      style={{ opacity: 0.55 + i * 0.075 }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
                {/* Color swatches */}
                <div className="flex gap-1">
                  {PALETTE.map((color, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 inline-block"
                      style={{ backgroundColor: color, borderRadius: 2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Right: system info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] mb-0.5">
                  <span className="text-[#FF6600]">ekram</span>
                  <span className="text-[#555]">@</span>
                  <span className="text-[#c0c0c0]">portfolio</span>
                </p>
                <div className="h-[1px] bg-[#1e1e1e] mb-4" />

                <div className="space-y-[7px]">
                  {FIELDS.map((f, i) => (
                    <div key={i} className="flex gap-2 text-[12px] sm:text-[13px] leading-snug">
                      <span className="w-[72px] shrink-0 text-[#FF6600] opacity-70 text-right">
                        {f.key}
                      </span>
                      <span className="text-[#333] shrink-0">{f.key ? "~" : " "}</span>
                      <span className={f.orange ? "text-[#FF6600]" : "text-[#a0a0a0]"}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
