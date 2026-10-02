# stefandulgheru.com

My personal site: selected work, competitions, teaching, languages and GitHub activity.

**Live:** https://stefandulgheru.com

Built with Vite, React and Framer Motion, smooth-scrolled with Lenis. Light and dark themes (the moon is the toggle), respects reduced motion.

## Run locally

```
npm install
npm run dev
```

## Where things live

```
src/
  data.js              all page content (edit text here, not in components)
  App.jsx              shell: theme, sky, page, analytics
  index.css            every style, tokens at the top
  hooks/
    useTheme.js        light/dark state + the spreading-light transition
    useLenis.js        smooth scroll
    useMagnetic.js     cursor pull on the Elsewhere links
  components/
    Home.jsx           the page, section by section
    Hero.jsx           photo, name, role, bio
    Section.jsx        titled section wrapper
    Row.jsx            work / competition / community rows + "View all"
    GithubGraph.jsx    live contribution graph
    Elsewhere.jsx      contact links
    Sky.jsx            clouds and the moon/sun toggle
    pixel.jsx          all pixel art (clouds, moon, sun, medal, service icons)
    icons.jsx          line icons
public/                favicons, og.png, me.jpg, 404.html, robots.txt, sitemap.xml
```
