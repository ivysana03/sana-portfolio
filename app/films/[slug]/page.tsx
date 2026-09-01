import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { filmDetails } from "@/lib/portfolio";

type FilmPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return filmDetails.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({ params }: FilmPageProps): Promise<Metadata> {
  const { slug } = await params;
  const film = filmDetails.find((item) => item.slug === slug);

  if (!film) return {};

  return {
    title: `${film.title} — Sana Sheikh`,
    description: film.note,
    openGraph: {
      title: `${film.title} — Sana Sheikh`,
      description: film.note,
      images: [film.poster],
    },
  };
}

export default async function FilmPage({ params }: FilmPageProps) {
  const { slug } = await params;
  const filmIndex = filmDetails.findIndex((item) => item.slug === slug);

  if (filmIndex < 0) notFound();

  const film = filmDetails[filmIndex];
  const nextFilm = filmDetails[(filmIndex + 1) % filmDetails.length];

  return (
    <main className="film-page">
      <header className="film-page-header">
        <Link href="/#films">← Return to Programme</Link>
        <Link href="/" aria-label="Sana Sheikh, home">SS <span>AI Film Director</span></Link>
      </header>

      <article>
        <div className="film-page-intro">
          <div className="section-index"><span>{String(filmIndex + 1).padStart(2, "0")}</span><span>Project Notes</span></div>
          <h1>{film.title}</h1>
          <p>{film.note}</p>
          <dl>
            <div><dt>Classification</dt><dd>{film.classification}</dd></div>
            <div><dt>Role</dt><dd>{film.role}</dd></div>
            <div><dt>Format</dt><dd>{film.format}</dd></div>
            <div><dt>Runtime</dt><dd>{film.duration}</dd></div>
          </dl>
        </div>

        <div className="film-page-player">
          <video src={film.src} poster={film.poster} controls playsInline preload="metadata" aria-label={`${film.title} film`} />
        </div>

        {film.hasEditorialNotes ? <div className="film-page-notes">
          <section><span>01 / Story</span><h2>The intention</h2><p>{film.story}</p></section>
          <section><span>02 / Direction</span><h2>The visual language</h2><p>{film.direction}</p></section>
          <section><span>03 / Finish</span><h2>The final rhythm</h2><p>{film.finish}</p></section>
        </div> : null}
      </article>

      <footer className="film-page-next">
        <span>Next Screening</span>
        <Link href={`/films/${nextFilm.slug}`}>{nextFilm.title} <span aria-hidden="true">↗</span></Link>
      </footer>
    </main>
  );
}
