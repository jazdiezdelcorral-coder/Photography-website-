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
- Still to come with the launch host (Netlify or Cloudflare): HTTPS-only and other security headers, which GitHub Pages can't set. Link previews with a picture also need the real domain (`og:image` needs a full address).

## Launch day
Follow the "On launch day" list in `MAINTENANCE.md`.
