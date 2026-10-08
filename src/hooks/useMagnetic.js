import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Pulls an element gently toward the cursor while hovered, springs back on
// leave. Mouse only: a tap also fires mouse events but never a leave, which
// would leave the link shifted. Still under reduced motion. Offset is clamped
// so wide rows only nudge. The returned props are the same either way so
// prerendered and hydrated markup match.
export function useMagnetic(strength = 0.3, max = 10) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.5 });

  const clamp = (v) => Math.max(-max, Math.min(max, v));
  return {
    ref,
    style: { x, y },
    onPointerMove: (e) => {
      const el = ref.current;
      if (reduce || !el || e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
      my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
    },
    onPointerLeave: () => {
      mx.set(0);
      my.set(0);
    },
  };
}
