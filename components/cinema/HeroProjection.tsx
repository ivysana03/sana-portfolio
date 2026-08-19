"use client";

import { useEffect, useRef } from "react";
import type { PortfolioFilm } from "@/lib/portfolio";

type HeroProjectionProps = {
  activeIndex: number;
  films: PortfolioFilm[];
  onStepItem: (direction: number) => void;
  soundEnabled: boolean;
};

export default function HeroProjection({ activeIndex, films, onStepItem, soundEnabled }: HeroProjectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const activeFilm = films[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const currentVideo = video;

    let cancelled = false;

    async function startProjection() {
      currentVideo.muted = !soundEnabled;

      try {
        await currentVideo.play();
      } catch {
        if (cancelled) return;
        currentVideo.muted = true;
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
  }, [activeIndex, soundEnabled]);

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
      aria-roledescription="film reel"
      aria-label="Featured film screenings"
    >
      <video
        key={activeFilm.src}
        ref={videoRef}
        className={activeFilm.portrait ? "hero-film is-portrait" : "hero-film"}
        src={activeFilm.src}
        poster={activeFilm.poster}
        autoPlay
        loop
        playsInline
        muted={!soundEnabled}
        preload="auto"
        onPointerDown={(event) => { pointerStart.current = { x: event.clientX, y: event.clientY }; }}
        onPointerUp={(event) => finishSwipe(event.clientX, event.clientY)}
        onPointerCancel={() => { pointerStart.current = null; }}
        aria-label={`${activeFilm.title}, film ${activeIndex + 1} of ${films.length}`}
      />

      <div className="hero-film-vignette" aria-hidden="true" />

      <div className="hero-film-caption" aria-live="polite">
        <span>Now projecting · {String(activeIndex + 1).padStart(2, "0")}</span>
        <strong>{activeFilm.title}</strong>
        <small>{activeFilm.format} · {activeFilm.duration}</small>
      </div>

    </div>
  );
}
