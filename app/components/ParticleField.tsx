"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ParticleField
 * A single THREE.Points system that:
 *  1. Assembles into the text "ABDURRAHMAN" at the top of the page.
 *  2. Disperses into an ambient field as the user scrolls past the hero.
 *  3. Continuously drifts + rotates, with rotation/forward motion driven by
 *     overall scroll progress — so the background keeps moving as you scroll.
 *
 * Lightweight: one geometry, one draw call. Reduced count on mobile, disabled
 * for prefers-reduced-motion.
 */
export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // CSS ambient bg remains as fallback

    let disposed = false;
    let cleanup = () => {};

    const start = () => {
      if (disposed || !mount) return;

      const isMobile = window.innerWidth < 768;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    /* ── Scene + camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const visibleHeight = 2 * 50 * Math.tan((50 * Math.PI) / 360);
    let visibleWidth = visibleHeight * camera.aspect;

    /* ── Sample text "ABDURRAHMAN" into points ── */
    const textCanvas = document.createElement("canvas");
    const TW = 1000;
    const TH = 180;
    textCanvas.width = TW;
    textCanvas.height = TH;
    const tctx = textCanvas.getContext("2d")!;
    tctx.fillStyle = "#fff";
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    // Fit the name across the canvas
    let fontSize = 150;
    const NAME_FONT = `"Bricolage Grotesque", "Space Grotesk", Arial, sans-serif`;
    tctx.font = `700 ${fontSize}px ${NAME_FONT}`;
    let metrics = tctx.measureText("ABDURRAHMAN");
    while (metrics.width > TW * 0.94 && fontSize > 10) {
      fontSize -= 4;
      tctx.font = `700 ${fontSize}px ${NAME_FONT}`;
      metrics = tctx.measureText("ABDURRAHMAN");
    }
    tctx.fillText("ABDURRAHMAN", TW / 2, TH / 2);
    const data = tctx.getImageData(0, 0, TW, TH).data;

    // Collect filled pixels
    const step = isMobile ? 5 : 3;
    const filled: { x: number; y: number }[] = [];
    for (let y = 0; y < TH; y += step) {
      for (let x = 0; x < TW; x += step) {
        const alpha = data[(y * TW + x) * 4 + 3];
        if (alpha > 128) filled.push({ x, y });
      }
    }

    const COUNT = filled.length;
    const textPos = new Float32Array(COUNT * 3);
    const scatterPos = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT); // per-particle morph speed

    // Map text width to ~80% of visible width
    const textWorldWidth = visibleWidth * 0.82;
    const scaleX = textWorldWidth / TW;
    const scaleY = scaleX; // preserve aspect

    const colA = new THREE.Color(0x7b9cff); // blue
    const colB = new THREE.Color(0xb78bff); // violet
    const colC = new THREE.Color(0xeaf0ff); // near-white highlight

    const scatterRange = { x: visibleWidth * 1.4, y: visibleHeight * 1.4, z: 120 };

    for (let i = 0; i < COUNT; i++) {
      const p = filled[i];
      // text target (centered)
      const wx = (p.x - TW / 2) * scaleX;
      const wy = -(p.y - TH / 2) * scaleY;
      const wz = (Math.random() - 0.5) * 4;
      textPos[i * 3] = wx;
      textPos[i * 3 + 1] = wy;
      textPos[i * 3 + 2] = wz;

      // scatter target (wide volume)
      scatterPos[i * 3] = (Math.random() - 0.5) * scatterRange.x;
      scatterPos[i * 3 + 1] = (Math.random() - 0.5) * scatterRange.y;
      scatterPos[i * 3 + 2] = (Math.random() - 0.5) * scatterRange.z;

      // start assembled
      positions[i * 3] = wx;
      positions[i * 3 + 1] = wy;
      positions[i * 3 + 2] = wz;

      speeds[i] = 0.6 + Math.random() * 0.8;

      // color blend
      const t = Math.random();
      const c = t < 0.5 ? colA.clone().lerp(colB, t * 2) : colB.clone().lerp(colC, (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    /* ── Soft round sprite texture ── */
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext("2d")!;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(spriteCanvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.5 : 0.42,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    /* ── Scroll state ── */
    let heroProgress = 0; // 0 (assembled) → 1 (dispersed)
    let totalProgress = 0; // 0 → 1 across whole page
    const updateScroll = () => {
      const sy = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      heroProgress = Math.min(1, Math.max(0, sy / (vh * 1.2)));
      totalProgress = docH > 0 ? Math.min(1, Math.max(0, sy / docH)) : 0;
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    /* ── Animation loop ── */
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const clock = new THREE.Clock();
    let raf = 0;
    let smoothHero = 0;

    const tmp = { ease: (x: number) => x * x * (3 - 2 * x) }; // smoothstep

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // smooth the hero progress for nicer morph
      smoothHero += (heroProgress - smoothHero) * 0.08;
      const hp = tmp.ease(smoothHero);

      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const sp = speeds[i];
        const localHp = Math.min(1, hp * sp);
        // lerp text -> scatter
        const tx = textPos[i3];
        const ty = textPos[i3 + 1];
        const tz = textPos[i3 + 2];
        const sx = scatterPos[i3];
        const sy2 = scatterPos[i3 + 1];
        const sz = scatterPos[i3 + 2];
        // idle drift on scatter target
        const drift = Math.sin(time * 0.4 + i) * 0.6 * hp;
        arr[i3] = tx + (sx - tx) * localHp;
        arr[i3 + 1] = ty + (sy2 - ty) * localHp + drift;
        arr[i3 + 2] = tz + (sz - tz) * localHp;
      }
      posAttr.needsUpdate = true;

      // Continuous rotation + forward motion tied to scroll
      points.rotation.y = totalProgress * Math.PI * 1.5 + time * 0.02;
      points.rotation.x = totalProgress * 0.4;
      camera.position.z = 50 - totalProgress * 18; // fly forward slightly
      // gentle opacity: stronger when assembled, softer ambient when dispersed
      material.opacity = 0.9 - hp * 0.35;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      visibleWidth = visibleHeight * camera.aspect;
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ── */
      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", updateScroll);
        window.removeEventListener("resize", onResize);
        geometry.dispose();
        material.dispose();
        sprite.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    // Wait for the display font so the name samples with the correct glyphs
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="particle-canvas" aria-hidden="true" />;
}
