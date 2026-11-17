"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  threshold?: number;
  triggerOnce?: boolean;
};

export function useInView<T extends HTMLElement>({
  threshold = 0.3,
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, inView };
}
