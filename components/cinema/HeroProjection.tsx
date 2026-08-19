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
  const mutedRef = useRef(true);
  const [muted, setMuted] = useState(true);
  const activeFilm = films[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const currentVideo = video;

    let cancelled = false;

    async function startProjection() {
      currentVideo.muted = mutedRef.current;

      try {
        await currentVideo.play();
      } catch {
        if (cancelled) return;
        currentVideo.muted = true;
        mutedRef.current = true;
        setMuted(true);
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

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) await video.play().catch(() => undefined);
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
        muted={muted}
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

      <button
        className={`hero-sound${muted ? " is-muted" : ""}`}
        type="button"
        onClick={() => void toggleSound()}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={muted}
      >
        <span className="hero-sound-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            {muted ? <path d="m17 9 5 6m0-6-5 6" /> : <path d="M17 9.5c1.3 1.2 1.3 3.8 0 5M20 7c2.7 2.7 2.7 7.3 0 10" />}
          </svg>
        </span>
        <span className="hero-sound-copy">
          <small>Projection audio</small>
          <strong>{muted ? "Sound on" : "Sound off"}</strong>
        </span>
        <span className="hero-sound-lamp" aria-hidden="true" />
      </button>
    </div>
  );
}
