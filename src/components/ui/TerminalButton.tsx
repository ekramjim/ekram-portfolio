"use client";
import { useState } from "react";

interface Props {
  cmd: string;
  href?: string;
  onClick?: () => void;
  compact?: boolean;
}

export default function TerminalButton({ cmd, href, onClick, compact = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const [running, setRunning] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    // mailto / external / anchor — let browser handle natively
    if (!href || href.startsWith("mailto:") || href.startsWith("http") || href.startsWith("#")) return;
    e.preventDefault();
    if (running) return;
    setRunning(true);
    setTimeout(() => { window.location.href = href; }, 900);
  };

  const classes = `flex items-center justify-between gap-4 border transition-all duration-200 cursor-pointer select-none font-[family-name:var(--font-space-mono)] ${
    compact ? "px-3 py-1.5" : "px-4 py-2.5"
  } ${
    hovered ? "border-[#FF6600] bg-[#FF6600]/5" : "border-[#1e1e1e] bg-[#0f0f0f]"
  }`;

  const inner = (
    <>
      <div className="flex items-center gap-2">
        <span className={`text-[#FF6600] select-none ${compact ? "text-[13px]" : "text-[15px]"}`}>❯</span>
        <span className={`transition-colors duration-200 ${compact ? "text-[11px]" : "text-[13px]"} ${hovered ? "text-[#ffffff]" : "text-[#c0c0c0]"}`}>
          {running ? (
            <span className="text-[#FF6600]">running<span className="animate-pulse">...</span></span>
          ) : (
            <>
              {cmd}
              <span className={`inline-block w-[7px] h-[14px] bg-[#FF6600] ml-1.5 align-middle animate-pulse ${hovered ? "opacity-100" : "opacity-40"}`} />
            </>
          )}
        </span>
      </div>
      {!compact && (
        <span className={`text-[10px] tracking-widest transition-colors duration-200 ${hovered ? "text-[#FF6600]" : "text-[#2a2a2a]"}`}>
          ↵ Enter
        </span>
      )}
    </>
  );

  if (onClick || !href) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={classes}
        style={{ borderRadius: 4 }}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes}
      style={{ borderRadius: 4 }}
    >
      {inner}
    </a>
  );
}
