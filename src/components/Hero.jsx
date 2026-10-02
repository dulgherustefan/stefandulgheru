import { profile } from "../data.js";
import Avatar from "./Avatar.jsx";

// Bio paragraphs are lists of segments: a plain string, or { lnk, href } for an inline link.
function Bio({ paragraphs }) {
  return (
    <div className="bio">
      {paragraphs.map((para, i) => (
        <p key={i}>
          {para.map((seg, j) =>
            typeof seg === "string" ? (
              <span key={j}>{seg}</span>
            ) : (
              <a key={j} className="lnk" href={seg.href} target="_blank" rel="noreferrer">
                {seg.lnk}
              </a>
            )
          )}
        </p>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <header className="hero">
      <div className="idrow">
        <Avatar />
        <div>
          <h1 className="name">{profile.name}</h1>
          <p className="role">
            {profile.role.lead} <b>{profile.role.accent}</b>
          </p>
        </div>
      </div>
      <Bio paragraphs={profile.bio} />
    </header>
  );
}
