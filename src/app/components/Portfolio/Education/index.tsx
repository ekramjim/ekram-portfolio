"use client";
import { useEffect, useRef } from "react";
import FadeInView from "@/app/components/Common/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const education = [
  {
    degree: "Master of Data Science",
    school: "Monash University",
    period: "Jul 2025 – Nov 2026",
    current: true,
    details: [
      "Coursework: Data Wrangling, Software Engineering, Bioinformatics, Machine Learning, Data Visualisation, Data Analytics, Algorithms and Data Structures, Deep Learning, Theory of Computation",
    ],
  },
  {
    degree: "Bachelor of Computer Science (Data Science)",
    school: "Monash University",
    period: "Jul 2022 – Jul 2025",
    current: false,
    details: [
      "Awarded High Achievers Scholarship",
    ],
  },
];

function AnimatedConnectorLine() {
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
          path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)";
          path.style.strokeDashoffset = "0";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 2 80" width="2" height="80" fill="none">
      <path
        ref={pathRef}
        d="M1 0 L1 80"
        stroke="#FF6600"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Education() {
  return (
    <section id="Education" className="relative py-24 overflow-hidden">
      <svg className="absolute inset-0 hidden w-full h-full pointer-events-none md:block" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M0 150 L200 150 L200 350 L400 350 L400 200 L600 200" stroke="#FF6600" strokeWidth={1} opacity={0.25} dashed />
        <AnimatedPath d="M1200 550 L1050 550 L1050 350 L850 350" stroke="#FF6600" strokeWidth={1} opacity={0.22} dashed />
        <AnimatedPath d="M0 400 L200 400 L200 550 L450 550 L450 350 L650 350 L650 550 L850 550" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M1200 200 L1000 200 L1000 100 L700 100 L700 300 L500 300" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M300 0 L300 100 L600 100 L600 0" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M400 700 L400 600 L800 600 L800 700" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M0 600 L150 600 L150 450 L350 450" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <div>
            <FadeInView>
              <SectionLabel>Education</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-6 leading-tight">
                Academic Background
              </h2>
              <p className="text-[var(--text-body)] text-lg leading-relaxed mb-8">
                Currently pursuing a Master of Data Science at Monash University, having completed a Bachelor of Computer Science (Data Science) with a High Achievers Scholarship.
              </p>

            </FadeInView>
          </div>

          {/* Right: Timeline */}
          <div>
            {education.map((edu, i) => (
              <FadeInView key={i} delay={i * 0.12}>
                <div className="relative flex gap-5 pb-0">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 border-[#FF6600] flex-shrink-0 mt-1"
                      style={{ background: edu.current ? "#FF6600" : "var(--bg-card)" }}
                    />
                    {i < education.length - 1 && (
                      <div className="mt-2 mb-0 flex-1">
                        <AnimatedConnectorLine />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${i < education.length - 1 ? "pb-6" : "pb-0"}`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-2">
                      <div>
                        <h4 className="text-base font-normal text-[var(--text-heading)]">{edu.degree}</h4>
                        <span className="text-[#FF6600] text-sm font-[family-name:var(--font-space-mono)]">{edu.school}</span>
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-space-mono)] px-2 py-1 self-start flex-shrink-0"
                        style={{ color: edu.current ? "#FF6600" : "#888888" }}
                      >
                        {edu.period}
                      </span>
                    </div>
                    {edu.details.length > 0 && (
                      <ul className="space-y-1.5 mt-2">
                        {edu.details.map((d, di) => (
                          <li key={di} className="flex gap-2 text-[var(--text-body)] text-xs leading-relaxed">
                            <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-[#FF6600] opacity-70" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
