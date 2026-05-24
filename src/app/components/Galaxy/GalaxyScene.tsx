"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const PARTICLE_COUNT = 50_000;
const ARMS = 3;
const MAX_RADIUS = 120;

function buildGalaxyGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);

  const coreColor = new THREE.Color(0.95, 0.52, 0.08);
  const midColor  = new THREE.Color(1.0, 0.38, 0.03);
  const edgeColor = new THREE.Color(0.15, 0.04, 0.0);
  const tmp = new THREE.Color();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const arm = i % ARMS;
    const t   = Math.pow(Math.random(), 0.55);
    const r   = t * MAX_RADIUS;

    const armAngle  = (arm / ARMS) * Math.PI * 2;
    const spinAngle = r * 0.028;
    const dAngle    = (Math.random() - 0.5) * 0.55;
    const dR        = (Math.random() - 0.5) * r * 0.22;

    const ang = armAngle + spinAngle + dAngle;
    const rad = r + dR;

    positions[i * 3]     = Math.cos(ang) * rad;
    positions[i * 3 + 1] = (Math.random() - 0.5) * r * 0.07 + (Math.random() - 0.5) * 1.2;
    positions[i * 3 + 2] = Math.sin(ang) * rad;

    const dist = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 2] ** 2);
    const n    = Math.min(dist / MAX_RADIUS, 1.0);

    if (n < 0.12) {
      tmp.copy(coreColor).lerp(midColor, n / 0.12);
    } else if (n < 0.55) {
      tmp.copy(midColor).lerp(edgeColor, (n - 0.12) / 0.43);
    } else {
      const dim = 1.0 - (n - 0.55) * 2.0;
      tmp.copy(edgeColor).multiplyScalar(Math.max(dim, 0));
    }

    colors[i * 3]     = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
  return geo;
}

const FILL_COUNT = 35_000;

function buildFillGeometry() {
  const positions = new Float32Array(FILL_COUNT * 3);
  const colors    = new Float32Array(FILL_COUNT * 3);

  const midColor  = new THREE.Color(1.0, 0.38, 0.03);
  const edgeColor = new THREE.Color(0.15, 0.04, 0.0);
  const tmp = new THREE.Color();

  for (let i = 0; i < FILL_COUNT; i++) {
    const r     = Math.pow(Math.random(), 0.5) * MAX_RADIUS;
    const theta = Math.random() * Math.PI * 2;

    positions[i * 3]     = Math.cos(theta) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * r * 0.06;
    positions[i * 3 + 2] = Math.sin(theta) * r;

    const n = Math.min(r / MAX_RADIUS, 1.0);
    if (n < 0.55) {
      tmp.copy(midColor).lerp(edgeColor, n / 0.55);
    } else {
      const dim = 1.0 - (n - 0.55) * 2.0;
      tmp.copy(edgeColor).multiplyScalar(Math.max(dim, 0));
    }

    colors[i * 3]     = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
  return geo;
}

function buildOrbitRings() {
  const group = new THREE.Group();
  [40, 70, 100].forEach((radius) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0 });
    const ring = new THREE.LineLoop(geo, mat);
    ring.scale.set(1, 0.05, 1);
    group.add(ring);
  });
  return group;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export default function GalaxyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 180, 60);
    camera.lookAt(0, 0, 0);

    const geo = buildGalaxyGeometry();
    const mat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1.0,
    });
    const points = new THREE.Points(geo, mat);

    const fillGeo = buildFillGeometry();
    const fillMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fillPoints = new THREE.Points(fillGeo, fillMat);

    const galaxy = new THREE.Group();
    galaxy.add(points);
    galaxy.add(fillPoints);
    scene.add(galaxy);

    const rings = buildOrbitRings();
    scene.add(rings);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.4, 0.8, 0.2
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 290,  50),
      new THREE.Vector3(0, 160, 130),
      new THREE.Vector3(0,  40, 220),
      new THREE.Vector3(0,   8, 420),
    ]);

    const HERO_VH = 5;
    let scrollRaw = 0;
    let smoothP   = 0;

    const onScroll = () => {
      scrollRaw = Math.min(window.scrollY / (window.innerHeight * HERO_VH), 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.resolution.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const camTarget  = new THREE.Vector3(0, 180, 60);
    const lookTarget = new THREE.Vector3(0, 0, 0);
    const curLook    = new THREE.Vector3(0, 0, 0);

    let rafId: number;
    let time = 0;

    function tick() {
      rafId = requestAnimationFrame(tick);
      time += 0.016;

      smoothP += (scrollRaw - smoothP) * 0.055;
      const p = smoothP;

      const phase2t = Math.max(0, ss(0.08, 0.22, p) - ss(0.22, 0.38, p));
      galaxy.rotation.y += lerp(0.0003, 0.0038, phase2t);

      const ringFade = ss(0.3, 0.52, p) * (1 - ss(0.7, 0.88, p));
      rings.children.forEach((child: THREE.Object3D, ci: number) => {
        const m = (child as THREE.LineLoop).material as THREE.LineBasicMaterial;
        m.opacity = ringFade * (0.1 + 0.06 * Math.sin(time * 1.5 + ci * 1.1));
      });

      if (p < 0.35) {
        const t = ss(0, 0.35, p);
        camTarget.set(0, lerp(180, 240, t), lerp(60, 120, t));
        lookTarget.set(0, 0, 0);
      } else if (p < 0.52) {
        const t = ss(0.35, 0.52, p);
        camTarget.set(0, lerp(240, 290, t), lerp(120, 50, t));
        lookTarget.set(0, 0, 0);
      } else {
        camTarget.copy(spline.getPoint(ss(0.52, 1.0, p)));
        lookTarget.set(0, 0, 0);
      }

      camera.position.lerp(camTarget, 0.07);
      curLook.lerp(lookTarget, 0.07);
      camera.lookAt(curLook);
      composer.render();
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      composer.dispose();
      geo.dispose();
      mat.dispose();
      fillGeo.dispose();
      fillMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
