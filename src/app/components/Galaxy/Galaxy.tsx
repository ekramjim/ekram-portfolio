"use client";
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import GalaxyOverlay from "./GalaxyOverlay";
import type { GalaxyPhase, GalaxyProps } from "./types";

// three.js is client-only and heavy; keep it out of the server render and initial bundle.
const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

/**
 * Scroll-driven galaxy hero: starfield loads in, the galaxy forms, the headline appears,
 * then scrolling flies the camera through it. Place it once near the top of a page —
 * it reserves `scrollScreens` viewport heights and clips its own fixed canvas to that zone.
 */
export default function Galaxy({ scrollScreens = 5, flowSpeed = 0.02, ...overlayProps }: GalaxyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<GalaxyPhase>("stars");
  const [replayToken, setReplayToken] = useState(0);
  const replay = useCallback(() => setReplayToken((n) => n + 1), []);

  return (
    <div
      ref={rootRef}
      // clip-path also clips the scene's position:fixed canvas to this zone, so it never bleeds into later sections.
      style={{ position: "relative", height: `${scrollScreens * 100}vh`, clipPath: "inset(0)" }}
    >
      <GalaxyScene rootRef={rootRef} scrollScreens={scrollScreens} flowSpeed={flowSpeed} replayToken={replayToken} onPhaseChange={setPhase} />
      <GalaxyOverlay
        {...overlayProps}
        rootRef={rootRef}
        scrollScreens={scrollScreens}
        visible={phase !== "stars"}
        settled={phase === "settled"}
        onReplay={replay}
      />
    </div>
  );
}
