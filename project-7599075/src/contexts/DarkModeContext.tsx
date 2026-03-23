import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface DarkModeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue>({
  isDark: false,
  toggle: () => {},
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('portfolio-dark') === 'true';
    } catch {
      return false;
    }
  });

  const toggle = () => setIsDark((d) => !d);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-dark', String(isDark));
    } catch (e) {
      void e;
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => useContext(DarkModeContext);
