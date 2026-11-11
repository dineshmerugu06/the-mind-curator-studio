# The Mind Curator Studio

One-person web design studio site — business websites, portfolios, landing pages, redesigns. Built from the approved v2 sample (cream + yellow + black, huge condensed type, sticker pills, marquee, GSAP + Lenis scroll motion).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Structure

- `index.html` — all content (real projects, real contacts, no invented clients or prices)
- `assets/css/site.css` — tokens, layout, responsive
- `assets/js/site.js` — GSAP + ScrollTrigger + Lenis motion (content stays visible if the motion libs fail to load)
- `assets/js/vendor/` — self-hosted GSAP 3.13.0, ScrollTrigger, Lenis 1.1.14 (free, MIT) — zero external requests
- `assets/fonts/` — self-hosted Anton (display) + Inter (body), woff2
- `.nojekyll` — GitHub Pages

## Deploy

GitHub Pages only (standing rule). Repo + public visibility need Merugu's word first — a live Pages site needs a public repo.

## Contacts on the site

- WhatsApp: +91 93983 59538
- Instagram: @themindcurator_studio
- Fiverr: themindcurator
- MSME Registered — UDYAM-TS-20-0226606
