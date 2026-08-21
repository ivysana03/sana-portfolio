"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { films, selectedCredits, services } from "@/lib/portfolio";
import directorPortrait from "@/src/assets/image/sana.jpeg";
import HeroProjection from "./HeroProjection";

const chapters = ["Films", "Director", "Work", "Services", "Method", "Contact"] as const;
const navigableSectionCount = 5;
const wheelThreshold = 96;
const finalSectionIndex = chapters.length - 1;

type TheatrePose = {
  hallShift: number;
  hallScale: number;
  seatShift: number;
  seatScale: number;
  aisleScale: number;
  beamScale: number;
  vignetteOpacity: number;
};

const theatreCameraStops: readonly TheatrePose[] = [
  { hallShift: 0, hallScale: 1.025, seatShift: 0, seatScale: 1, aisleScale: 1, beamScale: 1, vignetteOpacity: 0.82 },
  { hallShift: -2.7, hallScale: 1.14, seatShift: 3.2, seatScale: 1.1, aisleScale: 1.075, beamScale: 1.035, vignetteOpacity: 0.91 },
  { hallShift: -0.9, hallScale: 1.07, seatShift: 1.15, seatScale: 1.038, aisleScale: 1.025, beamScale: 1.012, vignetteOpacity: 0.86 },
  { hallShift: -1.2, hallScale: 1.085, seatShift: 1.55, seatScale: 1.05, aisleScale: 1.035, beamScale: 1.017, vignetteOpacity: 0.88 },
  { hallShift: -1.45, hallScale: 1.095, seatShift: 1.9, seatScale: 1.06, aisleScale: 1.044, beamScale: 1.02, vignetteOpacity: 0.9 },
  { hallShift: 0.25, hallScale: 1.045, seatShift: 0.7, seatScale: 1.02, aisleScale: 1.012, beamScale: 0.985, vignetteOpacity: 0.98 },
];

const processSteps = [
  { number: "01", title: "Story & Treatment", detail: "Intent before imagery", copy: "Define the emotion, audience and dramatic rules before a frame is generated." },
  { number: "02", title: "World & Performance", detail: "Casting · Lens · Light", copy: "Direct character, environment, camera and performance as one visual system." },
  { number: "03", title: "Shot Production", detail: "Generate · Select · Rebuild", copy: "Build shots for continuity rather than treating them as isolated prompts." },
  { number: "04", title: "Edit & Finish", detail: "Rhythm · Sound · Grade", copy: "Shape picture, sound and colour into the final emotional rhythm." },
];
const itemCounts = [films.length, 1, selectedCredits.length, services.length, processSteps.length, 1];

const seatRows = [8, 8, 7, 6, 5, 5, 4].map((seatsPerSide, index) => {
  const scale = 0.85 ** index;
  const brightness = Math.min(0.88, 0.68 + index * 0.035);
  const rimLight = Math.min(0.3, 0.18 + index * 0.02);
  let rise = -1.5;

  for (let step = 0; step < index; step += 1) {
    rise += 5.5 * 0.8 ** step;
  }

  return {
    seatsPerSide,
    style: {
      "--row-brightness": brightness,
      "--rim-light": rimLight,
      "--seat-width": `clamp(${(3.8 * scale).toFixed(2)}rem, ${(5.2 * scale).toFixed(2)}vw, ${(6 * scale).toFixed(2)}rem)`,
      "--seat-gap": `${(0.55 * scale).toFixed(2)}rem`,
      "--aisle-width": `clamp(${(4.8 * scale).toFixed(2)}rem, ${(11.5 * scale).toFixed(2)}vw, ${(10.5 * scale).toFixed(2)}rem)`,
      bottom: `${rise.toFixed(2)}svh`,
      height: `${(9.8 * scale).toFixed(2)}svh`,
      zIndex: 7 - index,
    } as CSSProperties,
  };
});

function getNestedScrollRegion(target: EventTarget | null) {
  return target instanceof Element ? target.closest<HTMLElement>('[data-scroll-region="items-list"]') : null;
}

function nestedScrollerCanConsume(target: EventTarget | null, deltaY: number) {
  const element = getNestedScrollRegion(target);
  if (!element || element.scrollHeight <= element.clientHeight) return false;
  if (deltaY < 0) return element.scrollTop > 0;
  return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
}

function getTheatrePose(progress: number): TheatrePose {
  const position = Math.max(0, Math.min(finalSectionIndex, progress));
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.min(finalSectionIndex, lowerIndex + 1);
  const amount = position - lowerIndex;
  const lower = theatreCameraStops[lowerIndex];
  const upper = theatreCameraStops[upperIndex];
  const mix = (from: number, to: number) => from + (to - from) * amount;

  return {
    hallShift: mix(lower.hallShift, upper.hallShift),
    hallScale: mix(lower.hallScale, upper.hallScale),
    seatShift: mix(lower.seatShift, upper.seatShift),
    seatScale: mix(lower.seatScale, upper.seatScale),
    aisleScale: mix(lower.aisleScale, upper.aisleScale),
    beamScale: mix(lower.beamScale, upper.beamScale),
    vignetteOpacity: mix(lower.vignetteOpacity, upper.vignetteOpacity),
  };
}

function setTheatreCamera(theatre: HTMLElement, progress: number) {
  const pose = getTheatrePose(progress);

  theatre.style.setProperty("--hall-shift", `${pose.hallShift.toFixed(2)}svh`);
  theatre.style.setProperty("--hall-scale", pose.hallScale.toFixed(3));
  theatre.style.setProperty("--seat-shift", `${pose.seatShift.toFixed(2)}svh`);
  theatre.style.setProperty("--seat-scale", pose.seatScale.toFixed(3));
  theatre.style.setProperty("--aisle-scale", pose.aisleScale.toFixed(3));
  theatre.style.setProperty("--beam-scale", pose.beamScale.toFixed(3));
  theatre.style.setProperty("--vignette-opacity", pose.vignetteOpacity.toFixed(2));
}

function cancelTheatreMomentum(theatre: HTMLElement) {
  theatre.querySelectorAll<HTMLElement>("[data-camera-layer]").forEach((layer) => {
    layer.getAnimations().forEach((animation) => animation.cancel());
  });
}

function animateTheatreCamera(theatre: HTMLElement, fromProgress: number, toProgress: number) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || fromProgress === toProgress) {
    cancelTheatreMomentum(theatre);
    setTheatreCamera(theatre, toProgress);
    return;
  }

  const from = getTheatrePose(fromProgress);
  const target = getTheatrePose(toProgress);
  const overshoot = (start: number, end: number, amount: number) => end + (end - start) * amount;
  const layers = {
    hall: theatre.querySelector<HTMLElement>(".hero-hall"),
    seats: theatre.querySelector<HTMLElement>(".hero-audience"),
    aisle: theatre.querySelector<HTMLElement>(".theatre-aisle"),
    beam: theatre.querySelector<HTMLElement>(".projector-beam"),
    vignette: theatre.querySelector<HTMLElement>(".hero-shade"),
  };
  const current = {
    hallTransform: layers.hall ? getComputedStyle(layers.hall).transform : `translate3d(0, ${from.hallShift}svh, 0) scale(${from.hallScale})`,
    seatTransform: layers.seats ? getComputedStyle(layers.seats).transform : `translate3d(0, ${from.seatShift}svh, 0) scale(${from.seatScale})`,
    aisleTransform: layers.aisle ? getComputedStyle(layers.aisle).transform : `translateX(-50%) scale(${from.aisleScale})`,
    beamTransform: layers.beam ? getComputedStyle(layers.beam).transform : `translateX(-50%) scale(${from.beamScale})`,
    beamOpacity: layers.beam ? getComputedStyle(layers.beam).opacity : "0.62",
    vignetteOpacity: layers.vignette ? getComputedStyle(layers.vignette).opacity : String(from.vignetteOpacity),
  };

  cancelTheatreMomentum(theatre);
  setTheatreCamera(theatre, toProgress);

  layers.hall?.animate([
    { transform: current.hallTransform, easing: "cubic-bezier(.16,.7,.24,1)" },
    { transform: `translate3d(0, ${overshoot(from.hallShift, target.hallShift, 0.045)}svh, 0) scale(${overshoot(from.hallScale, target.hallScale, 0.045)})`, offset: 0.82, easing: "cubic-bezier(.2,.8,.3,1)" },
    { transform: `translate3d(0, ${target.hallShift}svh, 0) scale(${target.hallScale})` },
  ], { duration: 1250, fill: "none" });

  layers.seats?.animate([
    { transform: current.seatTransform, easing: "cubic-bezier(.12,.82,.2,1)" },
    { transform: `translate3d(0, ${overshoot(from.seatShift, target.seatShift, 0.06)}svh, 0) scale(${overshoot(from.seatScale, target.seatScale, 0.06)})`, offset: 0.72, easing: "cubic-bezier(.2,.75,.32,1)" },
    { transform: `translate3d(0, ${target.seatShift}svh, 0) scale(${target.seatScale})` },
  ], { duration: 820, fill: "none" });

  layers.aisle?.animate([
    { transform: current.aisleTransform, easing: "cubic-bezier(.12,.82,.2,1)" },
    { transform: `translateX(-50%) scale(${overshoot(from.aisleScale, target.aisleScale, 0.055)})`, offset: 0.7, easing: "cubic-bezier(.2,.75,.32,1)" },
    { transform: `translateX(-50%) scale(${target.aisleScale})` },
  ], { duration: 760, fill: "none" });

  layers.beam?.animate([
    { transform: current.beamTransform, opacity: current.beamOpacity, easing: "cubic-bezier(.1,.9,.2,1)" },
    { transform: `translateX(-50%) scale(${overshoot(from.beamScale, target.beamScale, 0.08)})`, opacity: 0.7, offset: 0.62, easing: "ease-out" },
    { transform: `translateX(-50%) scale(${target.beamScale})`, opacity: 0.62 },
  ], { duration: 380, fill: "none" });

  layers.vignette?.animate([
    { opacity: current.vignetteOpacity, easing: "cubic-bezier(.1,.9,.2,1)" },
    { opacity: overshoot(from.vignetteOpacity, target.vignetteOpacity, 0.04), offset: 0.68, easing: "ease-out" },
    { opacity: target.vignetteOpacity },
  ], { duration: 320, fill: "none" });
}

export default function CinemaPortfolio() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [closingCreditsOpen, setClosingCreditsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sent, setSent] = useState(false);
  const theatreRef = useRef<HTMLElement>(null);
  const itemListRef = useRef<HTMLElement>(null);
  const activeSectionRef = useRef(0);
  const activeItemRef = useRef(0);
  const closingCreditsRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const wheelGestureOwnerRef = useRef<"nested" | "section" | null>(null);
  const wheelSectionChangedRef = useRef(false);
  const wheelSectionDirectionRef = useRef<-1 | 1 | null>(null);
  const wheelResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cameraFrameRef = useRef<number | null>(null);
  const cameraProgressRef = useRef(0);
  const touchStartRef = useRef<{
    x: number;
    y: number;
    scrollRegion: { clientHeight: number; scrollHeight: number; scrollTop: number } | null;
  } | null>(null);

  const selectSection = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(chapters.length - 1, index));
    const sectionChanged = nextIndex !== activeSectionRef.current;

    if (closingCreditsRef.current) {
      closingCreditsRef.current = false;
      setClosingCreditsOpen(false);
    }
    if (!sectionChanged) return;

    const previousProgress = cameraProgressRef.current;
    const direction = Math.sign(nextIndex - activeSectionRef.current) || 1;
    activeSectionRef.current = nextIndex;
    cameraProgressRef.current = nextIndex;
    if (theatreRef.current) {
      theatreRef.current.style.setProperty("--chapter-direction", String(direction));
      animateTheatreCamera(theatreRef.current, previousProgress, nextIndex);
    }
    setActiveSectionIndex(nextIndex);
    activeItemRef.current = 0;
    setActiveItemIndex(0);

    const focusedControl = document.activeElement;
    if (
      focusedControl instanceof HTMLElement
      && focusedControl.closest(".site-header")
      && focusedControl.dataset.sectionIndex !== String(nextIndex)
    ) {
      focusedControl.blur();
    }
  }, []);

  const stepSection = useCallback((direction: number) => {
    if (closingCreditsRef.current) {
      if (direction >= 0) return false;
      closingCreditsRef.current = false;
      setClosingCreditsOpen(false);
      return true;
    }

    const current = activeSectionRef.current;
    if (direction > 0 && current === finalSectionIndex) {
      closingCreditsRef.current = true;
      setClosingCreditsOpen(true);
      const focusedControl = document.activeElement;
      if (focusedControl instanceof HTMLElement && focusedControl.closest(".site-header")) focusedControl.blur();
      return true;
    }

    const nextIndex = Math.max(0, Math.min(finalSectionIndex, current + direction));
    if (nextIndex === current) return false;
    selectSection(nextIndex);
    return true;
  }, [selectSection]);

  const selectActiveItem = useCallback((nextIndex: number) => {
    activeItemRef.current = nextIndex;
    setActiveItemIndex(nextIndex);

    requestAnimationFrame(() => {
      const list = itemListRef.current;
      const item = list?.querySelector<HTMLElement>(`[data-item-index="${nextIndex}"]`);
      if (!list || !item) return;
      const listBounds = list.getBoundingClientRect();
      const itemBounds = item.getBoundingClientRect();
      const top = list.scrollTop + itemBounds.top - listBounds.top - (list.clientHeight - itemBounds.height) / 2;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }, []);

  const stepActiveItem = useCallback((direction: number) => {
    const count = itemCounts[activeSectionRef.current] ?? 1;
    if (count <= 1) return;
    const nextIndex = (activeItemRef.current + direction + count) % count;
    selectActiveItem(nextIndex);
  }, [selectActiveItem]);

  useEffect(() => {
    const theatre = theatreRef.current;
    if (!theatre) return;
    const theatreElement = theatre;

    function scheduleWheelReset() {
      if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current);
      wheelResetTimerRef.current = setTimeout(() => {
        wheelGestureOwnerRef.current = null;
        wheelSectionChangedRef.current = false;
        wheelSectionDirectionRef.current = null;
        wheelDeltaRef.current = 0;
        animateTheatreCamera(theatreElement, cameraProgressRef.current, activeSectionRef.current);
        cameraProgressRef.current = activeSectionRef.current;
      }, 700);
    }

    function previewCameraProgress(progress: number) {
      cameraProgressRef.current = progress;
      if (cameraFrameRef.current !== null) return;
      cameraFrameRef.current = requestAnimationFrame(() => {
        setTheatreCamera(theatreElement, cameraProgressRef.current);
        cameraFrameRef.current = null;
      });
    }

    function handleWheel(event: WheelEvent) {
      if (nestedScrollerCanConsume(event.target, event.deltaY)) {
        wheelGestureOwnerRef.current = "nested";
        wheelDeltaRef.current = 0;
        wheelSectionChangedRef.current = false;
        wheelSectionDirectionRef.current = null;
        scheduleWheelReset();
        return;
      }

      if (wheelGestureOwnerRef.current === "nested") {
        wheelGestureOwnerRef.current = null;
        wheelDeltaRef.current = 0;
        wheelSectionChangedRef.current = false;
        wheelSectionDirectionRef.current = null;
      }

      event.preventDefault();
      const eventDirection = Math.sign(event.deltaY) as -1 | 0 | 1;
      if (wheelSectionChangedRef.current) {
        if (eventDirection === 0 || eventDirection === wheelSectionDirectionRef.current) {
          scheduleWheelReset();
          return;
        }

        wheelSectionChangedRef.current = false;
        wheelDeltaRef.current = 0;
      }

      wheelGestureOwnerRef.current = "section";
      if (wheelDeltaRef.current === 0) cancelTheatreMomentum(theatreElement);
      if (eventDirection !== 0 && Math.sign(wheelDeltaRef.current) !== eventDirection) {
        wheelDeltaRef.current = 0;
      }
      wheelDeltaRef.current += event.deltaY;
      if (Math.abs(wheelDeltaRef.current) >= wheelThreshold) {
        const sectionDirection = wheelDeltaRef.current > 0 ? 1 : -1;
        const sectionChanged = stepSection(sectionDirection);
        wheelSectionChangedRef.current = sectionChanged;
        wheelSectionDirectionRef.current = sectionChanged ? sectionDirection : null;
        wheelDeltaRef.current = 0;
      } else {
        previewCameraProgress(activeSectionRef.current + wheelDeltaRef.current / wheelThreshold);
      }
      scheduleWheelReset();
    }

    theatreElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      theatreElement.removeEventListener("wheel", handleWheel);
      if (wheelResetTimerRef.current) clearTimeout(wheelResetTimerRef.current);
      if (cameraFrameRef.current !== null) cancelAnimationFrame(cameraFrameRef.current);
    };
  }, [stepSection]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (target instanceof HTMLElement && target.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const count = itemCounts[activeSectionRef.current] ?? 1;
      if (count <= 1) return;
      event.preventDefault();
      event.stopPropagation();
      stepActiveItem(event.key === "ArrowRight" ? 1 : -1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stepActiveItem]);

  function prepareEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const brief = String(form.get("brief") ?? "");
    const subject = `Film enquiry — ${name}`;
    const body = `Hi Sana,\n\nI’m ${name}.\nReply to: ${email}\n\nProject brief:\n${brief}`;
    window.location.href = `mailto:artiste.sanasheikh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const activeWork = selectedCredits[activeItemIndex] ?? selectedCredits[0];
  const setItemListElement = useCallback((node: HTMLElement | null) => {
    itemListRef.current = node;
  }, []);

  return (
    <main className="cinema-experience">
      <a className="skip-link" href="#theatre-screen">Skip to projected content</a>
      <div className="cinema-global-grade" aria-hidden="true" />
      <div className="cinema-global-grain" aria-hidden="true" />

      <header className="site-header">
        <button className="site-mark" data-section-index="0" type="button" onClick={() => selectSection(0)} aria-label="Sana Sheikh, return to films"><span>SS</span><small>AI Film Director</small></button>
        <nav aria-label="Projected chapters">
          {chapters.slice(0, navigableSectionCount).map((name, index) => (
            <button
              className={activeSectionIndex === index && !closingCreditsOpen ? "is-active" : ""}
              data-section-index={index}
              type="button"
              key={name}
              onClick={() => selectSection(index)}
              aria-current={activeSectionIndex === index && !closingCreditsOpen ? "page" : undefined}
            >
              {name}
            </button>
          ))}
        </nav>
        <button
          className={`header-contact${activeSectionIndex === finalSectionIndex ? " is-active" : ""}`}
          data-section-index={finalSectionIndex}
          type="button"
          onClick={() => selectSection(finalSectionIndex)}
          aria-current={activeSectionIndex === finalSectionIndex ? "page" : undefined}
        >
          {closingCreditsOpen ? "Credits" : "Start a Film"} <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section
        className="projection-hero"
        data-section={chapters[activeSectionIndex].toLowerCase()}
        aria-labelledby="experience-title"
        ref={theatreRef}
        style={{
          "--hall-shift": "0svh",
          "--hall-scale": 1.025,
          "--seat-shift": "0svh",
          "--seat-scale": 1,
          "--aisle-scale": 1,
          "--beam-scale": 1,
          "--vignette-opacity": 0.82,
          "--chapter-direction": 1,
        } as CSSProperties}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          const scrollRegion = getNestedScrollRegion(event.target);
          touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            scrollRegion: scrollRegion ? {
              clientHeight: scrollRegion.clientHeight,
              scrollHeight: scrollRegion.scrollHeight,
              scrollTop: scrollRegion.scrollTop,
            } : null,
          };
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaY) < 52 || Math.abs(deltaY) <= Math.abs(deltaX)) return;
          const scrollDelta = -deltaY;
          const region = start.scrollRegion;
          const nestedRegionOwnedSwipe = region && region.scrollHeight > region.clientHeight && (
            scrollDelta < 0
              ? region.scrollTop > 0
              : region.scrollTop + region.clientHeight < region.scrollHeight - 1
          );
          if (nestedRegionOwnedSwipe) return;
          event.preventDefault();
          event.stopPropagation();
          stepSection(deltaY < 0 ? 1 : -1);
        }}
      >
        <Image className="hero-hall" data-camera-layer src="/cinema/archive-hall.jpeg" alt="" fill priority sizes="100vw" />
        <div className="cinema-entrance-lights" aria-hidden="true" />
        <div className="projector-bounce" aria-hidden="true" />
        <h1 className="sr-only" id="experience-title">Sana Sheikh — AI Film Director</h1>

        <div className="hero-screen" id="theatre-screen">
          <div className="screen-chapter" key={activeSectionIndex} aria-live="polite">
            {activeSectionIndex === 0 ? <HeroProjection activeIndex={activeItemIndex} films={films} onStepItem={stepActiveItem} soundEnabled={soundEnabled} onSoundEnabledChange={setSoundEnabled} /> : null}

            {activeSectionIndex === 1 ? (
              <article className="projected-panel projected-director">
                <div className="projected-image"><Image src={directorPortrait} alt="Portrait of director Sana Sheikh" fill sizes="(max-width: 720px) 94vw, 31vw" /></div>
                <div className="projected-copy">
                  <span className="director-kicker">02 / The Director</span>
                  <h2 className="director-title">
                    <span className="director-title-line">Not generating.</span>
                    <span className="director-title-line director-title-accent"><em>Directing.</em></span>
                  </h2>
                  <p>Sana Sheikh evolved from acting and modelling into an AI film production practice. That performance foundation shapes how she directs expression, framing, emotion and visual language.</p>
                  <p>She carries each film from narrative architecture and visual development through generation, edit, sound and grade.</p>
                  <small>Acting & Modelling · Direction · Visual Development · Post</small>
                </div>
              </article>
            ) : null}

            {activeSectionIndex === 2 ? (
              <article className="projected-panel projected-work">
                <div className="projected-work-feature">
                  {activeWork.media ? (
                    <div className="projected-work-media" key={activeWork.title}>
                      {activeWork.media.kind === "image" ? (
                        <Image src={activeWork.media.src} alt={activeWork.media.alt} fill sizes="(max-width: 720px) 92vw, 36vw" />
                      ) : (
                        <video src={activeWork.media.src} poster={activeWork.media.poster} aria-label={activeWork.media.alt} autoPlay loop muted playsInline preload="metadata" />
                      )}
                    </div>
                  ) : (
                    <header className="projected-work-heading">
                      <span className="projected-work-kicker">03 / Selected Work</span>
                      <h2>A developing body<br />of <em>directed work.</em></h2>
                    </header>
                  )}
                  <div className="projected-work-caption" aria-live="polite">
                    <p className="projected-work-caption-label">A developing body of directed work.</p>
                    <p className="projected-work-caption-current">Now viewing · {String(activeItemIndex + 1).padStart(2, "0")} — {activeWork.title}</p>
                  </div>
                </div>
                <ol className="projected-credit-list" ref={setItemListElement} data-scroll-region="items-list" data-lenis-prevent>
                  {selectedCredits.map((credit, index) => (
                    <li className="projected-credit-item" key={credit.title}>
                      <button
                        className={`projected-credit-row${activeItemIndex === index ? " is-active" : ""}${credit.media?.thumbnailSrc ? " has-thumbnail" : ""}`}
                        data-item-index={index}
                        type="button"
                        onClick={() => selectActiveItem(index)}
                        aria-current={activeItemIndex === index ? "true" : undefined}
                      >
                        <span className="projected-credit-number">{String(index + 1).padStart(2, "0")}</span>
                        {credit.media?.thumbnailSrc ? <Image className="projected-credit-thumbnail" src={credit.media.thumbnailSrc} alt="" width={80} height={45} /> : null}
                        <strong className="projected-credit-title">{credit.title}</strong>
                        <small className="projected-credit-meta">{credit.role} · {credit.year}</small>
                      </button>
                    </li>
                  ))}
                </ol>
              </article>
            ) : null}

            {activeSectionIndex === 3 ? (
              <article className="projected-panel projected-services">
                <header><span>04 / Commission a Film</span><h2>Cinema for stories,<br />artists & <em>brands.</em></h2></header>
                <div className="projected-service-list" ref={setItemListElement} data-scroll-region="items-list" data-lenis-prevent>
                  {services.map((service, index) => <div className={activeItemIndex === index ? "is-active" : ""} data-item-index={index} key={service.number}><span>{service.number}</span><div><strong>{service.title}</strong><small>{service.summary}</small></div><em>{service.timeline.replace("Typical timeline · ", "")}</em><b aria-hidden="true">↗</b></div>)}
                </div>
              </article>
            ) : null}

            {activeSectionIndex === 4 ? (
              <article className="projected-panel projected-method">
                <header className="projected-method-copy" key={processSteps[activeItemIndex]?.number}>
                  <span>05 / AI-native Production · {processSteps[activeItemIndex]?.number}</span>
                  <h2>{processSteps[activeItemIndex]?.title}.<br /><em>{processSteps[activeItemIndex]?.detail}.</em></h2>
                  <p>{processSteps[activeItemIndex]?.copy}</p>
                </header>
                <div className="projected-process-list" aria-label="AI-native production method">
                  {processSteps.map((step, index) => (
                    <button
                      className={activeItemIndex === index ? "is-active" : ""}
                      type="button"
                      key={step.number}
                      onClick={() => selectActiveItem(index)}
                      aria-current={activeItemIndex === index ? "step" : undefined}
                    >
                      <span>{step.number}</span><small>{step.detail}</small><strong>{step.title}</strong><p>{step.copy}</p>
                    </button>
                  ))}
                </div>
              </article>
            ) : null}

            {activeSectionIndex === 5 ? (
              <article className="projected-panel projected-contact">
                <div className="projected-contact-copy"><span>06 / Private Screening</span><h2>Bring the story.<br /><em>Build the world.</em></h2><p>For narrative films, campaigns, music and visual worlds that need direction—not just generation.</p><a href="mailto:artiste.sanasheikh@gmail.com">artiste.sanasheikh@gmail.com</a></div>
                {sent ? <div className="screen-confirmation" role="status"><strong>Project draft prepared.</strong><p>Your email application has the brief ready to review and send.</p></div> : <form className="screen-contact-form" onSubmit={prepareEnquiry}><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>What should the audience feel?<textarea name="brief" rows={3} required /></label><button type="submit">Prepare enquiry <span aria-hidden="true">↗</span></button></form>}
                <footer><a href="https://www.instagram.com/ivysana03?igsh=aXJyZGYyYWIzaGI=" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/in/sana-sheikh-7a1b15345" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://x.com/ivysana03" target="_blank" rel="noreferrer">X ↗</a></footer>
              </article>
            ) : null}
          </div>

          {closingCreditsOpen ? (
            <div className="closing-credits" role="status" aria-label="Closing credits">
              <div className="closing-credits-roll">
                <small>A film experience by</small>
                <h2>Sana Sheikh</h2>
                <p>Direction · Performance · Visual Development · Post</p>
                <span>Original films and visual worlds<br />directed through an AI-native production process.</span>
                <strong>End of programme</strong>
                <em>Scroll up to return</em>
              </div>
            </div>
          ) : null}
        </div>

        <div className="projector-beam" data-camera-layer aria-hidden="true" />
        <div className="theatre-aisle" data-camera-layer aria-hidden="true" />
        <div className="hero-audience" data-camera-layer aria-hidden="true">
          {seatRows.map((row, rowIndex) => (
            <div className="seat-row" key={rowIndex} style={row.style}>
              <div className="seat-bank">
                {Array.from({ length: row.seatsPerSide }).map((_, seatIndex) => <i key={seatIndex} />)}
              </div>
              <div className="seat-bank">
                {Array.from({ length: row.seatsPerSide }).map((_, seatIndex) => <i key={seatIndex} />)}
              </div>
            </div>
          ))}
        </div>
        <div className="hero-shade" data-camera-layer aria-hidden="true" />
        <div className="theatre-atmosphere" aria-hidden="true" />
        <div className="projection-readout" aria-hidden="true"><span>Sana Sheikh · AI Film Director</span><span>House 01 / {chapters[activeSectionIndex]}</span></div>
        <p className="theatre-instruction">Scroll sections · Arrows browse items</p>
      </section>
    </main>
  );
}
