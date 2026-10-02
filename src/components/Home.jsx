import { community, competitions, languages, profile, work } from "../data.js";
import Elsewhere from "./Elsewhere.jsx";
import GithubGraph from "./GithubGraph.jsx";
import Hero from "./Hero.jsx";
import RowList from "./Row.jsx";
import Section from "./Section.jsx";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="work" title="Selected work">
        <RowList items={work} />
      </Section>

      <Section id="comp" title="Competitions & awards">
        <RowList items={competitions} limit={4} />
      </Section>

      <Section id="community" title="Teaching & community">
        <RowList items={community} />
      </Section>

      <Section id="lang" title="Languages">
        <ul className="langs">
          {languages.map((l) => (
            <li key={l.name} className="lang">
              <span className="lname">{l.name}</span>
              <span className="llevel">{l.level}</span>
            </li>
          ))}
        </ul>
      </Section>

      <GithubGraph />

      <Elsewhere />

      <footer>
        <span>{profile.name}</span>
        <span>{profile.location}</span>
      </footer>
    </>
  );
}
