import { useEffect, useRef } from "react";

// Fades a block up into place. The fade itself is CSS (.rv in index.css), so the
// prerendered HTML shows every block on first paint instead of waiting for the
// script. After hydration, blocks still below the fold are hidden again and fade
// in the first time they scroll into view. Under reduced motion nothing moves.
export default function Reveal({ children, i = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen
    el.classList.add("rv-wait");
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && show(), {
      rootMargin: "0px 0px -8% 0px",
    });
    const stop = () => {
      io.disconnect();
      el.removeEventListener("focusin", show);
    };
    function show() {
      el.classList.remove("rv-wait");
      stop();
    }
    io.observe(el);
    // Tab can bring a row into the bottom strip the observer skips; show it on focus too.
    el.addEventListener("focusin", show);
    return stop;
  }, []);

  return (
    <div ref={ref} className="rv" style={{ "--i": i }}>
      {children}
    </div>
  );
}
