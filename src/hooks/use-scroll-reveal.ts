import { useEffect, useRef } from "react";

/**
 * Attaches IntersectionObserver to elements matching `selector`
 * inside the ref's container. Adds `.visible` class when in view.
 *
 * Used for scroll-triggered reveal animations.
 */
export function useScrollReveal(selector = ".reveal, .reveal-left, .reveal-right") {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [selector]);

  return containerRef;
}
