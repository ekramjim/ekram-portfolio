"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import TerminalFrame from "@/components/ui/TerminalFrame";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const projects = [
  {
    hash: "a3f9b2e",
    title: "LinkedHive",
    year: "2025–2026",
    branch: "HEAD → main",
    description: "Cross-platform (iOS, Android, Web) location-based community and business networking app for Australian suburbs. Real-time chat, posts, events, jobs, local deals, AI translation via Gemini 2.5 Flash, and Stripe subscription billing ($149 AUD/year). 20+ entity types with PostgreSQL via Supabase.",
    tech: ["React Native", "Expo", "Next.js 16", "TypeScript", "Supabase", "Drizzle ORM", "Stripe"],
    link: "https://www.linkedhive.com.au/",
  },
  {
    hash: "d8c1a4f",
    title: "TimeBreak",
    year: "2026",
    branch: null,
    description: "Native Pomodoro timer for iOS and macOS with analog clock interface, Live Activities, WidgetKit Focus Trail widget, EventKit Reminders integration, custom themes, and guided onboarding. Single SwiftUI codebase across iPhone, iPad, Mac, and menu bar.",
    tech: ["Swift", "SwiftUI", "WidgetKit", "ActivityKit", "AppIntents", "EventKit"],
    link: "https://apps.apple.com/au/app/timebreak-pomodoro/id6763444390",
  },
  {
    hash: "9e2c7d1",
    title: "Personal Portfolio Website (This)",
    year: "2026",
    branch: null,
    description: "50,000-particle Three.js galaxy with a scroll-driven WebGL camera flythrough along a Catmull-Rom spline — clockwise spiral arms, RAF particle formation on load. Orbit section labels rotate in sync with the galaxy via a pixel-radius circle corrected for aspect ratio. NeuralNet Three.js canvas background on Skills. Neofetch terminal card with scramble-text animation. Contact form via Nodemailer.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Three.js", "WebGL", "Nodemailer"],
    link: "https://ekram.tech",
  },
  {
    hash: "f4e8c91",
    title: "LynkSphere Website",
    year: "2026",
    branch: null,
    description: "Production marketing site with rich 3D animations showcasing services, products, and pricing. Primary customer acquisition channel contributing to $30K AUD revenue in 8 months.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
    link: "https://lynksphere.com/",
  },
  {
    hash: "b2d7a83",
    title: "AFL Game Ranking System",
    year: "2025",
    branch: null,
    description: "CatBoostRegressor models trained on historical AFL data achieving 78% match outcome accuracy. REST API connecting React frontend to ML backend, MongoDB storage, and interactive visualisations via Plotly.js.",
    tech: ["Next.js", "React", "Python", "CatBoost", "MongoDB", "Pandas", "Scikit-learn", "Plotly.js"],
    link: "https://github.com/yeanle02/FYP",
  },
  {
    hash: "c5f3e12",
    title: "Visualizing Renewable Energy",
    year: "2024",
    branch: null,
    description: "Interactive data visualisation dashboard exploring global renewable energy trends using World Bank data. 5 chart idioms (choropleth map, bar chart, stacked area, donut chart) with cross-chart linking.",
    tech: ["Vega-Lite", "Vega-Embed", "TopoJSON", "Python", "HTML/CSS"],
    link: "https://ekramjim.github.io/visualizing-renewable-energy/",
  },
  {
    hash: "e9a1b74",
    title: "F1 Pinnacle Of Motor Sports",
    year: "2024",
    branch: null,
    description: "Interactive Tableau dashboards with calculated fields, filters, and parameter controls displaying driver nationality, constructor performance trends, and season-by-season comparisons across decades of F1 data.",
    tech: ["Tableau", "Data Visualisation", "Statistical Analysis"],
    link: "https://public.tableau.com/app/profile/ekramul.islam/viz/Visualization1F1/Dashboard1",
  },
  {
    hash: "7c4d2f6",
    title: "Android Call State Monitor",
    year: "2024",
    branch: null,
    description: "Android app using BroadcastReceiver and TelephonyManager to intercept call state changes and surface incoming caller ID via Toast notifications in real time.",
    tech: ["Java", "Android SDK", "BroadcastReceiver", "TelephonyManager", "Gradle"],
    link: "https://github.com/ekramjim/MyCallReceiver",
  },
  {
    hash: "3b8f5a0",
    title: "Hearts Card Game",
    year: "2023",
    branch: null,
    description: "Terminal-based Hearts card game in Python with full game logic, trick-taking mechanics, and score tracking using OOP. Two AI opponent strategies: rule-based and heuristic.",
    tech: ["Python", "OOP", "AI Heuristics"],
    link: "https://github.com/ekramjim/Hearts-Game",
  },
];

function CommitCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <FadeInView delay={index * 0.08}>
      <TerminalFrame title={`git show ${project.hash}`}>
        <div className="px-5 py-4 font-[family-name:var(--font-space-mono)]">

          {/* commit header */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[#FF6600] text-[13px] font-bold">commit {project.hash}</span>
              {project.branch && (
                <span className="text-[10px] text-[#FF6600] border border-[#FF6600]/60 px-1.5 py-0.5" style={{ borderRadius: 2 }}>
                  {project.branch}
                </span>
              )}
            </div>
            <div className="text-[11px] space-y-0.5">
              <div><span className="text-[#FF6600] opacity-60">Author: </span><span className="text-[#aaa]">ekram</span></div>
              <div><span className="text-[#FF6600] opacity-60">Date:   </span><span className="text-[#aaa]">{project.year}</span></div>
            </div>
          </div>

          <div className="h-[1px] bg-[#1e1e1e] mb-3" />

          {/* title */}
          <p className="text-[#f0f0f0] text-[14px] font-bold mb-2">{project.title}</p>

          {/* description */}
          <p className="text-[#888] text-[12px] leading-relaxed mb-3">{project.description}</p>

          {/* tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 border border-[#2e2e2e] text-[#aaa] bg-[#111]" style={{ borderRadius: 2 }}>
                {t}
              </span>
            ))}
          </div>

          {/* link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6600] text-[11px] hover:underline underline-offset-4 flex items-center gap-1 w-fit"
          >
            <span>↗</span>
            <span>open project</span>
          </a>

        </div>
      </TerminalFrame>
    </FadeInView>
  );
}

export default function Projects() {
  return (
    <section id="Projects" className="relative py-24 overflow-hidden">
      <svg className="absolute inset-0 hidden w-full h-full pointer-events-none md:block" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <AnimatedPath d="M0 200 L100 200 L100 100 L300 100 L300 300 L500 300 L500 150 L700 150" stroke="#FF6600" strokeWidth={1} opacity={0.25} dashed />
        <AnimatedPath d="M1200 700 L1100 700 L1100 500 L950 500" stroke="#FF6600" strokeWidth={1} opacity={0.22} dashed />
        <AnimatedPath d="M0 500 L200 500 L200 700 L400 700 L400 500 L600 500 L600 800 L800 800" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M1200 300 L1000 300 L1000 150 L800 150 L800 400 L600 400" stroke="#FF6600" strokeWidth={1} opacity={0.18} dashed />
        <AnimatedPath d="M400 0 L400 100 L700 100 L700 0" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M500 900 L500 750 L900 750 L900 900" stroke="#FF6600" strokeWidth={1} opacity={0.12} dashed />
        <AnimatedPath d="M0 750 L150 750 L150 600 L300 600" stroke="#FF6600" strokeWidth={1} opacity={0.15} dashed />
      </svg>
      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <SectionLabel>Projects</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Things I&apos;ve Built
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            From deep learning models to mobile apps. Projects spanning data science, full-stack, and mobile engineering.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <CommitCard key={project.hash} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
