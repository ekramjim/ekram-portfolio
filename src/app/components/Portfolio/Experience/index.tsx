"use client";
import { useEffect, useRef } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const experiences = [
  {
    role: "Co-Founder & CEO",
    company: "LynkSphere",
    period: "Dec 2024 – Present",
    location: "Melbourne, Australia",
    current: true,
    bullets: [
      "Delivered staged speeches to attract potential customers at StartSpace Library",
      "Pitched the company at BNI Australia to acquire clients",
      "Successfully delivered iOS, Android, and Web applications to Australian clients",
      "Generated approximately $30,000 AUD in revenue over 8 months",
    ],
  },
  {
    role: "Restaurant Cashier",
    company: "La Baguette Café",
    period: "Feb 2025 – Oct 2025",
    location: "Berwick, Melbourne, VIC, Australia",
    current: false,
    bullets: [
      "Maintained and served customers at the café",
      "Supported restaurant operations and customer service",
    ],
  },
  {
    role: "Sales Manager & Inventory Coordinator",
    company: "KK Mart",
    period: "Jul 2023",
    location: "Monash, Malaysia",
    current: false,
    bullets: [
      "Managed day-to-day store operations including stock replenishment and supplier ordering",
      "Assisted in shelf layout changes, POS setup, and promotional displays",
      "Used Excel to track inventory trends and forecast demand",
      "Improved inventory accuracy by 30% through systematic stock-checking procedures",
    ],
  },
];

function TimelineDot({ current }: { current: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-4 h-4 mt-1">
      <div
        className="w-4 h-4 rounded-full border-2 border-[#FF6600]"
        style={{ background: current ? "#FF6600" : "var(--bg-card)" }}
      />
      {current && (
        <div className="absolute inset-0 rounded-full bg-[#FF6600] animate-ping opacity-30" />
      )}
    </div>
  );
}

function AnimatedVerticalLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)";
          path.style.strokeDashoffset = "0";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 2 100"
      width="2"
      height="100"
      fill="none"
      className="absolute left-[7px] top-5"
    >
      <path
        ref={pathRef}
        d="M1 0 L1 100"
        stroke="#FF6600"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export default function Experience() {
  return (
    <section id="Experience" className="relative py-24 overflow-hidden">
      {/* Decorative background SVGs */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath
          d="M1200 100 L1000 100 L1000 400 L1100 400 L1100 700 L900 700"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.07}
          delay={300}
          duration={3000}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-4 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#FF6600]" />
            Work Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Where I&apos;ve Worked
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            From co-founding a software company to hands-on retail management — diverse experience across multiple industries.
          </p>
        </FadeInView>

        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <FadeInView key={i} delay={i * 0.15}>
              <div className="relative flex gap-6 pb-16">
                {/* Left: timeline */}
                <div className="relative flex flex-col items-center">
                  <TimelineDot current={exp.current} />
                  {i < experiences.length - 1 && (
                    <div className="relative mt-2 flex-1 min-h-[120px]">
                      <AnimatedVerticalLine />
                    </div>
                  )}
                </div>

                {/* Right: content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-normal text-[var(--text-heading)] mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF6600] font-[family-name:var(--font-space-mono)] text-sm font-bold">
                          {exp.company}
                        </span>
                        <span className="text-[#d0d0d0]">·</span>
                        <span className="text-[#888888] font-[family-name:var(--font-space-mono)] text-xs">
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-space-mono)] px-3 py-1.5 ${
                          exp.current
                            ? "bg-[#FF6600] text-white"
                            : "border border-[var(--border-primary)] text-[#888888]"
                        }`}
                        style={{ borderRadius: 2 }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-[var(--text-body)] text-sm leading-relaxed">
                        <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF6600] opacity-70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
