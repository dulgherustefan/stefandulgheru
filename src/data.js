// All real content lives here so Minimal and Creative views stay in sync.

export const profile = {
  name: "Ștefan Dulgheru",
  eyebrow: "Machine learning & software",
  availability: "2026 · open to internships",
  taglineMinimal: "I train machine-learning models and build the software around them.",
  taglineCreative: "Models, olympiads, and software that ships.",
  // bio as segments: string | {lnk, href} | {note, tip}
  bio: [
    [
      "I'm a high-school student at ",
      { note: "Tudor Vianu", tip: "computer-science college, Bucharest" },
      ", where I focus on machine learning and software. I compete in ",
      { lnk: "AI olympiads", href: "https://olimpiada-ai.ro" },
      " and on Kaggle, and I build real software too, most recently the learning platform for my school's AI club, where I teach alongside two classmates.",
    ],
    [
      "Most of what I know is self-taught: I learn best by pulling something apart, figuring out how it works, and putting it back together a little better than before.",
    ],
  ],
};

export const work = [
  {
    id: "vianu-ai",
    name: "Vianu AI",
    stat: "Live",
    statKind: "live",
    sub: "2026",
    desc:
      "The learning platform for Tudor Vianu's AI club, in Next.js and TypeScript. I'm on the dev team behind most of what's live: lessons with runnable code, a curriculum from Python basics through to deep learning, and competition tips from students who've done the olympiads.",
    tags: ["Next.js", "TypeScript"],
    links: [{ label: "vianu-ai.ro", href: "https://vianu-ai.ro", ext: true }],
    folder: "products",
  },
  {
    id: "cvcheck",
    name: "cvcheck",
    stat: "Paused",
    statKind: "muted",
    sub: "SaaS",
    desc:
      "An AI résumé checker: upload a CV and get it scored with specific fixes. Built with Next.js, Claude, Supabase and Stripe. It works end to end; the hosted version is paused for now.",
    tags: ["Claude", "Supabase", "Stripe"],
    links: [{ label: "code", href: "https://github.com/dulgherustefan/cvcheck", ext: true }],
    folder: "products",
  },
];

// Creative mode groups everything into folders. Each has files that fan out.
export const folders = [
  {
    id: "products",
    title: "Products",
    blurb: "Software I designed, built and shipped on my own.",
    count: "2 shipped",
    files: [
      { name: "Vianu AI", tag: "Next.js" },
      { name: "cvcheck", tag: "Claude" },
    ],
  },
  {
    id: "experiments",
    title: "ML & experiments",
    blurb: "Models and agents, tuned against real ladders.",
    count: "1 on Kaggle",
    files: [{ name: "Orbit-Wars", tag: "PyTorch" }],
  },
  {
    id: "competitions",
    title: "Competitions & awards",
    blurb: "AI and applied-informatics olympiads.",
    count: "4 entries",
    files: [
      { name: "ONIA", tag: "Bronze" },
      { name: "RoAI", tag: "National" },
      { name: "AcadNet '26", tag: "County" },
      { name: "AcadNet '25", tag: "County" },
    ],
  },
  {
    id: "conferences",
    title: "Conferences",
    blurb: "Organized for visiting students in Bucharest.",
    count: "1 hosted",
    files: [{ name: "Erasmus+", tag: "Organizer" }],
  },
  {
    id: "opensource",
    title: "Open source",
    blurb: "Code that is public, readable and yours to fork.",
    count: "2 repos",
    href: "https://github.com/dulgherustefan",
    files: [
      { name: "Orbit-Wars", tag: "repo" },
      { name: "cvcheck", tag: "repo" },
    ],
  },
];

export const githubUser = "dulgherustefan";

export const cta = {
  status: "Open to internships · Bucharest",
  line: "Let's build\nsomething real.",
};

export const competitions = [
  {
    id: "onia",
    name: "Olimpiada Națională de Inteligență Artificială",
    tagTop: "Bronze",
    tagSub: "National",
    desc:
      "Romania's national AI olympiad, run by the Ministry of Education and the national AI hub. A timed 4-hour contest where you build and train models scored against held-out data. Bronze medal at the national final, April 2026.",
    link: { label: "national results", href: "https://olimpiada-ai.ro/ro/rezultate/nationala", ext: true },
  },
  {
    id: "roai",
    name: "RoAI · Romanian Olympiad in Artificial Intelligence",
    tagTop: "National",
    tagSub: "finalist",
    desc:
      "A national AI olympiad run by the Nitro association, on the qualifying path toward Romania's international (IOAI) team. Reached the national stage in the IX-X section. 2026.",
    link: { label: "national leaderboard", href: "https://judge.nitro-ai.org/competitions/roai-2025/nationala-ix-x-2026/leaderboard/complete", ext: true },
  },
  {
    id: "nitro-nlp-2026",
    name: "NitroNLP Hackathon · 5th edition",
    tagTop: "17th",
    tagSub: "UniBuc",
    desc:
      "A 23-hour NLP hackathon at the University of Bucharest, run by the Nitro association: 73 teams get a fresh Romanian-language dataset and compete on a live leaderboard. Finished 17th. 2026.",
    link: { label: "leaderboard", href: "https://judge.nitro-ai.org/competitions/nitro/nitro-nlp-hackathon-2026/leaderboard/complete", ext: true },
  },
  {
    id: "orbit-wars",
    name: "Kaggle · Orbit Wars",
    orbit: true,
    tagTop: "288th",
    tagSub: "of 4,730",
    desc:
      "A Kaggle simulation competition: program a bot for a real-time strategy game where fleets capture planets orbiting a sun, ranked on a skill ladder of live 1v1 and 4-player matches. My agent was a tensorized planner, tuned on real ladder losses rather than self-play. 288th of 4,730 teams.",
    links: [
      { label: "leaderboard", href: "https://www.kaggle.com/competitions/orbit-wars/leaderboard", ext: true },
      { label: "code", href: "https://github.com/dulgherustefan/Orbit-Wars", ext: true },
    ],
  },
  {
    id: "neurogolf-2026",
    name: "Kaggle · NeuroGolf Championship",
    tagTop: "727th",
    tagSub: "of ~2,960",
    desc:
      "A Kaggle competition to build the smallest neural network that still solves ARC-AGI reasoning tasks, trading parameter count against accuracy. Competed as team San Francisco. 2026.",
    links: [
      { label: "leaderboard", href: "https://www.kaggle.com/competitions/neurogolf-2026/leaderboard", ext: true },
      { label: "code", href: "https://github.com/dulgherustefan/neurogolf-2026", ext: true },
    ],
  },
  {
    id: "rogii-wellbore",
    name: "Kaggle · ROGII Wellbore Geology",
    tagTop: "2,231st",
    tagSub: "of 6,125",
    desc:
      "A Kaggle competition predicting the rock a well drills through from its sensor logs, a model used to automate oil-and-gas drilling. Final standing as team Silicon Valley. 2026.",
    links: [
      { label: "leaderboard", href: "https://www.kaggle.com/competitions/rogii-wellbore-geology-prediction/leaderboard", ext: true },
      { label: "code", href: "https://github.com/dulgherustefan/rogii-wellbore-geology-prediction", ext: true },
    ],
  },
  {
    id: "acadnet-10",
    name: "AcadNet · Olimpiada de Informatică Aplicată",
    tagTop: "County",
    tagSub: "10th grade",
    desc: "The national applied-informatics olympiad, System Interoperability section: networks, services and protocols. County stage, 10th grade, March 2026.",
    link: { label: "county results", href: "https://drive.google.com/file/d/11NyqgK4wPq-xPIUPpYA9wF4sMZw4YkLi/view?usp=sharing", ext: true },
  },
  {
    id: "acadnet-9",
    name: "AcadNet · Olimpiada de Informatică Aplicată",
    tagTop: "County",
    tagSub: "9th grade",
    desc: "My first year in the applied-informatics olympiad, in the same System Interoperability section. County stage, 9th grade, March 2025.",
    link: { label: "county results", href: "https://drive.google.com/file/d/1xZZA-Pe5C7BoHqpZcmkbJEUbIsF6sXWU/view?usp=sharing", ext: true },
  },
  {
    id: "cgame",
    name: "CGame · poveste și provocare",
    tagTop: "Mention",
    tagSub: "'25 & '26",
    desc:
      "A national programming contest from Tudor Vianu and ITLevel: build a game in C++ or Python from a given story, then finish it live in a timed national round. Special mention in both the 2025 and 2026 editions.",
    link: { label: "national results (liceu)", href: "https://www.itlevel.ro/wp-content/uploads/2026/01/Etapa-Nationala-Liceu.pdf", ext: true },
  },
];

export const conferences = [
  {
    id: "vianu-ai-club",
    name: "Vianu AI club · teaching",
    tagTop: "Instructor",
    tagSub: "team of 3",
    desc:
      "I teach AI at my school's club alongside two classmates. The three of us run the sessions, from fundamentals through to the topics the olympiads test.",
    link: { label: "vianu-ai.ro", href: "https://vianu-ai.ro", ext: true },
  },
  {
    id: "cyber-q-stack",
    name: "CYB3R-Q STACK · Summer School",
    tagTop: "Speaker",
    tagSub: "AI",
    desc:
      "A summer school on cybersecurity, threat intelligence, IoT and blockchain at Spiru Haret University in Bucharest. I represented Tudor Vianu with a talk on AI; the national paper Opinia Națională mentioned my results by name. May 2026.",
    links: [
      { label: "summer school site", href: "https://cyb3rqstack.spiruharet.ro/", ext: true },
      { label: "Opinia Națională", href: "http://opinianationala.ro/wp-content/uploads/2026/05/1181.pdf#page=5", ext: true },
    ],
  },
  {
    id: "vianu-scitech",
    name: "Vianu SciTech Evo Fest",
    tagTop: "Volunteer",
    tagSub: "AI stand",
    desc:
      "A tech festival at my school, Tudor Vianu. I volunteered on the AI stand for the IT Treasure Hunt and wrote the small AI problems teams solved as they worked through the challenges. December 2025.",
    link: { label: "about the event", href: "https://portal.lbi.ro/2025/12/11/vianu-scitech-evo-fest-editia-a-ii-a-o-zi-dedicata-viitorului-tehnologiei/", ext: true },
  },
  {
    id: "erasmus",
    name: "Erasmus+ student conference",
    tagTop: "Volunteer",
    tagSub: "Winter 2025",
    desc: "Volunteered at a conference for visiting Erasmus+ students in Bucharest, and ended up coordinating the rest of the volunteer team.",
    link: { label: "about Erasmus+", href: "https://erasmus-plus.ec.europa.eu/", ext: true },
  },
];

export const languages = [
  { name: "Romanian", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "B1" },
];

export const links = [
  { key: "Email", value: "stdulgh@gmail.com", href: "mailto:stdulgh@gmail.com" },
  { key: "GitHub", value: "github.com/dulgherustefan", href: "https://github.com/dulgherustefan" },
  { key: "LinkedIn", value: "Ștefan Alexandru Dulgheru", href: "https://www.linkedin.com/in/stefan-alexandru-dulgheru-a2a63440a" },
  { key: "Instagram", value: "@stefan_dulgh", href: "https://www.instagram.com/stefan_dulgh/" },
];
