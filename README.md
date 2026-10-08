# stefandulgheru.com

My personal site: selected work, competitions, teaching, languages and GitHub activity.

**Live:** https://stefandulgheru.com

Built with Vite, React and Framer Motion, smooth-scrolled with Lenis, hosted on Vercel. It has light and dark themes (the moon is the toggle) and respects reduced motion.

## Run locally

```
npm install
npm run dev
```

Other scripts:

```
npm run build     production build into dist/ (prerendered, see below)
npm run preview   serve dist/ locally
npm run lint      ESLint
npm run format    Prettier, rewrites files
npm run check     lint + format check, run before committing
```

## How the build works

`npm run build` does three things:

1. `vite build` bundles the client into `dist/`.
2. `vite build --ssr` bundles `src/entry-server.jsx` into `.ssr/`.
3. `scripts/prerender.js` renders the page to HTML and puts it inside `dist/index.html`, so the text is there before any JS loads. React then hydrates it in the browser.

The same script reads `src/data.js` and writes the JSON-LD (Person, with awards) into the page head, adds preload links for the two fonts the first screen needs, gives `dist/404.html` the same self-hosted fonts (it fills the `<!--fonts-->` marker there), and writes `dist/llms.txt`. So changing the content in `data.js` updates the page, the structured data and llms.txt together.

Rows fade in with CSS (`Reveal.jsx` and `.rv` in `index.css`), so the prerendered page is fully visible before JS runs, with JS off, and when printed. Print gets its own light stylesheet with every row shown.

In dev there is no prerender. The root starts empty and React renders from scratch.

## Where things live

```
src/
  data.js              all page content (edit text here, not in components)
  main.jsx             browser entry: fonts, styles, hydrate or render
  entry-server.jsx     build-time entry, used by the prerender
  App.jsx              shell: theme, sky, page, analytics
  index.css            every style, tokens at the top
  fonts.css            @font-face for the self-hosted fonts
  assets/fonts/        trimmed Bricolage Grotesque and Hanken Grotesk (woff2)
  hooks/
    useTheme.js        light/dark state + the spreading-light transition
    useLenis.js        smooth scroll
    useMagnetic.js     cursor pull on the Elsewhere links
  components/
    Home.jsx           the page, section by section
    Hero.jsx           photo, name, role, bio
    Avatar.jsx         the photo (avif/webp/jpg) with the 3D tilt
    Section.jsx        titled section wrapper
    Row.jsx            work / competition / community rows + "View all"
    Reveal.jsx         fade-in on scroll
    GithubGraph.jsx    live contribution graph
    Elsewhere.jsx      contact links
    Sky.jsx            clouds and the moon/sun toggle
    pixel.jsx          all pixel art (clouds, moon, sun, medal, service icons)
    icons.jsx          line icons
scripts/
  prerender.js         build step: static HTML, JSON-LD, font preloads, llms.txt
  fonts.py             rebuilds the trimmed fonts in src/assets/fonts/
public/                favicons, og.png, me.avif/webp/jpg, 404.html, robots.txt, sitemap.xml
vercel.json            www redirect, cache and security headers
```

## Fonts

Three faces, all served from the site itself:

- Bricolage Grotesque for the name and headings
- Hanken Grotesk for body text and labels
- Silkscreen (from `@fontsource/silkscreen`) for the pixel section titles

The first two are cut down to the Latin characters (Romanian included) and the weights the site uses, which brings them to about 70 KB together. To rebuild them:

```
pip install fonttools brotli
python3 scripts/fonts.py
```

## Photo

`public/me.jpg` is the photo, 320×320: a head-and-shoulders crop, so the face still reads at the avatar's 106px. `me.avif` and `me.webp` are the same image in smaller formats, and browsers pick the first one they support. If you replace the photo, regenerate all three from the same crop. If the source is a phone photo in Display P3, keep that profile when converting, or the colors wash out.
