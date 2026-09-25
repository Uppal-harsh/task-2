import { useEffect, useRef, useState } from 'react';

/**
 * Enhanced Scroll Reveal Hook using IntersectionObserver
 * Handles entrance animations reliably across all viewport heights and scroll speeds.
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.05,
    rootMargin = '50px 0px -20px 0px',
    once = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check initial visibility on mount
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
