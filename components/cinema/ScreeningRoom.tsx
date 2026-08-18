"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PortfolioFilm } from "@/lib/portfolio";

export type ScreeningFilm = PortfolioFilm;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

export default function ScreeningRoom({ films }: { films: ScreeningFilm[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const activeFilm = films[activeIndex];

  useEffect(() => {
    const room = roomRef.current;
    const video = videoRef.current;
    if (!room || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      },
      { threshold: [0, 0.35] },
    );

    observer.observe(room);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === roomRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play(); else video.pause();
  }

  function selectFilm(index: number) {
    if (index === activeIndex) { void togglePlayback(); return; }
    setActiveIndex(index); setCurrentTime(0); setDuration(0); setPlaying(false); setMuted(true);
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted; setMuted(video.muted);
  }

  function seek(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value; setCurrentTime(value);
  }

  function playNextFilm() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % films.length);
    setCurrentTime(0);
    setDuration(0);
    setPlaying(false);
    setMuted(true);
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await roomRef.current?.requestFullscreen?.();
  }

  return (
    <div className={`film-installation${playing ? " is-playing" : ""}`} ref={roomRef}>
      <div className="projection-canvas">
        <video
          key={activeFilm.src}
          ref={videoRef}
          className={activeFilm.portrait ? "is-portrait" : ""}
          src={activeFilm.src}
          poster={activeFilm.poster}
          preload="metadata"
          playsInline
          muted={muted}
          tabIndex={0}
          onClick={() => void togglePlayback()}
          onDoubleClick={() => void toggleFullscreen()}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            void togglePlayback();
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onEnded={playNextFilm}
          aria-label={`${activeFilm.title} film — press Enter or Space to play or pause`}
        />
        <div className="projection-texture" aria-hidden="true" />
        <div className="film-counter" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}</div>
        <button className="centre-play" type="button" onClick={() => void togglePlayback()} aria-label={playing ? `Pause ${activeFilm.title}` : `Play ${activeFilm.title}`}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span></button>
        <div className="player-controls">
          <button type="button" onClick={() => void togglePlayback()} aria-label={playing ? "Pause film" : "Play film"}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span></button>
          <span>{formatTime(currentTime)}</span>
          <label className="player-progress"><span className="sr-only">Film progress</span><input type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} aria-label="Film progress" /></label>
          <span>{formatTime(duration)}</span>
          <button type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Mute film"}>{muted ? "Sound off" : "Sound on"}</button>
          <button type="button" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"} aria-pressed={fullscreen}><span aria-hidden="true">{fullscreen ? "×" : "⛶"}</span></button>
        </div>
      </div>

      <div className="audience-silhouette" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
      </div>

      <div className="programme-console">
        <div className="now-projecting" aria-live="polite">
          <span>Now Projecting · Continuous Reel</span>
          <h3>{activeFilm.title}</h3>
          <p>{activeFilm.note}</p>
          <small>{activeFilm.classification} · {activeFilm.role} · {activeFilm.duration}</small>
          <Link className="project-notes-link" href={`/films/${activeFilm.slug}`}>View Project Notes <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="title-selector" aria-label="Film programme">
          {films.map((film, index) => <button className={index === activeIndex ? "is-active" : ""} type="button" key={film.src} onClick={() => selectFilm(index)} aria-pressed={index === activeIndex}><span>{String(index + 1).padStart(2, "0")}</span><strong>{film.title}</strong><small>{film.duration}</small></button>)}
        </div>
      </div>
    </div>
  );
}
