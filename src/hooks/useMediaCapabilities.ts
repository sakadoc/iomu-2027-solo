import { useEffect, useState } from 'react';

export type ViewportTier = 'mobile' | 'tablet' | 'desktop';

export interface MediaCapabilities {
  tier: ViewportTier;
  prefersReducedMotion: boolean;
  dpr: [number, number];
  particleCount: number;
  shadowsEnabled: boolean;
}

export function useMediaCapabilities(): MediaCapabilities {
  const [tier, setTier] = useState<ViewportTier>('desktop');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setTier('mobile');
      } else if (width < 1180) {
        setTier('tablet');
      } else {
        setTier('desktop');
      }
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);

    updateViewport();
    updateMotion();

    window.addEventListener('resize', updateViewport);
    motionQuery.addEventListener('change', updateMotion);

    return () => {
      window.removeEventListener('resize', updateViewport);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, []);

  if (tier === 'mobile') {
    return {
      tier,
      prefersReducedMotion,
      dpr: [1, 1.25],
      particleCount: prefersReducedMotion ? 0 : 75,
      shadowsEnabled: false,
    };
  }

  if (tier === 'tablet') {
    return {
      tier,
      prefersReducedMotion,
      dpr: [1, 1.5],
      particleCount: prefersReducedMotion ? 0 : 140,
      shadowsEnabled: true,
    };
  }

  return {
    tier,
    prefersReducedMotion,
    dpr: [1, 1.75],
    particleCount: prefersReducedMotion ? 0 : 240,
    shadowsEnabled: true,
  };
}
