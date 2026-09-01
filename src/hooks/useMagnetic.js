import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Pulls an element gently toward the cursor while hovered, springs back on
// leave. Pointer-only (mouse events never fire on touch) and off under
// reduced-motion. Offset is clamped so wide rows only nudge.
export function useMagnetic(strength = 0.3, max = 10) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.5 });

  if (reduce) return {};

  const clamp = (v) => Math.max(-max, Math.min(max, v));
  return {
    ref,
    style: { x, y },
    onMouseMove: (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
      my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
    },
    onMouseLeave: () => {
      mx.set(0);
      my.set(0);
    },
  };
}
