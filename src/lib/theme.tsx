import { createContext, useContext, useEffect } from 'react';

interface ThemeCtx { theme: 'light' }
const Ctx = createContext<ThemeCtx>({ theme: 'light' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#FAFBFC');
  }, []);

  return <Ctx.Provider value={{ theme: 'light' }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
