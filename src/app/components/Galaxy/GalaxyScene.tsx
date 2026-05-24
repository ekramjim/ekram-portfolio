"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const PARTICLE_COUNT = 50_000;
const FILL_COUNT     = 35_000;
const ARMS           = 4;
const MAX_RADIUS     = 120;
const SCATTER_R      = 380; // scatter start radius — wide starfield

function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function buildGalaxyGeometry() {
  const positions    = new Float32Array(PARTICLE_COUNT * 3);
  const scatterPos   = new Float32Array(PARTICLE_COUNT * 3);
  const targetPos    = new Float32Array(PARTICLE_COUNT * 3);
  const colors       = new Float32Array(PARTICLE_COUNT * 3);

  const coreColor = new THREE.Color(0.9, 0.18, 0.0);
  const midColor  = new THREE.Color(0.65, 0.12, 0.0);
  const edgeColor = new THREE.Color(0.15, 0.04, 0.0);
  const tmp = new THREE.Color();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // scatter start — random across a wide flat disc
    const sr    = Math.sqrt(Math.random()) * SCATTER_R;
    const stheta = Math.random() * Math.PI * 2;
    scatterPos[i * 3]     = Math.cos(stheta) * sr;
    scatterPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    scatterPos[i * 3 + 2] = Math.sin(stheta) * sr;

    // target — spiral arms
    const arm = i % ARMS;
    const t   = Math.pow(Math.random(), 0.55);
    const r   = t * MAX_RADIUS;

    const armAngle  = (arm / ARMS) * Math.PI * 2;
    const spinAngle = r * -0.065;
    const dAngle    = (Math.random() - 0.5) * 0.55;
    const dR        = (Math.random() - 0.5) * r * 0.22;

    const ang = armAngle + spinAngle + dAngle;
    const rad = r + dR;

    targetPos[i * 3]     = Math.cos(ang) * rad;
    targetPos[i * 3 + 1] = (Math.random() - 0.5) * r * 0.07 + (Math.random() - 0.5) * 1.2;
    targetPos[i * 3 + 2] = Math.sin(ang) * rad;

    // start at scatter
    positions[i * 3]     = scatterPos[i * 3];
    positions[i * 3 + 1] = scatterPos[i * 3 + 1];
    positions[i * 3 + 2] = scatterPos[i * 3 + 2];

    const dist = Math.sqrt(targetPos[i * 3] ** 2 + targetPos[i * 3 + 2] ** 2);
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
  return { geo, scatterPos, targetPos };
}

function buildFillGeometry() {
  const positions  = new Float32Array(FILL_COUNT * 3);
  const scatterPos = new Float32Array(FILL_COUNT * 3);
  const targetPos  = new Float32Array(FILL_COUNT * 3);
  const colors     = new Float32Array(FILL_COUNT * 3);

  const midColor  = new THREE.Color(0.65, 0.12, 0.0);
  const edgeColor = new THREE.Color(0.15, 0.04, 0.0);
  const tmp = new THREE.Color();

  for (let i = 0; i < FILL_COUNT; i++) {
    const sr     = Math.sqrt(Math.random()) * SCATTER_R;
    const stheta = Math.random() * Math.PI * 2;
    scatterPos[i * 3]     = Math.cos(stheta) * sr;
    scatterPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    scatterPos[i * 3 + 2] = Math.sin(stheta) * sr;

    const r     = Math.pow(Math.random(), 0.5) * MAX_RADIUS;
    const theta = Math.random() * Math.PI * 2;
    targetPos[i * 3]     = Math.cos(theta) * r;
    targetPos[i * 3 + 1] = (Math.random() - 0.5) * r * 0.06;
    targetPos[i * 3 + 2] = Math.sin(theta) * r;

    positions[i * 3]     = scatterPos[i * 3];
    positions[i * 3 + 1] = scatterPos[i * 3 + 1];
    positions[i * 3 + 2] = scatterPos[i * 3 + 2];

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
  return { geo, scatterPos, targetPos };
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

    const { geo, scatterPos: armScatter, targetPos: armTarget } = buildGalaxyGeometry();
    const mat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1.0,
    });
    const points = new THREE.Points(geo, mat);

    const { geo: fillGeo, scatterPos: fillScatter, targetPos: fillTarget } = buildFillGeometry();
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

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new OutputPass());

    const spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 290,  50),
      new THREE.Vector3(0, 160, 130),
      new THREE.Vector3(0,  40, 220),
      new THREE.Vector3(0,   8, 420),
    ]);

    // ── Load progress ─────────────────────────────────────────────
    let loadPct    = 0;
    let galaxyFormed = false;

    const onProgress = (e: Event) => {
      loadPct = (e as CustomEvent<{ pct: number }>).detail.pct;
    };
    window.addEventListener("galaxyProgress", onProgress);

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
    };
    window.addEventListener("resize", onResize);

    const camTarget  = new THREE.Vector3(0, 180, 60);
    const lookTarget = new THREE.Vector3(0, 0, 0);
    const curLook    = new THREE.Vector3(0, 0, 0);

    let rafId: number;

    function tick() {
      rafId = requestAnimationFrame(tick);

      // ── Particle formation during load ────────────────────────
      if (!galaxyFormed) {
        const t = ss(0, 1, loadPct / 100);

        const armArr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          armArr[i * 3]     = lerp(armScatter[i * 3],     armTarget[i * 3],     t);
          armArr[i * 3 + 1] = lerp(armScatter[i * 3 + 1], armTarget[i * 3 + 1], t);
          armArr[i * 3 + 2] = lerp(armScatter[i * 3 + 2], armTarget[i * 3 + 2], t);
        }
        geo.attributes.position.needsUpdate = true;

        const fillArr = fillGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < FILL_COUNT; i++) {
          fillArr[i * 3]     = lerp(fillScatter[i * 3],     fillTarget[i * 3],     t);
          fillArr[i * 3 + 1] = lerp(fillScatter[i * 3 + 1], fillTarget[i * 3 + 1], t);
          fillArr[i * 3 + 2] = lerp(fillScatter[i * 3 + 2], fillTarget[i * 3 + 2], t);
        }
        fillGeo.attributes.position.needsUpdate = true;

        if (loadPct >= 100) galaxyFormed = true;
      }

      // ── Scroll-driven camera ──────────────────────────────────
      smoothP += (scrollRaw - smoothP) * 0.055;
      const p = smoothP;

      const phase2t = Math.max(0, ss(0.08, 0.22, p) - ss(0.22, 0.38, p));
      const phase3t = ss(0.50, 0.85, p);
      galaxy.rotation.y -= lerp(0.0014, 0.0058, Math.max(phase2t, phase3t));

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
      window.removeEventListener("galaxyProgress", onProgress);
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
