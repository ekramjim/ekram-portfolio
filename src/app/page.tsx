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
import ScrollingSVG from "@/app/components/Portfolio/ScrollingSVG";

export const metadata: Metadata = {
  title: "Ekramul Islam — Portfolio",
  description:
    "Co-Founder & CEO of LynkSphere. Computer Science graduate from Monash University specialising in Data Science, Bioinformatics, and Full-Stack Development.",
};

function SectionDivider() {
  return (
    <div className="relative flex items-center gap-0 overflow-hidden">
      <div className="flex-1 h-[1px] bg-[var(--border-primary)]" />
      <div className="w-2.5 h-2.5 bg-[#FF6600] rotate-45 -mx-1.5 flex-shrink-0" />
      <div className="flex-1 h-[1px] bg-[var(--border-primary)]" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Persistent swirling SVG overlay — always visible, flows on scroll */}
      <ScrollingSVG />

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
