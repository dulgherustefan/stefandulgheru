import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { profile } from "../data.js";

// Photo that tilts toward the pointer for a 3D feel (still under reduced
// motion). Falls back to the name's initial if the image fails to load.
export default function Avatar() {
  const [ok, setOk] = useState(true);
  const imgRef = useRef(null);
  // The <img> is prerendered, so it can fail before React attaches onError.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && !img.naturalWidth) setOk(false);
  }, []);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(py, (v) => v * -40),
    { stiffness: 140, damping: 13 }
  );
  const rotateY = useSpring(
    useTransform(px, (v) => v * 40),
    { stiffness: 140, damping: 13 }
  );

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <m.div
      className="avatar"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 420 }}
    >
      {ok ? (
        // Full 320px for sharp 3x screens; browsers take the smallest format they support.
        <picture>
          <source srcSet="/me.avif" type="image/avif" />
          <source srcSet="/me.webp" type="image/webp" />
          <img
            ref={imgRef}
            src="/me.jpg"
            width="320"
            height="320"
            alt={`${profile.name} on stage at How to Web 2026`}
            onError={() => setOk(false)}
          />
        </picture>
      ) : (
        <span aria-hidden="true">{profile.name[0]}</span>
      )}
    </m.div>
  );
}
