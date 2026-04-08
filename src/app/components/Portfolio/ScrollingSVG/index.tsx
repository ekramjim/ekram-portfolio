"use client";
import { useEffect, useRef } from "react";

/**
 * A single solid path that draws itself as the user scrolls.
 * startAt / endAt are scroll-progress values (0–1) controlling
 * when this particular line starts and finishes drawing.
 */
function ScrollDrawPath({
  d,
  strokeWidth = 1.5,
  startAt = 0,
  endAt = 1,
  opacity = 1,
}: {
  d: string;
  strokeWidth?: number;
  startAt?: number;
  endAt?: number;
  opacity?: number;
}) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;

    const length = path.getTotalLength();
    // Start fully hidden
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const update = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const raw = scrollable > 0 ? window.scrollY / scrollable : 0;
      // Normalise to this path's [startAt, endAt] window
      const local = Math.max(0, Math.min(1, (raw - startAt) / Math.max(endAt - startAt, 0.001)));
      path.style.strokeDashoffset = `${length * (1 - local)}`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [startAt, endAt]);

  return (
    <path
      ref={ref}
      d={d}
      stroke="#FF6600"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
      /* Hide before JS hydrates so there's no flash of a full line */
      strokeDasharray="9999"
      strokeDashoffset="9999"
      style={{ opacity }}
    />
  );
}

export default function ScrollingSVG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* LEFT RAIL — one clean jog, full scroll */}
        <ScrollDrawPath
          strokeWidth={1.5}
          startAt={0}
          endAt={1}
          d="
            M 100 0
            L 100 380
            L 200 480
            L 200 900
          "
        />

        {/* RIGHT RAIL — mirrored, slight delay */}
        <ScrollDrawPath
          strokeWidth={1.5}
          startAt={0.05}
          endAt={1}
          d="
            M 1340 0
            L 1340 420
            L 1240 520
            L 1240 900
          "
        />

        {/* CENTRE ACCENT — subtle diagonal crossing, mid-scroll */}
        <ScrollDrawPath
          strokeWidth={1}
          startAt={0.25}
          endAt={0.75}
          opacity={0.35}
          d="
            M 200 480
            L 720 440
            L 1240 520
          "
        />
      </svg>
    </div>
  );
}
