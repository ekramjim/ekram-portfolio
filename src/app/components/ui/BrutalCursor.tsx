"use client";
import { useEffect, useRef, useState } from "react";

const BrutalCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    return () => {
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, .brutal-btn, .brutal-card, label[for]")) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.relatedTarget as HTMLElement | null;
      if (!target || !target.closest("a, button, [role='button'], input, textarea, select, .brutal-btn, .brutal-card, label[for]")) {
        setIsHovering(false);
      }
    };

    // Trail animation loop
    const animate = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.12;
      trail.style.transform = `translate(${trailPos.current.x - 16}px, ${trailPos.current.y - 16}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference will-change-transform"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.15s ease" }}
      >
        <div
          className="transition-all duration-150 ease-out bg-brand"
          style={{
            width: isHovering ? 16 : 12,
            height: isHovering ? 16 : 12,
            transform: isHovering ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </div>

      {/* Trail square */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
        style={{ opacity: isVisible ? 0.35 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          className="transition-all duration-200 ease-out border-2 border-[#FF6600]"
          style={{
            width: isHovering ? 40 : 32,
            height: isHovering ? 40 : 32,
            transform: isHovering ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </div>
    </>
  );
};

export default BrutalCursor;
