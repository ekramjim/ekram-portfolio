"use client";
import { forwardRef, useEffect, useState } from "react";

const PALETTE_BASE = ["#FF6600", "#FF8833", "#cc5500", "#ff9966", "#2a2a2a", "#333", "#555", "#888"];

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const TerminalFrame = forwardRef<HTMLDivElement, Props>(
  ({ title, children, className = "" }, ref) => {
    const [palette, setPalette] = useState(PALETTE_BASE);

    useEffect(() => {
      const id = setInterval(() => {
        setPalette(prev => {
          const next = [...prev];
          const a = Math.floor(Math.random() * next.length);
          let b = Math.floor(Math.random() * next.length);
          while (b === a) b = Math.floor(Math.random() * next.length);
          [next[a], next[b]] = [next[b], next[a]];
          return next;
        });
      }, 600);
      return () => clearInterval(id);
    }, []);

    return (
      <div ref={ref} className={`terminal-frame relative bg-[#0d0d0d] border border-[#1e1e1e] ${className}`} style={{ borderRadius: 6 }}>
        {/* Hover border draw */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ borderRadius: 6 }}>
          <rect
            pathLength="1"
            className="terminal-border-rect"
            x="0.5" y="0.5"
            width="calc(100% - 1px)" height="calc(100% - 1px)"
            rx="5.5"
            fill="none"
            stroke="#FF6600"
            strokeWidth="1.5"
          />
        </svg>
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#191919]">
          <span className="w-3 h-3 rounded-full bg-[#FF6600] opacity-75" />
          <span className="w-3 h-3 rounded-full bg-[#222]" />
          <span className="w-3 h-3 rounded-full bg-[#222]" />
          <span className="ml-3 text-[9px] uppercase tracking-[0.35em] text-[#666] font-[family-name:var(--font-space-mono)]">
            {title}
          </span>
        </div>

        {/* Body: palette column + content */}
        <div className="flex">
          <div className="hidden sm:flex flex-col justify-end p-5 pr-3 shrink-0 select-none">
            <div className="flex flex-col gap-1">
              {palette.map((color, i) => (
                <span
                  key={i}
                  className="w-4 h-4 inline-block"
                  style={{ backgroundColor: color, borderRadius: 2, transition: "background-color 0.4s ease" }}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

TerminalFrame.displayName = "TerminalFrame";
export default TerminalFrame;
