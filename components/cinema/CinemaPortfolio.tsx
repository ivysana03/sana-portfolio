"use client";

import Image from "next/image";
import Lenis from "lenis";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { films, selectedCredits, services } from "@/lib/portfolio";
import directorPortrait from "@/src/assets/image/sana.jpeg";
import CinemaSoundscape from "./CinemaSoundscape";
import CursorPreview from "./CursorPreview";
import HeroProjection from "./HeroProjection";
import ReelIndicator from "./ReelIndicator";

const chapters = ["Films", "Director", "Work", "Services", "Method", "Contact"] as const;
const navigableSectionCount = 5;
const finalSectionIndex = chapters.length - 1;
const sectionBoundaryHysteresis = 0.55;
// Keep the end-credits overlay away from the Contact/Method boundary. A wide
// hysteresis window prevents trackpad momentum from repeatedly mounting the
// visual end state while the final chapter is still settling.
const creditsEnterThreshold = finalSectionIndex + 0.82;
const creditsExitThreshold = finalSectionIndex + 0.18;

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
  { number: "01", title: "Story & Treatment", detail: "Intent before imagery", copy: "Define the emotion, audience and dramatic rules before a frame is generated.", artwork: { motif: "intent", label: "Intent and treatment diagram" } },
  { number: "02", title: "World & Performance", detail: "Casting · Lens · Light", copy: "Direct character, environment, camera and performance as one visual system.", artwork: { motif: "world", label: "World and performance composition" } },
  { number: "03", title: "Shot Production", detail: "Generate · Select · Rebuild", copy: "Build shots for continuity rather than treating them as isolated prompts.", artwork: { motif: "shots", label: "Shot production grid" } },
  { number: "04", title: "Edit & Finish", detail: "Rhythm · Sound · Grade", copy: "Shape picture, sound and colour into the final emotional rhythm.", artwork: { motif: "edit", label: "Edit and finish timeline" } },
];
const itemCounts = [films.length, 1, selectedCredits.length, services.length, processSteps.length, 1];
const workVisualTreatments = [
  { accent: "#d58b56", shadow: "#24100c", angle: "132deg" },
  { accent: "#8da9b8", shadow: "#0b1a22", angle: "38deg" },
  { accent: "#c9b277", shadow: "#201a0b", angle: "168deg" },
  { accent: "#b86b55", shadow: "#24100f", angle: "212deg" },
  { accent: "#b9a17b", shadow: "#17130e", angle: "24deg" },
  { accent: "#9aabb8", shadow: "#0b1218", angle: "300deg" },
] as const;

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

  // Keep the projection screen locked in place; scroll-driven camera movement
  // applies only to the ambient theatre layers below.
  theatre.style.setProperty("--hall-shift", "0svh");
  theatre.style.setProperty("--hall-scale", "1.025");
  theatre.style.setProperty("--seat-shift", `${pose.seatShift.toFixed(2)}svh`);
  theatre.style.setProperty("--seat-scale", pose.seatScale.toFixed(3));
  theatre.style.setProperty("--aisle-scale", pose.aisleScale.toFixed(3));
  theatre.style.setProperty("--beam-scale", pose.beamScale.toFixed(3));
  theatre.style.setProperty("--vignette-opacity", pose.vignetteOpacity.toFixed(2));
}

function resolveStableSection(roomPosition: number, currentSection: number) {
  let nextSection = currentSection;

  while (nextSection < finalSectionIndex && roomPosition >= nextSection + sectionBoundaryHysteresis) {
    nextSection += 1;
  }
  while (nextSection > 0 && roomPosition <= nextSection - sectionBoundaryHysteresis) {
    nextSection -= 1;
  }

  return nextSection;
}

export default function CinemaPortfolio() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [closingCreditsOpen, setClosingCreditsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sent, setSent] = useState(false);
  const theatreRef = useRef<HTMLElement>(null);
  const itemListRef = useRef<HTMLElement>(null);
  const activeSectionRef = useRef(0);
  const activeItemRef = useRef(0);
  const activeServiceRef = useRef(0);
  const closingCreditsRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);
  const cameraProgressRef = useRef(0);
  const syncSectionState = useCallback((index: number, showCredits: boolean) => {
    const nextIndex = Math.max(0, Math.min(chapters.length - 1, index));
    const sectionChanged = nextIndex !== activeSectionRef.current;

    activeSectionRef.current = nextIndex;
    closingCreditsRef.current = showCredits;
    setActiveSectionIndex(nextIndex);
    setClosingCreditsOpen(showCredits);
    if (!sectionChanged && !showCredits) return;
    activeItemRef.current = 0;
    setActiveItemIndex(0);
    if (nextIndex === 3) {
      activeServiceRef.current = 0;
      setActiveServiceIndex(0);
    }

    const focusedControl = document.activeElement;
    if (
      focusedControl instanceof HTMLElement
      && focusedControl.closest(".site-header")
      && focusedControl.dataset.sectionIndex !== String(nextIndex)
    ) {
      focusedControl.blur();
    }
  }, []);

  const selectSection = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(finalSectionIndex, index));
    // Hide the end-credits overlay immediately when a nav click leaves the
    // final chapter; the scroll animation will then reveal the destination
    // section without credits lingering over it.
    if (nextIndex !== finalSectionIndex && closingCreditsRef.current) {
      closingCreditsRef.current = false;
      setClosingCreditsOpen(false);
    }
    const lenis = lenisRef.current;
    if (lenis) {
      // Each chapter has a stable integer anchor. This keeps Lenis away from
      // the hysteresis thresholds after navigation and prevents room toggling.
      lenis.scrollTo(nextIndex * window.innerHeight, { duration: 1.15, lock: true });
      return;
    }
    syncSectionState(nextIndex, false);
  }, [syncSectionState]);

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

  const selectService = useCallback((nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(services.length - 1, nextIndex));
    activeServiceRef.current = safeIndex;
    setActiveServiceIndex(safeIndex);
  }, []);

  const stepService = useCallback((direction: number) => {
    selectService((activeServiceRef.current + direction + services.length) % services.length);
  }, [selectService]);

  const stepActiveItem = useCallback((direction: number) => {
    if (activeSectionRef.current === 3) {
      stepService(direction);
      return;
    }
    const count = itemCounts[activeSectionRef.current] ?? 1;
    if (count <= 1) return;
    const nextIndex = (activeItemRef.current + direction + count) % count;
    selectActiveItem(nextIndex);
  }, [selectActiveItem, stepService]);

  useLayoutEffect(() => {
    const theatre = theatreRef.current;
    if (!theatre) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    const initialScroll = window.scrollY;
    const syncFromScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      const viewportHeight = window.innerHeight || 1;
      const roomPosition = Math.max(0, Math.min(finalSectionIndex + 1, scroll / viewportHeight));
      // Resolve the chapter first, then derive the credits state from that
      // same authoritative value. Previously credits were evaluated directly
      // from the fractional scroll position, so end-state rendering could be
      // true while the section controller had already moved to Method (or was
      // moving back from Contact). That left two independent visibility paths
      // briefly competing for the screen during reverse navigation.
      const nextSection = resolveStableSection(roomPosition, activeSectionRef.current);
      const showCredits = closingCreditsRef.current
        ? nextSection === finalSectionIndex && roomPosition >= creditsExitThreshold
        : nextSection === finalSectionIndex && roomPosition >= creditsEnterThreshold;
      cameraProgressRef.current = Math.min(finalSectionIndex, roomPosition);
      setTheatreCamera(theatre, cameraProgressRef.current);
      if (nextSection !== activeSectionRef.current || showCredits !== closingCreditsRef.current) {
        syncSectionState(nextSection, showCredits);
      }
      if (limit === 0 && initialScroll === 0) setTheatreCamera(theatre, 0);
    };
    lenis.on("scroll", syncFromScroll);
    lenis.scrollTo(initialScroll, { immediate: true });
    // `scrollTo(..., { immediate: true })` does not emit a scroll event in
    // every Lenis version. Synchronize the initial browser position explicitly
    // so a restored deep link/session cannot render Films with end credits (or
    // any other stale chapter) on top.
    syncFromScroll({ scroll: initialScroll, limit: lenis.limit });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [syncSectionState]);

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

  function lockContactScroll() {
    // Do not stop Lenis here. Its `lenis-stopped` class changes the document
    // scroll container and breaks the sticky theatre when an input receives
    // focus. The form's onWheel/onTouchMove handlers already contain input
    // interaction without changing the page scroll geometry.
  }

  function releaseContactScroll() {
    // Kept as a paired handler for the form boundary; Lenis remains running.
  }

  const activeWork = selectedCredits[activeItemIndex] ?? selectedCredits[0];
  const activeService = services[activeServiceIndex] ?? services[0];
  const activeMethod = processSteps[activeItemIndex] ?? processSteps[0];
  const setItemListElement = useCallback((node: HTMLElement | null) => {
    itemListRef.current = node;
  }, []);

  useEffect(() => {
    itemListRef.current = theatreRef.current?.querySelector<HTMLElement>(
      ".screen-section.is-active [data-scroll-region='items-list']",
    ) ?? null;
  }, [activeSectionIndex]);

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
        } as CSSProperties}
      >
        <h1 className="sr-only" id="experience-title">Sana Sheikh — AI Film Director</h1>

        <div className="cinema-camera" data-camera-layer>
          <Image className="hero-hall" src="/newbg.png" alt="" fill priority sizes="100vw" />
          <div className="cinema-entrance-lights" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="projector-bounce" aria-hidden="true" />
          <div className="cinematic-ambient-light" aria-hidden="true" />
          <div className="projector-beam" data-camera-layer aria-hidden="true" />
          <div className="hero-screen" id="theatre-screen">
          <div
            className="screen-chapter credits-rise-viewport"
            data-room="chapter"
            aria-live="polite"
          >
            <div className={`screen-section screen-section-films${activeSectionIndex === 0 ? " is-active" : ""}`} aria-hidden={activeSectionIndex !== 0}>
              <HeroProjection activeIndex={activeItemIndex} films={films} onStepItem={stepActiveItem} soundEnabled={soundEnabled} onSoundEnabledChange={setSoundEnabled} />
            </div>

            <div className={`screen-section screen-section-director${activeSectionIndex === 1 ? " is-active" : ""}`} aria-hidden={activeSectionIndex !== 1}>
              <article className="projected-panel projected-director">
                <div className="projected-image credits-rise-item"><Image src={directorPortrait} alt="Portrait of director Sana Sheikh" fill sizes="(max-width: 720px) 94vw, 31vw" /></div>
                <div className="projected-copy">
                  <span className="director-kicker credits-rise-item">02 / The Director</span>
                  <p className="credits-rise-item">Sana Sheikh is a visual storyteller and director drawn to stories that make you pause, feel something, or see the familiar a little differently.</p>
                  <p className="credits-rise-item">Her journey into filmmaking began with acting and modelling, where she learned to notice the details that often speak louder than words — a fleeting look, the weight of a silence, or the way a frame can shift a feeling.</p>
                  <p className="credits-rise-item">She believes technology is the medium; human feeling is the point.</p>
                  <p className="credits-rise-item">Today, she brings that instinct to AI filmmaking, shaping ideas from the first spark to the final frame, with equal attention to story, performance, visuals, and the details that make a film feel alive.</p>
                  <small className="credits-rise-item">Acting & Modelling · Direction · Visual Development · Post</small>
                </div>
              </article>
            </div>

            <div className={`screen-section screen-section-work${activeSectionIndex === 2 ? " is-active" : ""}`} aria-hidden={activeSectionIndex !== 2}>
              <article className="projected-panel projected-work">
                <div className="projected-work-feature" key={activeWork.title}>
                  {activeWork.media ? (
                    <div className="projected-work-media credits-rise-item" key={activeWork.title}>
                      {activeWork.media.kind === "image" ? (
                        <Image src={activeWork.media.src} alt={activeWork.media.alt} fill sizes="(max-width: 720px) 92vw, 36vw" />
                      ) : (
                        <video src={activeWork.media.src} poster={activeWork.media.poster} aria-label={activeWork.media.alt} autoPlay loop muted playsInline preload="metadata" />
                      )}
                    </div>
                  ) : (
                    <div
                      className="projected-work-media projected-work-art credits-rise-item"
                      style={{
                        "--work-accent": workVisualTreatments[activeItemIndex]?.accent ?? workVisualTreatments[0].accent,
                        "--work-shadow": workVisualTreatments[activeItemIndex]?.shadow ?? workVisualTreatments[0].shadow,
                        "--work-angle": workVisualTreatments[activeItemIndex]?.angle ?? workVisualTreatments[0].angle,
                      } as CSSProperties}
                      aria-label={`${activeWork.title} visual treatment`}
                    >
                      <span className="projected-work-art-index">{String(activeItemIndex + 1).padStart(2, "0")}</span>
                      <strong>{activeWork.title}</strong>
                      <small>Selected work · Director · {activeWork.year}</small>
                    </div>
                  )}
                  <div className="projected-work-caption" aria-live="polite">
                    <p className="projected-work-caption-label credits-rise-item">A developing body of directed work.</p>
                    <p className="projected-work-caption-current credits-rise-item">Now viewing · {String(activeItemIndex + 1).padStart(2, "0")} — {activeWork.title}</p>
                  </div>
                </div>
                <CursorPreview items={selectedCredits.map((credit, index) => ({ id: credit.title, label: credit.title, accent: workVisualTreatments[index % workVisualTreatments.length].accent, image: credit.media?.kind === "video" ? credit.media.poster : credit.media?.src }))}>
                <ol className="projected-credit-list" ref={setItemListElement} data-scroll-region="items-list" data-lenis-prevent>
                    {selectedCredits.map((credit, index) => (
                      <li className="projected-credit-item credits-rise-item" key={credit.title} style={{ "--credits-rise-order": index + 3 } as CSSProperties}>
                        <button
                          className={`projected-credit-row${activeItemIndex === index ? " is-active" : ""}${credit.media?.thumbnailSrc ? " has-thumbnail" : ""}`}
                          data-preview-id={credit.title}
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
                </CursorPreview>
              </article>
            </div>

            <div className={`screen-section screen-section-services${activeSectionIndex === 3 ? " is-active" : ""}`} data-service-index={activeServiceIndex} aria-hidden={activeSectionIndex !== 3}>
              <article className="projected-panel projected-services-single">
                <div className="projected-service-scene" key={activeService.number}>
                  <div className="projected-service-card-inner">
                    <div className="projected-service-copy">
                      <header>
                        <span>04 / Commission a Film · {activeService.number} / 04</span>
                        <h2>{activeService.title}</h2>
                        <p>{activeService.cardTagline}</p>
                        <p className="projected-service-note-line">{activeService.screenNote}</p>
                      </header>
                      <dl className="projected-service-credits">
                        <div><dt>Type</dt><dd>{activeService.screenType}</dd></div>
                        <div><dt>Runtime</dt><dd>{activeService.screenRuntime}</dd></div>
                        <div><dt>Direction</dt><dd>{activeService.screenDiscipline}</dd></div>
                      </dl>
                    </div>
                    <div className={`projected-service-frame projected-service-artwork motif-${activeService.artwork.motif}`} role="img" aria-label={activeService.artwork.label}>
                      <div className="projected-service-abstract"><i /><i /><i /><i /></div>
                    </div>
                  </div>
                </div>
                <ReelIndicator activeIndex={activeServiceIndex} itemCount={services.length} itemLabel="service" sectionName={activeService.title} onPrevious={() => stepService(-1)} onNext={() => stepService(1)} />
              </article>
            </div>

            <div className={`screen-section screen-section-method${activeSectionIndex === 4 ? " is-active" : ""}`} data-method-index={activeItemIndex} aria-hidden={activeSectionIndex !== 4}>
              <article className="projected-panel projected-method">
                <header className="projected-method-copy">
                  <span className="credits-rise-item">05 / AI-native Production</span>
                  <h2 className="credits-rise-item">Method.<br /><em>Made visible.</em></h2>
                  <div className={`projected-method-frame method-artwork motif-${activeMethod.artwork.motif}`} role="img" aria-label={activeMethod.artwork.label}><span>{activeMethod.number}</span><i /><i /><i /></div>
                  <div className="projected-method-detail credits-rise-item"><small>{activeMethod.number} / {activeMethod.detail}</small><strong>{activeMethod.title}</strong><p>{activeMethod.copy}</p></div>
                  <div className="projected-method-navigation credits-rise-item" aria-label="Browse method steps">
                    <button type="button" onClick={() => stepActiveItem(-1)} aria-label="Previous method step">←</button>
                    <button type="button" onClick={() => stepActiveItem(1)} aria-label="Next method step">→</button>
                  </div>
                </header>
                <div className="projected-process-list" aria-label="AI-native production method">
                  {processSteps.map((step, index) => (
                    <button
                      className={`${activeItemIndex === index ? "is-active " : ""}credits-rise-item`}
                      style={{ "--credits-rise-order": index + 4 } as CSSProperties}
                      type="button"
                      key={step.number}
                      onClick={() => selectActiveItem(index)}
                      aria-current={activeItemIndex === index ? "step" : undefined}
                    >
                      <span>{step.number}</span><small>{step.detail}</small><strong>{step.title}</strong>
                    </button>
                  ))}
                </div>
              </article>
            </div>

            <div className={`screen-section screen-section-contact${activeSectionIndex === 5 ? " is-active" : ""}`} aria-hidden={activeSectionIndex !== 5}>
              <article className="projected-panel projected-contact">
                <div className="projected-contact-copy"><span className="credits-rise-item">06 / Private Screening</span><h2 className="credits-rise-item">Bring the story.<br /><em>Build the world.</em></h2><p className="credits-rise-item">For narrative films, campaigns, music and visual worlds that need direction—not just generation.</p><a className="credits-rise-item" href="mailto:artiste.sanasheikh@gmail.com">artiste.sanasheikh@gmail.com</a></div>
                {sent ? <div className="screen-confirmation credits-rise-item" role="status"><strong>Project draft prepared.</strong><p>Your email application has the brief ready to review and send.</p></div> : <form
                  className="screen-contact-form"
                  onSubmit={prepareEnquiry}
                  onPointerEnter={lockContactScroll}
                  onPointerLeave={(event) => {
                    if (!event.currentTarget.contains(document.activeElement)) releaseContactScroll();
                  }}
                  onFocusCapture={lockContactScroll}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null) && !event.currentTarget.matches(":hover")) releaseContactScroll();
                  }}
                  onWheel={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onTouchStart={lockContactScroll}
                  onTouchMove={(event) => {
                    event.preventDefault();
                  }}
                  onTouchEnd={(event) => {
                    if (!event.currentTarget.contains(document.activeElement)) releaseContactScroll();
                  }}
                ><label className="credits-rise-item">Name<input name="name" autoComplete="name" required /></label><label className="credits-rise-item">Email<input name="email" type="email" autoComplete="email" required /></label><label className="credits-rise-item">What should the audience feel?<textarea name="brief" rows={3} required /></label><button className="credits-rise-item" type="submit">Prepare enquiry <span aria-hidden="true">↗</span></button></form>}
                <footer className="credits-rise-item"><a href="https://www.instagram.com/ivysana03?igsh=aXJyZGYyYWIzaGI=" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/in/sana-sheikh-7a1b15345" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://x.com/ivysana03" target="_blank" rel="noreferrer">X ↗</a></footer>
              </article>
            </div>
          </div>

          <CinemaSoundscape
            enabled={soundEnabled}
            onEnabledChange={setSoundEnabled}
            sectionIndex={activeSectionIndex}
            closingCreditsOpen={closingCreditsOpen}
            showControl={false}
          />

          <div className={`closing-credits${closingCreditsOpen && activeSectionIndex === finalSectionIndex ? " is-active" : ""}`} role="status" aria-label="Closing credits" aria-hidden={!closingCreditsOpen || activeSectionIndex !== finalSectionIndex}>
              <div className="closing-credits-window credits-rise-viewport">
                <div className="closing-credits-roll credits-rise-roll">
                  <small>End credits</small>
                  <h2>Sana Sheikh</h2>
                  <div className="closing-credit-rows" aria-label="Production credits">
                    <p><span>Director</span><strong>Sana Sheikh</strong></p>
                    <p><span>AI production</span><strong>House 01</strong></p>
                    <p><span>Visual development</span><strong>Original worlds</strong></p>
                    <p><span>Films</span><strong>Misty Realm · Tide Line</strong></p>
                    <p><span>Direction</span><strong>Performance · Edit · Grade</strong></p>
                  </div>
                  <em>End of programme</em>
                </div>
                <div className="closing-credits-final" aria-label="End of programme">
                  <small>End of programme</small>
                  <strong>Sana Sheikh</strong>
                  <em>Start a film · Scroll up to return</em>
                </div>
              </div>
          </div>
          </div>
        </div>

        <div className="theatre-atmosphere" aria-hidden="true" />
        <div className="projection-readout" aria-hidden="true"><span>Sana Sheikh · AI Film Director</span><span>House 01 / {chapters[activeSectionIndex]}</span></div>
        <p className="theatre-instruction">Scroll sections · Arrows browse items</p>
      </section>
    </main>
  );
}
