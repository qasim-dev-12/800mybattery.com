"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import BatteryCareScene from "../illustrations/BatteryCareScene";

const bullets = [
  "Start your car regularly, even when not in daily use",
  "Turn off lights, AC, and infotainment before shutting the engine",
  "Keep terminals clean and corrosion-free",
  "Avoid relying solely on short trips that prevent full charging",
  "Schedule a free battery health test every 6 months with Battery Store",
];

const CheckIcon = () => (
  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const CARD_STAGGER_MS = 120;

const BatteryCareTips = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: false });
  const [hasAppeared, setHasAppeared] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [hoverBeat, setHoverBeat] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const endHover = () => {
    setHoverBeat(null);
    // Ending hover removes the scene's "animation: none" override, which
    // restarts its CSS timeline from 0. Bumping resetKey remounts the row
    // highlights (and the scene) at the same moment so both loops resume
    // in sync instead of drifting apart after a hover.
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    if (inView) setHasAppeared(true);
  }, [inView]);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const playing = inView && tabVisible;

  return (
    <section className="py-10 md:py-20 lg:py-28">
      <div className="container">
        <div className={`-mx-4 flex flex-wrap items-center gap-y-10 flex-row-reverse ${playing ? "" : "bc-paused"}`}>
          {/* Left (visually, via row-reverse): heading, underline, scene */}
          <div className="w-full px-4 lg:w-2/5">
            <div className={hasAppeared ? "bc-heading" : ""}>
              <span className="bc-eyebrow mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
                Battery Care Tips
              </span>
              <h2 className="bc-title mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl md:text-4xl">
                Extend Your Battery Life in Dubai
              </h2>
            </div>
            <div className="bc-underline mt-8 h-1 w-16 rounded-full bg-primary">
              <span className="bc-shimmer bc-anim" />
            </div>

            <div ref={ref} className="mt-8 lg:mt-10">
              <BatteryCareScene key={resetKey} activeBeat={hoverBeat} />
            </div>
          </div>

          {/* Right (visually): tip cards */}
          <div className="w-full px-4 lg:w-3/5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {bullets.map((bullet, i) => (
                <div
                  key={bullet}
                  onMouseEnter={() => setHoverBeat(i)}
                  onMouseLeave={endHover}
                  onFocus={() => setHoverBeat(i)}
                  onBlur={endHover}
                  className="bc-card group relative rounded-2xl bg-dark p-5 ring-1 ring-stroke-dark transition-all duration-300 hover:-translate-y-1 hover:ring-primary hover:shadow-[0_8px_30px_rgba(255,201,51,0.12)]"
                >
                  <span
                    key={resetKey}
                    className="bc-tip-highlight bc-anim"
                    style={{ animationDelay: `${-(i * 2)}s` }}
                  />
                  <div
                    style={hasAppeared ? { animationDelay: `${i * CARD_STAGGER_MS}ms` } : undefined}
                    className={`flex items-start gap-4 ${hasAppeared ? "bc-card-in" : ""}`}
                  >
                    <span className="bc-icon-breathe bc-anim relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30 transition-colors duration-300 group-hover:bg-primary/20">
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

export default BatteryCareTips;
