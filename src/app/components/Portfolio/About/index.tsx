"use client";
import FadeInView from "@/app/components/Common/FadeInView";
import { AnimatedPath } from "@/app/components/Portfolio/AnimatedSVGConnector";

const highlights = [
  { value: "$30K", label: "Revenue Generated", sub: "in 8 months at LynkSphere" },
  { value: "8+", label: "Clients Served", sub: "across Australia" },
  { value: "78%", label: "ML Accuracy", sub: "AFL game prediction model" },
  { value: "200+", label: "Students Led", sub: "as Go-Global Representative" },
];

export default function About() {
  return (
    <section id="About" className="glass-alt relative py-24 overflow-hidden">
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
        {/* Diagonal accent */}
        <AnimatedPath
          d="M800 0 L1000 300 L1200 100"
          stroke="#FF6600"
          strokeWidth={0.8}
          opacity={0.04}
          delay={600}
          duration={2000}
        />
      </svg>

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <FadeInView>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] mb-4 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[#FF6600]" />
                About Me
              </p>
              <h2 className="text-4xl md:text-5xl font-normal text-[var(--text-heading)] mb-6 leading-tight">
                Software engineering,
                <br />
                data science &amp; computational biology
              </h2>
            </FadeInView>

            <FadeInView delay={0.1}>
              <p className="text-[var(--text-body)] text-lg leading-relaxed mb-6">
                I&apos;m Ekramul — Co-Founder and CEO of{" "}
                <span className="text-[#FF6600] font-medium">LynkSphere</span>, a software company
                that embeds directly into client teams to design, build, and ship iOS, Android, and
                web applications. We plug in as a senior technical partner across mobile, web, AI/ML
                integration, and data solutions.
              </p>
              <p className="text-[var(--text-body)] text-lg leading-relaxed mb-6">
                Alongside running LynkSphere, I&apos;m completing a Master of Data Science at Monash
                University — with work spanning machine learning, NLP, data visualisation, and
                bioinformatics. I hold a Bachelor of Computer Science (Data Science) from Monash,
                graduating on a High Achievers Scholarship.
              </p>
              <p className="text-[var(--text-body)] text-lg leading-relaxed">
                My work sits at the intersection of software engineering, data science, and
                computational biology. Experienced in Python, R, Java, and cloud architecture —
                applied across client projects and academic research. Currently open to{" "}
                <span className="text-[#FF6600]">Data Scientist</span>,{" "}
                <span className="text-[#FF6600]">Python Developer</span>, and{" "}
                <span className="text-[#FF6600]">Bioinformatics</span> roles.
              </p>
            </FadeInView>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <FadeInView key={h.value} delay={i * 0.12}>
                <div
                  className={`border-2 p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${
                    i === 0 ? "border-[#FF6600] bg-[#FF6600]" : "border-[var(--border-primary)] bg-[var(--bg-card)] hover:border-[#FF6600]"
                  }`}
                  style={{ borderRadius: 4 }}
                >
                  {i !== 0 && <div className="absolute top-0 left-0 right-0 h-[2px] w-0 bg-[#FF6600] group-hover:w-full transition-all duration-500" />}
                  <span className={`block text-4xl font-normal leading-none mb-2 ${i === 0 ? "text-white" : "text-[var(--text-heading)]"}`}>
                    {h.value}
                  </span>
                  <p className={`text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-space-mono)] mb-1 ${i === 0 ? "text-white/80" : "text-[#FF6600]"}`}>
                    {h.label}
                  </p>
                  <p className={`text-xs ${i === 0 ? "text-white/60" : "text-[#888888]"}`}>{h.sub}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
