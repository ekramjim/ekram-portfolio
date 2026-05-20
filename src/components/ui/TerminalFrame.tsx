"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMobileScrollActive } from "@/app/hooks/useMobileScrollActive";

const PALETTE_BASE = ["#FF6600", "#FF8833", "#cc5500", "#ff9966", "#2a2a2a", "#333", "#555", "#888"];

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const TerminalFrame = forwardRef<HTMLDivElement, Props>(
  ({ title, children, className = "" }, ref) => {
    const [palette, setPalette] = useState(PALETTE_BASE);
    const frameRef = useRef<HTMLDivElement>(null);
    const { ref: scrollRef, isActive } = useMobileScrollActive<HTMLDivElement>();

    useImperativeHandle(ref, () => frameRef.current as HTMLDivElement, []);

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
      <div
        ref={(node) => {
          frameRef.current = node;
          scrollRef.current = node;
        }}
        className={`terminal-frame relative bg-[#0d0d0d] border border-[#1e1e1e] ${isActive ? "terminal-frame-active" : ""} ${className}`}
        style={{ borderRadius: 6 }}
      >
        {/* Chrome bar */}
        <div className="relative flex items-center gap-2 px-4 py-2 border-b border-[#2a2a2a] bg-[#161616] overflow-hidden">
          <span className="terminal-header-fill" />
          <span className="terminal-dot-orange relative z-10 w-3 h-3 rounded-full bg-[#FF6600] opacity-75 shrink-0 transition-colors duration-500" />
          <span className="terminal-dot-grey relative z-10 w-3 h-3 rounded-full bg-[#222] shrink-0 transition-colors duration-500" />
          <span className="terminal-dot-grey relative z-10 w-3 h-3 rounded-full bg-[#222] shrink-0 transition-colors duration-500" />
          <span className="relative z-10 ml-3 text-[10px] uppercase tracking-[0.25em] text-[#666] font-[family-name:var(--font-space-mono)] terminal-header-title transition-all duration-500">
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
