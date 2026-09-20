// The canvas owns the clock; React only updates when an intro phase changes.
// A shared snapshot also handles either dynamic component mounting first.
export type IntroPhase = "stars" | "title" | "settled";
let phase: IntroPhase = "stars";
const listeners = new Set<() => void>();
export const getIntroPhase = () => phase;
export const getServerIntroPhase = (): IntroPhase => "stars";
export function subscribeIntro(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
export function setIntroPhase(next: IntroPhase) {
  if (next === phase) return;
  phase = next;
  listeners.forEach((listener) => listener());
}
export const GALAXY_REPLAY_EVENT = "galaxyReplay";
