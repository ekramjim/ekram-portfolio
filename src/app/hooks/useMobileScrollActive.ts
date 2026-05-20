"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
};

export function useMobileScrollActive<T extends HTMLElement>({ threshold = 0.55 }: Options = {}) {
  const ref = useRef<T>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const mobileQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();

      if (!mobileQuery.matches) {
        setIsActive(false);
        observer = null;
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setIsActive(entry.isIntersecting && entry.intersectionRatio >= threshold);
        },
        {
          root: null,
          rootMargin: "-12% 0px -18% 0px",
          threshold: [0, 0.25, threshold, 0.75, 1],
        }
      );

      observer.observe(el);
    };

    const handleQueryChange = () => {
      connect();
    };

    connect();
    mobileQuery.addEventListener("change", handleQueryChange);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener("change", handleQueryChange);
    };
  }, [threshold]);

  return { ref, isActive };
}
