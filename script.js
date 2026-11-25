// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Header background on scroll
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 50);
window.addEventListener("scroll", onScroll);
onScroll();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// Gallery filters
const figures = [...document.querySelectorAll(".gallery figure")];
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    const f = btn.dataset.filter;
    figures.forEach(fig => fig.classList.toggle("hide", f !== "all" && fig.dataset.category !== f));
  });
});

// Lightbox
const lb = document.querySelector(".lightbox");
const lbImg = lb.querySelector("img");
let current = 0;

const visible = () => figures.filter(f => !f.classList.contains("hide"));
function show(i) {
  const list = visible();
  current = (i + list.length) % list.length;
  const img = list[current].querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
}
figures.forEach(fig => fig.addEventListener("click", () => {
  show(visible().indexOf(fig));
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}));
function close() { lb.hidden = true; document.body.style.overflow = ""; }

lb.querySelector(".lb-close").addEventListener("click", close);
lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
lb.addEventListener("click", e => { if (e.target === lb) close(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
