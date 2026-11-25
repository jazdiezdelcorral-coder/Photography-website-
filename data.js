/*
  ============================================================
  EVERYTHING YOU EDIT LIVES IN THIS FILE.
  ============================================================
*/

// ---------- YOU ----------
const SITE = {
  name: "Aúpa",
  tagline: "20. Kolkata. Always carrying a camera.",
  email: "you@example.com",
  instagram: "https://instagram.com/",
  whatsapp: "910000000000", // 91 + your number, no spaces or +
};

// ---------- ALBUMS (Photos → Personal) ----------
// The things I keep coming back to. Each album can have its own background ("theme"):
//   "taxi"          Kolkata taxi yellow with a red stripe
//   "train"         Indian Railways coach: beige with red stripes + a destination board
//   "slow-shutter"  dark, with soft drifting light trails
//   "red-earth"     Shantiniketan's red soil
//   leave theme out for the normal black & gold
// "board" (train theme) is the text painted on the coach. Make it say whatever you like.
//
// To add a photo: put the file in images/ and add a line like
//   { src: "images/howrah.jpg", title: "Howrah, 6am", shutter: "1/250s", aperture: "f/8", iso: "200", focal: "35mm", place: "Howrah", year: "2026" },
// Only src is required. "cover" = which photo (counting from 0) is shown on the album tile.
const ALBUMS = [
  {
    id: "trains",
    title: "Trains",
    theme: "train",
    board: "HWH ⇄ BWN · GENERAL · UNRESERVED",
    blurb: "Local trains, long-distance trains, stations, the people waiting on platforms.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1067/900/600?grayscale", title: "Platform 9, Howrah", shutter: "1/250s", aperture: "f/8", iso: "400", focal: "35mm", place: "Howrah Station", year: "2026" },
      { src: "https://picsum.photos/id/1048/600/900", title: "Window seat", shutter: "1/500s", aperture: "f/4", iso: "200", place: "Bardhaman local", year: "2026" },
      { src: "https://picsum.photos/id/1056/900/600?grayscale", title: "Night arrival", shutter: "1/30s", aperture: "f/1.8", iso: "3200", year: "2025" },
      { src: "https://picsum.photos/id/1078/900/600", title: "Chai at the door", shutter: "1/160s", aperture: "f/2.8", iso: "400", year: "2025" },
      { src: "https://picsum.photos/id/1031/1800/700", title: "Coach, panorama" },
      { src: "https://picsum.photos/id/1060/800/1200?grayscale", title: "Ticket counter" },
      { src: "https://picsum.photos/id/1011/1600/900", title: "Crossing the Damodar" },
      { src: "https://picsum.photos/id/177/800/800?grayscale", title: "Hawker" },
    ],
  },
  {
    id: "slow-shutter",
    title: "Slow Shutter",
    theme: "slow-shutter",
    blurb: "Long exposures. Light that moves, colours that smear, a city that won't sit still.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1043/900/600", title: "Long exposure, Hooghly", shutter: "15s", aperture: "f/16", iso: "100", focal: "24mm", place: "Prinsep Ghat", year: "2025" },
      { src: "https://picsum.photos/id/1056/600/900", title: "Last tram home", shutter: "1/4s", aperture: "f/8", iso: "200", year: "2025" },
      { src: "https://picsum.photos/id/1044/1600/900", title: "Traffic, Park Circus", shutter: "2s", aperture: "f/11", iso: "100", year: "2026" },
      { src: "https://picsum.photos/id/1035/1200/800", title: "Rain, headlights", shutter: "1s", aperture: "f/8", iso: "100", year: "2026" },
      { src: "https://picsum.photos/id/1069/1000/1000", title: "Spin", shutter: "1/2s", aperture: "f/5.6", iso: "100" },
      { src: "https://picsum.photos/id/1074/1800/800", title: "Bridge lights", shutter: "8s", aperture: "f/14", iso: "100" },
    ],
  },
  {
    id: "taxis",
    title: "Taxis",
    theme: "taxi",
    blurb: "Yellow Ambassadors. The taxis that taught me I could actually do this.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1067/1200/800", title: "Rank outside Howrah", shutter: "1/250s", aperture: "f/5.6", iso: "200", year: "2026" },
      { src: "https://picsum.photos/id/1062/1500/1000?grayscale", title: "Driver's break", shutter: "1/125s", aperture: "f/2.8", iso: "400", year: "2025" },
      { src: "https://picsum.photos/id/1080/700/1000", title: "Mirror", shutter: "1/200s", aperture: "f/4", iso: "200" },
      { src: "https://picsum.photos/id/1084/1200/800", title: "Yellow on yellow", shutter: "1/500s", aperture: "f/8", iso: "100" },
      { src: "https://picsum.photos/id/103/800/1000?grayscale", title: "Meter down" },
      { src: "https://picsum.photos/id/1050/900/900", title: "Monsoon ride" },
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
      { src: "https://picsum.photos/id/1040/700/1050?grayscale", title: "Tram depot" },
      { src: "https://picsum.photos/id/1057/1200/800?grayscale", title: "Book stalls, College Street" },
      { src: "https://picsum.photos/id/1090/1600/900", title: "Kite season" },
    ],
  },
  {
    id: "shantiniketan",
    title: "Shantiniketan",
    theme: "red-earth",
    blurb: "Red earth, Baul songs, Saturday haat.",
    cover: 0,
    photos: [
      { src: "https://picsum.photos/id/1036/900/600", title: "Khoai", shutter: "1/250s", aperture: "f/11", iso: "100", place: "Khoai", year: "2025" },
      { src: "https://picsum.photos/id/338/600/900?grayscale", title: "Baul singer", shutter: "1/160s", aperture: "f/2.8", iso: "400", focal: "85mm", place: "Sonajhuri Haat", year: "2025" },
      { src: "https://picsum.photos/id/1039/900/600", title: "After the rain", shutter: "1/125s", aperture: "f/5.6", iso: "200", year: "2025" },
      { src: "https://picsum.photos/id/1015/1600/900", title: "Kopai river" },
      { src: "https://picsum.photos/id/1047/800/1000?grayscale", title: "Haat, late afternoon" },
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
