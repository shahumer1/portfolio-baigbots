import { useEffect, useState } from 'react';

export function useMotion() {
  const [motion, setMotion] = useState(() => document.documentElement.dataset.motion || 'full');

  useEffect(() => {
    document.documentElement.dataset.motion = motion;
    try { localStorage.setItem('baigbots-motion', motion); } catch { /* storage may be unavailable */ }
    window.dispatchEvent(new Event('baigbots-motion-change'));
  }, [motion]);

  return [motion, () => setMotion(value => value === 'full' ? 'reduced' : 'full')];
}
