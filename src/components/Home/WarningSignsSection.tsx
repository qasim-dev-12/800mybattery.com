"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import WarningSignsScene from "../illustrations/WarningSignsScene";

const bullets = [
  "Slow engine turnover when starting",
  "Dim or flickering headlights",
  "Trouble starting, especially in the mornings",
  "Dashboard warning lights appearing",
  "Battery age over 2-3 years",
];

const CheckIcon = () => (
  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const CARD_STAGGER_MS = 120;
const RESUME_MS = 5000;

const WarningSignsSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [hasAppeared, setHasAppeared] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (inView) setHasAppeared(true);
  }, [inView]);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (activeBeat === null) return;
    const timeout = setTimeout(() => {
      setActiveBeat(null);
      // Resuming removes the scene's "animation: none" override, which
      // restarts its CSS timeline from 0. Bumping resetKey remounts the
      // row highlights (and the scene) at the same moment so both loops
      // start back up in sync instead of drifting apart after a hover.
      setResetKey((k) => k + 1);
    }, RESUME_MS);
    return () => clearTimeout(timeout);
  }, [activeBeat]);

  const playing = inView && tabVisible;

  const handleActivate = (i: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActiveBeat(i);
  };

  return (
    <section className="py-10 md:py-20 lg:py-28">
      <div className="container">
        <div className={`-mx-4 flex flex-wrap items-center gap-y-10 ${playing ? "" : "bc-paused"}`}>
          {/* Left: heading, underline, scene */}
          <div className="w-full px-4 lg:w-2/5">
            <div className={hasAppeared ? "bc-heading" : ""}>
              <span className="bc-eyebrow mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Warning Signs
              </span>
              <h2 className="bc-title mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl md:text-4xl">
                Does Your Car Need a New Battery in Dubai?
              </h2>
            </div>
            <div className="bc-underline mt-8 h-1 w-16 rounded-full bg-primary">
              <span className="bc-shimmer bc-anim" />
            </div>

            <div ref={ref} className="mt-8 lg:mt-10">
              <WarningSignsScene key={resetKey} activeBeat={activeBeat} />
            </div>
          </div>

          {/* Right: sign cards */}
          <div className="w-full px-4 lg:w-3/5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {bullets.map((bullet, i) => (
                <div
                  key={bullet}
                  onMouseEnter={() => handleActivate(i)}
                  onFocus={() => handleActivate(i)}
                  onClick={() => handleActivate(i)}
                  className="bc-card group relative rounded-2xl bg-dark p-5 ring-1 ring-stroke-dark transition-all duration-300 hover:-translate-y-1 hover:ring-primary hover:shadow-[0_8px_30px_rgba(255,201,51,0.12)]"
                >
                  <span
                    key={resetKey}
                    className="ws-tip-highlight bc-anim"
                    style={{ animationDelay: `${-(i * 2)}s` }}
                  />
                  <div
                    style={hasAppeared ? { animationDelay: `${i * CARD_STAGGER_MS}ms` } : undefined}
                    className={`flex items-start gap-4 ${hasAppeared ? "bc-card-in" : ""}`}
                  >
                    <span
                      className="bc-icon-breathe bc-anim relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30 transition-colors duration-300 group-hover:bg-primary/20"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    >
                      <CheckIcon />
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-body-color-dark group-hover:text-white transition-colors duration-300">
                      {bullet}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarningSignsSection;
