"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = `
attribute float aSize;
attribute vec3 aColor;
attribute float aAlpha;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vColor = aColor;
  vAlpha = aAlpha;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (380.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = `
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = vAlpha * 0.88 * (1.0 - smoothstep(0.05, 0.5, d));
  gl_FragColor = vec4(vColor, a);
}
`;

interface Props {
  terminalRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

export default function ParticleAssembly({ terminalRef, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let completed = false;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    renderer.setSize(W, H);

    const fov = 60;
    const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 100);
    camera.position.z = 5;

    const visH = 2 * camera.position.z * Math.tan((fov / 2) * (Math.PI / 180));
    const visW = visH * (W / H);

    const scene = new THREE.Scene();

    function screenToWorld(px: number, py: number) {
      return {
        x: ((px / W) * 2 - 1) * (visW / 2),
        y: -((py / H) * 2 - 1) * (visH / 2),
      };
    }

    // Map terminal bounds to world space
    const termEl = terminalRef.current;
    const contRect = container.getBoundingClientRect();
    let tl = { x: -3, y: 1.8 };
    let br = { x: 3, y: -1.8 };
    if (termEl) {
      const r = termEl.getBoundingClientRect();
      tl = screenToWorld(r.left - contRect.left, r.top - contRect.top);
      br = screenToWorld(r.right - contRect.left, r.bottom - contRect.top);
    }

    const tw = br.x - tl.x;
    const th = tl.y - br.y;
    const HEADER_H = th * 0.11; // proportional header bar height

    const COUNT = 5000;
    const positions  = new Float32Array(COUNT * 3);
    const colors     = new Float32Array(COUNT * 3);
    const sizes      = new Float32Array(COUNT);
    const alphas     = new Float32Array(COUNT);

    const startPos:  THREE.Vector3[] = [];
    const targetPos: THREE.Vector3[] = [];
    const delays:    number[] = [];
    const durs:      number[] = [];

    // ── Target positions ────────────────────────────────────────────────────

    // 1. Outline (70%): perimeter of the rectangle, arrive first
    const outlineCount = Math.floor(COUNT * 0.70);
    const perim = 2 * (tw + th);
    for (let i = 0; i < outlineCount; i++) {
      const t = (i / outlineCount) * perim;
      let x, y;
      if      (t < tw)           { x = tl.x + t;            y = tl.y; }
      else if (t < tw + th)      { x = br.x;                y = tl.y - (t - tw); }
      else if (t < 2 * tw + th)  { x = br.x - (t - tw - th); y = br.y; }
      else                       { x = tl.x;                y = br.y + (t - 2*tw - th); }
      targetPos.push(new THREE.Vector3(
        x + (Math.random() - 0.5) * 0.012,
        y + (Math.random() - 0.5) * 0.012,
        0
      ));
      delays.push(Math.random() * 0.25);
      durs.push(0.55 + Math.random() * 0.25);
    }

    // 2. Header separator line (12%)
    const headerCount = Math.floor(COUNT * 0.12);
    const headerY = tl.y - HEADER_H;
    for (let i = 0; i < headerCount; i++) {
      targetPos.push(new THREE.Vector3(
        tl.x + (i / headerCount) * tw,
        headerY,
        0
      ));
      delays.push(0.1 + Math.random() * 0.2);
      durs.push(0.5 + Math.random() * 0.2);
    }

    // 3. Interior fill (35%): inside the terminal body, arrive last
    const fillCount = COUNT - outlineCount - headerCount;
    for (let i = 0; i < fillCount; i++) {
      targetPos.push(new THREE.Vector3(
        tl.x + 0.06 * tw + Math.random() * tw * 0.88,
        br.y + 0.04 * th + Math.random() * (th - HEADER_H - 0.08 * th),
        (Math.random() - 0.5) * 0.08
      ));
      delays.push(0.2 + Math.random() * 0.35);
      durs.push(0.6 + Math.random() * 0.3);
    }

    // ── Start positions: scatter from all directions ─────────────────────────
    for (let i = 0; i < COUNT; i++) {
      const rng = Math.random();
      let sx, sy, sz;
      if (rng < 0.28) {
        // Rain from above
        sx = (Math.random() - 0.5) * visW * 1.6;
        sy = visH * (0.7 + Math.random() * 0.6);
        sz = (Math.random() - 0.5) * 4;
      } else if (rng < 0.56) {
        // Fly in from sides
        const side = Math.random() < 0.5 ? -1 : 1;
        sx = side * visW * (0.7 + Math.random() * 0.5);
        sy = (Math.random() - 0.5) * visH * 1.2;
        sz = (Math.random() - 0.5) * 3;
      } else if (rng < 0.78) {
        // Zoom out from deep Z
        sx = (Math.random() - 0.5) * visW * 0.4;
        sy = (Math.random() - 0.5) * visH * 0.4;
        sz = -5 - Math.random() * 4;
      } else {
        // Uniform sphere
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 4 + Math.random() * 3;
        sx = r * Math.sin(phi) * Math.cos(theta);
        sy = r * Math.sin(phi) * Math.sin(theta);
        sz = r * Math.cos(phi);
      }
      startPos.push(new THREE.Vector3(sx, sy, sz));
    }

    // ── Buffer data ──────────────────────────────────────────────────────────
    const fillStart = outlineCount + headerCount;
    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   = startPos[i].x;
      positions[i*3+1] = startPos[i].y;
      positions[i*3+2] = startPos[i].z;

      const isFill = i >= fillStart;
      const bright = Math.random();
      if (isFill) {
        // fill particles: much dimmer, smaller — just a hint of presence
        colors[i*3]=0.42; colors[i*3+1]=0.16; colors[i*3+2]=0.00;
        sizes[i] = 0.028 + Math.random() * 0.022; // → ~2–3.8 px
      } else {
        // outline + header: moderate brightness, smaller so overlap doesn't stack too bright
        if      (bright > 0.88) { colors[i*3]=0.72; colors[i*3+1]=0.38; colors[i*3+2]=0.08; }
        else if (bright > 0.55) { colors[i*3]=0.60; colors[i*3+1]=0.24; colors[i*3+2]=0.00; }
        else                    { colors[i*3]=0.46; colors[i*3+1]=0.16; colors[i*3+2]=0.00; }
        sizes[i] = 0.030 + Math.random() * 0.032; // → ~2.3–4.7 px
      }
      alphas[i] = 1.0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor",   new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aAlpha",   new THREE.BufferAttribute(alphas, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    scene.add(new THREE.Points(geo, mat));

    // ── Animation loop ───────────────────────────────────────────────────────
    let t0: number | null = null;
    type Phase = "scatter" | "assemble" | "hold" | "fadeout" | "done";
    let phase: Phase = "scatter";
    let phaseT0 = 0;

    const SCATTER_DUR  = 0.35;
    const HOLD_DUR     = 0.08;
    const FADEOUT_DUR  = 0.45;

    function tick(ts: number) {
      if (t0 === null) t0 = ts;
      const elapsed = (ts - t0) / 1000;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const alp = geo.attributes.aAlpha   as THREE.BufferAttribute;

      if (phase === "scatter") {
        for (let i = 0; i < COUNT; i++) {
          pos.setXYZ(i,
            startPos[i].x + Math.sin(elapsed * 1.1 + i * 0.031) * 0.07,
            startPos[i].y + Math.cos(elapsed * 0.85 + i * 0.042) * 0.07,
            startPos[i].z
          );
        }
        pos.needsUpdate = true;
        if (elapsed - phaseT0 > SCATTER_DUR) { phase = "assemble"; phaseT0 = elapsed; }

      } else if (phase === "assemble") {
        const dt = elapsed - phaseT0;
        let allDone = true;
        for (let i = 0; i < COUNT; i++) {
          const localT = Math.max(0, (dt - delays[i]) / durs[i]);
          if (localT < 1) allDone = false;
          const e = easeOutCubic(Math.min(localT, 1));
          pos.setXYZ(i,
            THREE.MathUtils.lerp(startPos[i].x, targetPos[i].x, e),
            THREE.MathUtils.lerp(startPos[i].y, targetPos[i].y, e),
            THREE.MathUtils.lerp(startPos[i].z, targetPos[i].z, e),
          );
        }
        pos.needsUpdate = true;
        if (allDone || dt > 1.4) { phase = "hold"; phaseT0 = elapsed; }

      } else if (phase === "hold") {
        const dt = elapsed - phaseT0;
        const pulse = 0.55 + 0.30 * Math.sin(dt * Math.PI * 7);
        for (let i = 0; i < COUNT; i++) alp.setX(i, pulse);
        alp.needsUpdate = true;
        if (dt > HOLD_DUR) {
          phase = "fadeout";
          phaseT0 = elapsed;
          if (!completed) { completed = true; onComplete(); }
        }

      } else if (phase === "fadeout") {
        const t = (elapsed - phaseT0) / FADEOUT_DUR;
        const a = 1 - easeOutCubic(Math.min(t, 1));
        for (let i = 0; i < COUNT; i++) alp.setX(i, a);
        alp.needsUpdate = true;
        if (t >= 1) { phase = "done"; renderer.render(scene, camera); return; }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    const onResize = () => {
      const W2 = container.offsetWidth, H2 = container.offsetHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [terminalRef, onComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
