import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export default function CountUp({ value }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setCount(value);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1050;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, reducedMotion]);

  return <strong ref={ref}>{count}</strong>;
}
