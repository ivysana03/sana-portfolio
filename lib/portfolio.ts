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
    cardTagline: "Make the launch feel inevitable.",
    cardCue: "Hero film · Social cutdowns",
    screenType: "Commission format",
    screenRuntime: "Custom runtime",
    screenDiscipline: "Concept · Treatment · Direction",
    screenNote: "A clear point of view gives spectacle somewhere precise to land.",
    artwork: { motif: "orbit", label: "Warm orbital composition" },
  },
  {
    number: "02",
    title: "AI Music Videos",
    summary: "Narrative or abstract visual worlds translated from an artist’s sonic identity.",
    idealFor: "Artists · Labels · Music producers",
    timeline: "Typical timeline · 14–21 days",
    deliverables: "Visual treatment · Full music film · Format variations · Final master",
    cardTagline: "Give the track a world of its own.",
    cardCue: "Visual album · Performance film",
    screenType: "Music-led commission",
    screenRuntime: "Track-led runtime",
    screenDiscipline: "World · Performance · Rhythm",
    screenNote: "The strongest visual worlds make the music feel visible before it resolves.",
    artwork: { motif: "rhythm", label: "Rhythmic dashed geometry" },
  },
  {
    number: "03",
    title: "Brand Identity Films",
    summary: "Short-form films that turn brand strategy into a cinematic visual language.",
    idealFor: "Brands · Startups · Creative agencies",
    timeline: "Typical timeline · 7–10 days",
    deliverables: "Visual system · Identity film · Campaign adaptations · Final grade",
    cardTagline: "Turn strategy into a visual signature.",
    cardCue: "Identity film · Campaign system",
    screenType: "Brand commission",
    screenRuntime: "Custom runtime",
    screenDiscipline: "Strategy · Language · Film",
    screenNote: "A recognisable visual language turns a single film into a memory that travels.",
    artwork: { motif: "grid", label: "Structured identity grid" },
  },
  {
    number: "04",
    title: "Creative Direction",
    summary: "Visual development and AI-native production guidance from concept to delivery.",
    idealFor: "Agencies · Studios · In-house teams",
    timeline: "Project-based or ongoing retainer",
    deliverables: "Treatment · Prompt framework · Production system · Creative supervision",
    cardTagline: "Keep every frame pointed at the feeling.",
    cardCue: "Treatment room · Creative system",
    screenType: "Creative partnership",
    screenRuntime: "Project-led",
    screenDiscipline: "Treatment · Shot design · Supervision",
    screenNote: "Direction is the quiet discipline of protecting the feeling through every decision.",
    artwork: { motif: "treatment", label: "Editorial treatment diagram" },
  },
];

type WorkMedia =
  | { kind: "image"; src: string; alt: string; thumbnailSrc?: string }
  | { kind: "video"; src: string; poster: string; alt: string; thumbnailSrc?: string };

export type SelectedCredit = {
  slug: string;
  title: string;
  role: string;
  year: string;
  duration: string;
  media: WorkMedia | null;
};

export const selectedCredits: SelectedCredit[] = [
  { slug: "nightborne", title: "Nightborne", role: "Director", year: "2024", duration: "12:11", media: { kind: "video", src: "/work/nightborne.mp4", poster: "/work/posters/nightborne.jpg", alt: "Nightborne film" } },
  { slug: "animation-art", title: "Animation Art", role: "Director", year: "2024", duration: "00:16", media: { kind: "video", src: "/work/animation-art.mp4", poster: "/work/posters/animation-art.jpg", alt: "Animation Art film" } },
  { slug: "a-suivre", title: "A.Suivre", role: "Director", year: "2024", duration: "01:11", media: { kind: "video", src: "/work/a-suivre.mp4", poster: "/work/posters/a-suivre.jpg", alt: "A.Suivre film" } },
  { slug: "misty-realm", title: "Misty Realm", role: "Director", year: "2024", duration: "00:46", media: { kind: "video", src: "/work/misty-realm.mp4", poster: "/work/posters/misty-realm.jpg", alt: "Misty Realm film" } },
  { slug: "with-love", title: "With Love", role: "Director", year: "2024", duration: "00:57", media: { kind: "video", src: "/work/with-love.mp4", poster: "/work/posters/with-love.jpg", alt: "With Love film" } },
  { slug: "beyond-the-glass", title: "Beyond the Glass", role: "Director", year: "2024", duration: "00:46", media: { kind: "video", src: "/work/beyond-the-glass.mp4", poster: "/work/posters/beyond-the-glass.jpg", alt: "Beyond the Glass film" } },
  { slug: "the-elegance", title: "The Elegance", role: "Director", year: "2024", duration: "00:45", media: { kind: "video", src: "/work/the-elegance.mp4", poster: "/work/posters/the-elegance.jpg", alt: "The Elegance film" } },
  { slug: "human-and-nature", title: "Human and Nature", role: "Director", year: "2024", duration: "00:10", media: { kind: "video", src: "/work/human-and-nature.mp4", poster: "/work/posters/human-and-nature.jpg", alt: "Human and Nature film" } },
  { slug: "melting-clock", title: "Melting Clock", role: "Director", year: "2024", duration: "00:25", media: { kind: "video", src: "/work/melting-clock.mp4", poster: "/work/posters/melting-clock.jpg", alt: "Melting Clock film" } },
  { slug: "caneza", title: "Caneza", role: "Director", year: "2024", duration: "00:30", media: { kind: "video", src: "/work/caneza.mp4", poster: "/work/posters/caneza.jpg", alt: "Caneza film" } },
  { slug: "kaizen", title: "Kaizen", role: "Director", year: "2024", duration: "00:15", media: { kind: "video", src: "/work/kaizen.mp4", poster: "/work/posters/kaizen.jpg", alt: "Kaizen film" } },
  { slug: "swiss-beauty", title: "Swiss Beauty", role: "Director", year: "2024", duration: "00:38", media: { kind: "video", src: "/work/swiss-beauty.mp4", poster: "/work/posters/swiss-beauty.jpg", alt: "Swiss Beauty film" } },
];

export type FilmDetail = PortfolioFilm & { hasEditorialNotes: boolean };

export const filmDetails: FilmDetail[] = selectedCredits.map((credit) => {
  const editorialFilm = films.find((film) => film.slug === credit.slug);
  if (editorialFilm) return { ...editorialFilm, hasEditorialNotes: true };

  const media = credit.media?.kind === "video" ? credit.media : null;
  return {
    slug: credit.slug,
    title: credit.title,
    src: media?.src ?? "",
    poster: media?.poster ?? "",
    format: "Selected work",
    duration: credit.duration,
    note: "A selected film from Sana Sheikh’s directed portfolio.",
    classification: "Selected work",
    role: credit.role,
    story: "",
    direction: "",
    finish: "",
    hasEditorialNotes: false,
  };
});
