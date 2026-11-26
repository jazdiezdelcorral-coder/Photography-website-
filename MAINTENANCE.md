# Keeping the site healthy

A short list. Tick it off; it takes minutes.

## Every time you change the site
- [ ] Run `python3 tools/check-site.py`. It must say **ALL GOOD** before anything is published.
- [ ] Open the changed pages on a phone and on a computer.

## Every month
- [ ] Click through every album: all photos load, nothing broken.
- [ ] Back up your full-size original photos in two places (an external drive and cloud storage).
- [ ] Re-read the Privacy page. Is it still true? (New service? New form? Update it and change its version and date.)
- [ ] Check the letter sign-ups in Kit look normal (no sudden flood of strange addresses).

## Every year
- [ ] Renew the domain (once you have one). Check the card on file.
- [ ] Renew `.well-known/security.txt`: change the `Expires` date to a year ahead.
- [ ] Look at the rules again: privacy, tax, and anything that changed where you live.

## On launch day (going public)
- [ ] Real email, Instagram and WhatsApp in `data.js`, and the email in `.well-known/security.txt`.
- [ ] Real photos everywhere: the check should show no "sample photos" warnings.
- [ ] Remove `picsum.photos` from the security line at the top of each page.
- [ ] Move to a host that allows security headers (Netlify or Cloudflare Pages) and connect your domain.
- [ ] Remove the `noindex` line from every page and delete `robots.txt`, so Google can find you.
- [ ] Connect the letter: put your Kit form number in `data.js`.
