"use client";
import dynamic from "next/dynamic";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });
const GalaxyEntry = dynamic(() => import("./GalaxyEntry"), { ssr: false });

export { GalaxyScene, GalaxyEntry };
