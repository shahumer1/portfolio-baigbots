import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    document.documentElement.dataset.motion === 'reduced'
  );

  useEffect(() => {
    const update = () => setReduced(document.documentElement.dataset.motion === 'reduced');
    window.addEventListener('baigbots-motion-change', update);
    return () => window.removeEventListener('baigbots-motion-change', update);
  }, []);

  return reduced;
}
