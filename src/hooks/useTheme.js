import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('baigbots-theme', theme); } catch { /* storage may be unavailable */ }
  }, [theme]);
  return [theme, () => setTheme(value => value === 'light' ? 'dark' : 'light')];
}
