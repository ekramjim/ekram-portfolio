"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import FadeInView from "@/app/components/Common/FadeInView";
import { motion } from "framer-motion";
import { useState } from "react";

const members = [
  {
    name: "Ekram Islam",
    role: "Co-Founder & CEO",
    edu: "Monash Data Science Grad",
    photo: "/images/wework/ekram.jpg",
    linkedin: "https://www.linkedin.com/in/ekram02",
  },
  {
    name: "Zabir Raihan",
    role: "Co-Founder & CTO",
    edu: "Monash Computer Science Grad",
    photo: "/images/wework/zabir.jpg",
    linkedin: null,
  },
  {
    name: "Md Abidur Rashid",
    role: "Lead Designer",
    edu: "Monash Software Eng Grad",
    photo: "/images/wework/abidur.jpg",
    linkedin: null,
  },
  {
    name: "Chin Wei Han",
    role: "Lead ML & Software Engineer",
    edu: "Monash Computer Science Grad",
    photo: "/images/wework/weihan.jpg",
    linkedin: null,
  },
];

const Team = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <FadeInView>
          <p className="text-sm font-bold mb-4 tracking-[0.3em] uppercase text-[#FF6600] font-[family-name:var(--font-space-mono)] flex items-center gap-3">
            <span className="w-8 h-[2px] bg-brand" />
            Team
          </p>
          <h2 className="text-[var(--text-heading)] max-w-2xl mb-16">
            Small team. No filler. Every person ships.
          </h2>
        </FadeInView>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {members.map((member, i) => (
            <FadeInView key={member.name} delay={i * 0.1}>
              <motion.div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  x: hovered === i ? -4 : 0,
                  y: hovered === i ? -4 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[var(--bg-secondary)] overflow-hidden flex flex-col border-2 border-[var(--border-primary)]"
                style={{
                  borderRadius: "4px",
                  boxShadow: hovered === i ? "6px 6px 0px #FF6600" : "none",
                  borderColor: hovered === i ? "#FF6600" : "var(--border-primary)",
                  transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-3 sm:p-5 flex flex-col gap-0.5 sm:gap-1 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-[#FF6600] text-sm sm:text-base font-medium leading-snug">{member.name}</p>
                    {member.linkedin && (
                      <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="shrink-0 mt-0.5">
                        <Icon icon="ph:linkedin-logo" className="text-base sm:text-lg text-[#FF6600] hover:opacity-70 transition-opacity duration-150" />
                      </Link>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] font-normal">{member.role}</p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-faint)] font-normal mt-0.5 uppercase tracking-widest font-[family-name:var(--font-space-mono)]">{member.edu}</p>
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
