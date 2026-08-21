"use client";

import { useEffect, useRef } from "react";
import type { PortfolioFilm } from "@/lib/portfolio";

type HeroProjectionProps = {
  activeIndex: number;
  films: PortfolioFilm[];
  onStepItem: (direction: number) => void;
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
};

export default function HeroProjection({ activeIndex, films, onStepItem, soundEnabled, onSoundEnabledChange }: HeroProjectionProps) {
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

      <div className="hero-film-controls" aria-live="polite">
        <div className="hero-film-caption">
          <span>Now playing — <strong>{activeFilm.title}</strong></span>
          <small>{String(activeIndex + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")} · {activeFilm.duration}</small>
        </div>
        <div className="hero-film-actions">
          <button
            className="hero-film-sound"
            type="button"
            onClick={() => onSoundEnabledChange(!soundEnabled)}
            aria-label={soundEnabled ? "Mute film" : "Unmute film"}
            aria-pressed={soundEnabled}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4Z" />
              {soundEnabled ? <path d="M16 8.5c1.5 1.8 1.5 5.2 0 7M18.5 6c3 3.3 3 8.7 0 12" /> : <path d="m17 9 5 6m0-6-5 6" />}
            </svg>
            <span>{soundEnabled ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="hero-film-explore" type="button" onClick={() => onStepItem(1)} aria-label="Explore next film">
            Explore films <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

    </div>
  );
}
