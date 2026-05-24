"use client";
import { useEffect, useRef, useState } from "react";

const ORBIT_LABELS = [
  { label: "ABOUT",      angleDeg: -28,  r: 0.34 },
  { label: "SKILLS",     angleDeg:  52,  r: 0.32 },
  { label: "PROJECTS",   angleDeg: 142,  r: 0.36 },
  { label: "EXPERIENCE", angleDeg: -118, r: 0.34 },
  { label: "EDUCATION",  angleDeg: 200,  r: 0.30 },
  { label: "CONTACT",    angleDeg: -72,  r: 0.28 },
];

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

const DRAMATIC_TEXT = "Hi, I'm Ekram.";

function DramaticText({ visible }: { visible: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const idxRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const delay = setTimeout(() => {
      const iv = setInterval(() => {
        idxRef.current += 1;
        setDisplayed(DRAMATIC_TEXT.slice(0, idxRef.current));
        if (idxRef.current >= DRAMATIC_TEXT.length) clearInterval(iv);
      }, 68);
      return () => clearInterval(iv);
    }, 400);
    return () => clearTimeout(delay);
  }, [visible]);

  useEffect(() => {
    const iv = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        fontFamily: "var(--font-space-mono),'Space Mono',monospace",
        fontSize: "clamp(40px, 8vw, 100px)",
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: "#ffffff",
        lineHeight: 1.1,
        textShadow: "0 0 100px rgba(255,102,0,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0, color: "#FF6600" }}>|</span>
    </div>
  );
}

function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function useScrollPct(heroVH = 5) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const handler = () => {
      setP(Math.min(window.scrollY / (window.innerHeight * heroVH), 1));
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [heroVH]);
  return p;
}

export default function GalaxyHero({ visible }: { visible: boolean }) {
  const p = useScrollPct();

  const titleOp  = 1 - ss(0.12, 0.22, p);
  const labelsOp = ss(0.10, 0.22, p) * (1 - ss(0.36, 0.46, p));

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease",
        pointerEvents: "none",
      }}
    >
      {/* ── Phase 1: Typewriter intro ───────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: titleOp,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-space-mono),'Space Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#FF6600",
            marginBottom: 28,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          Portfolio — 2026
        </p>

        <DramaticText visible={visible} />

        <div
          style={{
            fontFamily: "var(--font-space-mono),'Space Mono',monospace",
            fontSize: "clamp(11px, 1.6vw, 15px)",
            letterSpacing: "0.28em",
            color: "#FF6600",
            marginTop: 22,
            lineHeight: 2.2,
          }}
        >
          CO-FOUNDER · BIOINFORMATICIAN · COMPUTER SCIENTIST
        </div>

        {/* scroll cue */}
        <div
          style={{
            marginTop: 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-mono),'Space Mono',monospace",
              fontSize: 8,
              letterSpacing: "0.4em",
              color: "#2a2a2a",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, #2a2a2a, transparent)",
            }}
          />
        </div>
      </div>

      {/* ── Phase 2: Orbit labels ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: labelsOp,
        }}
      >
        {ORBIT_LABELS.map(({ label, angleDeg, r }) => {
          const rad = (angleDeg * Math.PI) / 180;
          const cx = 50 + Math.cos(rad) * r * 100;
          const cy = 50 + Math.sin(rad) * r * 100;
          return (
            <div
              key={label}
              style={{
                position: "absolute",
                left: `${cx}%`,
                top: `${cy}%`,
                transform: "translate(-50%, -50%)",
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.28em",
                color: "#FF6600",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ opacity: 0.45, fontSize: 6 }}>◆</span>
              {label}
            </div>
          );
        })}
      </div>

      {/* ── Phase 3: Flythrough content overlays ────────────── */}
      {FLYTHROUGH.map((step) => {
        const opacity = ss(step.p0, step.p0 + 0.03, p) * (1 - ss(step.p1, step.p1 + 0.03, p));
        const translateY = (1 - ss(step.p0, step.p0 + 0.06, p)) * 22;
        return (
          <div
            key={step.tag}
            style={{
              position: "absolute",
              left: "clamp(24px, 8vw, 100px)",
              top: "50%",
              transform: `translateY(calc(-50% + ${translateY}px))`,
              maxWidth: 500,
              opacity,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.32em",
                color: "#FF6600",
                textTransform: "uppercase",
                margin: "0 0 14px 0",
              }}
            >
              {step.tag}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: "clamp(18px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "0.04em",
                margin: "0 0 18px 0",
                lineHeight: 1.15,
              }}
            >
              {step.heading}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-space-mono),'Space Mono',monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.38)",
                lineHeight: 2.1,
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
