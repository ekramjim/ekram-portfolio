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
        {/*
          LEFT COLUMN TRACE
          Starts top-left, jogs right then back, working its way to the bottom.
          Draws from 0% → 80% scroll.
        */}
        <ScrollDrawPath
          strokeWidth={1.5}
          startAt={0}
          endAt={0.8}
          d="
            M 80 0
            L 80 130
            L 220 130
            L 220 280
            L 60 280
            L 60 440
            L 190 440
            L 190 580
            L 80 580
            L 80 720
            L 210 720
            L 210 900
          "
        />

        {/*
          RIGHT COLUMN TRACE
          Mirror of the left, starts slightly delayed.
          Draws from 5% → 85% scroll.
        */}
        <ScrollDrawPath
          strokeWidth={1.5}
          startAt={0.05}
          endAt={0.85}
          d="
            M 1360 0
            L 1360 160
            L 1220 160
            L 1220 310
            L 1390 310
            L 1390 470
            L 1240 470
            L 1240 620
            L 1370 620
            L 1370 760
            L 1220 760
            L 1220 900
          "
        />

        {/*
          UPPER HORIZONTAL BRIDGE
          Shoots across the top third of the page.
          Draws from 15% → 45% scroll.
        */}
        <ScrollDrawPath
          strokeWidth={1}
          startAt={0.15}
          endAt={0.45}
          opacity={0.7}
          d="
            M 220 280
            L 420 280
            L 420 180
            L 680 180
            L 680 320
            L 880 320
            L 880 200
            L 1100 200
            L 1100 310
            L 1220 310
          "
        />

        {/*
          LOWER HORIZONTAL BRIDGE
          Connects across the bottom half.
          Draws from 45% → 80% scroll.
        */}
        <ScrollDrawPath
          strokeWidth={1}
          startAt={0.45}
          endAt={0.8}
          opacity={0.7}
          d="
            M 210 720
            L 380 720
            L 380 600
            L 620 600
            L 620 740
            L 860 740
            L 860 620
            L 1060 620
            L 1060 760
            L 1220 760
          "
        />

        {/*
          MID CROSS — small connector in the centre
          Draws from 30% → 60% scroll.
        */}
        <ScrollDrawPath
          strokeWidth={1}
          startAt={0.3}
          endAt={0.6}
          opacity={0.55}
          d="
            M 680 180
            L 680 440
            L 760 440
            L 760 580
            L 680 580
            L 680 740
          "
        />
      </svg>
    </div>
  );
}
