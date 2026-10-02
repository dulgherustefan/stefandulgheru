import { m, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1];

// Fades a block up into place the first time it scrolls into view. The hidden
// start state is the same on the server and in the browser (the prerendered
// HTML must match), so under reduced motion the block still waits for the view
// but then appears instantly instead of animating.
export default function Reveal({ children, i = 0 }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: i * 0.04 }}
    >
      {children}
    </m.div>
  );
}
