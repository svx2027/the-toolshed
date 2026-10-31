"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { barHeights, COLS, ROWS, OUTLIER } from "@/lib/outlier";

const GAP = 0.56;
const W = 0.36;

/* Reads the live theme's colours off the <html> element, and re-reads when the theme class flips. */
function useThemeColors() {
  const read = () => {
    const cs = getComputedStyle(document.documentElement);
    return {
      bar: cs.getPropertyValue("--line-strong").trim() || "#B9BBC4",
      acc: cs.getPropertyValue("--acc").trim() || "#1F2FE0",
      base: cs.getPropertyValue("--line").trim() || "#D7D8DD",
    };
  };
  const [c, setC] = useState(read);
  useEffect(() => {
    const mo = new MutationObserver(() => setC(read()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return c;
}

function Bars({ onDone, animate }: { onDone: () => void; animate: boolean }) {
  const heights = useMemo(barHeights, []);
  const refs = useRef<(Mesh | null)[]>([]);
  const group = useRef<Group>(null);
  const t0 = useRef<number | null>(null);
  const done = useRef(false);
  const colors = useThemeColors();

  // One entrance: bars rise over 0.8 s, the outlier last. Then the scene is still until you drag it.
  useFrame(({ clock }) => {
    if (done.current) return;
    if (!animate) {
      refs.current.forEach((m, i) => {
        if (!m) return;
        m.scale.y = 1;
        m.position.y = heights[i] / 2;
      });
      done.current = true;
      onDone();
      return;
    }
    if (t0.current === null) t0.current = clock.elapsedTime;
    const t = clock.elapsedTime - t0.current;
    let all = true;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const delay = i === OUTLIER ? 0.55 : (i % COLS) * 0.03 + Math.floor(i / COLS) * 0.04;
      const k = Math.max(0, Math.min(1, (t - delay) / 0.8));
      const e = 1 - Math.pow(1 - k, 3);
      const s = Math.max(0.001, e);
      m.scale.y = s;
      m.position.y = (heights[i] * s) / 2;
      if (k < 1) all = false;
    });
    if (all) {
      done.current = true;
      onDone();
    }
  });

  return (
    <group ref={group}>
      {heights.map((h, i) => {
        const x = ((i % COLS) - (COLS - 1) / 2) * GAP;
        const z = (Math.floor(i / COLS) - (ROWS - 1) / 2) * GAP;
        return (
          <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[x, 0, z]} scale={[1, 0.001, 1]}>
            <boxGeometry args={[W, h, W]} />
            <meshStandardMaterial color={i === OUTLIER ? colors.acc : colors.bar} roughness={0.85} metalness={0} />
          </mesh>
        );
      })}
      {/* the stage the bars stand on */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[COLS * GAP + 0.5, 0.06, ROWS * GAP + 0.5]} />
        <meshStandardMaterial color={colors.base} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

export function OutlierField() {
  const [done, setDone] = useState(false);
  const animate = useMemo(
    () => !(typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches),
    [],
  );
  return (
    <Canvas
      camera={{ position: [8.5, 6.2, 10], fov: 28, near: 0.1, far: 100 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={done ? "demand" : "always"}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[6, 12, 5]} intensity={2.6} />
      <directionalLight position={[-6, 4, -4]} intensity={0.8} />
      <Bars onDone={() => setDone(true)} animate={animate} />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0.7}
        maxPolarAngle={1.4}
        target={[0, 2.4, 0]}
      />
    </Canvas>
  );
}

export default OutlierField;
