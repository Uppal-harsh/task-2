import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom Parallax Scroll Hook
 * Implements silky-smooth scroll tracking using requestAnimationFrame and will-change optimizations.
 * Calculates exact relative offsets for multiple layers per section.
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDepthMeters, setCurrentDepthMeters] = useState(0);
  const [parallaxIntensity, setParallaxIntensity] = useState(1); // 0.6 = subtle, 1 = standard, 1.4 = deep 3D
  const [showLayerBadges, setShowLayerBadges] = useState(false);

  const scrollRaf = useRef(null);
  const latestScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      latestScrollY.current = y;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      const maxScroll = Math.max(1, docHeight - viewportHeight);
      const progress = Math.min(1, Math.max(0, y / maxScroll));
      
      // Map progress (0 - 1) to Ocean Depth (0m to 10,994m Challenger Deep)
      const depth = Math.round(progress * 10994);

      setScrollY(y);
      setScrollProgress(progress);
      setCurrentDepthMeters(depth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollRaf.current) {
        cancelAnimationFrame(scrollRaf.current);
      }
    };
  }, []);

  /**
   * Calculate layer transform based on section reference and speed multiplier
   * @param {number} sectionTop - The top offset of the section relative to document
   * @param {number} sectionHeight - The height of the section in pixels
   * @param {number} speed - Parallax speed multiplier (e.g. 0.15 = slow background, 0.5 = midground, 1.0 = normal, 1.4 = fast foreground)
   * @param {number} baseOffset - Optional vertical centering offset in px
   */
  const getLayerStyle = useCallback((sectionTop, sectionHeight, speed, baseOffset = 0) => {
    // Relative scroll distance from when the section enters the viewport
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const distance = scrollY - (sectionTop - viewportHeight * 0.5);
    
    // Intensity scales the depth delta
    const effectiveSpeed = (speed - 1) * parallaxIntensity;
    const translateY = distance * effectiveSpeed + baseOffset;

    return {
      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
      willChange: 'transform',
    };
  }, [scrollY, parallaxIntensity]);

  return {
    scrollY,
    scrollProgress,
    currentDepthMeters,
    parallaxIntensity,
    setParallaxIntensity,
    showLayerBadges,
    setShowLayerBadges,
    getLayerStyle,
  };
}
