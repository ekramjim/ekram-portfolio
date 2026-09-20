export type GalaxyPhase = "stars" | "title" | "settled";

/** A text card shown while the camera flies through the galaxy. `p0`/`p1` are scroll progress (0–1) at which it fades in/out. */
export interface GalaxyStep {
  tag: string;
  heading: string;
  body: string;
  p0: number;
  p1: number;
}

export interface GalaxyProps {
  /** Left and right halves of the headline that flank the galaxy, e.g. ["Hi, I'm", "Ekram."]. */
  title: [string, string];
  /** Line under the headline once the intro has settled. */
  caption?: string;
  /** Small hint under the caption. */
  hint?: string;
  /** Labels arranged on a rotating ring as you begin scrolling. */
  orbitLabels?: string[];
  /** Cards shown during the flythrough. */
  steps?: GalaxyStep[];
  /** Height of the scroll zone in viewport heights. Scroll progress is 0 at the top and 1 after this many screens. */
  scrollScreens?: number;
  /** How fast stars stream inward along the spiral arms, in arm-lengths per second (0 disables). Default 0.02 ≈ 50s from rim to core. */
  flowSpeed?: number;
  /** Colour for orbit labels and step tags. */
  accentColor?: string;
}
