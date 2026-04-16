import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

export const useTheme = create<ThemeStore>((setFn) => ({
  theme: (typeof window !== 'undefined' && localStorage.getItem('makel-theme') as Theme) || 'light',
  toggle: () => setFn((s) => {
    const next = s.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('makel-theme', next);
    return { theme: next };
  }),
  set: (t) => { localStorage.setItem('makel-theme', t); setFn({ theme: t }); },
}));
