export type PortfolioFilm = {
  slug: string;
  title: string;
  src: string;
  poster: string;
  format: string;
  duration: string;
  note: string;
  portrait?: boolean;
  classification: string;
  role: string;
  story: string;
  direction: string;
  finish: string;
};

export const films: PortfolioFilm[] = [
  {
    slug: "animation-art",
    title: "Animation Art",
    src: "/films/animation-art.mp4",
    poster: "/films/posters/animation-art.jpg",
    format: "Painterly portrait",
    duration: "00:16",
    note: "A moving memory shaped through painterly image-making, distance and return.",
    portrait: true,
    classification: "Original AI film",
    role: "AI film direction",
    story: "A brief portrait of memory, distance and return, told through an image that appears to be painted while it moves.",
    direction: "Keep the face emotionally legible while allowing texture, colour and motion to behave like a living canvas.",
    finish: "A compact 16-second arc shaped through restrained motion, tonal continuity and a painterly final treatment.",
  },
  {
    slug: "misty-realm",
    title: "Misty Realm",
    src: "/films/misty-realm.mp4",
    poster: "/films/posters/misty-realm.jpg",
    format: "Fantasy world",
    duration: "00:46",
    note: "An expansive passage built through scale, movement and impossible naturalism.",
    classification: "Original AI film",
    role: "AI film direction",
    story: "A traveller enters a landscape where human scale and the natural world no longer obey familiar rules.",
    direction: "Use scale, atmosphere and controlled camera movement to make the impossible environment feel physically inhabited.",
    finish: "The sequence is organised as a continuous passage, holding colour and spatial rhythm across an expanding world.",
  },
  {
    slug: "nightborne",
    title: "Nightborne",
    src: "/films/nightborne.mp4",
    poster: "/films/posters/nightborne.jpg",
    format: "Long-form film",
    duration: "12:11",
    note: "A long-form exploration of the people and ideas shaping synthetic cinema.",
    classification: "Long-form AI film",
    role: "AI film direction",
    story: "A long-form exploration of the people, questions and creative tensions emerging around synthetic cinema.",
    direction: "Treat AI imagery as documentary material: maintain a coherent visual thesis while allowing distinct ideas to retain their own identity.",
    finish: "At 12 minutes, continuity and editorial rhythm become the central craft—balancing information, atmosphere and forward movement.",
  },
  {
    slug: "with-love",
    title: "With Love",
    src: "/films/with-love.mp4",
    poster: "/films/posters/with-love.jpg",
    format: "Human story",
    duration: "00:56",
    note: "Memory, age and tenderness meet in a brief, performance-led film.",
    classification: "Original AI film",
    role: "AI film direction",
    story: "A human-scale meditation on age, memory and the tenderness carried in a face.",
    direction: "Prioritise performance and emotional specificity over spectacle, allowing small expressions to hold the frame.",
    finish: "Close framing, deliberate pacing and a restrained grade keep the film intimate rather than demonstrative.",
  },
  {
    slug: "a-suivre",
    title: "A.Suivre",
    src: "/films/asuivre.mp4",
    poster: "/films/posters/asuivre.jpg",
    format: "Narrative study",
    duration: "01:11",
    note: "A nocturnal world held in blue—quiet, dreamlike and waiting to be entered.",
    classification: "Original AI film",
    role: "AI film direction",
    story: "A small figure crosses a nocturnal city that feels suspended between a memory and a dream.",
    direction: "Hold the world in a disciplined blue palette while directing scale, negative space and movement around the character.",
    finish: "The final sequence uses quiet pacing and visual repetition to sustain one atmosphere from the first shot to the last.",
  },
];

export const services = [
  {
    number: "01",
    title: "Cinematic AI Ads",
    summary: "High-concept campaign films with every frame directed and art-directed.",
    idealFor: "Product launches · Fashion · Luxury",
    timeline: "Typical timeline · 10–14 days",
    deliverables: "Concept and treatment · Master film · Social cutdowns · Edit, sound and grade",
  },
  {
    number: "02",
    title: "AI Music Videos",
    summary: "Narrative or abstract visual worlds translated from an artist’s sonic identity.",
    idealFor: "Artists · Labels · Music producers",
    timeline: "Typical timeline · 14–21 days",
    deliverables: "Visual treatment · Full music film · Format variations · Final master",
  },
  {
    number: "03",
    title: "Brand Identity Films",
    summary: "Short-form films that turn brand strategy into a cinematic visual language.",
    idealFor: "Brands · Startups · Creative agencies",
    timeline: "Typical timeline · 7–10 days",
    deliverables: "Visual system · Identity film · Campaign adaptations · Final grade",
  },
  {
    number: "04",
    title: "Creative Direction",
    summary: "Visual development and AI-native production guidance from concept to delivery.",
    idealFor: "Agencies · Studios · In-house teams",
    timeline: "Project-based or ongoing retainer",
    deliverables: "Treatment · Prompt framework · Production system · Creative supervision",
  },
];

export const selectedCredits = [
  { title: "Caneza", role: "Director", year: "2024" },
  { title: "Melting Rock", role: "Director", year: "2024" },
  { title: "Beyond Glass", role: "Director", year: "2024" },
  { title: "Kimirica One", role: "Director", year: "2024" },
  { title: "Swiss Beauty", role: "Director", year: "2024" },
  { title: "Super Maka Teaser", role: "Director", year: "2024" },
];
