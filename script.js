const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const settings = p => [p.shutter, p.aperture, p.iso && "ISO " + p.iso, p.focal, p.camera].filter(Boolean).join(" · ");

// ---------- Shared: year, header, mobile menu ----------
$$(".year").forEach(el => (el.textContent = new Date().getFullYear()));

const header = $(".site-header");
const solid = document.body.classList.contains("solid-header");
const onScroll = () => header.classList.toggle("scrolled", solid || window.scrollY > 50);
window.addEventListener("scroll", onScroll);
onScroll();

const toggle = $(".nav-toggle"), nav = $(".nav");
toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("open")));
$$("a", nav).forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// ---------- Lightbox (works with any list of {src, caption}) ----------
const lb = $(".lightbox");
let lbItems = [], lbIndex = 0;
function lbShow(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const it = lbItems[lbIndex];
  $("img", lb).src = it.src;
  $("img", lb).alt = it.alt || "";
  $("figcaption", lb).innerHTML = it.caption || "";
}
function lbOpen(items, i) {
  lbItems = items; lbShow(i);
  lb.hidden = false; document.body.style.overflow = "hidden";
}
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

// ---------- Photography page ----------
const gallery = $("#photo-gallery");
if (gallery && typeof PHOTOS !== "undefined") {
  let tone = "all", series = "all";

  const seriesBox = $("#series-filters");
  const allSeries = [...new Set(PHOTOS.map(p => p.series).filter(Boolean))];
  seriesBox.innerHTML = ['<button class="filter active" data-value="all">All series</button>']
    .concat(allSeries.map(s => `<button class="filter" data-value="${esc(s)}">${esc(s)}</button>`)).join("");

  const caption = p => `<strong>${esc(p.title)}</strong>
    ${p.place || p.year ? `<span>${esc([p.place, p.year].filter(Boolean).join(", "))}</span>` : ""}
    ${settings(p) ? `<span class="exif">${esc(settings(p))}</span>` : ""}
    ${p.note ? `<span class="note">${esc(p.note)}</span>` : ""}`;

  function render() {
    const list = PHOTOS.filter(p => (tone === "all" || p.tone === tone) && (series === "all" || p.series === series));
    gallery.innerHTML = list.length ? list.map((p, i) => `
      <figure data-i="${i}">
        <img loading="lazy" src="${esc(p.src)}" alt="${esc(p.title)}">
        <figcaption><strong>${esc(p.title)}</strong><span class="exif">${esc(settings(p))}</span></figcaption>
      </figure>`).join("") : '<p class="hint">No photos in this combination yet.</p>';
    const items = list.map(p => ({ src: p.src, alt: p.title, caption: caption(p) }));
    $$("figure", gallery).forEach(f => f.addEventListener("click", () => lbOpen(items, +f.dataset.i)));
  }

  function wire(box, set) {
    box.addEventListener("click", e => {
      const b = e.target.closest(".filter"); if (!b) return;
      $$(".filter", box).forEach(x => x.classList.toggle("active", x === b));
      set(b.dataset.value); render();
    });
  }
  wire($("#tone-filters"), v => (tone = v));
  wire(seriesBox, v => (series = v));
  render();

  const ex = $("#exhibition-list");
  if (ex && typeof EXHIBITIONS !== "undefined") {
    ex.innerHTML = EXHIBITIONS.map(e => `
      <li><span class="ex-year">${esc(e.year)}</span>
        <div><strong>${esc(e.title)}</strong><span>${esc(e.place)}</span>${e.note ? `<em>${esc(e.note)}</em>` : ""}</div></li>`).join("");
  }
}

// ---------- Walks page ----------
const walkList = $("#walk-list");
if (walkList && typeof WALKS !== "undefined") {
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
if (storyList && typeof WALK_STORIES !== "undefined") {
  storyList.innerHTML = WALK_STORIES.map((s, i) => `
    <article class="story">
      <figure data-i="${i}"><img loading="lazy" src="${esc(s.src)}" alt="${esc(s.title)}"></figure>
      <div>
        <p class="eyebrow">${esc(s.walk)}${s.date ? " · " + esc(s.date) : ""}</p>
        <h3>${esc(s.title)}</h3>
        ${s.person ? `<p class="with">Walked with <strong>${esc(s.person)}</strong></p>` : ""}
        ${s.why ? `<p><span class="label">Why they came</span>${esc(s.why)}</p>` : ""}
        ${s.thought ? `<p><span class="label">What I thought</span>${esc(s.thought)}</p>` : ""}
        ${settings(s) ? `<p class="exif">${esc(settings(s))}</p>` : ""}
      </div>
    </article>`).join("");
  const items = WALK_STORIES.map(s => ({ src: s.src, alt: s.title, caption: `<strong>${esc(s.title)}</strong><span>${esc(s.walk)} — with ${esc(s.person || "")}</span>` }));
  $$("figure", storyList).forEach(f => f.addEventListener("click", () => lbOpen(items, +f.dataset.i)));
}
