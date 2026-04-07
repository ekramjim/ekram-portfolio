import React from "react";
import { Metadata } from "next";
import Hero from "@/app/components/Portfolio/Hero";
import About from "@/app/components/Portfolio/About";
import Skills from "@/app/components/Portfolio/Skills";
import Experience from "@/app/components/Portfolio/Experience";
import Projects from "@/app/components/Portfolio/Projects";
import Education from "@/app/components/Portfolio/Education";
import Leadership from "@/app/components/Portfolio/Leadership";
import Contact from "@/app/components/Portfolio/Contact";

export const metadata: Metadata = {
  title: "Ekramul Islam — Portfolio",
  description:
    "Co-Founder & CEO of LynkSphere. Computer Science graduate from Monash University specialising in Data Science, Full-Stack Development, and Machine Learning.",
};

function SectionDivider({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative flex items-center gap-0 overflow-hidden">
      <div className="flex-1 h-[1px] bg-[var(--border-primary)]" />
      <div
        className="w-2.5 h-2.5 bg-[#FF6600] rotate-45 -mx-1.5 flex-shrink-0"
        style={{ animationDelay: `${delay}ms` }}
      />
      <div className="flex-1 h-[1px] bg-[var(--border-primary)]" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen">
      {/* Subtle crosshatch background */}
      <div className="fixed inset-0 w-full h-full z-0 brutal-crosshatch pointer-events-none" />

      <div className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Leadership />
        <SectionDivider />
        <Contact />
      </div>
    </main>
  );
}
