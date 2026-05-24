"use client";
import { useState } from "react";
import GalaxyLoader from "./GalaxyLoader";
import GalaxyHero from "./GalaxyHero";

export default function GalaxyEntry() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <GalaxyLoader onComplete={() => setVisible(true)} />
      <GalaxyHero visible={visible} />
    </>
  );
}
