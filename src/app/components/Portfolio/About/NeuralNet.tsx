"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 60;
const CONNECT_DIST = 150;
const REPEL_DIST = 90;

export default function NeuralNet() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const W = canvas.offsetWidth  || canvas.parentElement?.clientWidth  || window.innerWidth;
    const H = canvas.offsetHeight || canvas.parentElement?.clientHeight || window.innerHeight;
    if (W === 0 || H === 0) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100);
    camera.position.z = 10;

    // ── Nodes ──────────────────────────────────────────────────────
    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      ox: number; oy: number;
      pulse: number; pulseSpeed: number;
      mesh: THREE.Mesh;
    };

    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => {
      const x = (Math.random() - 0.5) * W * 0.9;
      const y = (Math.random() - 0.5) * H * 0.9;
      const geo  = new THREE.CircleGeometry(3.5, 12);
      const mesh = new THREE.Mesh(geo, nodeMat.clone());
      mesh.position.set(x, y, 0);
      scene.add(mesh);
      return { x, y, vx: 0, vy: 0, ox: x, oy: y, pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.018 + Math.random() * 0.014, mesh };
    });

    // ── Edges (line segments updated each frame) ───────────────────
    const MAX_LINES = NODE_COUNT * NODE_COUNT;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors    = new Float32Array(MAX_LINES * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color",    new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.6 })
    );
    scene.add(lineMat);

    // ── Mouse ──────────────────────────────────────────────────────
    const mouse = { x: 99999, y: 99999 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x =  e.clientX - rect.left - W / 2;
      mouse.y = -(e.clientY - rect.top  - H / 2);
    };
    const onLeave = () => { mouse.x = 99999; mouse.y = 99999; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      const nW = canvas.offsetWidth;
      const nH = canvas.offsetHeight;
      renderer.setSize(nW, nH);
      camera.left = -nW / 2; camera.right = nW / 2;
      camera.top  =  nH / 2; camera.bottom = -nH / 2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let rafId: number;

    function tick() {
      rafId = requestAnimationFrame(tick);

      let lineIdx = 0;

      nodes.forEach((n) => {
        // drift back to origin
        n.vx += (n.ox - n.x) * 0.012;
        n.vy += (n.oy - n.y) * 0.012;

        // mouse repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL_DIST && d > 0) {
          const force = (REPEL_DIST - d) / REPEL_DIST * 2.8;
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }

        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x  += n.vx;
        n.y  += n.vy;

        // pulse size
        n.pulse += n.pulseSpeed;
        const s = 1.0 + 0.35 * Math.sin(n.pulse);
        n.mesh.scale.setScalar(s);
        n.mesh.position.set(n.x, n.y, 0);

        // pulse brightness
        const brightness = 0.75 + 0.25 * Math.sin(n.pulse);
        (n.mesh.material as THREE.MeshBasicMaterial).color.setRGB(brightness, brightness * 0.38, 0);
      });

      // rebuild edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a  = nodes[i];
          const b  = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 1.0;
            const base  = lineIdx * 6;

            linePositions[base]     = a.x; linePositions[base + 1] = a.y; linePositions[base + 2] = 0;
            linePositions[base + 3] = b.x; linePositions[base + 4] = b.y; linePositions[base + 5] = 0;

            lineColors[base]     = alpha; lineColors[base + 1] = alpha * 0.38; lineColors[base + 2] = 0;
            lineColors[base + 3] = alpha; lineColors[base + 4] = alpha * 0.38; lineColors[base + 5] = 0;

            lineIdx++;
          }
        }
      }

      // zero out unused slots
      for (let i = lineIdx * 6; i < MAX_LINES * 6; i++) {
        linePositions[i] = 0;
        lineColors[i]    = 0;
      }

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;
      lineGeo.setDrawRange(0, lineIdx * 2);

      renderer.render(scene, camera);
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      lineGeo.dispose();
      lineMat.material.dispose();
      nodes.forEach(n => { n.mesh.geometry.dispose(); (n.mesh.material as THREE.Material).dispose(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
        opacity: 0.85,
      }}
    />
  );
}
