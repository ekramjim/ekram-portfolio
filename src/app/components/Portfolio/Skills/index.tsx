"use client";
import dynamic from "next/dynamic";
import FadeInView from "@/app/components/Common/FadeInView";
import SectionLabel from "@/components/ui/SectionLabel";

const ForceGraph = dynamic(() => import("./ForceGraph"), { ssr: false });

export default function Skills() {
  return (
    <section id="Skills" className="relative h-[250vh] md:h-[350vh]">
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }} className="relative">

        {/* header overlaid so graph fills full viewport */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 55%, transparent)" }}>
          <div className="container mx-auto max-w-7xl px-6 pt-20 md:pt-24 pb-4">
            <FadeInView>
              <SectionLabel>Core Skills</SectionLabel>
              <p className="text-[var(--text-body)] max-w-xl leading-relaxed font-[family-name:var(--font-space-mono)] text-[13px]">
                Picked up across two degrees, too many side projects, and a genuine inability to stop learning new things.
              </p>
            </FadeInView>
          </div>
        </div>

        {/* graph fills full sticky viewport */}
        <div className="absolute inset-0 z-10">
          <ForceGraph />
        </div>
      </div>
    </section>
  );
}
