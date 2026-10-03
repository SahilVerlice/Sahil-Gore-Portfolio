# Sahil Gore — Portfolio

A static, single-page portfolio site. No build step, no dependencies — plain HTML, CSS and JS.

```
portfolio/
├── index.html          # all content
├── README.md
└── assets/
    ├── style.css       # theme tokens + layout
    ├── main.js         # typed headline, scroll reveal, counters, theme + menu
    └── profile.jpg     # ← DROP YOUR PHOTO HERE (see below)
```

## Run it

Open `index.html` directly in a browser, or serve it locally:

```bash
cd portfolio
python3 -m http.server 8899
# then visit http://localhost:8899
```

## Adding your profile photo

The avatar currently shows a terminal-styled **SG** monogram. To use your photo:

1. Save your image as `assets/profile.jpg` (a square image works best, ~400×400 or larger)
2. Reload — the monogram is replaced automatically

If the file is missing or fails to load, the monogram stays. No code change needed.

## Links wired in

All profile and project links point at real destinations — no placeholders left.

| Section | Links to |
|---|---|
| Hero | GitHub (`SahilVerlice`) |
| Certifications | Hack The Box profile, TryHackMe profile |
| Projects | Each repo on GitHub |
| Contact + footer | LinkedIn, GitHub, Hack The Box, TryHackMe |

> The Hack The Box link uses the clean canonical form `app.hackthebox.com/users/3169951`
> rather than the full URL with `?profile-top-tab=…` query params — it resolves to the
> same profile and looks tidier when shared.

### Adding an email address

There is currently **no email link** — you didn't provide one. If you want one, add a
button in the Contact section of `index.html` alongside the others:

```html
<a class="btn btn-ghost" href="mailto:you@example.com">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M4 4h16v16H4z"/><path d="m4 7 8 6 8-6"/>
  </svg>
  Email
</a>
```

## Editing content

Everything lives in `index.html`, grouped by section and marked with comment banners:

- Hero, About, Skills, Education, Certifications, Projects, Contact

Design tokens (colours, fonts, spacing) are at the top of `assets/style.css` under `:root`.
Both dark and light themes are defined there; the site follows your OS preference by default
and remembers a manual choice in `localStorage`.

## Notes

- **Fonts** load from Google Fonts (JetBrains Mono + IBM Plex Sans). Offline, it falls back to
  system monospace/sans — the layout is unaffected.
- **Accessibility**: skip link, semantic landmarks, visible focus rings, ARIA labels on icon
  buttons, `prefers-reduced-motion` support, and print styles.
- **No tracking, no analytics, no external scripts** beyond the font stylesheet.
