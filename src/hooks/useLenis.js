import { useEffect } from "react";

// Smooth wheel scrolling. Off under reduced motion and on touch-first devices,
// where scrolling is native anyway and Lenis would only add work; it loads on
// demand, so those visitors never download it.
export function useLenis() {
  useEffect(() => {
    const matches = (q) => window.matchMedia(q).matches;
    if (matches("(prefers-reduced-motion: reduce)") || matches("(pointer: coarse)")) return;

    let lenis;
    let raf;
    let gone = false;
    // Keys (Space, PageDown, arrows) and focus moves scroll natively; end any wheel
    // glide first so it doesn't pull the page back mid-way.
    const settle = () => {
      if (lenis?.isScrolling !== "smooth") return;
      lenis.stop();
      lenis.start();
    };

    import("lenis").then(({ default: Lenis }) => {
      if (gone) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    window.addEventListener("keydown", settle, true);
    window.addEventListener("focusin", settle, true);

    return () => {
      gone = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.removeEventListener("keydown", settle, true);
      window.removeEventListener("focusin", settle, true);
    };
  }, []);
}
