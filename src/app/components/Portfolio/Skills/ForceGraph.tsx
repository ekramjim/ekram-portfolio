"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const GROUPS = [
  {
    label: "Languages",
    color: new THREE.Color("#FF6600"),
    skills: [
      { name: "Python", pct: 92 }, { name: "TypeScript", pct: 88 },
      { name: "JavaScript", pct: 86 }, { name: "Swift", pct: 80 },
      { name: "SQL", pct: 80 }, { name: "HTML/CSS", pct: 88 },
      { name: "R", pct: 74 }, { name: "Java", pct: 72 },
    ],
  },
  {
    label: "Technologies",
    color: new THREE.Color("#FF5500"),
    skills: [
      { name: "Next.js", pct: 92 }, { name: "React", pct: 88 },
      { name: "iOS", pct: 82 }, { name: "Node.js", pct: 80 },
      { name: "Android", pct: 74 }, { name: "MongoDB", pct: 74 },
      { name: "AWS", pct: 58 },
    ],
  },
  {
    label: "Data & Bio",
    color: new THREE.Color("#FF7700"),
    skills: [
      { name: "Pandas", pct: 88 }, { name: "NumPy", pct: 86 },
      { name: "Scikit-learn", pct: 76 }, { name: "PyTorch", pct: 70 },
      { name: "RNA-seq", pct: 74 }, { name: "limma", pct: 70 },
      { name: "DESeq2", pct: 70 }, { name: "Bioconductor", pct: 64 },
    ],
  },
  {
    label: "Tools",
    color: new THREE.Color("#FF4400"),
    skills: [
      { name: "Git", pct: 90 }, { name: "RStudio", pct: 84 },
      { name: "Jupyter", pct: 84 }, { name: "Xcode", pct: 76 },
      { name: "Docker", pct: 64 }, { name: "Firebase", pct: 72 },
    ],
  },
  {
    label: "Soft Skills",
    color: new THREE.Color("#FF6A00"),
    skills: [
      { name: "Leadership", pct: 90 }, { name: "Communication", pct: 88 },
      { name: "Public Speaking", pct: 80 }, { name: "Agile", pct: 78 },
      { name: "Mentorship", pct: 76 },
    ],
  },
];

type CatNode = {
  index: number; label: string; color: THREE.Color;
  x: number; y: number; tx: number; ty: number; ox: number; oy: number;
  scale: number; tScale: number; alpha: number; tAlpha: number;
  mesh: THREE.Mesh;
};

type SkillNode = {
  name: string; pct: number; groupIdx: number;
  x: number; y: number; tx: number; ty: number;
  alpha: number; tAlpha: number;
  mesh: THREE.Mesh;
};

function lp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function ForceGraph() {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const labelCanvas = labelRef.current;
    if (!mount || !labelCanvas || typeof window === "undefined") return;

    const W = mount.offsetWidth;
    const H = mount.offsetHeight;
    const dpr = Math.min(devicePixelRatio, 2);

    // radii proportional to viewport — scales correctly on any screen
    const mobile   = W < 640;
    const base     = Math.min(W, H);
    const IDLE_R   = base * (mobile ? 0.18 : 0.22);
    const SKILL_R  = base * (mobile ? 0.16 : 0.19);
    const SPREAD_R = base * (mobile ? 0.28 : 0.42);
    const CAT_R    = base * (mobile ? 0.045 : 0.038);


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W/2, W/2, H/2, -H/2, 0.1, 100);
    camera.position.z = 10;

    labelCanvas.width  = W * dpr;
    labelCanvas.height = H * dpr;
    labelCanvas.style.width  = W + "px";
    labelCanvas.style.height = H + "px";
    const ctx = labelCanvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // ── Category nodes ────────────────────────────────────────────
    const catNodes: CatNode[] = GROUPS.map((g, i) => {
      const angle = -Math.PI / 2 + i * (Math.PI * 2 / GROUPS.length);
      const ox = IDLE_R * Math.cos(angle);
      const oy = IDLE_R * Math.sin(angle);
      const geo  = new THREE.CircleGeometry(CAT_R, 48);
      const mat  = new THREE.MeshBasicMaterial({ color: g.color, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(ox, oy, 0);
      scene.add(mesh);
      return { index: i, label: g.label, color: g.color.clone(), x: ox, y: oy, tx: ox, ty: oy, ox, oy, scale: 1, tScale: 1, alpha: 1, tAlpha: 1, mesh };
    });

    // ── Skill nodes ───────────────────────────────────────────────
    const allSkillNodes: SkillNode[] = [];
    GROUPS.forEach((g, gi) => {
      g.skills.forEach((skill) => {
        const size = (base * 0.006) + (skill.pct / 100) * (base * 0.01);
        const geo  = new THREE.CircleGeometry(size, 32);
        const mat  = new THREE.MeshBasicMaterial({ color: g.color, transparent: true, opacity: 0 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
        allSkillNodes.push({ name: skill.name, pct: skill.pct, groupIdx: gi, x: 0, y: 0, tx: 0, ty: 0, alpha: 0, tAlpha: 0, mesh });
      });
    });

    // ── Background parallax particles ────────────────────────────
    const BG_COUNT = mobile ? 120 : 350;
    const bgBaseY  = new Float32Array(BG_COUNT);
    const bgPosArr = new Float32Array(BG_COUNT * 3);
    for (let i = 0; i < BG_COUNT; i++) {
      const x = (Math.random() - 0.5) * W * 1.3;
      const y = (Math.random() - 0.5) * H * 1.3;
      bgPosArr[i * 3]     = x;
      bgPosArr[i * 3 + 1] = y;
      bgPosArr[i * 3 + 2] = -2;
      bgBaseY[i] = y;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPosArr, 3));
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = dotCanvas.height = 32;
    const dotCtx = dotCanvas.getContext("2d")!;
    dotCtx.beginPath();
    dotCtx.arc(16, 16, 16, 0, Math.PI * 2);
    dotCtx.fillStyle = "#ffffff";
    dotCtx.fill();
    const bgTex = new THREE.CanvasTexture(dotCanvas);
    const bgMat = new THREE.PointsMaterial({ color: 0xff6600, size: 5, transparent: true, opacity: 0.35, sizeAttenuation: false, map: bgTex, alphaTest: 0.1 });
    const bgPoints = new THREE.Points(bgGeo, bgMat);
    scene.add(bgPoints);

    // ── HTML label divs (match page CSS font exactly) ─────────────
    const labelContainer = document.createElement("div");
    labelContainer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden;";
    mount.appendChild(labelContainer);

    const catLabelDivs = catNodes.map(n => {
      const div = document.createElement("div");
      div.style.cssText = "position:absolute;top:0;left:0;color:#fff;text-align:center;white-space:nowrap;font-family:var(--font-space-mono),'Space Mono',monospace;will-change:transform,opacity;";
      div.textContent = n.label.toUpperCase();
      labelContainer.appendChild(div);
      return div;
    });

    const skillLabelDivs = allSkillNodes.map(s => {
      const div = document.createElement("div");
      div.style.cssText = `position:absolute;top:0;left:0;color:#fff;text-align:center;white-space:nowrap;font-size:${mobile ? "10px" : "13px"};font-family:var(--font-space-mono),'Space Mono',monospace;opacity:0;will-change:transform,opacity;`;
      div.textContent = s.name;
      labelContainer.appendChild(div);
      return div;
    });

    // ── Edges ─────────────────────────────────────────────────────
    const MAX_E = 12;
    const ePos  = new Float32Array(MAX_E * 6);
    const eCol  = new Float32Array(MAX_E * 6);
    const eGeo  = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(ePos, 3));
    eGeo.setAttribute("color",    new THREE.BufferAttribute(eCol, 3));
    const eLines = new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45 }));
    scene.add(eLines);

    // ── State ─────────────────────────────────────────────────────
    let selectedCat: number | null = null;
    let scrollProgress = 0;
    let idleT = 0;

    function expandCat(idx: number) {
      if (selectedCat === idx) return;
      selectedCat = idx;
      catNodes[idx].tx = 0; catNodes[idx].ty = 0; catNodes[idx].tScale = 1.5; catNodes[idx].tAlpha = 1;
      catNodes.forEach((n, i) => {
        if (i === idx) return;
        const angle = -Math.PI / 2 + i * (Math.PI * 2 / GROUPS.length);
        n.tx = SPREAD_R * Math.cos(angle); n.ty = SPREAD_R * Math.sin(angle);
        n.tScale = 0.6; n.tAlpha = 0.12;
      });
      const mySkills = allSkillNodes.filter(s => s.groupIdx === idx);
      mySkills.forEach((s, j) => {
        const angle = -Math.PI / 2 + j * (Math.PI * 2 / mySkills.length);
        s.tx = SKILL_R * Math.cos(angle);
        s.ty = SKILL_R * Math.sin(angle);
        s.tAlpha = 1;
      });
      allSkillNodes.filter(s => s.groupIdx !== idx).forEach(s => { s.tx = 0; s.ty = 0; s.tAlpha = 0; });
    }

    function collapse() {
      if (selectedCat === null) return;
      selectedCat = null;
      catNodes.forEach(n => { n.tx = n.ox; n.ty = n.oy; n.tScale = 1; n.tAlpha = 1; });
      allSkillNodes.forEach(s => { s.tx = 0; s.ty = 0; s.tAlpha = 0; });
    }

    // ── Scroll-driven category selection ──────────────────────────
    const onScroll = () => {
      const section = mount.closest("section");
      if (!section) return;
      const rect        = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      scrollProgress = progress;

      if (progress <= 0.02) {
        collapse();
      } else {
        const idx = Math.min(Math.floor(progress * GROUPS.length), GROUPS.length - 1);
        expandCat(idx);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      const nW = mount.offsetWidth; const nH = mount.offsetHeight;
      renderer.setSize(nW, nH);
      camera.left = -nW/2; camera.right = nW/2;
      camera.top  =  nH/2; camera.bottom = -nH/2;
      camera.updateProjectionMatrix();
      labelCanvas.width  = nW * dpr; labelCanvas.height = nH * dpr;
      labelCanvas.style.width = nW+"px"; labelCanvas.style.height = nH+"px";
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", onResize);

    const wv = new THREE.Vector3();
    let rafId: number;

    function tick() {
      rafId = requestAnimationFrame(tick);
      idleT += 0.007;

      // background particles — parallax (move at 40% of scroll speed) + slow idle drift
      const scrollOffset = scrollProgress * H * 0.9;
      const idleDrift    = idleT * 6;
      const range        = H * 1.3;
      for (let i = 0; i < BG_COUNT; i++) {
        let y = bgBaseY[i] + scrollOffset + idleDrift;
        // wrap vertically so particles never disappear
        y = ((y + H * 0.65) % range + range) % range - H * 0.65;
        bgPosArr[i * 3 + 1] = y;
      }
      bgGeo.attributes.position.needsUpdate = true;

      catNodes.forEach((n, i) => {
        let fx = n.tx, fy = n.ty;
        if (selectedCat === null) {
          fx += Math.sin(idleT * 0.6 + i * 1.4) * 7;
          fy += Math.cos(idleT * 0.45 + i * 1.0) * 5;
        }
        n.x = lp(n.x, fx, 0.1); n.y = lp(n.y, fy, 0.1);
        n.scale = lp(n.scale, n.tScale, 0.1);
        n.alpha = lp(n.alpha, n.tAlpha, 0.1);
        n.mesh.position.set(n.x, n.y, 0);
        n.mesh.scale.setScalar(n.scale);
        (n.mesh.material as THREE.MeshBasicMaterial).opacity = n.alpha;
      });

      allSkillNodes.forEach(s => {
        s.x = lp(s.x, s.tx, 0.1); s.y = lp(s.y, s.ty, 0.1);
        s.alpha = lp(s.alpha, s.tAlpha, 0.1);
        s.mesh.position.set(s.x, s.y, 0);
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = s.alpha;
      });

      // edges
      let ei = 0;
      if (selectedCat !== null) {
        const cn = catNodes[selectedCat];
        const c  = GROUPS[selectedCat].color;
        allSkillNodes.filter(s => s.groupIdx === selectedCat && s.alpha > 0.05).forEach(s => {
          if (ei >= MAX_E) return;
          const a = s.alpha * 0.5;
          const base2 = ei * 6;
          ePos[base2]=cn.x; ePos[base2+1]=cn.y; ePos[base2+2]=0;
          ePos[base2+3]=s.x; ePos[base2+4]=s.y; ePos[base2+5]=0;
          eCol[base2]=c.r*a; eCol[base2+1]=c.g*a; eCol[base2+2]=c.b*a;
          eCol[base2+3]=c.r*a; eCol[base2+4]=c.g*a; eCol[base2+5]=c.b*a;
          ei++;
        });
      }
      for (let i = ei*6; i < MAX_E*6; i++) { ePos[i]=0; eCol[i]=0; }
      eGeo.attributes.position.needsUpdate = true;
      eGeo.attributes.color.needsUpdate    = true;
      eGeo.setDrawRange(0, ei * 2);

      renderer.render(scene, camera);

      // ── HTML div labels ────────────────────────────────────────
      const cW = mount.offsetWidth; const cH = mount.offsetHeight;
      ctx.clearRect(0, 0, cW, cH);

      catNodes.forEach((n, i) => {
        const div = catLabelDivs[i];
        const isSelected = selectedCat === n.index;
        // hide label on the selected centre node — right-side indicator already names it
        if (isSelected) { div.style.opacity = "0"; return; }
        wv.set(n.x, n.y, 0); wv.project(camera);
        const sx = (wv.x * 0.5 + 0.5) * cW;
        const sy = (-wv.y * 0.5 + 0.5) * cH;
        div.style.fontSize   = mobile ? "9px" : "11px";
        div.style.fontWeight = "400";
        div.style.opacity    = String(n.alpha < 0.04 ? 0 : selectedCat !== null ? Math.min(n.alpha, 0.12) : n.alpha);
        div.style.transform  = `translate(${sx}px,${sy + 4}px) translateX(-50%)`;
      });

      allSkillNodes.forEach((s, i) => {
        const div = skillLabelDivs[i];
        if (s.alpha < 0.04) { div.style.opacity = "0"; return; }
        wv.set(s.x, s.y, 0); wv.project(camera);
        const sx = (wv.x * 0.5 + 0.5) * cW;
        const sy = (-wv.y * 0.5 + 0.5) * cH;
        const nodeR = (base * 0.006) + (s.pct / 100) * (base * 0.01);
        // place label radially outward from viewport centre so labels never point inward
        const dx = sx - cW / 2; const dy = sy - cH / 2;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const screenNodeR = nodeR * (cW / W);
        const offset = screenNodeR + (mobile ? 8 : 12);
        const rawLx = sx + (dx / len) * offset;
        const rawLy = sy + (dy / len) * offset;
        // clamp so label stays inside canvas
        const pad = mobile ? 36 : 60;
        const lx = Math.max(pad, Math.min(cW - pad, rawLx));
        const ly = Math.max(16, Math.min(cH - 60, rawLy));
        div.style.opacity   = String(s.alpha);
        div.style.transform = `translate(${lx}px,${ly}px) translateX(-50%) translateY(${dy < 0 ? "-100%" : "0"})`;
      });

      if (mobile) {
        // ── Mobile: bottom horizontal progress bar ───────────────
        const margin  = Math.max((cW - 1280) / 2, 0) + 20;
        const barLeft = margin;
        const barRight = cW - margin;
        const barSpan  = barRight - barLeft;
        const step     = barSpan / (GROUPS.length - 1);
        const barY     = cH - 28;

        GROUPS.forEach((g, i) => {
          const isActive = selectedCat === i;
          const bx  = barLeft + i * step;
          const c   = g.color;
          const col = `rgb(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)})`;

          if (i < GROUPS.length - 1) {
            const nx = barLeft + (i + 1) * step;
            const pctFilled = selectedCat !== null && i < selectedCat ? 1
              : selectedCat !== null && i === selectedCat ? (scrollProgress * GROUPS.length) % 1 : 0;
            ctx.globalAlpha = 0.18; ctx.strokeStyle = "#FF6600"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(bx + 7, barY); ctx.lineTo(nx - 7, barY); ctx.stroke();
            if (pctFilled > 0) {
              ctx.globalAlpha = 0.65; ctx.strokeStyle = col;
              ctx.beginPath(); ctx.moveTo(bx + 7, barY); ctx.lineTo(bx + 7 + (nx - bx - 14) * pctFilled, barY); ctx.stroke();
            }
          }
          ctx.globalAlpha = isActive ? 1 : 0.28;
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(bx, barY, isActive ? 5 : 3, 0, Math.PI * 2); ctx.fill();
          if (isActive) {
            ctx.globalAlpha = 0.95;
            ctx.font = "bold 9px 'Space Mono', monospace";
            ctx.textAlign = "center"; ctx.fillStyle = "#ffffff";
            ctx.fillText(g.label.toUpperCase(), bx, barY - 12);
          }
          ctx.globalAlpha = 1;
        });
      } else {
        // ── Desktop: right-side vertical progress indicator ───────
        const containerRight = Math.max((cW - 1280) / 2, 0) + 24;
        const dotX    = cW - containerRight - 4;
        const dotGap  = 28;
        const dotsTop = cH / 2 - ((GROUPS.length - 1) * dotGap) / 2;

        GROUPS.forEach((g, i) => {
          const isActive = selectedCat === i;
          const dotY = dotsTop + i * dotGap;
          const c = g.color;
          const col = `rgb(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)})`;

          if (i < GROUPS.length - 1) {
            const nextY = dotsTop + (i + 1) * dotGap;
            const pctFilled = selectedCat !== null && i < selectedCat ? 1
              : selectedCat !== null && i === selectedCat ? (scrollProgress * GROUPS.length) % 1 : 0;
            ctx.globalAlpha = 0.15; ctx.strokeStyle = "#FF6600"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(dotX, dotY + 6); ctx.lineTo(dotX, nextY - 6); ctx.stroke();
            if (pctFilled > 0) {
              ctx.globalAlpha = 0.6; ctx.strokeStyle = col;
              ctx.beginPath(); ctx.moveTo(dotX, dotY + 6); ctx.lineTo(dotX, dotY + 6 + (nextY - dotY - 12) * pctFilled); ctx.stroke();
            }
          }
          ctx.globalAlpha = isActive ? 1 : 0.25;
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(dotX, dotY, isActive ? 5 : 3, 0, Math.PI * 2); ctx.fill();

          ctx.globalAlpha = isActive ? 0.9 : 0.35;
          ctx.font = isActive ? "bold 13px 'Space Mono', monospace" : "11px 'Space Mono', monospace";
          ctx.textAlign = "right"; ctx.fillStyle = "#ffffff";
          ctx.fillText(g.label.toUpperCase(), dotX - 10, dotY + 3.5);
          ctx.globalAlpha = 1;
        });
      }

      // scroll hint — only before first interaction
      if (scrollProgress < 0.05) {
        ctx.globalAlpha = (0.25 + 0.15 * Math.sin(idleT * 2)) * (1 - scrollProgress / 0.05);
        ctx.font = `${mobile ? 10 : 12}px 'Space Mono', monospace`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#FF6600";
        ctx.fillText("scroll to explore", cW / 2, cH / 2 + (mobile ? 120 : 160));
        ctx.globalAlpha = 1;
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      if (mount.contains(labelContainer)) mount.removeChild(labelContainer);
      renderer.dispose();
      eGeo.dispose();
      bgGeo.dispose(); bgMat.dispose(); bgTex.dispose();
      catNodes.forEach(n => { n.mesh.geometry.dispose(); (n.mesh.material as THREE.Material).dispose(); });
      allSkillNodes.forEach(s => { s.mesh.geometry.dispose(); (s.mesh.material as THREE.Material).dispose(); });
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={labelRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }} />
    </div>
  );
}
