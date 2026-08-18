"use client";

import { useEffect, useRef, useState } from "react";
import type { PortfolioFilm } from "@/lib/portfolio";

type HeroProjectionProps = {
  activeIndex: number;
  films: PortfolioFilm[];
  onStepItem: (direction: number) => void;
};

export default function HeroProjection({ activeIndex, films, onStepItem }: HeroProjectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const [muted, setMuted] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const activeFilm = films[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const currentVideo = video;

    let cancelled = false;

    async function startProjection() {
      currentVideo.muted = false;
      setMuted(false);

      try {
        await currentVideo.play();
        if (!cancelled) setSoundBlocked(false);
      } catch {
        if (cancelled) return;
        currentVideo.muted = true;
        setMuted(true);
        setSoundBlocked(true);
        await currentVideo.play().catch(() => undefined);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          void startProjection();
          return;
        }

        currentVideo.pause();
      },
      { threshold: [0, 0.35] },
    );

    observer.observe(currentVideo);

    return () => {
      cancelled = true;
      observer.disconnect();
      currentVideo.pause();
    };
  }, [activeIndex]);

  async function enableSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    setSoundBlocked(false);
    await video.play().catch(() => undefined);
  }

  function finishSwipe(clientX: number, clientY: number) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start === null) return;
    const deltaX = clientX - start.x;
    const deltaY = clientY - start.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    onStepItem(deltaX < 0 ? 1 : -1);
  }

  return (
    <div
      className="hero-reel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured film screenings"
    >
      <video
        key={activeFilm.src}
        ref={videoRef}
        className={activeFilm.portrait ? "hero-film is-portrait" : "hero-film"}
        src={activeFilm.src}
        poster={activeFilm.poster}
        playsInline
        muted={muted}
        preload="auto"
        onPointerDown={(event) => { pointerStart.current = { x: event.clientX, y: event.clientY }; }}
        onPointerUp={(event) => finishSwipe(event.clientX, event.clientY)}
        onPointerCancel={() => { pointerStart.current = null; }}
        aria-label={`${activeFilm.title}, film ${activeIndex + 1} of ${films.length}`}
      />

      <div className="hero-film-vignette" aria-hidden="true" />

      <button className="hero-reel-arrow is-previous" type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onStepItem(-1); }} aria-label="Play previous film"><span aria-hidden="true">←</span></button>
      <button className="hero-reel-arrow is-next" type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); onStepItem(1); }} aria-label="Play next film"><span aria-hidden="true">→</span></button>

      <div className="hero-film-caption" aria-live="polite">
        <span>Now projecting · {String(activeIndex + 1).padStart(2, "0")}</span>
        <strong>{activeFilm.title}</strong>
        <small>{activeFilm.format} · {activeFilm.duration}</small>
      </div>

      <div className="hero-reel-index" aria-hidden="true">
        {films.map((film, index) => (
          <span className={index === activeIndex ? "is-active" : ""} key={film.slug}><i /></span>
        ))}
      </div>

      {soundBlocked ? <button className="hero-sound" type="button" onClick={() => void enableSound()}>Sound on <span aria-hidden="true">↗</span></button> : null}
    </div>
  );
}
