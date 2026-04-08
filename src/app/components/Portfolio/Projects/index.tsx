"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const projects = [
  {
    title: "AFL Game Ranking System",
    year: "2025",
    description:
      "Predicts how each AFL team will perform for upcoming matches using historical data and Deep Learning. Achieved 78% model accuracy.",
    tech: ["JavaScript", "Python", "ReactJS", "Tailwind", "Deep Learning"],
    link: "#",
    featured: true,
  },
  {
    title: "LynkSphere Company Website",
    year: "2025",
    description:
      "Built the official LynkSphere website showcasing completed projects and clients served across Australia.",
    tech: ["ReactJS", "Framer", "Tailwind"],
    link: "#",
    featured: false,
  },
  {
    title: "F1 Pinnacle Of Motor Sports",
    year: "2024",
    description:
      "Interactive Tableau visualisation displaying driver nationality, team performance over the years, and driver career stats.",
    tech: ["Tableau", "Data Viz"],
    link: "#",
    featured: false,
  },
  {
    title: "Android Call State Monitor",
    year: "2024",
    description:
      "Monitors phone call state changes using a broadcast receiver to detect incoming calls and display caller information via Toast messages.",
    tech: ["Java", "Android", "BroadcastReceiver"],
    link: "https://github.com",
    featured: false,
  },
  {
    title: "Fast Food Chain Optimizer",
    year: "2023",
    description:
      "Algorithmic solutions for optimising restaurant chain revenue and finding shortest paths in a tower quest using efficient data structures.",
    tech: ["Python", "Algorithms", "Dynamic Programming"],
    link: "https://github.com",
    featured: false,
  },
  {
    title: "Hearts Card Game",
    year: "2023",
    description:
      "A Twenty-One dice game where players take turns rolling and tallying results. Includes bust detection and scoring logic.",
    tech: ["Python", "OOP", "Game Logic"],
    link: "https://github.com",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <FadeInView delay={index * 0.1}>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block border-2 bg-[var(--bg-card)] p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[4px_4px_0px_#FF6600] hover:-translate-y-1 cursor-pointer ${
          project.featured
            ? "border-[#FF6600] col-span-1 md:col-span-2"
            : "border-[var(--border-primary)] hover:border-[#FF6600]"
        }`}
        style={{ borderRadius: 4 }}
      >
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] font-[family-name:var(--font-space-mono)] bg-[#FF6600] text-white px-2 py-1" style={{ borderRadius: 2 }}>
              Featured
            </span>
          </div>
        )}

        {/* Top bar */}
        <div className="h-[2px] w-0 bg-[#FF6600] group-hover:w-full transition-all duration-500 mb-5" />

        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-normal text-[var(--text-heading)] leading-snug group-hover:text-[#FF6600] transition-colors duration-200">
            {project.title}
          </h3>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="flex-shrink-0 mt-0.5 text-[#888888] group-hover:text-[#FF6600] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
          >
            <path d="M3 15L15 3M15 3H7M15 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className="text-[10px] font-[family-name:var(--font-space-mono)] text-[#888888] uppercase tracking-widest mb-3 block">
          {project.year}
        </span>

        <p className="text-[var(--text-body)] text-sm leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-[family-name:var(--font-space-mono)] px-2 py-1 border border-[var(--border-primary)] text-[#888888] bg-[var(--bg-secondary)]"
              style={{ borderRadius: 2 }}
            >
              {t}
            </span>
          ))}
        </div>
      </a>
    </FadeInView>
  );
}

export default function Projects() {
  return (
    <section id="Projects" className="relative py-24 overflow-hidden">
      {/* Decorative SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath
          d="M0 200 L100 200 L100 100 L300 100 L300 300 L500 300 L500 150 L700 150"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.07}
          delay={200}
          duration={3000}
        />
        <AnimatedPath
          d="M1200 700 L1100 700 L1100 500 L950 500"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.06}
          delay={600}
          duration={2000}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-4 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#FF6600]" />
            Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Things I&apos;ve Built
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            From deep learning models to mobile apps — projects spanning data science, full-stack, and mobile engineering.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
