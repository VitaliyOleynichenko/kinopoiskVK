
import { useEffect, useRef } from 'react';

export function useInfiniteScroll(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) callback(); },
      { threshold: 1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [callback]);
  return ref;
}
