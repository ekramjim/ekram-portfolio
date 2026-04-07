"use client";
import { useEffect, useRef } from "react";

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

// Inline SVG path animator — for custom paths within any component
export function AnimatedPath({
  d,
  stroke = "#FF6600",
  strokeWidth = 1.5,
  delay = 0,
  duration = 1600,
  opacity = 0.6,
}: {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

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
      { threshold: 0.05 }
    );

    const svg = path.closest("svg");
    if (svg) observer.observe(svg);
    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <path
      ref={pathRef}
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
