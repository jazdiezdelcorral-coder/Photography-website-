const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const settings = p => [p.shutter, p.aperture, p.iso && "ISO " + p.iso, p.focal, p.camera].filter(Boolean).join(" · ");
const pad = n => String(n).padStart(2, "0");
const page = document.body.dataset.page;

// ---------- Header + footer (same on every page, built from SITE in data.js) ----------
const NAV = [["photos", "photos.html", "Photos"], ["walks", "walks.html", "Photo Walks"], ["portfolio", "portfolio.html", "Portfolio"], ["shop", "shop.html", "Shop"]];
const header = $(".site-header");
header.innerHTML = `
  <a href="index.html" class="logo">${esc(SITE.name)}</a>
  <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
  <nav class="nav">${NAV.map(([k, href, label]) => `<a href="${href}"${k === page ? ' class="current"' : ""}>${label}</a>`).join("")}</nav>`;

const waLink = "https://wa.me/" + SITE.whatsapp;
$(".site-footer").innerHTML = `
  <div class="footer-links">
    <a href="mailto:${esc(SITE.email)}">Email</a>
    <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>
    <a href="${waLink}" target="_blank" rel="noopener">WhatsApp</a>
  </div>
  <p>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}. All photos are my own.</p>`;

$$("[data-site]").forEach(el => {
  const k = el.dataset.site;
  if (k === "whatsapp") el.href = waLink; else el.textContent = SITE[k];
});
$$("form[action^='mailto:']").forEach(f => (f.action = "mailto:" + SITE.email));
if (page !== "home") document.title = document.title + " — " + SITE.name;
else document.title = SITE.name + " — " + document.title;

const solid = document.body.classList.contains("solid-header");
const onScroll = () => header.classList.toggle("scrolled", solid || window.scrollY > 50);
window.addEventListener("scroll", onScroll);
onScroll();

const toggle = $(".nav-toggle"), nav = $(".nav");
toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("open")));

// ---------- Lightbox ----------
const lb = $(".lightbox");
let lbItems = [], lbIndex = 0;
function lbShow(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const it = lbItems[lbIndex];
  $("img", lb).src = it.src;
  $("img", lb).alt = it.alt || "";
  $("figcaption", lb).innerHTML = it.caption || "";
}
function lbOpen(items, i) { lbItems = items; lbShow(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
function lbClose() { lb.hidden = true; document.body.style.overflow = ""; }
if (lb) {
  $(".lb-close", lb).onclick = lbClose;
  $(".lb-prev", lb).onclick = () => lbShow(lbIndex - 1);
  $(".lb-next", lb).onclick = () => lbShow(lbIndex + 1);
  lb.addEventListener("click", e => { if (e.target === lb) lbClose(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
    if (e.key === "ArrowRight") lbShow(lbIndex + 1);
  });
}

// ---------- Photo wall (album page) ----------
// Rows of photos that each keep their own shape. With a mouse: hovering zooms a photo,
// sized and anchored so it always stays fully on screen. On touch: tap opens full screen.
const canHover = matchMedia("(hover: hover) and (pointer: fine)");

function buildWall(wall, photos, items) {
  wall.innerHTML = photos.map((p, j) => `
    <figure data-i="${j}" tabindex="0" role="button" aria-label="Open ${esc(p.title || "photo")}">
      <i></i><img src="${esc(p.src)}" alt="${esc(p.title || "")}" ${j > 11 ? 'loading="lazy"' : ""}>
      ${p.title ? `<figcaption>${esc(p.title)}</figcaption>` : ""}
    </figure>`).join("");

  let current = null;
  function unzoom() {
    if (!current) return;
    current.classList.remove("zoom");
    wall.classList.remove("zooming");
    current = null;
  }
  function zoom(fig) {
    if (!fig.classList.contains("ready")) return;
    unzoom();
    const r = fig.getBoundingClientRect();
    const m = 16, top = header.getBoundingClientRect().bottom + m;
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    // as big as possible up to 2x, but never bigger than the visible screen
    const z = Math.min(2, (vw - 2 * m) / r.width, (vh - top - m) / r.height);
    if (z < 1.1) return; // already big, no point zooming
    // choose the zoom anchor so the enlarged photo stays inside the screen
    const anchor = (start, size, min, max) => {
      const lo = (start + size * z - max) / (z - 1), hi = (start - min) / (z - 1);
      return Math.max(0, Math.min(Math.max(size / 2, lo), hi, size));
    };
    fig.style.transformOrigin = `${anchor(r.left, r.width, m, vw - m)}px ${anchor(r.top, r.height, top, vh - m)}px`;
    fig.style.setProperty("--z", z.toFixed(3));
    fig.classList.add("zoom");
    wall.classList.add("zooming");
    current = fig;
  }
  window.addEventListener("scroll", unzoom, { passive: true });

  $$("figure", wall).forEach(fig => {
    const img = $("img", fig);
    const ready = () => {
      fig.style.setProperty("--r", (img.naturalWidth / img.naturalHeight).toFixed(4));
      fig.classList.add("ready");
    };
    if (img.complete && img.naturalWidth) ready();
    else {
      img.addEventListener("load", ready, { once: true });
      img.addEventListener("error", () => (fig.hidden = true), { once: true }); // broken link: hide it
    }
    const open = () => { unzoom(); lbOpen(items, +fig.dataset.i); };
    fig.addEventListener("click", open);
    fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    fig.addEventListener("mouseenter", () => canHover.matches && zoom(fig));
    fig.addEventListener("mouseleave", unzoom);
  });
}

// Swipe left/right in the full-screen view on phones
if (lb) {
  let sx = null;
  lb.addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  });
}

// ---------- Personal: album list ----------
const albumList = $("#album-list");
if (albumList) {
  albumList.innerHTML = ALBUMS.map((a, i) => {
    const cover = a.photos[a.cover || 0] || a.photos[0];
    return `
    <a class="album-tile" href="album.html?id=${encodeURIComponent(a.id)}">
      <div class="album-cover">${cover ? `<img loading="lazy" src="${esc(cover.src)}" alt="">` : ""}</div>
      <p class="eyebrow">Album ${pad(i + 1)}</p>
      <h2>${esc(a.title)}</h2>
      <p class="meta">${a.photos.length} photo${a.photos.length === 1 ? "" : "s"}</p>
    </a>`;
  }).join("");
}

// ---------- Album page ----------
const albumPhotos = $("#album-photos");
if (albumPhotos) {
  const id = new URLSearchParams(location.search).get("id");
  const i = Math.max(0, ALBUMS.findIndex(a => a.id === id));
  const a = ALBUMS[i];
  document.title = a.title + " — " + SITE.name;
  $("#album-num").textContent = "Album " + pad(i + 1);
  $("#album-title").textContent = a.title;
  $("#album-blurb").textContent = a.blurb || "";
  $("#album-count").textContent = a.photos.length + " photos";

  const items = a.photos.map(p => ({
    src: p.src, alt: p.title,
    caption: `${p.title ? `<strong>${esc(p.title)}</strong>` : ""}
      ${p.place || p.year ? `<span>${esc([p.place, p.year].filter(Boolean).join(", "))}</span>` : ""}
      ${settings(p) ? `<span class="exif">${esc(settings(p))}</span>` : ""}
      ${p.note ? `<span class="note">${esc(p.note)}</span>` : ""}`,
  }));
  buildWall(albumPhotos, a.photos, items);

  const prev = ALBUMS[i - 1], next = ALBUMS[i + 1];
  $("#album-nav").innerHTML = `
    ${prev ? `<a href="album.html?id=${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : "<span></span>"}
    <a href="personal.html">All albums</a>
    ${next ? `<a href="album.html?id=${encodeURIComponent(next.id)}">${esc(next.title)} →</a>` : "<span></span>"}`;
}

// ---------- Photo walks page ----------
const walkList = $("#walk-list");
if (walkList) {
  walkList.innerHTML = WALKS.map(w => `
    <article class="walk">
      <img loading="lazy" src="${esc(w.img)}" alt="${esc(w.name)}">
      <div class="walk-body">
        <p class="eyebrow">${esc(w.city)}</p>
        <h3>${esc(w.name)}</h3>
        <p class="route">${esc(w.route)}</p>
        <p>${esc(w.blurb)}</p>
        <dl><dt>Time</dt><dd>${esc(w.duration)}</dd><dt>Price</dt><dd>${esc(w.price)}</dd></dl>
        <a href="#book" class="btn small" data-walk="${esc(w.name)}">Book this walk</a>
      </div>
    </article>`).join("");
  const sel = $("#walk-select");
  sel.innerHTML = WALKS.map(w => `<option>${esc(w.name)}</option>`).join("") + "<option>Private / custom walk</option>";
  $$("[data-walk]", walkList).forEach(a => a.addEventListener("click", () => (sel.value = a.dataset.walk)));
}

const storyList = $("#story-list");
if (storyList) {
  storyList.innerHTML = WALK_STORIES.map((s, i) => `
    <article class="story">
      <figure data-i="${i}"><img loading="lazy" src="${esc(s.src)}" alt="${esc(s.title)}"></figure>
      <div>
        <p class="eyebrow">${esc(s.walk)}${s.date ? " · " + esc(s.date) : ""}</p>
        <h3>${esc(s.title)}</h3>
        ${s.person ? `<p class="with">Walked with <strong>${esc(s.person)}</strong></p>` : ""}
        ${s.why ? `<p><span class="label">Why they came</span>${esc(s.why)}</p>` : ""}
        ${s.thought ? `<p><span class="label">What I thought</span>${esc(s.thought)}</p>` : ""}
      </div>
    </article>`).join("");
  const items = WALK_STORIES.map(s => ({ src: s.src, alt: s.title, caption: `<strong>${esc(s.title)}</strong>` }));
  $$("figure", storyList).forEach(f => f.addEventListener("click", () => lbOpen(items, +f.dataset.i)));
}
