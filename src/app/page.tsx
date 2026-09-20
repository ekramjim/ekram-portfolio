import React from "react";
import { Metadata } from "next";
import About from "@/app/components/Portfolio/About";
import Skills from "@/app/components/Portfolio/Skills";
import Experience from "@/app/components/Portfolio/Experience";
import Projects from "@/app/components/Portfolio/Projects";
import Education from "@/app/components/Portfolio/Education";
import Leadership from "@/app/components/Portfolio/Leadership";
import Contact from "@/app/components/Portfolio/Contact";
import { Galaxy, type GalaxyStep } from "@/app/components/Galaxy";

export const metadata: Metadata = {
  title: "Ekram — Portfolio",
  description:
    "CS graduate from Monash University specialising in Data Science, Bioinformatics, and Full-Stack Development. Co-Founder of LynkSphere.",
};

const ORBIT_LABELS = ["ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "EDUCATION", "CONTACT"];

const GALAXY_STEPS: GalaxyStep[] = [
  {
    p0: 0.55, p1: 0.63,
    tag: "ABOUT",
    heading: "CS Graduate · Co-Founder",
    body: "Co-Founder of LynkSphere · MSc Data Science at Monash University · Melbourne, Australia.",
  },
  {
    p0: 0.64, p1: 0.71,
    tag: "SKILLS",
    heading: "Full-Stack · Data · Bioinformatics",
    body: "Python, TypeScript, Swift, R · Next.js, SwiftUI, React Native · RNA-seq, PyTorch, Scikit-learn · PostgreSQL, AWS.",
  },
  {
    p0: 0.72, p1: 0.79,
    tag: "PROJECTS",
    heading: "9 Project Highlights",
    body: "LinkedHive · TimeBreak · AFL Ranking System · LynkSphere Website · F1 Dashboards · and more across mobile, web, and data science.",
  },
];

function SectionDivider() {
  return (
    <div className="relative flex items-center gap-0">
      <div className="flex-1 h-[1px] bg-[var(--border-primary)]" />
      <div className="w-2.5 h-2.5 bg-[#FF6600] rotate-45 -mx-1.5 flex-shrink-0" />
      <div className="flex-1 h-[1px] bg-[var(--border-primary)]" />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Galaxy
        title={["Hi, I'm", "Ekram."]}
        caption="Co-founder · Bioinformatician · Computer scientist"
        hint="Scroll to explore"
        orbitLabels={ORBIT_LABELS}
        steps={GALAXY_STEPS}
        scrollScreens={5}
      />

      {/* Content sections — solid background covers galaxy */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          backgroundColor: "var(--bg-primary)",
        }}
      >
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Leadership />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </div>
    </main>
  );
}
