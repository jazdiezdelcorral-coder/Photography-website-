# Photography-website-
My photography website: my photos, my photo walks in Kolkata & Shantiniketan, my portfolio, and a shop.

## How the site is laid out
```
Home              → name (tap it: "Who's this?"), four sections, "Aúpa's letter" sign-up
├── Photos        → albums (Trains, Slow Shutter, Taxis, Streets of Kolkata, Shantiniketan)
│                   └── each album opens a photo wall (hover to zoom, click for full screen,
│                       Story button when a photo has a story), with its own background
├── Photo Walks   → "Kolkata, honestly." (to be reworked)
├── Portfolio     → coming soon
├── Shop          → coming soon
└── Privacy       → what the site keeps (almost nothing)
```

## What to edit
- **`data.js`**: almost everything: your name, tagline, contact details (`SITE`), the letter (`SITE.newsletter`), and the albums and photos (`ALBUMS`).
  - New album: copy an album block, give it a new `id` (lowercase, dashes), `title` and `blurb`.
  - Album background: `theme: "taxi" | "train" | "slow-shutter" | "red-earth"` (leave out for black & gold). Train albums also take `board:` text.
  - New photo: put it in `images/` (resized, hidden data removed), then add `{ src: "images/file.jpg", w: …, h: …, ... }`.
  - `story:` adds a Story view; `private: true` keeps a photo off the site.
  - **Rule:** no children's faces without a parent's OK, no private homes, nothing that shows where you live.
- **`styles.css`**: colours (dark and light at the top; album backgrounds under "ALBUM BACKGROUNDS").

## Before every publish
Run `python3 tools/check-site.py`. It fails if a photo still has hidden data (like GPS), a file is missing, or a page loads something from an unknown website. It warns about placeholders still in. See `MAINTENANCE.md` for the monthly and yearly checklist.

## Safety already in place
- Hidden from Google until launch (`noindex` on every page, plus `robots.txt`).
- A security rule on every page: only this site's own scripts, fonts and photos load (plus Kit for the letter).
- No cookies, no tracking; fonts served from this site.
- `.well-known/security.txt` so people can report problems.
- On Cloudflare Pages, `_headers` adds HTTPS-only and the other security headers. Shared links show a preview with a photo (`og:image`).

## Hosting: aupazalba.com on Cloudflare
- Cloudflare publishes this repo's `main` branch (Create app → Import a repository). Every change merged into `main` is live in about a minute.
- `wrangler.jsonc` tells Cloudflare the site is plain files (no build step); `.assetsignore` keeps non-site files (this README, `tools/`, settings) private.
- `_headers` holds the security settings sent with every page (HTTPS-only, security rules, hidden from Google until launch).
- `404.html` is shown for pages that don't exist.

## Launch day
Follow the "On launch day" list in `MAINTENANCE.md`.
