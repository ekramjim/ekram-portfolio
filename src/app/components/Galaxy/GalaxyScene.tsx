"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const PARTICLE_COUNT = 60_000;
const DUST_COUNT     = 80_000;
const BURST_DUR      = 1.8;
const MAX_DELAY      = 0.3;
const BURST_TOTAL    = BURST_DUR + MAX_DELAY;
const SPIN_WIND      = 2.0;
const PRE_BURST_BLOOM = 0.32;

// ── Layer 1: spiral arm particles (all orange, uniform size) ─────
function buildArmGeometry(maxRadius: number) {
  const positions       = new Float32Array(PARTICLE_COUNT * 3);
  const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
  const colors          = new Float32Array(PARTICLE_COUNT * 3);
  const sizes           = new Float32Array(PARTICLE_COUNT);
  const delays          = new Float32Array(PARTICLE_COUNT);

  const coreColor = new THREE.Color(0.95, 0.52, 0.08); // orange core, not white
  const midColor  = new THREE.Color(0.85, 0.32, 0.02);
  const edgeColor = new THREE.Color(0.12, 0.03, 0.0);
  const tmp = new THREE.Color();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const arm    = i % 3;
    const t      = Math.pow(Math.random(), 0.6);
    const radius = t * maxRadius;
    const spin   = (radius / maxRadius) * Math.PI * 5;
    const angle  = (arm / 3) * Math.PI * 2 + spin;
    const spread = (Math.random() - 0.5) * radius * 0.75;

    const x = Math.cos(angle) * radius + spread;
    const y = (Math.random() - 0.5) * radius * 0.08;
    const z = Math.sin(angle) * radius + spread;

    targetPositions[i * 3]     = x;
    targetPositions[i * 3 + 1] = y;
    targetPositions[i * 3 + 2] = z;
    delays[i] = Math.random() * MAX_DELAY;

    sizes[i] = 0.4 + Math.random() * 0.15; // // uniform — density varies, not size 

    const dist = Math.sqrt(x * x + z * z);
    const n    = Math.min(dist / maxRadius, 1.0);

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
  geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
  return { geo, targetPositions, delays, total: PARTICLE_COUNT };
}

// ── Layer 2: interarm dust — fills gaps so galaxy reads as solid mass
function buildDustGeometry(maxRadius: number) {
  const positions       = new Float32Array(DUST_COUNT * 3);
  const targetPositions = new Float32Array(DUST_COUNT * 3);
  const delays          = new Float32Array(DUST_COUNT);

  for (let i = 0; i < DUST_COUNT; i++) {
    const r     = Math.pow(Math.random(), 0.55) * maxRadius;
    const theta = Math.random() * Math.PI * 2;

    targetPositions[i * 3]     = Math.cos(theta) * r;
    targetPositions[i * 3 + 1] = (Math.random() - 0.5) * r * 0.06;
    targetPositions[i * 3 + 2] = Math.sin(theta) * r;

    delays[i] = Math.random() * MAX_DELAY;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return { geo, targetPositions, delays };
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

    const dpr = Math.min(devicePixelRatio, 2);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.0;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.8;

    // ── Arm particles ─────────────────────────────────────────────
    const { geo: armGeo, targetPositions: armTarget, delays: armDelays, total: armTotal }
      = buildArmGeometry(maxRadius);

    const uScaleVal = window.innerHeight * dpr / 2;
    const armMat = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: uScaleVal } },
      vertexShader: /* glsl */`
        attribute float aSize;
        attribute vec3  color;
        varying   vec3  vColor;
        uniform   float uScale;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uScale / -mv.z;
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3 vColor;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float a = 1.0 - smoothstep(0.3, 1.0, r);
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    const armPoints = new THREE.Points(armGeo, armMat);

    // ── Dust layer ────────────────────────────────────────────────
    const { geo: dustGeo, targetPositions: dustTarget, delays: dustDelays }
      = buildDustGeometry(maxRadius);

    const dustMat = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: uScaleVal } },
      vertexShader: /* glsl */`
        uniform float uScale;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 0.4 * uScale / -mv.z;
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */`
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float a = (1.0 - smoothstep(0.3, 1.0, r)) * 0.45;
          gl_FragColor = vec4(0.65, 0.28, 0.05, a);
        }
      `,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);

    // Both layers in one group so rotation is always in sync
    const galaxy = new THREE.Group();
    galaxy.add(armPoints);
    galaxy.add(dustPoints);
    scene.add(galaxy);

    const rings = buildOrbitRings();
    scene.add(rings);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8, 0.6, 0.72
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
      const d = Math.min(devicePixelRatio, 2);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(d);
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.resolution.set(window.innerWidth, window.innerHeight);
      const s = window.innerHeight * d / 2;
      armMat.uniforms.uScale.value  = s;
      dustMat.uniforms.uScale.value = s;
    };
    window.addEventListener("resize", onResize);

    const camTarget  = new THREE.Vector3(0, 200, 120);
    const lookTarget = new THREE.Vector3(0, 0, 0);
    const curLook    = new THREE.Vector3(0, 0, 0);

    let introReady   = false;
    let burstElapsed = 0;
    let spinWindT    = 0;

    window.addEventListener("galaxyReady", () => { introReady = true; }, { once: true });

    let rafId: number;
    let time = 0;

    function tick() {
      rafId = requestAnimationFrame(tick);
      time += 0.016;

      // ── Pre-burst ─────────────────────────────────────────────
      if (!introReady) {
        camera.position.set(0, 4, 8);
        camera.lookAt(0, 0, 0);
        galaxy.rotation.y += 0.0008;
        bloomPass.strength = PRE_BURST_BLOOM;
        composer.render();
        return;
      }

      const burstDone = burstElapsed >= BURST_TOTAL;

      // ── Burst phase ───────────────────────────────────────────
      if (!burstDone) {
        burstElapsed = Math.min(burstElapsed + 0.016, BURST_TOTAL);

        // Arm particles
        const armAttr = armGeo.attributes.position as THREE.BufferAttribute;
        const armArr  = armAttr.array as Float32Array;
        for (let i = 0; i < armTotal; i++) {
          const pt   = Math.max(0, Math.min(1, (burstElapsed - armDelays[i]) / BURST_DUR));
          const ease = pt === 1 ? 1 : 1 - Math.pow(2, -10 * pt);
          armArr[i * 3]     = armTarget[i * 3]     * ease;
          armArr[i * 3 + 1] = armTarget[i * 3 + 1] * ease;
          armArr[i * 3 + 2] = armTarget[i * 3 + 2] * ease;
        }
        armAttr.needsUpdate = true;

        // Dust particles
        const dustAttr = dustGeo.attributes.position as THREE.BufferAttribute;
        const dustArr  = dustAttr.array as Float32Array;
        for (let i = 0; i < DUST_COUNT; i++) {
          const pt   = Math.max(0, Math.min(1, (burstElapsed - dustDelays[i]) / BURST_DUR));
          const ease = pt === 1 ? 1 : 1 - Math.pow(2, -10 * pt);
          dustArr[i * 3]     = dustTarget[i * 3]     * ease;
          dustArr[i * 3 + 1] = dustTarget[i * 3 + 1] * ease;
          dustArr[i * 3 + 2] = dustTarget[i * 3 + 2] * ease;
        }
        dustAttr.needsUpdate = true;

        const camEase = 1 - Math.pow(1 - burstElapsed / BURST_TOTAL, 3);
        camera.position.set(0, lerp(4, 200, camEase), lerp(8, 120, camEase));
        camera.lookAt(0, 0, 0);
        galaxy.rotation.y += 0.006;
        bloomPass.strength  = lerp(PRE_BURST_BLOOM, 1.2, camEase);
        composer.render();
        return;
      }

      // ── Post-burst wind-down ──────────────────────────────────
      spinWindT = Math.min(spinWindT + 0.016 / SPIN_WIND, 1);
      const windEase = 1 - Math.pow(1 - spinWindT, 3);
      bloomPass.strength = lerp(1.4, 0.8, windEase);

      // ── Scroll-driven camera ──────────────────────────────────
      smoothP += (scrollRaw - smoothP) * 0.055;
      const p = smoothP;

      const phase2t = Math.max(0, ss(0.08, 0.22, p) - ss(0.22, 0.38, p));
      galaxy.rotation.y += lerp(0.006, lerp(0.0003, 0.0038, phase2t), windEase);

      const ringFade = ss(0.3, 0.52, p) * (1 - ss(0.7, 0.88, p));
      rings.children.forEach((child, ci) => {
        const m = (child as THREE.LineLoop).material as THREE.LineBasicMaterial;
        m.opacity = ringFade * (0.1 + 0.06 * Math.sin(time * 1.5 + ci * 1.1));
      });

      if (p < 0.35) {
        const t = ss(0, 0.35, p);
        camTarget.set(0, lerp(200, 240, t), lerp(120, 150, t));
        lookTarget.set(0, 0, 0);
      } else if (p < 0.52) {
        const t = ss(0.35, 0.52, p);
        camTarget.set(0, lerp(240, 290, t), lerp(150, 50, t));
        lookTarget.set(0, 0, 0);
      } else {
        camTarget.copy(spline.getPoint(ss(0.52, 1.0, p)));
        lookTarget.set(0, 0, 0);
      }

      camera.position.lerp(camTarget, 0.09);
      curLook.lerp(lookTarget, 0.09);
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
      armGeo.dispose();
      dustGeo.dispose();
      armMat.dispose();
      dustMat.dispose();
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
