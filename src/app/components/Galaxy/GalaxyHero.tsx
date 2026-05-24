"use client";
import { useEffect, useRef, useState } from "react";

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

const DRAMATIC_TEXT = "Hi, I'm Ekram.";

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
        fontSize: "clamp(32px, 7vw, 100px)",
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: "#ffffff",
        lineHeight: 1.15,
        textShadow: "0 0 100px rgba(255,102,0,0.25)",
        textAlign: "center",
        maxWidth: "90vw",
        wordBreak: "break-word",
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
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function useScrollPct(heroVH = 5) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const stableH = window.innerHeight;
    const handler = () => {
      setP(Math.max(0, Math.min(window.scrollY / (stableH * heroVH), 1)));
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [heroVH]);
  return p;
}

export default function GalaxyHero({ visible }: { visible: boolean }) {
  const p       = useScrollPct();
  const mobile  = useIsMobile();

  const titleOp  = 1 - ss(0.12, 0.22, p);
  const labelsOp = ss(0.10, 0.22, p) * (1 - ss(0.36, 0.46, p));

  // orbit label rotation — pixel-based circle + RAF spin matching galaxy
  const rotRef       = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const pRef         = useRef(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const update = () => setRadius(Math.min(window.innerWidth, window.innerHeight) * 0.30);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const stableH = window.innerHeight;
    const onScroll = () => {
      pRef.current = Math.max(0, Math.min(window.scrollY / (stableH * 5), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobile) return;
    let rafId: number;
    function tick() {
      rafId = requestAnimationFrame(tick);
      const cp       = pRef.current;
      const phase2t  = Math.max(0, ss(0.08, 0.22, cp) - ss(0.22, 0.38, cp));
      const phase3t  = ss(0.50, 0.85, cp);
      const speedDeg = lerp(0.0014, 0.0058, Math.max(phase2t, phase3t)) * (180 / Math.PI);
      rotRef.current += speedDeg;
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
          padding: mobile ? "0 20px" : "0 24px",
          background: "radial-gradient(ellipse 65% 52% at 50% 50%, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.28) 58%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-space-mono),'Space Mono',monospace",
            fontSize: mobile ? 10 : 13,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#FF6600",
            marginBottom: mobile ? 20 : 28,
            fontWeight: 700,
          }}
        >
          Portfolio — 2026
        </p>

        <DramaticText visible={visible} />

        <div
          style={{
            fontFamily: "var(--font-space-mono),'Space Mono',monospace",
            fontSize: mobile ? 9 : "clamp(11px, 1.6vw, 15px)",
            letterSpacing: mobile ? "0.12em" : "0.28em",
            color: "#FF6600",
            marginTop: mobile ? 16 : 22,
            lineHeight: mobile ? 1.9 : 2.2,
            textAlign: "center",
          }}
        >
          {mobile ? (
            <>CO-FOUNDER · BIOINFORMATICIAN<br />· COMPUTER SCIENTIST</>
          ) : (
            "CO-FOUNDER · BIOINFORMATICIAN · COMPUTER SCIENTIST"
          )}
        </div>

        {/* scroll cue */}
        <div
          style={mobile ? {
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          } : {
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-mono),'Space Mono',monospace",
              fontSize: 9,
              letterSpacing: "0.35em",
              color: "#aaa",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          {/* bouncing chevrons */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {[0, 1, 2].map((i) => (
              <svg
                key={i}
                width="18" height="10" viewBox="0 0 18 10" fill="none"
                style={{
                  animation: `scrollBounce 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.18}s`,
                  opacity: 1 - i * 0.25,
                }}
              >
                <polyline points="1,1 9,9 17,1" stroke="#FF6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        </div>
      </div>

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
