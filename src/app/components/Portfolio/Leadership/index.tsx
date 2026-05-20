"use client";
import { Icon } from "@iconify/react";
import FadeInView from "@/app/components/Common/FadeInView";
import { useMobileScrollActive } from "@/app/hooks/useMobileScrollActive";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";
import SectionLabel from "@/components/ui/SectionLabel";

const leadership = [
  {
    title: "Monash Generator Representative",
    location: "Melbourne, Australia",
    type: "Representation",
    description:
      "Represented Monash Generator at new student orientation, briefing incoming cohorts on entrepreneurship programs, startup resources, and business development opportunities.",
    icon: "ph:rocket-launch",
  },
  {
    title: "Kingston Business Network",
    location: "Melbourne, Australia",
    type: "Startup Pitch",
    description:
      "Represented LynkSphere and delivered a startup-focused talk on how founders can start, position, and grow a successful business.",
    icon: "ph:presentation-chart",
  },
  {
    title: "BNI Melbourne",
    location: "Melbourne, Australia",
    type: "Business Story",
    description:
      "Took part in BNI Melbourne's short story program, presenting LynkSphere's work in software and startup development to a business audience.",
    icon: "ph:microphone-stage",
  },
  {
    title: "Go-Global Day Representative",
    location: "Sunway, Malaysia",
    type: "Public Speaking",
    description:
      "Represented Monash Prato campus to 200+ students of Monash University Malaysia as the main event representative.",
    icon: "ph:globe-hemisphere-east",
  },
  {
    title: "Pisa Tour Leader",
    location: "Pisa, Italy",
    type: "Tour Leadership",
    description:
      "Guided a group of 5 students across Pisa, delivering a speech on the historical significance of key sites including the Leaning Tower of Pisa.",
    icon: "ph:map-trifold",
  },
  {
    title: "Class Leader — MGX3991",
    location: "Monash Prato, Italy",
    type: "Facilitation",
    description:
      "Led a 45-minute student session, keeping the cohort engaged through interactive activities and a two-week recap.",
    icon: "ph:chalkboard-teacher",
  },
  {
    title: "MUVP × RMM Outreach",
    location: "Kuala Lumpur, Malaysia",
    type: "Outreach",
    description:
      "Conducted an educational class for orphaned children as part of a university outreach initiative.",
    icon: "ph:hands-clapping",
  },
];

export default function Leadership() {
  return (
    <section id="Leadership" className="relative py-24 overflow-hidden">
      <svg className="absolute inset-0 hidden w-full h-full pointer-events-none md:block" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M0 100 L200 100 L200 300 L400 300 L400 100 L600 100 L600 400 L800 400 L800 200 L1000 200 L1000 400 L1200 400" stroke="#FF6600" strokeWidth={1} opacity={0.25} dashed />
        <AnimatedPath d="M1200 150 L900 150 L900 450 L600 450" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M0 400 L300 400 L300 200 L500 200 L500 500 L700 500" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
        <AnimatedPath d="M0 550 L200 550 L200 350 L450 350 L450 550 L650 550 L650 300 L850 300 L850 550 L1050 550 L1050 350 L1200 350" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M300 0 L300 100 L600 100 L600 0" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
      </svg>
      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Community & Impact
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            Leading events, guiding teams, and giving back. Experiences that shaped my communication and leadership skills.
          </p>
        </FadeInView>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[#FF6600]/30 md:left-0 md:right-0 md:top-5 md:bottom-auto md:mx-auto md:h-px md:w-full" />

          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 md:gap-4">
          {leadership.map((item, i) => (
            <LeadershipCard key={item.title} item={item} index={i} />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({ item, index }: { item: typeof leadership[0]; index: number }) {
  const { ref, isActive } = useMobileScrollActive<HTMLDivElement>();

  return (
    <FadeInView delay={index * 0.12}>
      <div
        ref={ref}
        className="group relative flex gap-5 md:block"
      >
        <div
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border-2 bg-[var(--bg-primary)] transition-colors duration-300 md:mx-auto md:mb-6 group-hover:border-[#FF6600] group-hover:bg-[#FF6600] ${isActive ? "border-[#FF6600] bg-[#FF6600]" : "border-[var(--border-primary)]"}`}
          style={{ borderRadius: 4 }}
        >
          <Icon
            icon={item.icon}
            className={`text-xl transition-colors duration-300 group-hover:text-white ${isActive ? "text-white" : "text-[#FF6600]"}`}
          />
        </div>

        <div
          className={`relative flex-1 border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-5 transition-all duration-300 group-hover:border-[#FF6600] group-hover:-translate-y-1 ${isActive ? "border-[#FF6600] -translate-y-1" : ""}`}
          style={{ borderRadius: 4 }}
        >
          <div className={`absolute top-0 left-0 h-[2px] bg-[#FF6600] transition-all duration-500 group-hover:w-full ${isActive ? "w-full" : "w-10"}`} />

          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] font-[family-name:var(--font-space-mono)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#666666] font-[family-name:var(--font-space-mono)]">
              {item.type}
            </span>
          </div>

          <h4 className={`text-base font-normal text-[var(--text-heading)] mb-2 leading-snug group-hover:text-[#FF6600] transition-colors duration-200 ${isActive ? "text-[#FF6600]" : ""}`}>
            {item.title}
          </h4>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-3 block">
            {item.location}
          </span>

          <p className="text-[var(--text-body)] text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </FadeInView>
  );
}
