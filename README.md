# Egypt Heritage Films — Portfolio Website (Edition II · editorial cut)

A cinematic, editorial one-page site for a documentary film studio.
Plain **HTML, CSS and JavaScript** — no frameworks, no build step.

## Files
- `index.html` — semantic markup
- `style.css` — design system + all styling
- `script.js` — loader, nav/scrollspy, scroll reveals, video modal, form validation
- `assets/` — logo, film stills, portrait plates
- `index-standalone.html` — the whole site inlined into ONE file (deploy this alone if you prefer)

## Type
- **Fraunces** — cinematic serif (headings)
- **Archivo** — grotesque (body/UI)
- **IBM Plex Mono** — catalogue-style labels & metadata

Loaded from Google Fonts, so keep an internet connection when viewing.

## Run locally
Open `index.html` in a browser.

## Deploy to Vercel
1. Push this folder to a Git repo, or drag it into the Vercel dashboard.
2. Framework preset: **Other** (static site, no build command).
3. Deploy. (You can also deploy `index-standalone.html` on its own.)

## Make it yours
- **Films:** each `.film` in `index.html` has `data-video`, `data-title`, `data-meta`.
  Point `data-video` at your film URL and swap the still `<img src>` in `assets/`.
- **Crew:** replace `assets/team-1.jpg` … `team-4.jpg` with real portraits (4:5 works best).
- **Contact:** update the email, phone, and the WhatsApp number in the `wa.me/...` link.
- **Form:** front-end validation only — connect the submit handler in `script.js`
  to your mail service/backend to actually receive messages.
- **Look & feel:** every colour, font and spacing token lives at the top of `style.css`
  under `:root`. Brass (`--brass`) is deliberately used sparingly.
