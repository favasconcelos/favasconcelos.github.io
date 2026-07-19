import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to elements matching `selector`
 * inside the ref's container. Adds `.visible` class when in view.
 * Uses MutationObserver to handle dynamically added elements
 * (e.g., from lazy-loaded sections).
 *
 * Used for scroll-triggered reveal animations.
 */
export function useScrollReveal(selector = '.reveal, .reveal-left, .reveal-right') {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    // Observe all existing matching elements
    const observeElements = (parent: ParentNode) => {
      const elements = parent.querySelectorAll(selector);
      for (const el of elements) {
        observer.observe(el);
      }
    };
    observeElements(root);

    // Watch for dynamically added elements (e.g., lazy-loaded sections)
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.matches(selector)) observer.observe(node);
            observeElements(node);
          }
        }
      }
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector]);

  return containerRef;
}
