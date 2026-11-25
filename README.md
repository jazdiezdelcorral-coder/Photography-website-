# Photography-website-
My photography website: my photos, my photo walks in Kolkata & Shantiniketan, my portfolio, and a shop.

## How the site is laid out
```
Home
├── Photos        → albums (Trains, Slow Shutter, Taxis, Streets of Kolkata, Shantiniketan)
│                   └── each album opens a photo wall (hover to zoom, click for full screen)
│                       with its own background: taxi yellow, train beige, light trails…
├── Photo Walks   → "Kolkata, honestly." (to be reworked)
├── Portfolio     → coming soon
└── Shop          → coming soon
```

## What to edit
- **`data.js`**: almost everything. Your name, tagline, email, Instagram, WhatsApp (`SITE`), and the albums and photos (`ALBUMS`).
  - New album: copy an album block, give it a new `id` (lowercase, dashes), `title` and `blurb`.
  - Album background: `theme: "taxi" | "train" | "slow-shutter" | "red-earth"` (leave out for black & gold). Train albums also take `board:` text.
  - New photo: put the file in `images/`, then add `{ src: "images/file.jpg", title: "...", shutter: "...", ... }` to an album.
- **`styles.css`**: colours. The site colours are at the top; each album background is under "ALBUM BACKGROUNDS".

## Put it online (free, GitHub Pages)
Repo **Settings → Pages → Deploy from a branch**, pick the branch and `/ (root)`, save.
