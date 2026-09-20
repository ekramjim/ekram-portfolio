"use client";
import { useSyncExternalStore } from "react";
import GalaxyHero from "./GalaxyHero";
import { getIntroPhase, getServerIntroPhase, subscribeIntro } from "./galaxyIntro";

export default function GalaxyEntry() {
  const phase = useSyncExternalStore(subscribeIntro, getIntroPhase, getServerIntroPhase);
  return <GalaxyHero visible={phase !== "stars"} settled={phase === "settled"} />;
}
