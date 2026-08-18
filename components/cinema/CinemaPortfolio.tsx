"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { films, selectedCredits, services } from "@/lib/portfolio";
import HeroProjection from "./HeroProjection";

const chapters = ["Films", "Director", "Work", "Services", "Method", "Contact"] as const;
const navigableSectionCount = 5;
const wheelThreshold = 24;

const processSteps = [
  { number: "01", title: "Story & Treatment", detail: "Intent before imagery", copy: "Define the emotion, audience and dramatic rules before a frame is generated." },
  { number: "02", title: "World & Performance", detail: "Casting · Lens · Light", copy: "Direct character, environment, camera and performance as one visual system." },
  { number: "03", title: "Shot Production", detail: "Generate · Select · Rebuild", copy: "Build shots for continuity rather than treating them as isolated prompts." },
  { number: "04", title: "Edit & Finish", detail: "Rhythm · Sound · Grade", copy: "Shape picture, sound and colour into the final emotional rhythm." },
];
const itemCounts = [films.length, 1, selectedCredits.length, services.length, processSteps.length, 1];

const seatRows = [8, 8, 7, 6, 5, 5, 4].map((seatsPerSide, index) => {
  const scale = 0.85 ** index;
  const brightness = Math.max(0.52, 0.92 ** index);
  const rimLight = 0.38 * 0.67 ** index;
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

function nestedScrollerCanConsume(target: EventTarget | null, deltaY: number) {
  const element = target instanceof Element ? target.closest<HTMLElement>('[data-scroll-region="items-list"]') : null;
  if (!element || element.scrollHeight <= element.clientHeight) return false;
  if (deltaY < 0) return element.scrollTop > 0;
  return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
}

export default function CinemaPortfolio() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const theatreRef = useRef<HTMLElement>(null);
  const activeSectionRef = useRef(0);
  const wheelDeltaRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const lastWheelAtRef = useRef(0);
  const wheelUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null);

  const selectSection = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(chapters.length - 1, index));
    if (nextIndex === activeSectionRef.current) return;
    activeSectionRef.current = nextIndex;
    setActiveSectionIndex(nextIndex);
    setActiveItemIndex(0);
  }, []);

  const stepSection = useCallback((direction: number) => {
    const current = activeSectionRef.current;
    const nextIndex = current >= navigableSectionCount
      ? navigableSectionCount - 1
      : Math.max(0, Math.min(navigableSectionCount - 1, current + direction));
    selectSection(nextIndex);
  }, [selectSection]);

  const stepActiveItem = useCallback((direction: number) => {
    const count = itemCounts[activeSectionRef.current] ?? 1;
    if (count <= 1) return;
    setActiveItemIndex((current) => (current + direction + count) % count);
  }, []);

  useEffect(() => {
    const theatre = theatreRef.current;
    if (!theatre) return;

    function scheduleWheelUnlock() {
      if (wheelUnlockTimerRef.current) clearTimeout(wheelUnlockTimerRef.current);
      wheelUnlockTimerRef.current = setTimeout(() => {
        const quietFor = Date.now() - lastWheelAtRef.current;
        if (quietFor < 180) {
          scheduleWheelUnlock();
          return;
        }
        wheelLockedRef.current = false;
        wheelDeltaRef.current = 0;
      }, 700);
    }

    function handleWheel(event: WheelEvent) {
      if (nestedScrollerCanConsume(event.target, event.deltaY)) {
        wheelDeltaRef.current = 0;
        return;
      }
      event.preventDefault();
      lastWheelAtRef.current = Date.now();
      if (wheelLockedRef.current) {
        scheduleWheelUnlock();
        return;
      }

      wheelDeltaRef.current += event.deltaY;
      if (Math.abs(wheelDeltaRef.current) < wheelThreshold) return;
      wheelLockedRef.current = true;
      stepSection(wheelDeltaRef.current > 0 ? 1 : -1);
      wheelDeltaRef.current = 0;
      scheduleWheelUnlock();
    }

    theatre.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      theatre.removeEventListener("wheel", handleWheel);
      if (wheelUnlockTimerRef.current) clearTimeout(wheelUnlockTimerRef.current);
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

  return (
    <main className="cinema-experience">
      <a className="skip-link" href="#theatre-screen">Skip to projected content</a>

      <header className="site-header">
        <button className="site-mark" type="button" onClick={() => selectSection(0)} aria-label="Sana Sheikh, return to films"><span>SS</span><small>AI Film Director</small></button>
        <nav aria-label="Projected chapters">
          {chapters.slice(0, navigableSectionCount).map((name, index) => <button className={activeSectionIndex === index ? "is-active" : ""} type="button" key={name} onClick={() => selectSection(index)}>{name}</button>)}
        </nav>
        <button className="header-contact" type="button" onClick={() => selectSection(5)}>Start a Film <span aria-hidden="true">↗</span></button>
      </header>

      <section
        className="projection-hero"
        aria-labelledby="experience-title"
        ref={theatreRef}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStartRef.current = { x: touch.clientX, y: touch.clientY, target: event.target };
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const deltaX = touch.clientX - start.x;
          const deltaY = touch.clientY - start.y;
          if (Math.abs(deltaY) < 52 || Math.abs(deltaY) <= Math.abs(deltaX)) return;
          if (nestedScrollerCanConsume(start.target, -deltaY)) return;
          event.preventDefault();
          event.stopPropagation();
          stepSection(deltaY < 0 ? 1 : -1);
        }}
      >
        <Image className="hero-hall" src="/cinema/archive-hall.jpeg" alt="" fill priority sizes="100vw" />
        <h1 className="sr-only" id="experience-title">Sana Sheikh — AI Film Director</h1>

        <div className="hero-screen" id="theatre-screen">
          <div className="screen-chapter" key={activeSectionIndex} aria-live="polite">
            {activeSectionIndex === 0 ? <HeroProjection activeIndex={activeItemIndex} films={films} onStepItem={stepActiveItem} /> : null}

            {activeSectionIndex === 1 ? (
              <article className="projected-panel projected-director">
                <div className="projected-image"><Image src="/cinema/screening-room.jpeg" alt="A gallery illuminated by projected films" fill sizes="36vw" /></div>
                <div className="projected-copy">
                  <span>02 / The Director</span>
                  <h2>Not generating.<br /><em>Directing.</em></h2>
                  <p>Sana Sheikh evolved from acting and modelling into an AI film production practice. That performance foundation shapes how she directs expression, framing, emotion and visual language.</p>
                  <p>She carries each film from narrative architecture and visual development through generation, edit, sound and grade.</p>
                  <small>Acting & Modelling · Direction · Visual Development · Post</small>
                </div>
              </article>
            ) : null}

            {activeSectionIndex === 2 ? (
              <article className="projected-panel projected-work">
                <header><span>03 / Selected Work</span><h2>A developing body<br />of <em>directed work.</em></h2></header>
                <div className="projected-credit-list" data-scroll-region="items-list">
                  {selectedCredits.map((credit, index) => <div className={activeItemIndex === index ? "is-active" : ""} key={credit.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{credit.title}</strong><small>{credit.role} · {credit.year}</small></div>)}
                </div>
              </article>
            ) : null}

            {activeSectionIndex === 3 ? (
              <article className="projected-panel projected-services">
                <header><span>04 / Commission a Film</span><h2>Cinema for stories,<br />artists & <em>brands.</em></h2></header>
                <div className="projected-service-list" data-scroll-region="items-list">
                  {services.map((service, index) => <div className={activeItemIndex === index ? "is-active" : ""} key={service.number}><span>{service.number}</span><div><strong>{service.title}</strong><small>{service.summary}</small></div><em>{service.timeline.replace("Typical timeline · ", "")}</em><b aria-hidden="true">↗</b></div>)}
                </div>
              </article>
            ) : null}

            {activeSectionIndex === 4 ? (
              <article className="projected-panel projected-method">
                <header><span>05 / AI-native Production</span><h2>A director’s process.<br /><em>A new kind of set.</em></h2></header>
                <div className="projected-process-list" data-scroll-region="items-list">
                  {processSteps.map((step, index) => <div className={activeItemIndex === index ? "is-active" : ""} key={step.number}><span>{step.number}</span><small>{step.detail}</small><strong>{step.title}</strong><p>{step.copy}</p></div>)}
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

          <div className="chapter-controls" aria-label="Navigate items in the current section">
            <button type="button" disabled={(itemCounts[activeSectionIndex] ?? 1) <= 1} onClick={(event) => { event.preventDefault(); event.stopPropagation(); stepActiveItem(-1); }} aria-label={`Previous ${chapters[activeSectionIndex]} item`}>←</button>
            <span>{String(activeItemIndex + 1).padStart(2, "0")} / {String(itemCounts[activeSectionIndex] ?? 1).padStart(2, "0")} · {chapters[activeSectionIndex]}</span>
            <button type="button" disabled={(itemCounts[activeSectionIndex] ?? 1) <= 1} onClick={(event) => { event.preventDefault(); event.stopPropagation(); stepActiveItem(1); }} aria-label={`Next ${chapters[activeSectionIndex]} item`}>→</button>
          </div>
        </div>

        <div className="projector-beam" aria-hidden="true" />
        <div className="theatre-aisle" aria-hidden="true" />
        <div className="hero-audience" aria-hidden="true">
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
        <div className="hero-shade" aria-hidden="true" />
        <div className="projection-readout" aria-hidden="true"><span>Sana Sheikh · AI Film Director</span><span>House 01 / {chapters[activeSectionIndex]}</span></div>
        <p className="theatre-instruction">Scroll sections · Arrows browse items</p>
      </section>
    </main>
  );
}
