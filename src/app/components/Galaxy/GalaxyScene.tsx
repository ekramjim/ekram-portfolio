"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const PARTICLE_COUNT = 50_000;
const FILL_COUNT     = 35_000;
const BRIGHT_COUNT   = 1_200;
const ARMS           = 4;
const MAX_RADIUS     = 120;
const SCATTER_R      = 380; // scatter start radius — wide starfield

function ss(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function writeScatterPoint(out: Float32Array, i: number) {
  const sr     = Math.sqrt(Math.random()) * SCATTER_R;
  const stheta = Math.random() * Math.PI * 2;
  out[i * 3]     = Math.cos(stheta) * sr;
  out[i * 3 + 1] = (Math.random() - 0.5) * 40;
  out[i * 3 + 2] = Math.sin(stheta) * sr;
}

function writeArmPoint(out: Float32Array, i: number) {
  const arm = i % ARMS;
  const t   = Math.pow(Math.random(), 0.55);
  const r   = t * MAX_RADIUS;

  const armAngle  = (arm / ARMS) * Math.PI * 2;
  const spinAngle = r * -0.065;
  const dAngle    = (Math.random() - 0.5) * 0.55;
  const dR        = (Math.random() - 0.5) * r * 0.22;

  const ang = armAngle + spinAngle + dAngle;
  const rad = r + dR;

  out[i * 3]     = Math.cos(ang) * rad;
  out[i * 3 + 1] = (Math.random() - 0.5) * r * 0.07 + (Math.random() - 0.5) * 1.2;
  out[i * 3 + 2] = Math.sin(ang) * rad;
}

// Soft radial-gradient sprite so points render as glowing dust, not squares.
function makeSpriteTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.55)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

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
    writeScatterPoint(scatterPos, i);
    writeArmPoint(targetPos, i);

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
      // Floor the dim so outer-arm particles fade out instead of vanishing.
      const dim = 1.0 - (n - 0.55) * 2.0;
      tmp.copy(edgeColor).multiplyScalar(Math.max(dim, 0.25));
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
    writeScatterPoint(scatterPos, i);

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
      tmp.copy(edgeColor).multiplyScalar(Math.max(dim, 0.25));
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

// Sparse hot outliers along the arms — breaks the uniform particle size.
function buildBrightGeometry() {
  const positions  = new Float32Array(BRIGHT_COUNT * 3);
  const scatterPos = new Float32Array(BRIGHT_COUNT * 3);
  const targetPos  = new Float32Array(BRIGHT_COUNT * 3);
  const colors     = new Float32Array(BRIGHT_COUNT * 3);

  for (let i = 0; i < BRIGHT_COUNT; i++) {
    writeScatterPoint(scatterPos, i);
    writeArmPoint(targetPos, i);

    positions[i * 3]     = scatterPos[i * 3];
    positions[i * 3 + 1] = scatterPos[i * 3 + 1];
    positions[i * 3 + 2] = scatterPos[i * 3 + 2];

    const b = 0.7 + Math.random() * 0.3;
    colors[i * 3]     = 1.0 * b;
    colors[i * 3 + 1] = (0.4 + Math.random() * 0.25) * b;
    colors[i * 3 + 2] = 0.1 * b;
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

    const sprite = makeSpriteTexture();

    const { geo, scatterPos: armScatter, targetPos: armTarget } = buildGalaxyGeometry();
    const mat = new THREE.PointsMaterial({
      size: 0.9,
      map: sprite,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);

    const { geo: fillGeo, scatterPos: fillScatter, targetPos: fillTarget } = buildFillGeometry();
    const fillMat = new THREE.PointsMaterial({
      size: 0.6,
      map: sprite,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fillPoints = new THREE.Points(fillGeo, fillMat);

    const { geo: brightGeo, scatterPos: brightScatter, targetPos: brightTarget } = buildBrightGeometry();
    const brightMat = new THREE.PointsMaterial({
      size: 2.2,
      map: sprite,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const brightPoints = new THREE.Points(brightGeo, brightMat);

    const galaxy = new THREE.Group();
    galaxy.add(points);
    galaxy.add(fillPoints);
    galaxy.add(brightPoints);
    scene.add(galaxy);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.45, // strength
      0.7,  // radius
      0.55, // threshold
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // One continuous camera path for the whole scroll — a single spline avoids
    // the stop-start velocity discontinuities of piecewise segments.
    const camPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 180,  60),
      new THREE.Vector3(0, 240, 120),
      new THREE.Vector3(0, 290,  50),
      new THREE.Vector3(0, 160, 130),
      new THREE.Vector3(0,  40, 220),
      new THREE.Vector3(0,   8, 420),
    ]);

    // ── Load progress ─────────────────────────────────────────────
    let loadPct      = 0;
    let formT        = 0; // eased toward loadPct so formation glides despite chunky loader steps
    let galaxyFormed = false;

    const onProgress = (e: Event) => {
      // Monotonic: a stray/replayed progress event must never un-form the galaxy.
      loadPct = Math.max(loadPct, (e as CustomEvent<{ pct: number }>).detail.pct);
    };
    window.addEventListener("galaxyProgress", onProgress);

    const HERO_VH = 5;
    // Capture stable height — address bar show/hide changes innerHeight and
    // would shift the scroll percentage even if the user hasn't moved.
    // Refreshed on width changes (rotation / window resize) below.
    let stableH = window.innerHeight;
    let scrollRaw = 0;
    let smoothP   = 0;

    const onScroll = () => {
      // Clamp to [0,1]: iOS rubber-band makes scrollY briefly negative, which
      // drives smoothP below 0 and causes the camera to bounce.
      scrollRaw = Math.max(0, Math.min(window.scrollY / (stableH * HERO_VH), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Only resize when WIDTH changes. Address bar show/hide is a height-only
    // event; resizing on it changes camera.aspect and causes a visible zoom jerk.
    let lastWidth = window.innerWidth;
    let resizeId: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      if (resizeId !== null) clearTimeout(resizeId);
      resizeId = setTimeout(() => {
        resizeId = null;
        stableH = window.innerHeight;
        onScroll();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    const camTarget  = new THREE.Vector3(0, 180, 60);
    const lookTarget = new THREE.Vector3(0, 0, 0);
    const curLook    = new THREE.Vector3(0, 0, 0);

    const clock = new THREE.Clock();
    let rafId: number;

    function tick() {
      rafId = requestAnimationFrame(tick);
      // Clamp dt so a backgrounded tab doesn't produce a huge jump on return.
      const dt = Math.min(clock.getDelta(), 0.05);

      // ── Particle formation during load ────────────────────────
      if (!galaxyFormed) {
        formT += (loadPct / 100 - formT) * (1 - Math.exp(-4 * dt));
        if (loadPct >= 100 && formT > 0.997) {
          formT = 1;
          galaxyFormed = true;
        }
        const t = ss(0, 1, formT);

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

        const brightArr = brightGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < BRIGHT_COUNT; i++) {
          brightArr[i * 3]     = lerp(brightScatter[i * 3],     brightTarget[i * 3],     t);
          brightArr[i * 3 + 1] = lerp(brightScatter[i * 3 + 1], brightTarget[i * 3 + 1], t);
          brightArr[i * 3 + 2] = lerp(brightScatter[i * 3 + 2], brightTarget[i * 3 + 2], t);
        }
        brightGeo.attributes.position.needsUpdate = true;
      }

      // ── Scroll-driven camera ──────────────────────────────────
      // Exponential smoothing in dt terms — identical feel at 60Hz and 120Hz.
      smoothP += (scrollRaw - smoothP) * (1 - Math.exp(-3.5 * dt));
      const p = smoothP;

      // Monotonic spin-up across the scroll (radians/second).
      const rotSpeed = lerp(0.085, 0.35, ss(0.08, 0.85, p));
      galaxy.rotation.y -= rotSpeed * dt;
      // Fill cloud drifts at a slightly different rate for parallax depth.
      fillPoints.rotation.y += rotSpeed * 0.18 * dt;

      camTarget.copy(camPath.getPoint(ss(0, 1, p)));
      lookTarget.set(0, 0, 0);

      const kCam = 1 - Math.exp(-4.3 * dt);
      camera.position.lerp(camTarget, kCam);
      curLook.lerp(lookTarget, kCam);
      camera.lookAt(curLook);
      composer.render();
    }

    tick();

    return () => {
      if (resizeId !== null) clearTimeout(resizeId);
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
      brightGeo.dispose();
      brightMat.dispose();
      sprite.dispose();
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
        transform: "translateZ(0)",
      }}
    />
  );
}
