/*
  ============================================================
  YOUR PHOTOS LIVE HERE — edit this file to add / change photos.
  ============================================================
  Put the image file in the images/ folder, then add an entry.
  Every field except src/title is optional — leave out what you don't know.
*/

// ---------- 1. MY PHOTOGRAPHY (personal work) ----------
// tone:   "bw" (black & white) or "colour"
// series: the catalogue it belongs to — any name you like; filter buttons are made automatically
const PHOTOS = [
  {
    src: "https://picsum.photos/id/1067/900/600?grayscale",
    title: "Afternoon, Esplanade",
    tone: "bw",
    series: "Streets",
    shutter: "1/500s", aperture: "f/8", iso: "200", focal: "35mm", camera: "Your camera",
    place: "Esplanade, Kolkata", year: "2026",
    note: "A line or two about why you took this."
  },
  {
    src: "https://picsum.photos/id/64/600/900?grayscale",
    title: "The tea seller",
    tone: "bw", series: "People",
    shutter: "1/125s", aperture: "f/2.8", iso: "800", focal: "50mm",
    place: "Shyambazar, Kolkata", year: "2026"
  },
  {
    src: "https://picsum.photos/id/1056/600/900",
    title: "Last tram home",
    tone: "colour", series: "Night",
    shutter: "1/30s", aperture: "f/1.8", iso: "3200", focal: "35mm",
    place: "Kolkata", year: "2025"
  },
  {
    src: "https://picsum.photos/id/1036/600/900?grayscale",
    title: "Red earth, grey sky",
    tone: "bw", series: "Shantiniketan",
    shutter: "1/250s", aperture: "f/11", iso: "100", focal: "24mm",
    place: "Khoai, Shantiniketan", year: "2025"
  },
  {
    src: "https://picsum.photos/id/1078/900/600",
    title: "Flower market, 6am",
    tone: "colour", series: "Streets",
    shutter: "1/200s", aperture: "f/4", iso: "400", focal: "28mm",
    place: "Mullick Ghat, Kolkata", year: "2026"
  },
  {
    src: "https://picsum.photos/id/91/900/600",
    title: "Before the idol leaves",
    tone: "colour", series: "Festivals",
    shutter: "1/160s", aperture: "f/2", iso: "640", focal: "50mm",
    place: "Kumartuli, Kolkata", year: "2025"
  },
  {
    src: "https://picsum.photos/id/1048/900/600?grayscale",
    title: "Facade",
    tone: "bw", series: "Streets",
    shutter: "1/250s", aperture: "f/8", iso: "200", focal: "35mm",
    place: "North Kolkata", year: "2026"
  },
  {
    src: "https://picsum.photos/id/1043/900/600",
    title: "Long exposure, Hooghly",
    tone: "colour", series: "Night",
    shutter: "15s", aperture: "f/16", iso: "100", focal: "24mm",
    place: "Prinsep Ghat, Kolkata", year: "2025"
  },
  {
    src: "https://picsum.photos/id/338/600/900?grayscale",
    title: "Baul singer",
    tone: "bw", series: "Shantiniketan",
    shutter: "1/160s", aperture: "f/2.8", iso: "400", focal: "85mm",
    place: "Sonajhuri Haat, Shantiniketan", year: "2025"
  },
];

// ---------- 2. EXHIBITIONS ----------
const EXHIBITIONS = [
  { year: "2026", title: "Exhibition name", place: "Gallery, Kolkata", note: "Group show — 4 prints" },
  { year: "2025", title: "Another exhibition", place: "Venue, Shantiniketan", note: "" },
];

// ---------- 3. PHOTO WALK STORIES ----------
// Photos from your walks, with the person you walked with and the story.
const WALK_STORIES = [
  {
    src: "https://picsum.photos/id/1067/900/600",
    title: "Waiting for the 3C/1",
    walk: "North Kolkata Lanes",
    date: "Nov 2026",
    person: "Anna, from Berlin",
    why: "She was in Kolkata for a week and wanted to see the city without a tour bus.",
    thought: "What I was thinking when I took this, and why I picked it for the wall.",
    shutter: "1/250s", aperture: "f/5.6", iso: "400"
  },
  {
    src: "https://picsum.photos/id/1078/600/900",
    title: "Marigolds",
    walk: "Bridge & Flowers at Dawn",
    date: "Oct 2026",
    person: "Rohit, a student from Pune",
    why: "Just bought his first camera and wanted to learn to shoot strangers without being awkward.",
    thought: "He took a better photo than me on this corner. This is mine anyway."
  },
  {
    src: "https://picsum.photos/id/1036/900/600",
    title: "Saturday at the haat",
    walk: "Shantiniketan Day",
    date: "Sep 2026",
    person: "Meera & her dad",
    why: "A father-daughter trip — he studied at Visva-Bharati decades ago.",
    thought: "He kept stopping to tell us what used to be here. Best history lesson of the year."
  },
];

// ---------- 4. PHOTO WALKS ON OFFER ----------
// Prices are examples — set your own.
const WALKS = [
  {
    name: "North Kolkata Lanes",
    city: "Kolkata",
    img: "https://picsum.photos/id/1048/900/600",
    duration: "≈ 4 hours",
    price: "₹1,500 / person",
    route: "Shobhabazar → Kumartuli → Ahiritola Ghat → College Street",
    blurb: "Old mansions, the potters' quarter where Durga idols are made by hand, a ferry ride across the Hooghly, and the book stalls of Boi Para. We finish with coffee at the Indian Coffee House."
  },
  {
    name: "Bridge & Flowers at Dawn",
    city: "Kolkata",
    img: "https://picsum.photos/id/1078/900/600",
    duration: "≈ 3 hours, starts ~5:30am",
    price: "₹1,200 / person",
    route: "Mullick Ghat Flower Market → Howrah Bridge → the ghats",
    blurb: "The flower market under Howrah Bridge when it's at its busiest, wrestlers and bathers at the ghats, and the city waking up. Early, loud, worth it."
  },
  {
    name: "Shantiniketan Day",
    city: "Shantiniketan",
    img: "https://picsum.photos/id/1036/900/600",
    duration: "Full day (best on a Saturday)",
    price: "₹2,500 / person + train fare",
    route: "Train from Howrah → Visva-Bharati → Khoai → Sonajhuri Haat",
    blurb: "Tagore's university town: the campus, red-earth Khoai, and the Saturday haat with Baul singers and local crafts. We go by local train, like everyone else."
  },
];
