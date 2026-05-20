"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const leadership = [
  {
    title: "Monash Generator Representative",
    location: "Monash University",
    description:
      "Represented Monash Generator at new student orientation, briefing incoming cohorts on entrepreneurship programs, startup resources, and business development opportunities.",
    icon: "🚀",
  },
  {
    title: "Go-Global Day Representative",
    location: "Prato, Italy",
    description:
      "Represented Monash Prato campus to 200+ students of Monash University Malaysia as the main event representative.",
    icon: "🌍",
  },
  {
    title: "Pisa Tour Leader",
    location: "Pisa, Italy",
    description:
      "Guided a group of 5 students across Pisa, delivering a speech on the historical significance of key sites including the Leaning Tower of Pisa.",
    icon: "🗼",
  },
  {
    title: "Class Leader — MGX3991",
    location: "Monash Prato, Italy",
    description:
      "Led a 45-minute student session, keeping the cohort engaged through interactive activities and a two-week recap.",
    icon: "🎓",
  },
  {
    title: "MUVP × RMM Outreach",
    location: "Kuala Lumpur, Malaysia",
    description:
      "Conducted an educational class for orphaned children as part of a university outreach initiative.",
    icon: "🤝",
  },
];

export default function Leadership() {
  return (
    <section id="Leadership" className="relative py-24 overflow-hidden">
      {/* Decorative SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath
          d="M0 100 L200 100 L200 300 L400 300 L400 100 L600 100 L600 400 L800 400 L800 200 L1000 200 L1000 400 L1200 400"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.08}
          delay={200}
          duration={4000}
        />
        <AnimatedPath
          d="M200 0 L200 600 M600 0 L600 600 M1000 0 L1000 600"
          stroke="#FF6600"
          strokeWidth={0.5}
          opacity={0.03}
          delay={0}
          duration={2000}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-4 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#FF6600]" />
            Leadership
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Community & Impact
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            Leading events, guiding teams, and giving back — experiences that shaped my communication and leadership skills.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {leadership.map((item, i) => (
            <FadeInView key={item.title} delay={i * 0.12}>
              <div
                className="group border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-6 relative overflow-hidden hover:border-[#FF6600] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                style={{ borderRadius: 4 }}
              >
                {/* Animated top bar */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#FF6600] group-hover:w-full transition-all duration-500" />

                <div className="text-3xl mb-4">{item.icon}</div>

                <h4 className="text-base font-normal text-[var(--text-heading)] mb-1 leading-snug group-hover:text-[#FF6600] transition-colors duration-200">
                  {item.title}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-3 block">
                  {item.location}
                </span>

                <p className="text-[var(--text-body)] text-sm leading-relaxed flex-1">{item.description}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
