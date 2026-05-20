"use client";
import { useEffect, useId, useRef } from "react";

interface AnimatedSVGConnectorProps {
  variant?: "vertical" | "wave" | "circuit" | "branch";
  className?: string;
  color?: string;
  opacity?: number;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
}

const paths = {
  vertical: {
    viewBox: "0 0 2 120",
    d: "M1 0 L1 120",
    width: 2,
    height: 120,
  },
  wave: {
    viewBox: "0 0 120 80",
    d: "M60 0 C40 20, 80 40, 60 60 C40 70, 80 80, 60 80",
    width: 120,
    height: 80,
  },
  circuit: {
    viewBox: "0 0 200 120",
    d: "M100 0 L100 30 L40 30 L40 60 L160 60 L160 90 L100 90 L100 120",
    width: 200,
    height: 120,
  },
  branch: {
    viewBox: "0 0 200 100",
    d: "M100 0 L100 40 M100 40 L40 100 M100 40 L160 100",
    width: 200,
    height: 100,
  },
};

export default function AnimatedSVGConnector({
  variant = "vertical",
  className = "",
  color = "#FF6600",
  opacity = 0.5,
  duration = 1800,
  delay = 0,
  strokeWidth = 1.5,
}: AnimatedSVGConnectorProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "none";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            path.style.strokeDashoffset = "0";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [delay, duration]);

  const config = paths[variant];

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={config.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        ref={pathRef}
        d={config.d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Inline SVG path animator — draws as user scrolls through the section.
// When dashed=true: a mask path (solid, animated via dashoffset) reveals
// the dashed visible path underneath, keeping the scroll-reveal intact.
export function AnimatedPath({
  d,
  stroke = "#FF6600",
  strokeWidth = 1.5,
  opacity = 0.6,
  dashed = false,
  delay: _delay,
  duration: _duration,
}: {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  dashed?: boolean;
  delay?: number;
  duration?: number;
}) {
  const maskPathRef = useRef<SVGPathElement>(null);
  const uid = useId();
  const maskId = `apm${uid.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    const path = maskPathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    let rafId = 0;

    const update = () => {
      const svg = path.closest("svg");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const isTouchPhone = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const scrollRange = isTouchPhone
        ? Math.min(rect.height + viewportHeight, viewportHeight * 1.65)
        : rect.height + viewportHeight;
      const progress = (viewportHeight - rect.top) / Math.max(scrollRange, 1);
      const clamped = Math.max(0, Math.min(1, progress));
      path.style.strokeDashoffset = `${length * (1 - clamped)}`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("scroll", onScroll);
    update();
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (dashed) {
    return (
      <g>
        <mask id={maskId}>
          {/* Solid path that animates via dashoffset — acts as the reveal mask */}
          <path
            ref={maskPathRef}
            d={d}
            stroke="white"
            strokeWidth={strokeWidth + 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </mask>
        {/* Dashed visible path, revealed by the mask above */}
        <path
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray="6 10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ opacity }}
          mask={`url(#${maskId})`}
        />
      </g>
    );
  }

  return (
    <path
      ref={maskPathRef}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={{ opacity }}
    />
  );
}
