"use client";
import { useEffect, useRef, useState } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import TerminalFrame from "@/components/ui/TerminalFrame";
import SectionLabel from "@/components/ui/SectionLabel";
import NeuralNet from "./NeuralNet";

const SCRAMBLE_CHARS = "0123456789abcdef!@#$%&?x*+-=~";

function ScrambleText({ text, triggerKey, delay = 0, className = "" }: {
  text: string;
  triggerKey: number;
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (triggerKey === 0) return;
    let intervalId: ReturnType<typeof setInterval> | undefined;

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
      intervalId = setInterval(() => {
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
          if (intervalId) clearInterval(intervalId);
          setDisplay(text);
        }
      }, 28);
    }, delay);

    return () => {
      clearTimeout(start);
      if (intervalId) clearInterval(intervalId);
      setDisplay(text);
    };
  }, [triggerKey, text, delay]);

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


type BioLine = { text?: string; accent?: boolean; comment?: boolean; blank?: boolean };

const LEFT_LINES: BioLine[] = [
  { text: "# data science", accent: true },
  { blank: true },
  { text: "Studying an MSc in Data Science at Monash. You'll find me in RStudio building colour palettes and visualising interesting data: F1 lap times, sector gaps, tyre strategy. It's a sport I genuinely love, and the data side makes it even better." },
  { blank: true },
  { text: "# computer science", accent: true },
  { blank: true },
  { text: "There's something satisfying about clean, efficient code. Logic that's tight and does exactly what it needs to. I'm genuinely curious about how AI works under the hood: how models learn, why they fail, what makes a good architecture. Less interested in claiming I'm great at it, more interested in actually understanding it." },
  { blank: true },
  { text: "# bioinformatics", accent: true },
  { blank: true },
  { text: "I picked it up as a unit in my Master of Data Science at Monash and fell in love immediately. Coursework covered the full RNA-seq pipeline: FastQC, adapter trimming, differential expression with limma and DESeq2. My applied project worked on a colorectal cancer dataset, interpreting GO enrichment results across lipid metabolism, inflammatory response, and blood coagulation." },
  { blank: true },
  { text: "Bioinformatics is what happens when software, statistics, and biology collide. For someone from a CS background, it felt like finding a problem space that actually needed all of it." },
  { blank: true },
  { text: "// fun fact", comment: true },
  { text: "I got into bioinformatics by staring at my friend's screen, watching her work through genomic data and understanding absolutely nothing. That confusion was enough to make me want to understand everything." },
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
  const [scrambleTrigger, setScrambleTrigger] = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setScrambleTrigger((value) => value + 1); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const triggerScrambleFromPointerEnter = () => {
    setScrambleTrigger((value) => value + 1);
  };

  return (
    <section id="About" className="relative py-24 overflow-hidden brutal-dots">
      <NeuralNet />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">

        {/* Header — always above the grid */}
        <FadeInView>
          <SectionLabel>About Me</SectionLabel>
          <p className="font-[family-name:var(--font-space-mono)] text-[#aaa] text-[13px] mb-10">papers by day, coding by night.</p>
        </FadeInView>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: data science, computer science, bioinformatics */}
          <div className="order-2 lg:order-1">
            <FadeInView>
              <div className="font-[family-name:var(--font-space-mono)] space-y-1">
                {LEFT_LINES.map((line, i) => renderLine(line, i))}
              </div>
            </FadeInView>
          </div>

          {/* Right: neofetch terminal + computer science below */}
          <div className="order-1 lg:order-2">
            <FadeInView delay={0.1}>
              <TerminalFrame ref={cardRef} title="zsh — ekram@portfolio ~ neofetch">
                <div
                  className="px-6 py-6 font-[family-name:var(--font-space-mono)]"
                  onPointerEnter={triggerScrambleFromPointerEnter}
                >
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
                          triggerKey={scrambleTrigger}
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
                {renderLine({ text: "# co-founder", accent: true }, 0)}
                {renderLine({ blank: true }, 1)}
                {renderLine({ text: "My passion for developing intuitive apps pushed me to start a software studio with my friend and co-founder in Melbourne, December 2024. We build iOS, Android, and web apps for Australian startups. Alongside that, we explore ideas for software that could genuinely be useful for people in ways that don't exist yet." }, 2)}
              </div>
            </FadeInView>

          </div>

        </div>
      </div>
    </section>
  );
}
