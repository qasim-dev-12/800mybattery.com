"use client";

import { useEffect, useRef, useState } from "react";

const CountUp = ({
  end,
  suffix = "",
  duration = 1500,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) => {
  const [value, setValue] = useState(end);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setValue(0);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [end, duration]);

  return (
    <span className="ti-counter">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

export default CountUp;
