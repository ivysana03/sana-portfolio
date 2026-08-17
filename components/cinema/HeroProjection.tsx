"use client";

import { useEffect, useRef } from "react";

export default function HeroProjection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-film"
      src="/films/asuivre.mp4"
      poster="/films/posters/asuivre.jpg"
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}
