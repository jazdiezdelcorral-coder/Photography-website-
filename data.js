/*
  ============================================================
  EVERYTHING YOU EDIT LIVES IN THIS FILE.
  ============================================================
*/

// ---------- YOU ----------
const SITE = {
  name: "Your Name",
  tagline: "20. Kolkata. Always carrying a camera.",
  email: "you@example.com",
  instagram: "https://instagram.com/",
  whatsapp: "910000000000", // 91 + your number, no spaces or +
};

// ---------- ALBUMS (Photos → Personal) ----------
// Each album = one subject. Photos inside can be black & white or colour.
// To add a photo: put the file in images/ and add a line like
//   { src: "images/howrah.jpg", title: "Howrah, 6am", shutter: "1/250s", aperture: "f/8", iso: "200", focal: "35mm", place: "Howrah", year: "2026" },
// Only src is required. "cover" = which photo (counting from 0) is shown on the album tile.
const ALBUMS = [
  {
    id: "trains",
    title: "Trains",
    blurb: "Local trains, long-distance trains, stations, the people waiting on platforms.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1067/900/600?grayscale", title: "Platform 9, Howrah", shutter: "1/250s", aperture: "f/8", iso: "400", focal: "35mm", place: "Howrah Station", year: "2026" },
      { src: "https://picsum.photos/id/1048/600/900", title: "Window seat", shutter: "1/500s", aperture: "f/4", iso: "200", place: "Bardhaman local", year: "2026" },
      { src: "https://picsum.photos/id/1056/900/600?grayscale", title: "Night arrival", shutter: "1/30s", aperture: "f/1.8", iso: "3200", year: "2025" },
      { src: "https://picsum.photos/id/1078/900/600", title: "Chai at the door", shutter: "1/160s", aperture: "f/2.8", iso: "400", year: "2025" },
    ],
  },
  {
    id: "on-the-plane",
    title: "On the Plane",
    blurb: "Clouds, wings, airports, and the strange quiet of 35,000 feet.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1043/900/600", title: "Above the Bay of Bengal", shutter: "1/1000s", aperture: "f/8", iso: "100", year: "2026" },
      { src: "https://picsum.photos/id/1036/600/900?grayscale", title: "Wing", shutter: "1/2000s", aperture: "f/5.6", iso: "100", year: "2025" },
      { src: "https://picsum.photos/id/1015/900/600", title: "Descent", shutter: "1/800s", aperture: "f/8", iso: "200", year: "2025" },
    ],
  },
  {
    id: "streets-of-kolkata",
    title: "Streets of Kolkata",
    blurb: "The city as people actually live in it.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1067/900/600", title: "Esplanade, afternoon", shutter: "1/500s", aperture: "f/8", iso: "200", place: "Esplanade", year: "2026" },
      { src: "https://picsum.photos/id/64/600/900?grayscale", title: "The tea seller", shutter: "1/125s", aperture: "f/2.8", iso: "800", place: "Shyambazar", year: "2026" },
      { src: "https://picsum.photos/id/1048/900/600?grayscale", title: "Facade", shutter: "1/250s", aperture: "f/8", iso: "200", place: "North Kolkata", year: "2026" },
      { src: "https://picsum.photos/id/91/900/600", title: "Before the idol leaves", shutter: "1/160s", aperture: "f/2", iso: "640", place: "Kumartuli", year: "2025" },
      { src: "https://picsum.photos/id/1078/600/900", title: "Flower market, 6am", shutter: "1/200s", aperture: "f/4", iso: "400", place: "Mullick Ghat", year: "2026" },
    ],
  },
  {
    id: "shantiniketan",
    title: "Shantiniketan",
    blurb: "Red earth, Baul songs, Saturday haat.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1036/900/600", title: "Khoai", shutter: "1/250s", aperture: "f/11", iso: "100", place: "Khoai", year: "2025" },
      { src: "https://picsum.photos/id/338/600/900?grayscale", title: "Baul singer", shutter: "1/160s", aperture: "f/2.8", iso: "400", focal: "85mm", place: "Sonajhuri Haat", year: "2025" },
      { src: "https://picsum.photos/id/1039/900/600", title: "After the rain", shutter: "1/125s", aperture: "f/5.6", iso: "200", year: "2025" },
    ],
  },
];

// ---------- PHOTO WALKS (we'll work on this section later) ----------
const WALK_STORIES = [
  {
    src: "https://picsum.photos/id/1067/900/600",
    title: "Waiting for the 3C/1",
    walk: "North Kolkata Lanes", date: "Nov 2026",
    person: "Example walker",
    why: "Why they came on the walk.",
    thought: "What I was thinking when I took this.",
  },
];

const WALKS = [
  {
    name: "North Kolkata Lanes", city: "Kolkata",
    img: "https://picsum.photos/id/1048/900/600",
    duration: "≈ 4 hours", price: "₹1,500 / person",
    route: "Shobhabazar → Kumartuli → Ahiritola Ghat → College Street",
    blurb: "Old mansions, the potters' quarter where Durga idols are made by hand, a ferry across the Hooghly, and the book stalls of Boi Para.",
  },
  {
    name: "Bridge & Flowers at Dawn", city: "Kolkata",
    img: "https://picsum.photos/id/1078/900/600",
    duration: "≈ 3 hours, starts ~5:30am", price: "₹1,200 / person",
    route: "Mullick Ghat Flower Market → Howrah Bridge → the ghats",
    blurb: "The flower market under Howrah Bridge at its busiest, and the city waking up.",
  },
  {
    name: "Shantiniketan Day", city: "Shantiniketan",
    img: "https://picsum.photos/id/1036/900/600",
    duration: "Full day (best on a Saturday)", price: "₹2,500 / person + train fare",
    route: "Train from Howrah → Visva-Bharati → Khoai → Sonajhuri Haat",
    blurb: "Tagore's university town, red-earth Khoai, and the Saturday haat. We go by local train.",
  },
];
