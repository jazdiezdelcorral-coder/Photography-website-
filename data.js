/*
  ============================================================
  EVERYTHING YOU EDIT LIVES IN THIS FILE.
  ============================================================
*/

// ---------- YOU ----------
const SITE = {
  name: "Aúpa",
  tagline: "20. Kolkata. Always carrying a camera.",
  // Shown when someone taps your name on the home page. One line per paragraph.
  about: [
    "In the Basque Country, aúpa is what you shout to cheer someone on. It's also my name.",
    "I'm 20, half Basque, half Indian, and I grew up in India.",
    "I photograph what I like, the way I see it.",
  ],
  email: "you@example.com",
  instagram: "https://instagram.com/",
  whatsapp: "910000000000", // 91 + your number, no spaces or +
  // The free email letter (sign-up box on the home page). Emails are collected and sent by Kit (kit.com).
  newsletter: {
    name: "Aúpa's letter",
    pitch: "Twice a month, I send you one photo I really like and the story behind why I picked it.",
    kitFormId: "", // paste your Kit form's number here; until then the box says "Sign-ups open soon"
  },
};

// ---------- ALBUMS (Photos page) ----------
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
// Only src is required. "title" shows on hover and in full screen; "alt" describes the photo for screen readers.
// "cover" = which photo (counting from 0) is shown on the album tile.
const ALBUMS = [
  {
    id: "trains",
    title: "Trains",
    theme: "train",
    board: "HWH ⇄ BWN · GENERAL · UNRESERVED",
    blurb: "Local trains, long-distance trains, stations, the people waiting on platforms.",
    cover: 0,
    photos: [
      { src: "images/trains-01.jpg", shutter: "1/20s", aperture: "f/1.9", iso: "160", year: "2026", alt: "Through the window of a yellow coach" },
      { src: "images/trains-02.jpg", shutter: "1/8s", aperture: "f/1.9", iso: "500", year: "2024", alt: "A man looks back as a train blurs past the platform at night" },
      { src: "images/trains-03.jpg", alt: "A silhouette standing in a lit train doorway" },
      { src: "images/trains-04.jpg", shutter: "1/20s", aperture: "f/1.9", iso: "2156", year: "2025", alt: "Faces pressed behind the barred windows of a crowded train" },
      { src: "images/trains-05.jpg", shutter: "1/15s", aperture: "f/6.3", iso: "80", year: "2025", alt: "Black and white: a train rushing past with someone at the door" },
      { src: "images/trains-06.jpg", shutter: "1/800s", aperture: "f/1.9", iso: "125", year: "2026", alt: "Orange light falling across coach windows" },
      { src: "images/trains-07.jpg", shutter: "1/12s", aperture: "f/2.2", iso: "2500", year: "2024", alt: "Sweeping the platform as a train streaks by" },
      { src: "images/trains-08.jpg", shutter: "1/180s", aperture: "f/1.7", iso: "100", year: "2022", alt: "A dark coach corridor with a red-lit window at the end" },
      { src: "images/trains-09.jpg", shutter: "1/6s", aperture: "f/1.9", iso: "125", year: "2025", alt: "Black and white: a crowded platform at night" },
      { src: "images/trains-10.jpg", shutter: "1/200s", aperture: "f/1.9", iso: "50", year: "2026", alt: "A single lit window in the dark" },
    ],
  },
  {
    id: "slow-shutter",
    title: "Slow Shutter",
    theme: "slow-shutter",
    blurb: "Long exposures. Light that moves, colours that smear, a city that won't sit still.",
    cover: 0,
    photos: [
      { src: "images/slow-shutter-01.jpg", shutter: "1/6s", aperture: "f/7.1", iso: "400", year: "2023", alt: "A porter balancing a basket on his head as a blue and yellow bus streaks past" },
      { src: "images/slow-shutter-02.jpg", shutter: "1/20s", aperture: "f/5", iso: "800", year: "2025", alt: "Black and white: a cycle rickshaw sharp against a blurred street" },
      { src: "images/slow-shutter-03.jpg", shutter: "1/2s", aperture: "f/2.2", iso: "50", year: "2025", alt: "People running toward blue lights, their shadows stretched long" },
      { src: "images/slow-shutter-04.jpg", shutter: "1/7s", aperture: "f/4", iso: "640", year: "2023", alt: "A woman blurs past the window of a Ladies coach, in sepia" },
      { src: "images/slow-shutter-05.jpg", shutter: "1/8s", aperture: "f/5.6", iso: "1600", year: "2025", alt: "Black and white: a cyclist in focus while the street streaks behind him" },
      { src: "images/slow-shutter-06.jpg", shutter: "1/6s", aperture: "f/2.2", iso: "200", year: "2024", alt: "A night street of blurred passers-by and a dog asleep on the pavement" },
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
