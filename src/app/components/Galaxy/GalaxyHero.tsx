"use client";
import { useEffect, useRef, useState } from "react";
import { GALAXY_REPLAY_EVENT } from "./galaxyIntro";
import styles from "./GalaxyHero.module.css";

const ORBIT_LABEL_NAMES = ["ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "EDUCATION", "CONTACT"];

const FLYTHROUGH = [
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


function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function useScrollPct(heroVH = 5) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const stableH = window.innerHeight;
    const handler = () => {
      setP(Math.max(0, Math.min(window.scrollY / (stableH * heroVH), 1)));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [heroVH]);
  return p;
}

export default function GalaxyHero({ visible, settled }: { visible: boolean; settled: boolean }) {
  const p       = useScrollPct();
  const mobile  = useIsMobile();

  const titleOp  = 1 - ss(0.12, 0.22, p);
  const labelsOp = ss(0.10, 0.22, p) * (1 - ss(0.36, 0.46, p));

  // orbit label rotation — pixel-based circle + RAF spin matching galaxy
  const rotRef       = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const update = () => setRadius(Math.min(window.innerWidth, window.innerHeight) * 0.40);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (mobile) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId: number;
    let lastT: number | null = null;
    function tick(now: number) {
      rafId = requestAnimationFrame(tick);
      const dt = lastT === null ? 0 : Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      // Match the galaxy's slow ambient rotation, radians/second.
      const speedRad = reducedMotion.matches ? 0 : 0.018;
      rotRef.current += speedRad * dt * (180 / Math.PI);
      const rot = rotRef.current;
      if (containerRef.current) {
        containerRef.current.style.transform = `rotate(${rot}deg)`;
      }
      labelRefs.current.forEach((el) => {
        if (el) el.style.transform = `translate(-50%, -50%) rotate(${-rot}deg)`;
      });
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mobile]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        zIndex: 1,

        pointerEvents: "none",
      }}
    >
      <button
        type="button"
        data-galaxy-interaction
        aria-label="Rotate galaxy with drag or arrow keys. Press Home to reset."
        className="absolute inset-0 h-full w-full border-0 bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/60"
        style={{ pointerEvents: "auto", touchAction: "pan-y", cursor: "grab" }}
      />
      <div className={styles.introduction} style={{ opacity: titleOp }}>
        <h1 className={styles.title} aria-label="Hi, I'm Ekram.">
          {["Hi, I'm", "Ekram."].map((word, side) => (
            <span key={word} className={styles.titleSide} aria-hidden="true" data-visible={visible}>
              {Array.from(word).map((letter, index) => (
                <span key={index} className={styles.letter} style={{ transitionDelay: visible ? `${index * 65 + side * 100}ms` : "0ms" }}>
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <div className={styles.caption} data-visible={settled}>
          <p>Co-founder · Bioinformatician · Computer scientist</p>
          <span>Scroll to explore</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.replay}
        aria-label="Replay galaxy introduction"
        onClick={() => window.dispatchEvent(new Event(GALAXY_REPLAY_EVENT))}
        style={{ opacity: titleOp, pointerEvents: titleOp > 0.5 ? "auto" : "none" }}
        tabIndex={titleOp > 0.5 ? 0 : -1}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Phase 2: Orbit labels — centered pixel circle, RAF-rotated ── */}
      {!mobile && radius > 0 && (
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            opacity: labelsOp,
          }}
        >
          {ORBIT_LABEL_NAMES.map((label, i) => {
            const angle = (i / ORBIT_LABEL_NAMES.length) * Math.PI * 2 - Math.PI / 2;
            const px    = Math.cos(angle) * radius;
            const py    = Math.sin(angle) * radius;
            return (
              <div
                key={label}
                ref={(el) => { labelRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: px,
                  top: py,
                  transform: "translate(-50%, -50%)",
                  fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                  fontSize: 13,
                  letterSpacing: "0.28em",
                  color: "#FF6600",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ opacity: 0.45, fontSize: 9 }}>◆</span>
                {label}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Phase 3: Flythrough content overlays ────────────── */}
      {FLYTHROUGH.map((step) => {
        const opacity    = ss(step.p0, step.p0 + 0.03, p) * (1 - ss(step.p1, step.p1 + 0.03, p));
        const translateY = (1 - ss(step.p0, step.p0 + 0.06, p)) * 22;
        return (
          <div
            key={step.tag}
            style={{
              position: "absolute",
              left: mobile ? "50%" : "clamp(24px, 8vw, 100px)",
              bottom: mobile ? "clamp(60px, 12vh, 120px)" : undefined,
              top: mobile ? undefined : "50%",
              transform: mobile
                ? `translateX(-50%) translateY(${translateY}px)`
                : `translateY(calc(-50% + ${translateY}px))`,
              width: mobile ? "calc(100% - 40px)" : undefined,
              maxWidth: mobile ? "none" : 500,
              opacity,
              textAlign: mobile ? "center" : "left",
              padding: mobile ? "0 4px" : 0,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.32em",
                color: "#FF6600",
                textTransform: "uppercase",
                margin: "0 0 10px 0",
              }}
            >
              {step.tag}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: mobile ? "clamp(16px, 4.5vw, 28px)" : "clamp(18px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.04em",
                margin: "0 0 14px 0",
                lineHeight: 1.2,
              }}
            >
              {step.heading}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: mobile ? 11 : 12,
                color: "rgba(255,255,255,0.38)",
                lineHeight: mobile ? 1.9 : 2.1,
                margin: 0,
              }}
            >
              {step.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
