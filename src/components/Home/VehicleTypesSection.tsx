"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import VehicleScene from "./VehicleScene";

const ITEMS = [
  "Sedans, SUVs, and crossovers",
  "Luxury: BMW, Mercedes-Benz, Audi, Porsche, Jaguar, Land Rover",
  "Pickup trucks and commercial vans",
  "Motorcycles and scooters",
  "Commercial vehicles and fleet cars",
  "Hybrid and electric vehicles (auxiliary battery services)",
];

const CYCLE_MS = 3000;
const RESUME_MS = 5000;
const EXIT_MS = 550;

const VehicleTypesSection = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const [entered, setEntered] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const inViewRef = useRef(false);
  const hiddenRef = useRef(false);
  const userPausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback((next: number) => {
    setIndex((curr) => {
      if (curr === next) return curr;
      setPrevIndex(curr);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = setTimeout(() => setPrevIndex(null), EXIT_MS);
      setCycle((c) => c + 1);
      return next;
    });
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotionRef.current) {
      return;
    }

    const canPlay = () =>
      inViewRef.current && !hiddenRef.current && !userPausedRef.current;

    const sync = () => {
      if (canPlay()) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            goTo((indexRef.current + 1) % ITEMS.length);
          }, CYCLE_MS);
        }
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    syncRef.current = sync;

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setEntered(true);
        sync();
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const onVisibility = () => {
      hiddenRef.current = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    sync();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, [goTo]);

  const handleActivate = (i: number) => {
    if (reducedMotionRef.current || i === indexRef.current) return;

    userPausedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    goTo(i);

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      userPausedRef.current = false;
      syncRef.current();
    }, RESUME_MS);
  };

  return (
    <section className="py-10 md:py-20 lg:py-28" ref={sectionRef}>
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center gap-y-10">
          <div className="w-full px-4 lg:w-2/5">
            <span
              className={`mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary ${
                entered ? "vt-fade" : ""
              }`}
            >
              Vehicle Types
            </span>
            <h2
              className={`mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl md:text-4xl ${
                entered ? "vt-fade vt-fade-delay" : ""
              }`}
            >
              Battery Installation for All Vehicle Types
            </h2>

            <ul className="mt-6 flex flex-col gap-2">
              {ITEMS.map((item, i) => (
                <li
                  key={item}
                  onMouseEnter={() => handleActivate(i)}
                  onClick={() => handleActivate(i)}
                  style={entered ? { animationDelay: `${i * 120}ms` } : undefined}
                  className={`vt-item text-body-color ${
                    entered ? "vt-item-enter" : ""
                  } ${i === index ? "vt-item-active" : ""}`}
                >
                  <span className="vt-item-marker" />
                  <span className="vt-item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`w-full px-4 lg:w-3/5 ${entered ? "vt-scene-fade" : ""}`}
          >
            <VehicleScene activeIndex={index} prevIndex={prevIndex} cycle={cycle} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleTypesSection;
