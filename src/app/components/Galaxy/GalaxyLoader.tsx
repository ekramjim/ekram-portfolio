"use client";
import { useEffect, useState } from "react";

export default function GalaxyLoader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [bursting, setBursting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + Math.random() * 3.5 + 1.2, 100);
      setPct(Math.floor(p));
      if (p >= 100) {
        clearInterval(interval);
        // fire particle burst immediately — circle animation and galaxy burst are simultaneous
        window.dispatchEvent(new CustomEvent("galaxyReady"));
        setBursting(true);
        setTimeout(() => {
          setGone(true);
          onComplete();
        }, 550);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (gone) return null;

  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bursting ? 0 : 1,
        transition: bursting ? "opacity 0.45s ease-in" : "none",
        pointerEvents: "none",
      }}
    >
      {/* SVG ring — scales up and vanishes on burst */}
      <div
        style={{
          position: "relative",
          width: 128,
          height: 128,
          transform: bursting ? "scale(18)" : "scale(1)",
          opacity: bursting ? 0 : 1,
          transition: bursting
            ? "transform 0.5s ease-in, opacity 0.3s ease-in"
            : "none",
          transformOrigin: "center",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r={RADIUS} stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            stroke="#FF6600"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
            style={{ transition: "stroke-dashoffset 0.028s linear" }}
          />
          <circle cx="64" cy="64" r={RADIUS - 8} stroke="rgba(255,102,0,0.06)" strokeWidth="1" fill="none" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
            fontSize: 14,
            letterSpacing: "0.1em",
            color: "#FF6600",
          }}
        >
          {pct}
        </div>
      </div>

      {/* label */}
      <p
        style={{
          marginTop: 28,
          fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#333",
          opacity: bursting ? 0 : 1,
          transition: bursting ? "opacity 0.2s ease-in" : "none",
        }}
      >
        Initializing
      </p>

      {/* corner brackets */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            borderTop: i < 2 ? "1px solid #1e1e1e" : "none",
            borderBottom: i >= 2 ? "1px solid #1e1e1e" : "none",
            borderLeft: i % 2 === 0 ? "1px solid #1e1e1e" : "none",
            borderRight: i % 2 === 1 ? "1px solid #1e1e1e" : "none",
            ...pos,
          }}
        />
      ))}
    </div>
  );
}
