import React from "react";
import { Metadata } from "next";
import About from "@/app/components/Portfolio/About";
import Skills from "@/app/components/Portfolio/Skills";
import Experience from "@/app/components/Portfolio/Experience";
import Projects from "@/app/components/Portfolio/Projects";
import Education from "@/app/components/Portfolio/Education";
import Leadership from "@/app/components/Portfolio/Leadership";
import Contact from "@/app/components/Portfolio/Contact";
import GalaxyScene from "@/app/components/Galaxy/GalaxyScene";
import GalaxyEntry from "@/app/components/Galaxy/GalaxyEntry";

export const metadata: Metadata = {
  title: "Ekram — Portfolio",
  description:
    "CS graduate from Monash University specialising in Data Science, Bioinformatics, and Full-Stack Development. Co-Founder of LynkSphere.",
};

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
      {/* Fixed galaxy canvas — always behind everything */}
      <GalaxyScene />

      {/* 400vh scroll zone — transparent so galaxy shows through */}
      <div style={{ height: "500vh", position: "relative", zIndex: 1 }}>
        <GalaxyEntry />
      </div>

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
