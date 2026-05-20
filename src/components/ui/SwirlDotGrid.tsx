"use client";
import { useCallback, useEffect, useRef } from "react";

const SPACING = 24;
const DOT_R = 1;
const SWIRL_STRENGTH = 1.8;
const SWIRL_FALLOFF = 160;

export default function SwirlDotGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const strengthRef = useRef(0);

  const draw = useCallback((_now: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const color = getComputedStyle(canvas).getPropertyValue("--dots-color").trim() || "#1e1e1e";

    // Lerp strength: ease in fast, ease out slower
    const target = mouseRef.current ? 1 : 0;
    strengthRef.current += (target - strengthRef.current) * (mouseRef.current ? 0.07 : 0.05);
    const strength = strengthRef.current;
    const done = !mouseRef.current && strength < 0.002;
    if (done) strengthRef.current = 0;

    // Use current mouse position, or last known while easing out
    const m = mouseRef.current ?? lastMouseRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    const cols = Math.ceil(W / SPACING) + 1;
    const rows = Math.ceil(H / SPACING) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const gx = col * SPACING;
        const gy = row * SPACING;
        let px = gx;
        let py = gy;

        if (strength > 0.001 && m) {
          const dx = gx - m.x;
          const dy = gy - m.y;
          const r = Math.sqrt(dx * dx + dy * dy);
          if (r > 0.5) {
            const theta = Math.atan2(dy, dx);
            const delta = SWIRL_STRENGTH * strength * Math.exp(-r / SWIRL_FALLOFF);
            px = m.x + r * Math.cos(theta + delta);
            py = m.y + r * Math.sin(theta + delta);
          }
        }

        ctx.beginPath();
        ctx.arc(px * dpr, py * dpr, DOT_R * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!done) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      if (inside) {
        const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        mouseRef.current = pos;
        lastMouseRef.current = pos;
      } else {
        mouseRef.current = null;
      }

      if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseLeave = () => {
      mouseRef.current = null;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
