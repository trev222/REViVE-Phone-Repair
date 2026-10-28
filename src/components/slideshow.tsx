"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = Array.from({ length: 8 }, (_, index) => `/css/img/slide${index + 1}.JPG`);

export function Slideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reducedMotion]);

  function goTo(next: number) {
    setIndex((next + slides.length) % slides.length);
    setPaused(true);
  }

  return (
    <section className="slideshow" aria-label="Photos from REViVE Phone Repair" aria-roledescription="carousel"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setPaused(true)}>
      <div className="slide-stage">
        {slides.map((src, slideIndex) => (
          <div key={src} className="slide" hidden={slideIndex !== index} role="group"
            aria-roledescription="slide" aria-label={`${slideIndex + 1} of ${slides.length}`}>
            <Image src={src} alt={`REViVE Phone Repair shop photo ${slideIndex + 1}`} fill
              sizes="(max-width: 800px) 100vw, 800px" preload={slideIndex === 0} />
          </div>
        ))}
        <span className="slide-count" aria-live={paused || reducedMotion ? "polite" : "off"}>{index + 1} / {slides.length}</span>
        <button type="button" className="slide-arrow previous" aria-label="Previous photo" onClick={() => goTo(index - 1)}>❮</button>
        <button type="button" className="slide-arrow next" aria-label="Next photo" onClick={() => goTo(index + 1)}>❯</button>
      </div>
      <div className="slide-controls">
        <div className="slide-dots" aria-label="Choose a photo">
          {slides.map((src, slideIndex) => (
            <button key={src} type="button" aria-label={`Show photo ${slideIndex + 1}`} aria-pressed={slideIndex === index}
              onClick={() => goTo(slideIndex)}><span /></button>
          ))}
        </div>
        {!reducedMotion && <button type="button" className="slideshow-toggle" onClick={() => setPaused(!paused)}>{paused ? "Play slideshow" : "Pause slideshow"}</button>}
      </div>
    </section>
  );
}
