import Image from "next/image";
import ContactForm from "./ContactForm";
import HeroProjection from "./HeroProjection";
import ScreeningRoom, { type ScreeningFilm } from "./ScreeningRoom";

const films: ScreeningFilm[] = [
  { title: "Animation Art", src: "/films/animation-art.mp4", poster: "/films/posters/animation-art.jpg", format: "Painterly portrait", duration: "00:16", note: "A moving memory shaped through painterly image-making, distance and return.", portrait: true },
  { title: "Misty Realm", src: "/films/misty-realm.mp4", poster: "/films/posters/misty-realm.jpg", format: "Fantasy world", duration: "00:46", note: "An expansive passage built through scale, movement and impossible naturalism." },
  { title: "Nightborne", src: "/films/nightborne.mp4", poster: "/films/posters/nightborne.jpg", format: "Long-form film", duration: "12:11", note: "A long-form exploration of the people and ideas shaping synthetic cinema." },
  { title: "With Love", src: "/films/with-love.mp4", poster: "/films/posters/with-love.jpg", format: "Human story", duration: "00:56", note: "Memory, age and tenderness meet in a brief, performance-led film." },
  { title: "A.Suivre", src: "/films/asuivre.mp4", poster: "/films/posters/asuivre.jpg", format: "Narrative study", duration: "01:11", note: "A nocturnal world held in blue—quiet, dreamlike and waiting to be entered." },
];

const commissions = [
  ["01", "Narrative Films", "Original shorts, trailers & cinematic worlds"],
  ["02", "Brand Cinema", "Campaign films with a distinct visual language"],
  ["03", "Music & Performance", "Rhythm-led worlds built around presence"],
  ["04", "Creative Direction", "Concept, treatment & end-to-end production"],
];

const processSteps = [
  { number: "01", title: "Story & Treatment", detail: "Intent before imagery", copy: "Define the emotional proposition, audience and dramatic rules before a frame is generated.", image: "/Concept.jpeg" },
  { number: "02", title: "World & Performance", detail: "Casting · Lens · Light", copy: "Direct character, environment, camera and performance as one coherent visual system.", image: "/Prompting.jpeg" },
  { number: "03", title: "Shot Production", detail: "Generate · Select · Rebuild", copy: "Build every shot for continuity—not as isolated prompts, but as material belonging to one film.", image: "/Generating.png" },
  { number: "04", title: "Edit & Finish", detail: "Rhythm · Sound · Grade", copy: "Shape the material through picture edit, sound design, grade and final delivery.", image: "/Editing.jpeg" },
];

export default function CinemaPortfolio() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="site-mark" href="#home" aria-label="Sana Sheikh, home"><span>SS</span><small>AI Film Director</small></a>
        <nav aria-label="Primary navigation"><a href="#films">Films</a><a href="#director">Director</a><a href="#method">Method</a></nav>
        <a className="header-contact" href="#contact">Start a Film <span aria-hidden="true">↗</span></a>
      </header>

      <div id="main-content">
        <section className="projection-hero" id="home" aria-labelledby="hero-title">
          <Image className="hero-hall" src="/cinema/archive-hall.jpeg" alt="" fill priority sizes="100vw" />
          <div className="hero-screen" aria-hidden="true">
            <HeroProjection />
          </div>
          <div className="projector-beam" aria-hidden="true" />
          <div className="hero-audience" aria-hidden="true">{Array.from({ length: 11 }).map((_, index) => <i key={index} />)}</div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="projection-readout" aria-hidden="true"><span>HOUSE 01 / NOW PROJECTING</span><span>16:9 / STEREO</span></div>
          <div className="hero-title-block">
            <p>Sana Sheikh · AI Film Director</p>
            <h1 id="hero-title">Directing<br /><em>impossible</em> worlds.</h1>
          </div>
          <div className="hero-footer"><p>Original films, brand cinema & visual worlds—authored through an AI-native production process.</p><a href="#films">Enter the Programme <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className="programme" id="films" aria-labelledby="films-title">
          <div className="section-index"><span>01</span><span>Current Programme</span></div>
          <div className="programme-heading"><h2 id="films-title">The work belongs<br />on a <em>screen.</em></h2><p>5 films. One projection. Select a title and let the image take over the room.</p></div>
          <ScreeningRoom films={films} />
        </section>

        <section className="director" id="director" aria-labelledby="director-title">
          <div className="director-image"><Image src="/cinema/screening-room.jpeg" alt="A dark gallery illuminated by projected films" fill sizes="(max-width: 900px) 100vw, 58vw" /><span>Projection Study / 02</span></div>
          <div className="director-statement">
            <div className="section-index"><span>02</span><span>The Director</span></div>
            <p className="director-kicker">AI is the production medium.<br />Human intention is the author.</p>
            <h2 id="director-title">Not generating.<br /><em>Directing.</em></h2>
            <div className="director-body"><p>Sana Sheikh combines an instinct for performance with AI-native filmmaking—carrying one idea from story and visual development through generation, edit, sound and grade.</p><p>The technology stays behind the screen. What remains is character, atmosphere, rhythm and a world that feels deliberately made.</p></div>
            <div className="direction-language" aria-label="Directorial disciplines"><span>Performance</span><span>World-building</span><span>Continuity</span><span>Rhythm</span></div>
          </div>
        </section>

        <section className="commissions" aria-labelledby="commissions-title">
          <div className="section-index"><span>03</span><span>Commission a Film</span></div>
          <div className="commissions-lead"><h2 id="commissions-title">Cinema for stories,<br />artists & <em>brands.</em></h2><p>From authored shorts to commercial campaigns, every commission begins with the same question: what should the audience feel?</p></div>
          <div className="commission-list">{commissions.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i></article>)}</div>
        </section>

        <section className="method" id="method" aria-labelledby="method-title">
          <div className="method-heading">
            <div className="section-index"><span>04</span><span>AI-native Production</span></div>
            <h2 id="method-title">A director’s process.<br /><em>A new kind of set.</em></h2><p>AI changes how images are made. It does not change what makes a film work.</p>
          </div>
          <div className="method-acts">{processSteps.map((step) => <article className="method-act" key={step.number}><div className="method-still"><Image src={step.image} alt="" fill sizes="(max-width: 760px) 100vw, 44vw" /></div><div className="method-copy"><span>{step.number}</span><small>{step.detail}</small><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <Image className="contact-image" src="/cinema/archive-hall.jpeg" alt="Private cinema with a wall of film posters" fill sizes="100vw" /><div className="contact-shade" aria-hidden="true" />
          <div className="contact-inner">
            <div className="section-index"><span>05</span><span>Private Screening</span></div>
            <h2 id="contact-title">Bring the story.<br /><em>Build the world.</em></h2><p>For narrative films, campaigns, music and visual worlds that need direction—not just generation.</p>
            <ContactForm />
            <footer className="site-footer"><a href="mailto:artiste.sanasheikh@gmail.com">artiste.sanasheikh@gmail.com</a><div><a href="https://www.instagram.com/ivysana03?igsh=aXJyZGYyYWIzaGI=" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/in/sana-sheikh-7a1b15345" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://x.com/ivysana03" target="_blank" rel="noreferrer">X ↗</a></div><span>© {new Date().getFullYear()} Sana Sheikh</span></footer>
          </div>
        </section>
      </div>
    </main>
  );
}
