"use client";

import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  start: boolean;
  targets: number[];
  format: (values: number[]) => string;
  finalText: string;
  duration?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CountUpStat = ({
  start,
  targets,
  format,
  finalText,
  duration = 1800,
}: CountUpStatProps) => {
  const [display, setDisplay] = useState(finalText);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!start || ranRef.current) return;
    ranRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setDisplay(format(targets.map(() => 0)));
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const values = targets.map((t) => Math.round(t * eased));
      if (progress < 1) {
        setDisplay(format(values));
        requestAnimationFrame(tick);
      } else {
        setDisplay(finalText);
      }
    };

    requestAnimationFrame(tick);
  }, [start, targets, format, finalText, duration]);

  return (
    <span className="stats-count" aria-hidden="true">
      {display}
    </span>
  );
};

export default CountUpStat;
