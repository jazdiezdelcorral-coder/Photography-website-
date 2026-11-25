# Photography-website-
A photography website with my photos, my portfolio, and my photo walks in Kolkata & Shantiniketan.

## Pages
- `index.html` — home: intro, the two sides of the site, about me
- `photography.html` — my work: Black & White / Colour filter, series filter, camera settings on every photo, exhibitions, prints & commissions enquiry form
- `walks.html` — "Kolkata, in its honest form": the walks with prices, what's included / not included, how it works, FAQ, booking form, and **Walk stories** (photos from walks with who I was with and what I thought)

## Adding photos — edit `data.js` only
1. Put the photo in `images/` (e.g. `images/howrah-bridge.jpg`). Resize to ~2000px on the long side so the site stays fast.
2. In `data.js`, copy an entry and change it:
   - `PHOTOS` — my personal work. `tone: "bw"` or `"colour"`, `series:` any name (filter buttons appear automatically), plus `shutter`, `aperture`, `iso`, `focal`, `camera`, `place`, `year`, `note`.
   - `EXHIBITIONS` — year, title, place.
   - `WALK_STORIES` — photo from a walk + `person`, `why` (why they came), `thought` (what I thought).
   - `WALKS` — the walks on offer: name, route, duration, **price**, description.

## Still to change
- "Your Name" in all three `.html` files
- `you@example.com`, the Instagram link, and the WhatsApp number `910000000000` (format: 91 + your number, no spaces)
- The example prices in `data.js`
- Forms currently open the visitor's email app. For forms that send straight to your inbox, sign up at formspree.io and replace `action="mailto:..."` with your Formspree URL.

## Put it online (free, GitHub Pages)
Repo **Settings → Pages → Deploy from a branch**, pick the branch and `/ (root)`, save.
