// All page content lives here, kept separate from the components that render it.
//
// work, competitions and community share one entry shape:
//   { id, name, stat, sub?, desc, links: [{ label, href }], medal? }
// `stat`/`sub` fill the left gutter, the first link is the title's link,
// further links show under the description, and `medal` ("gold" | "bronze") adds the pixel medal.

// Site-wide facts used outside the page itself: structured data and llms.txt,
// both generated from this file at build time (scripts/prerender.js).
export const site = {
  url: "https://stefandulgheru.com/",
  // A photo of the person (the Person schema's image), not the text-only share card.
  image: "https://stefandulgheru.com/me.jpg",
  alternateName: "Dulgheru Ștefan Alexandru",
  description: "High-school student in machine learning and software development.",
  school: "Colegiul Național de Informatică Tudor Vianu",
  country: "RO",
  knowsAbout: ["Machine learning", "Artificial intelligence", "Software engineering"],
};

export const profile = {
  name: "Ștefan Dulgheru",
  location: "Bucharest",
  // hero tagline: lead text plus the accented tail
  role: { lead: "Machine learning &", accent: "software development" },
  // paragraphs of segments: a string, or { lnk, href } for an inline link
  bio: [
    [
      "High-school student at Tudor Vianu National Informatics College in Bucharest, focused on machine learning and software development.",
    ],
    [
      "National ",
      { lnk: "AI-olympiad", href: "https://olimpiada-ai.ro" },
      " medalist and Kaggle competitor. Co-founded and built Vianu AI, the learning platform and curriculum for the school's AI club, teaching it with two classmates.",
    ],
    ["Largely self-taught, since AI is still new as a school subject in Romania."],
  ],
};

export const work = [
  {
    id: "ping-up",
    name: "Ping Up",
    stat: "Beta",
    sub: "Android",
    desc: "Android app for texting friends and calling for help at festivals when the mobile network goes down. Messages hop from phone to phone over Bluetooth, without internet or an account, and stay end-to-end encrypted. My idea; I built a large part of it with team Downtown Fitness. It won VNU Hack 2026, and we presented it on stage at How to Web.",
    links: [
      { label: "ping-up.org", href: "https://ping-up.org" },
      { label: "code", href: "https://github.com/dulgherustefan/PingUp" },
    ],
  },
  {
    id: "vianu-ai",
    name: "Vianu AI",
    stat: "Live",
    sub: "2026",
    desc: "Learning platform for the AI club at Tudor Vianu National Informatics College in Bucharest. Built in Next.js and TypeScript. On the dev team behind most of what's live: lessons with runnable code, a curriculum from Python basics to deep learning, and olympiad tips from students who competed.",
    links: [{ label: "vianu-ai.ro", href: "https://www.vianu-ai.ro/" }],
  },
  {
    id: "cvcheck",
    name: "cvcheck",
    stat: "Paused",
    sub: "SaaS",
    desc: "AI résumé checker: upload a CV, get it scored with specific fixes. Built with Next.js, Claude, Supabase and Stripe. Works end to end; hosting is paused.",
    links: [{ label: "code", href: "https://github.com/dulgherustefan/cvcheck" }],
  },
];

export const githubUser = "dulgherustefan";

export const competitions = [
  {
    id: "onia",
    name: "Olimpiada Națională de Inteligență Artificială",
    stat: "Bronze",
    sub: "National",
    medal: "bronze",
    desc: "Romania's national AI olympiad, run by the Ministry of Education and the national AI hub. Build and train models scored against held-out data. Bronze at the national final, April 2026.",
    links: [{ label: "national results", href: "https://olimpiada-ai.ro/ro/rezultate/nationala" }],
  },
  {
    id: "roai",
    name: "RoAI · Romanian Olympiad in Artificial Intelligence",
    stat: "National",
    sub: "finalist",
    desc: "National AI olympiad run by the Nitro association, on the qualifying path to Romania's IOAI (international) team. Reached the national stage, IX-X section, 2026.",
    links: [
      {
        label: "national leaderboard",
        href: "https://judge.nitro-ai.org/competitions/roai-2025/nationala-ix-x-2026/leaderboard/complete",
      },
    ],
  },
  {
    id: "vnu-hack-2026",
    name: "VNU Hack · Connect the Dots",
    stat: "1st",
    sub: "of ~40 teams",
    medal: "gold",
    desc: "24-hour hackathon for high-school students at Tudor Vianu, October 2026. Won first place with team Downtown Fitness and Ping Up, an offline Bluetooth messenger for festivals.",
    links: [
      { label: "ping-up.org", href: "https://ping-up.org" },
      { label: "code", href: "https://github.com/dulgherustefan/PingUp" },
    ],
  },
  {
    id: "nitro-nlp-2026",
    name: "NitroNLP Hackathon · 5th edition",
    stat: "17th",
    sub: "UniBuc",
    desc: "23-hour NLP hackathon at the University of Bucharest, run by the Nitro association: 73 teams, a fresh Romanian-language dataset, a live leaderboard. Finished 17th, 2026.",
    links: [
      {
        label: "leaderboard",
        href: "https://judge.nitro-ai.org/competitions/nitro/nitro-nlp-hackathon-2026/leaderboard/complete",
      },
    ],
  },
  {
    id: "orbit-wars",
    name: "Kaggle · Orbit Wars",
    stat: "288th",
    sub: "of 4,730",
    medal: "bronze",
    desc: "Kaggle simulation competition: program a bot for a real-time strategy game where fleets capture planets orbiting a sun, ranked on a ladder of live 1v1 and 4-player matches. Built a tensorized planner, tuned on real ladder losses instead of self-play.",
    links: [
      { label: "leaderboard", href: "https://www.kaggle.com/competitions/orbit-wars/leaderboard" },
      { label: "code", href: "https://github.com/dulgherustefan/Orbit-Wars" },
    ],
  },
  {
    id: "neurogolf-2026",
    name: "Kaggle · NeuroGolf Championship",
    stat: "727th",
    sub: "of ~2,960",
    desc: "Kaggle competition to build the smallest neural network that still solves ARC-AGI reasoning tasks, trading parameter count for accuracy. Team San Francisco, 2026.",
    links: [
      { label: "leaderboard", href: "https://www.kaggle.com/competitions/neurogolf-2026/leaderboard" },
      { label: "code", href: "https://github.com/dulgherustefan/neurogolf-2026" },
    ],
  },
  {
    id: "rogii-wellbore",
    name: "Kaggle · ROGII Wellbore Geology",
    stat: "2,231st",
    sub: "of 6,125",
    desc: "Kaggle competition predicting the rock a well drills through from its sensor logs, the kind of model used to automate oil-and-gas drilling. Team Silicon Valley, 2026.",
    links: [
      {
        label: "leaderboard",
        href: "https://www.kaggle.com/competitions/rogii-wellbore-geology-prediction/leaderboard",
      },
      { label: "code", href: "https://github.com/dulgherustefan/rogii-wellbore-geology-prediction" },
    ],
  },
  {
    id: "acadnet-10",
    name: "AcadNet · Olimpiada de Informatică Aplicată",
    stat: "County",
    sub: "10th grade",
    desc: "National applied-informatics olympiad, System Interoperability section: networks, services and protocols. County stage, 10th grade, March 2026.",
    links: [
      {
        label: "county results",
        href: "https://drive.google.com/file/d/11NyqgK4wPq-xPIUPpYA9wF4sMZw4YkLi/view?usp=sharing",
      },
    ],
  },
  {
    id: "acadnet-9",
    name: "AcadNet · Olimpiada de Informatică Aplicată",
    stat: "County",
    sub: "9th grade",
    desc: "First year in the applied-informatics olympiad, same System Interoperability section. County stage, 9th grade, March 2025.",
    links: [
      {
        label: "county results",
        href: "https://drive.google.com/file/d/1xZZA-Pe5C7BoHqpZcmkbJEUbIsF6sXWU/view?usp=sharing",
      },
    ],
  },
  {
    id: "cgame",
    name: "CGame · poveste și provocare",
    stat: "Mention",
    sub: "'25 & '26",
    desc: "National programming contest from ITLevel and Tudor Vianu National Informatics College: build a game in C++ or Python from a given story, then finish it live in a timed national round. Special mention in both the 2025 and 2026 editions.",
    links: [
      {
        label: "national results (liceu)",
        href: "https://www.itlevel.ro/wp-content/uploads/2026/01/Etapa-Nationala-Liceu.pdf",
      },
    ],
  },
];

export const community = [
  {
    id: "vianu-ai-club",
    name: "Vianu AI club · teaching",
    stat: "Instructor",
    sub: "team of 3",
    desc: "Teaches AI at the school's club with two classmates, covering fundamentals through to what the olympiads test.",
    links: [{ label: "vianu-ai.ro", href: "https://www.vianu-ai.ro/" }],
  },
  {
    id: "how-to-web-2026",
    name: "How to Web 2026",
    stat: "Speaker",
    sub: "Ping Up",
    desc: "Startup and tech conference in Bucharest, with 3,000+ attendees and speakers from OpenAI, Meta, Google and Stripe. Invited with my team to present Ping Up, our offline messenger for festivals, on stage. October 2026.",
    links: [{ label: "2026 agenda", href: "https://www.howtoweb.co/agenda-2026/" }],
  },
  {
    id: "cyber-q-stack",
    name: "CYB3R-Q STACK · Summer School",
    stat: "Speaker",
    sub: "AI",
    desc: "Summer school on cybersecurity, threat intelligence, IoT and blockchain at Spiru Haret University, Bucharest. Represented Tudor Vianu National Informatics College with a talk on AI; named in the national paper Opinia Națională. May 2026.",
    links: [
      { label: "summer school site", href: "https://cyb3rqstack.spiruharet.ro/" },
      {
        label: "Opinia Națională",
        href: "http://opinianationala.ro/wp-content/uploads/2026/05/1181.pdf#page=5",
      },
    ],
  },
  {
    id: "vianu-scitech",
    name: "Vianu SciTech Evo Fest",
    stat: "Volunteer",
    sub: "AI stand",
    desc: "Tech festival at Tudor Vianu National Informatics College. Volunteered on the AI stand for the IT Treasure Hunt and wrote the AI problems teams solved along the way. December 2025.",
    links: [
      {
        label: "about the event",
        // http on purpose: the school portal's https certificate expired in Feb 2024.
        href: "http://portal.lbi.ro/2025/12/11/vianu-scitech-evo-fest-editia-a-ii-a-o-zi-dedicata-viitorului-tehnologiei/",
      },
    ],
  },
  {
    id: "erasmus",
    name: "Erasmus+ student conference",
    stat: "Volunteer",
    sub: "Winter 2025",
    desc: "Volunteered at a conference for visiting Erasmus+ students in Bucharest, then coordinated the rest of the volunteer team.",
    links: [{ label: "about Erasmus+", href: "https://erasmus-plus.ec.europa.eu/" }],
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
  {
    key: "LinkedIn",
    value: "Ștefan Alexandru Dulgheru",
    href: "https://www.linkedin.com/in/stefan-alexandru-dulgheru-a2a63440a",
  },
  { key: "Instagram", value: "@stefan_dulgh", href: "https://www.instagram.com/stefan_dulgh/" },
];
