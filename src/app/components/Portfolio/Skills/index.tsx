"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const skillGroups = [
  {
    label: "Languages",
    color: "#FF6600",
    skills: ["Python", "R", "JavaScript", "TypeScript", "Java", "Swift", "Kotlin", "C", "SQL", "Bash", "HTML/CSS"],
  },
  {
    label: "Frameworks & Platforms",
    color: "#0a0a0a",
    skills: ["ReactJS", "NextJS", "NodeJS", "Flutter", "Android", "iOS", "MongoDB", "Firebase", "AWS", "Google Cloud"],
  },
  {
    label: "AI / Data Science / Bioinformatics",
    color: "#FF6600",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "Pandas", "NLP", "Bioinformatics", "Tableau", "RStudio", "Jupyter", "Deep Learning", "Computational Biology"],
  },
  {
    label: "Tools & Other",
    color: "#0a0a0a",
    skills: ["Git", "GitHub", "Docker", "VS Code", "Xcode", "Gemini API", "ChatGPT API", "Cloud Architecture", "Project Management", "Agile"],
  },
  {
    label: "Certifications",
    color: "#FF6600",
    skills: ["Complete Python Developer 2023", "Assessment Of Skill Java", "Monash High Achiever Award", "HackerRank Python Certificate", "Monash Coding League"],
  },
];

export default function Skills() {
  return (
    <section id="Skills" className="glass relative py-24 overflow-hidden">
      {/* Decorative SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <AnimatedPath
          d="M0 300 L200 300 L200 100 L500 100 L500 500 L800 500 L800 200 L1200 200"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.07}
          delay={200}
          duration={3000}
        />
        <AnimatedPath
          d="M0 450 L150 450 L150 350 L400 350"
          stroke="#FF6600"
          strokeWidth={1}
          opacity={0.05}
          delay={500}
          duration={2000}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <FadeInView>
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-4 flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#FF6600]" />
            Core Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-4 leading-tight">
            Technical Expertise
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-xl mb-16 leading-relaxed">
            Spanning full-stack development, mobile engineering, and machine learning — built through academics, startups, and real client work.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <FadeInView key={group.label} delay={gi * 0.12}>
              <div className="border-2 border-[var(--border-primary)] bg-[var(--bg-card)] p-6 relative overflow-hidden hover:border-[#FF6600] transition-colors duration-300 group">
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
                  style={{ background: group.color === "#FF6600" ? "#FF6600" : "transparent" }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "#FF6600" }}
                />

                <p className="text-[10px] font-bold tracking-[0.4em] uppercase font-[family-name:var(--font-space-mono)] mb-5 flex items-center gap-2"
                  style={{ color: group.color === "#FF6600" ? "#FF6600" : "#888888" }}>
                  <span className="w-3 h-[2px]" style={{ background: group.color }} />
                  {group.label}
                </p>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-[family-name:var(--font-space-mono)] px-3 py-1.5 border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-body)] hover:border-[#FF6600] hover:text-[#FF6600] transition-colors duration-200 cursor-default"
                      style={{ borderRadius: 2 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
