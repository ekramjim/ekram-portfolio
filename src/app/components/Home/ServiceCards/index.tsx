"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type IconProps = { color: string };

const cards: { title: string; details: string; Icon: React.FC<IconProps> }[] = [
  {
    title: "UI Design",
    details: "We craft clean, intentional visual systems, from typography and colour palettes to component libraries and design tokens that scale across your entire product.",
    Icon: ({ color }) => (
      <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
        {[0,1,2,3].flatMap(r => [0,1,2,3].map(c => (
          <circle key={`${r}-${c}`} cx={c*10+3} cy={r*10+3} r="2.2" fill={color} />
        )))}
      </svg>
    ),
  },
  {
    title: "UX Design",
    details: "We map out how people think and move through your product, building user flows, information architecture, and wireframes grounded in real research insights.",
    Icon: ({ color }) => (
      <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
        <circle cx="3" cy="3" r="2.2" fill={color} />
        <circle cx="12" cy="8" r="2.2" fill={color} />
        <circle cx="21" cy="13" r="2.2" fill={color} />
        <circle cx="33" cy="18" r="2.2" fill={color} />
        <circle cx="21" cy="23" r="2.2" fill={color} />
        <circle cx="12" cy="28" r="2.2" fill={color} />
        <circle cx="3" cy="33" r="2.2" fill={color} />
        <circle cx="33" cy="3" r="2.2" fill={color} />
        <circle cx="33" cy="33" r="2.2" fill={color} />
      </svg>
    ),
  },
  {
    title: "Prototyping",
    details: "We turn static designs into fully interactive Figma prototypes that feel real, enabling rapid testing and iteration before a single line of code is written.",
    Icon: ({ color }) => (
      <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="2" r="2.2" fill={color} />
        <circle cx="29" cy="7" r="2.2" fill={color} />
        <circle cx="34" cy="18" r="2.2" fill={color} />
        <circle cx="29" cy="29" r="2.2" fill={color} />
        <circle cx="18" cy="34" r="2.2" fill={color} />
        <circle cx="7" cy="29" r="2.2" fill={color} />
        <circle cx="2" cy="18" r="2.2" fill={color} />
        <circle cx="7" cy="7" r="2.2" fill={color} />
        <circle cx="18" cy="18" r="2.2" fill={color} />
      </svg>
    ),
  },
  {
    title: "Testing & User Research",
    details: "We run usability sessions, user interviews, and structured research to uncover what's working and what isn't, then translate findings into clear, actionable product decisions.",
    Icon: ({ color }) => (
      <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
        <circle cx="3" cy="18" r="2.2" fill={color} />
        <circle cx="9" cy="24" r="2.2" fill={color} />
        <circle cx="15" cy="30" r="2.2" fill={color} />
        <circle cx="21" cy="24" r="2.2" fill={color} />
        <circle cx="27" cy="18" r="2.2" fill={color} />
        <circle cx="33" cy="12" r="2.2" fill={color} />
        <circle cx="33" cy="6" r="2.2" fill={color} />
      </svg>
    ),
  },
  {
    title: "Coding & Building",
    details: "We build production-ready products using React, Next.js, and modern tooling, from scalable front-ends to backend APIs and database architecture that grow with your business.",
    Icon: ({ color }) => (
      <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
        <circle cx="14" cy="6" r="2.2" fill={color} />
        <circle cx="8" cy="12" r="2.2" fill={color} />
        <circle cx="3" cy="18" r="2.2" fill={color} />
        <circle cx="8" cy="24" r="2.2" fill={color} />
        <circle cx="14" cy="30" r="2.2" fill={color} />
        <circle cx="22" cy="6" r="2.2" fill={color} />
        <circle cx="28" cy="12" r="2.2" fill={color} />
        <circle cx="33" cy="18" r="2.2" fill={color} />
        <circle cx="28" cy="24" r="2.2" fill={color} />
        <circle cx="22" cy="30" r="2.2" fill={color} />
      </svg>
    ),
  },
  {
    title: "Consulting",
    details: "We work with founders and product teams to shape strategy, audit existing systems, and define clear roadmaps — so your next move is grounded in the right thinking.",
    Icon: ({ color }) => (
      <svg width="52" height="52" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="3" r="2.2" fill={color} />
        <circle cx="27" cy="9" r="2.2" fill={color} />
        <circle cx="33" cy="18" r="2.2" fill={color} />
        <circle cx="27" cy="27" r="2.2" fill={color} />
        <circle cx="18" cy="27" r="2.2" fill={color} />
        <circle cx="9" cy="27" r="2.2" fill={color} />
        <circle cx="3" cy="18" r="2.2" fill={color} />
        <circle cx="9" cy="9" r="2.2" fill={color} />
        <circle cx="12" cy="33" r="2.2" fill={color} />
      </svg>
    ),
  },
];

export default function ServiceCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setClicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-12">
      {cards.map((card, i) => {
        const isDark = i % 2 !== 0;
        const bg = isDark ? "#2a2a2a" : "var(--bg-card)";
        const textColor = isDark ? "#ffffff" : "var(--text-heading)";
        const iconColor = isDark ? "#ffffff" : "#FF6600";
        const borderColor = isDark ? "#2a2a2a" : "var(--border-primary)";
        const isFlipped = hovered === i || clicked.has(i);
        const isHov = hovered === i;

        return (
          <motion.div
            key={card.title}
            className="cursor-pointer"
            style={{ perspective: "1000px" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            animate={{ x: isHov ? -4 : 0, y: isHov ? -4 : 0 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => toggle(i)}
          >
            <motion.div
              style={{
                height: "200px",
                transformStyle: "preserve-3d",
                position: "relative",
                width: "100%",
                borderRadius: "4px",
                boxShadow: isHov ? "6px 6px 0px #FF6600" : "none",
                transition: "box-shadow 0.2s ease",
              }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 p-5 flex flex-col justify-between"
                style={{
                  backgroundColor: bg,
                  border: `2px solid ${borderColor}`,
                  borderRadius: "4px",
                  backfaceVisibility: "hidden",
                }}
              >
                <card.Icon color={iconColor} />
                <p className="text-lg sm:text-2xl font-normal" style={{ color: textColor }}>{card.title}</p>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 p-5 flex flex-col justify-end"
                style={{
                  backgroundColor: bg,
                  border: `2px solid ${borderColor}`,
                  borderRadius: "4px",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: textColor }}>{card.details}</p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
