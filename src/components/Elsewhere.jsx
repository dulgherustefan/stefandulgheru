import { m } from "framer-motion";
import { links } from "../data.js";
import { useMagnetic } from "../hooks/useMagnetic.js";
import { Arrow } from "./icons.jsx";
import { ServiceIcon } from "./pixel.jsx";
import Section from "./Section.jsx";

function ElsewhereLink({ link }) {
  const magnetic = useMagnetic(0.25, 9);
  return (
    <m.a {...magnetic} href={link.href} target="_blank" rel="noreferrer">
      <ServiceIcon name={link.key} />
      <span className="lkey">{link.key}</span>
      <span className="lval">{link.value}</span>
      <Arrow />
    </m.a>
  );
}

export default function Elsewhere() {
  return (
    <Section id="else" title="Elsewhere">
      <nav className="links">
        {links.map((l) => (
          <ElsewhereLink key={l.key} link={l} />
        ))}
      </nav>
    </Section>
  );
}
