import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Smooth scroll, disabled when the user prefers reduced motion. Returns a ref
// to the Lenis instance so callers (e.g. back-to-top) can drive it.
export function useLenis() {
  const ref = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    ref.current = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ref.current = null;
    };
  }, []);
  return ref;
}
