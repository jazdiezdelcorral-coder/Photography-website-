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
  <div class="header-tools">
    <nav class="nav">${NAV.map(([k, href, label]) => `<a href="${href}"${k === page ? ' class="current"' : ""}>${label}</a>`).join("")}</nav>
    <button class="theme-toggle" type="button"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/></svg></button>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
  </div>`;

// ---------- Dark / light switch ----------
// Dark is the default. The choice is remembered in this visitor's own browser only
// (a one-line script in each page's <head> applies it before the page draws).
const themeBtn = $(".theme-toggle");
const isLight = () => document.documentElement.dataset.theme === "light";
const labelTheme = () => {
  const text = isLight() ? "Switch to dark" : "Switch to light";
  themeBtn.setAttribute("aria-label", text);
  themeBtn.title = text;
};
themeBtn.addEventListener("click", () => {
  if (isLight()) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = "light";
  try { localStorage.setItem("aupa-theme", isLight() ? "light" : "dark"); } catch (e) {}
  labelTheme();
});
labelTheme();

const waLink = "https://wa.me/" + SITE.whatsapp;
$(".site-footer").innerHTML = `
  <div class="footer-links">
    <a href="mailto:${esc(SITE.email)}">Email</a>
    <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>
    <a href="${waLink}" target="_blank" rel="noopener">WhatsApp</a>
  </div>
  <p>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}. All photos are my own. · <a href="privacy.html" class="footer-privacy">Privacy</a></p>`;

$$("[data-site]").forEach(el => {
  const k = el.dataset.site;
  if (k === "whatsapp") el.href = waLink;
  else if (k === "email") { el.textContent = SITE.email; if (el.tagName === "A") el.href = "mailto:" + SITE.email; }
  else el.textContent = SITE[k];
});
$$("form[action^='mailto:']").forEach(f => (f.action = "mailto:" + SITE.email));
if (page !== "home") document.title = document.title + " — " + SITE.name;
else document.title = SITE.name + " — " + document.title;

// remember the header's height so sticky bars can sit right under it
const setHeaderHeight = () => document.documentElement.style.setProperty("--hh", header.offsetHeight + "px");
setHeaderHeight();
window.addEventListener("resize", setHeaderHeight);

const solid = document.body.classList.contains("solid-header");
const onScroll = () => header.classList.toggle("scrolled", solid || window.scrollY > 50);
window.addEventListener("scroll", onScroll);
onScroll();

const toggle = $(".nav-toggle"), nav = $(".nav");
toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("open")));

// ---------- "Aúpa's letter" sign-up (home page) ----------
// The site can't store emails itself: the form sends them straight to Kit, which keeps the list,
// sends the confirmation email and handles unsubscribing.
const letterForm = $("#letter-form");
if (letterForm) {
  const nl = SITE.newsletter || {};
  $("#letter-name").textContent = nl.name || "Newsletter";
  $("#letter-pitch").textContent = nl.pitch || "";
  const id = String(nl.kitFormId || "").trim();
  if (/^\d+$/.test(id)) {
    letterForm.action = `https://app.kit.com/forms/${id}/subscriptions`;
  } else {
    // Not connected yet: don't let anyone type an email that would go nowhere
    $("#letter-email").disabled = true;
    $("#letter-submit").disabled = true;
    $("#letter-small").textContent = "Sign-ups open soon.";
  }
}

// ---------- "Who's this?" pop-up (tap the name on the home page) ----------
const aboutPop = $("#about-pop");
if (aboutPop) {
  $("#about-text").innerHTML = (SITE.about || []).map(p => `<p>${esc(p)}</p>`).join("");
  const openBtn = $("#about-open");
  openBtn.addEventListener("click", () => aboutPop.showModal());
  $("#about-close").addEventListener("click", () => aboutPop.close());
  aboutPop.addEventListener("click", e => { if (e.target === aboutPop) aboutPop.close(); }); // tap outside to close
}

// ---------- Lightbox (full screen) ----------
// Items: { src, alt, caption, story }. "story" is the HTML for the Story panel; photos without one
// show no Story button. Story mode stays on while moving between photos.
const lb = $(".lightbox");
let lbItems = [], lbIndex = 0, lbStoryMode = false;
if (lb) {
  lb.insertAdjacentHTML("beforeend", `<div class="lb-text" aria-live="polite"></div><button class="lb-story" type="button" hidden>Story</button>`);
}
function lbShow(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const it = lbItems[lbIndex];
  $("img", lb).src = it.src;
  $("img", lb).alt = it.alt || "";
  $("figcaption", lb).innerHTML = it.caption || "";
  $(".lb-text", lb).innerHTML = it.story || "";
  $(".lb-text", lb).scrollTop = 0;
  lb.scrollTop = 0;
  lb.classList.toggle("has-story", !!it.story);
  lb.classList.toggle("story-on", lbStoryMode);
  const btn = $(".lb-story", lb);
  btn.hidden = !it.story;
  btn.textContent = lbStoryMode ? "Photo" : "Story";
  btn.setAttribute("aria-pressed", String(lbStoryMode));
}
function lbOpen(items, i) { lbItems = items; lbStoryMode = false; lbShow(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
function lbClose() { lb.hidden = true; document.body.style.overflow = ""; }
if (lb) {
  $(".lb-close", lb).onclick = lbClose;
  $(".lb-prev", lb).onclick = () => lbShow(lbIndex - 1);
  $(".lb-next", lb).onclick = () => lbShow(lbIndex + 1);
  $(".lb-story", lb).onclick = () => { lbStoryMode = !lbStoryMode; lbShow(lbIndex); };
  lb.addEventListener("click", e => { if (e.target === lb) lbClose(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
    if (e.key === "ArrowRight") lbShow(lbIndex + 1);
    if ((e.key === "s" || e.key === "S") && lbItems[lbIndex]?.story) { lbStoryMode = !lbStoryMode; lbShow(lbIndex); }
  });
}

// The Story panel for one photo: title, place and year, the story itself, the camera settings
function storyHtml(p, fallbackTitle) {
  if (!p.story) return "";
  const paras = Array.isArray(p.story) ? p.story : [p.story];
  const where = [p.place, p.year].filter(Boolean).join(", ");
  return `<h3>${esc(p.title || fallbackTitle || "")}</h3>
    ${where ? `<p class="where">${esc(where)}</p>` : ""}
    ${paras.map(t => `<p>${esc(t)}</p>`).join("")}
    ${settings(p) ? `<span class="exif">${esc(settings(p))}</span>` : ""}`;
}

// ---------- Photo wall (album page) ----------
// Rows of photos that each keep their own shape. With a mouse: hovering zooms a photo,
// sized and anchored so it always stays fully on screen. On touch: tap opens full screen.
const canHover = matchMedia("(hover: hover) and (pointer: fine)");
let wallUnzoom = () => {};
window.addEventListener("scroll", () => wallUnzoom(), { passive: true });

function buildWall(wall, photos, items) {
  wall.innerHTML = photos.map((p, j) => `
    <figure data-i="${j}" tabindex="0" role="button" aria-label="Open ${esc(p.title || p.alt || "photo")}">
      <i></i><img src="${esc(p.src)}" alt="${esc(p.alt || p.title || "")}" ${j > 11 ? 'loading="lazy"' : ""}>
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
    const bar = $(".album-bar");
    // the zoomed photo stays below the menu, and below the album strip while the strip is stuck under the menu
    const headerBottom = header.getBoundingClientRect().bottom;
    const barBox = bar ? bar.getBoundingClientRect() : null;
    const barStuck = barBox && barBox.top <= headerBottom + 1;
    const m = 16, top = (barStuck ? barBox.bottom : headerBottom) + m;
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
  wallUnzoom = unzoom;

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

// ---------- Photos: album list ----------
const albumList = $("#album-list");
if (albumList) {
  albumList.innerHTML = ALBUMS.map((a, i) => {
    const cover = a.photos[a.cover || 0] || a.photos[0];
    return `
    <a class="album-tile" href="album.html#${encodeURIComponent(a.id)}"${a.theme ? ` data-theme="${esc(a.theme)}"` : ""}>
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
  // The album is chosen by the part after # (album.html#trains). Old ?id= links still work.
  const currentId = () => decodeURIComponent(location.hash.slice(1)) || new URLSearchParams(location.search).get("id");

  // Album switcher strip: every album, always one tap away.
  const track = $("#album-bar");
  track.innerHTML = `<a class="bar-pill all" href="photos.html"><span class="grid-icon" aria-hidden="true"></span>All albums</a>` +
    ALBUMS.map((a, i) => {
      const cover = a.photos[a.cover || 0] || a.photos[0];
      return `<a class="bar-pill" href="#${encodeURIComponent(a.id)}" data-id="${esc(a.id)}">
        ${cover ? `<img src="${esc(cover.src)}" alt="">` : ""}<span class="n">${pad(i + 1)}</span>${esc(a.title)}</a>`;
    }).join("");

  // Arrows appear only when the albums don't all fit
  const prevBtn = $(".bar-arrow.prev"), nextBtn = $(".bar-arrow.next");
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth;
    prevBtn.hidden = !canHover.matches || track.scrollLeft <= 2;
    nextBtn.hidden = !canHover.matches || track.scrollLeft >= max - 2;
  };
  prevBtn.onclick = () => track.scrollBy({ left: -track.clientWidth * 0.7, behavior: "smooth" });
  nextBtn.onclick = () => track.scrollBy({ left: track.clientWidth * 0.7, behavior: "smooth" });
  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);

  // Drag the strip sideways with a mouse (touch screens already swipe natively)
  let drag = null;
  track.addEventListener("pointerdown", e => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });
  window.addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) { drag.moved = true; track.classList.add("dragging"); }
    if (drag.moved) track.scrollLeft = drag.left - dx;
  });
  window.addEventListener("pointerup", () => { setTimeout(() => { drag = null; track.classList.remove("dragging"); }, 0); });
  track.addEventListener("click", e => { if (drag && drag.moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  track.addEventListener("dragstart", e => e.preventDefault());

  function renderAlbum() {
    const id = currentId();
    const i = Math.max(0, ALBUMS.findIndex(a => a.id === id));
    const a = ALBUMS[i];
    if (a.theme) document.body.dataset.album = a.theme; else delete document.body.dataset.album;
    const board = $("#album-board");
    board.textContent = a.board || "";
    board.hidden = !a.board;
    document.title = a.title + " — " + SITE.name;
    $("#album-num").textContent = "Album " + pad(i + 1);
    $("#album-title").textContent = a.title;
    $("#album-blurb").textContent = a.blurb || "";
    $("#album-count").textContent = a.photos.length + " photos";

    const items = a.photos.map(p => ({
      src: p.src, alt: p.alt || p.title,
      caption: `${p.title ? `<strong>${esc(p.title)}</strong>` : ""}
        ${p.place || p.year ? `<span>${esc([p.place, p.year].filter(Boolean).join(", "))}</span>` : ""}
        ${settings(p) ? `<span class="exif">${esc(settings(p))}</span>` : ""}
        ${p.note ? `<span class="note">${esc(p.note)}</span>` : ""}`,
      story: storyHtml(p, a.title),
    }));
    buildWall(albumPhotos, a.photos, items);

    // highlight the current album in the strip and bring it into view
    $$(".bar-pill[data-id]", track).forEach(p => {
      const on = p.dataset.id === a.id;
      p.classList.toggle("current", on);
      if (on) { p.setAttribute("aria-current", "page"); track.scrollTo({ left: p.offsetLeft - (track.clientWidth - p.offsetWidth) / 2 }); }
      else p.removeAttribute("aria-current");
    });
    updateArrows();

    const prev = ALBUMS[i - 1], next = ALBUMS[i + 1];
    $("#album-nav").innerHTML = `
      ${prev ? `<a href="#${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : "<span></span>"}
      <a href="photos.html">All albums</a>
      ${next ? `<a href="#${encodeURIComponent(next.id)}">${esc(next.title)} →</a>` : "<span></span>"}`;
  }

  window.addEventListener("hashchange", () => { renderAlbum(); window.scrollTo(0, 0); });
  renderAlbum();
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
