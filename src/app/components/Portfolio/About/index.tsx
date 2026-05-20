"use client";
import { useEffect, useRef, useState } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";
import TerminalFrame from "@/components/ui/TerminalFrame";

const SCRAMBLE_CHARS = "0123456789abcdef!@#$%&?x*+-=~";

function ScrambleText({ text, trigger, delay = 0, className = "" }: {
  text: string;
  trigger: boolean;
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (!trigger || played.current) return;
    played.current = true;

    const start = setTimeout(() => {
      // Scramble everything first
      setDisplay(
        text.split("").map(c =>
          /[a-zA-Z0-9]/.test(c)
            ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            : c
        ).join("")
      );

      let iteration = 0;
      const id = setInterval(() => {
        const resolved = Math.floor(iteration / 2.2);
        setDisplay(
          text.split("").map((c, i) => {
            if (!/[a-zA-Z0-9]/.test(c)) return c;
            if (i < resolved) return c;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join("")
        );
        iteration++;
        if (resolved >= text.length) {
          clearInterval(id);
          setDisplay(text);
        }
      }, 28);
    }, delay);

    return () => clearTimeout(start);
  }, [trigger, text, delay]);

  return <span className={className}>{display}</span>;
}

const FIELDS: { key: string; value: string; orange?: boolean }[] = [
  { key: "Location", value: "Melbourne, Australia" },
  { key: "Role",     value: "Co-Founder @ LynkSphere",                       orange: true },
  { key: "Study",     value: "MSc Data Science · Monash · 2025–2026" },
  { key: "Exploring", value: "Bioinformatics · RNA-seq · AI · Intuitive Software", orange: true },
  { key: "Languages", value: "Python · TypeScript · Swift · R · Java · Kotlin · SQL" },
  { key: "Frameworks", value: "Next.js · React Native · Flutter · SwiftUI · Node.js" },
  { key: "Data",      value: "Pandas · PyTorch · TensorFlow · Scikit-learn · NumPy" },
  { key: "Available", value: "Open to hire",                                               orange: true },
];


type BioLine = { text: string; accent?: boolean; comment?: boolean; blank?: boolean };

const LEFT_LINES: BioLine[] = [
  { text: "# data science", accent: true },
  { blank: true },
  { text: "Studying an MSc in Data Science at Monash. You'll find me in RStudio building colour palettes and visualising interesting data — F1 lap times, sector gaps, tyre strategy. It's a sport I genuinely love, and the data side makes it even better." },
  { blank: true },
  { text: "# computer science", accent: true },
  { blank: true },
  { text: "There's something satisfying about clean, efficient code — logic that's tight and does exactly what it needs to. I'm genuinely curious about how AI works under the hood: how models learn, why they fail, what makes a good architecture. Less interested in claiming I'm great at it, more interested in actually understanding it." },
  { blank: true },
  { text: "# bioinformatics", accent: true },
  { blank: true },
  { text: "I picked it up as a unit in my Master of Data Science at Monash and fell in love immediately. Coursework covered the full RNA-seq pipeline — from FastQC and adapter trimming through to differential expression with limma and DESeq2. My applied project worked on a colorectal cancer dataset, interpreting GO enrichment results across lipid metabolism, inflammatory response, and blood coagulation." },
  { blank: true },
  { text: "Bioinformatics is what happens when software, statistics, and biology collide. For someone from a CS background, it felt like finding a problem space that actually needed all of it." },
  { blank: true },
  { text: "// fun fact", comment: true },
  { text: "I got into bioinformatics by staring at my friend's screen, watching her work through genomic data and understanding absolutely nothing. That confusion was enough to make me want to understand everything." },
];

const RIGHT_LOWER_LINES: BioLine[] = [
  { text: "# co-founder", accent: true },
  { blank: true },
  { text: "My passion for developing intuitive apps pushed me to start a software studio with my friend and co-founder in Melbourne, December 2024. We build iOS, Android, and web apps for Australian startups — and alongside that, we explore ideas for software that could genuinely be useful for people in ways that don't exist yet." },
];

function renderLine(line: BioLine, i: number) {
  if (line.blank) return <div key={i} className="h-3" />;
  if (line.comment) return (
    <div key={i} className="flex gap-2">
      <span className="text-[#FF6600] opacity-40 shrink-0 text-[12px]">❯</span>
      <span className="text-[#FF6600] opacity-50 text-[12px] leading-relaxed">{line.text}</span>
    </div>
  );
  if (line.accent) return (
    <div key={i} className="flex gap-2 items-center mb-2">
      <span className="text-[#FF6600] shrink-0 text-[16px]">❯</span>
      <span className="text-[#FF6600] text-[22px] font-bold tracking-wide">{line.text}</span>
    </div>
  );
  return (
    <div key={i} className="flex gap-2">
      <span className="text-[#FF6600] opacity-40 shrink-0 text-[12px] mt-0.5">❯</span>
      <span className="text-[#b0b0b0] text-[12px] leading-relaxed">{line.text}</span>
    </div>
  );
}

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="About" className="relative py-24 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath d="M0 50 L100 50 L100 200 L300 200 L300 100 L500 100" stroke="#FF6600" strokeWidth={1} opacity={0.1} delay={100} duration={2500} />
        <AnimatedPath d="M1200 550 L1100 550 L1100 400 L900 400 L900 550 L700 550" stroke="#FF6600" strokeWidth={1} opacity={0.08} delay={400} duration={2000} />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: co-founder, data science, bioinformatics */}
          <div>
            <FadeInView>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-3 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[#FF6600]" />
                About Me
              </p>
              <p className="font-[family-name:var(--font-space-mono)] text-[#555] text-[13px] mb-6">papers by day, coding by night.</p>
              <div className="font-[family-name:var(--font-space-mono)] space-y-1">
                {LEFT_LINES.map((line, i) => renderLine(line, i))}
              </div>
            </FadeInView>
          </div>

          {/* Right: neofetch terminal + computer science below */}
          <div>
            <FadeInView delay={0.1}>
              <TerminalFrame ref={cardRef} title="zsh — ekram@portfolio ~ neofetch">
                <div className="px-6 py-6 font-[family-name:var(--font-space-mono)]">
                  <p className="text-[13px] mb-0.5">
                    <span className="text-[#FF6600]">ekram</span>
                    <span className="text-[#555]">@</span>
                    <span className="text-[#c0c0c0]">portfolio</span>
                  </p>
                  <div className="h-[1px] bg-[#1e1e1e] mb-4" />

                  <div className="space-y-[7px]">
                    {FIELDS.map((f, i) => (
                      <div key={i} className="flex gap-2 text-[12px] sm:text-[13px] leading-snug">
                        <span className="w-[84px] shrink-0 text-[#FF6600] opacity-70 text-right">{f.key}</span>
                        <span className="text-[#333] shrink-0">{f.key ? "~" : " "}</span>
                        <ScrambleText
                          text={f.value}
                          trigger={triggered}
                          delay={i * 90}
                          className={f.orange ? "text-[#FF6600]" : "text-[#a0a0a0]"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TerminalFrame>
            </FadeInView>

            <FadeInView delay={0.2}>
              <div className="font-[family-name:var(--font-space-mono)] space-y-1 mt-10">
                {RIGHT_LOWER_LINES.map((line, i) => renderLine(line, i))}
              </div>
            </FadeInView>
          </div>

        </div>
      </div>
    </section>
  );
}
