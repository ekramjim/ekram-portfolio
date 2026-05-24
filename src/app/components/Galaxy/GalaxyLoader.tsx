"use client";
import { useEffect, useState } from "react";

export default function GalaxyLoader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct]     = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone]   = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + Math.random() * 3.5 + 1.2, 100);
      setPct(Math.floor(p));
      window.dispatchEvent(new CustomEvent("galaxyProgress", { detail: { pct: Math.floor(p) } }));
      if (p >= 100) {
        clearInterval(interval);
        setFading(true);
        setTimeout(() => {
          setGone(true);
          onComplete();
        }, 600);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (gone) return null;

  const barWidth = typeof window !== "undefined" && window.innerWidth < 640 ? 18 : 28;
  const filled   = Math.round((pct / 100) * barWidth);
  const bar      = "█".repeat(filled) + "░".repeat(barWidth - filled);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : pct / 100,
        transition: fading ? "opacity 0.6s ease-in" : "none",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-space-mono), 'Space Mono', monospace",
          fontSize: 13,
          letterSpacing: "0.05em",
          color: "#FF6600",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span style={{ color: "#444", fontSize: 11 }}>{">"} initializing portfolio</span>
        <span>
          {"["}{bar}{"]"}{" "}
          <span style={{ color: "rgba(255,102,0,0.6)", minWidth: "3ch", display: "inline-block" }}>
            {pct}%
          </span>
        </span>
      </div>
    </div>
  );
}
