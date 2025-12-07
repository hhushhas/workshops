import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type FontSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'xxl';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('slideTheme');
    return (saved as Theme) || 'dark';
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem('slideFontSize');
    return (saved as FontSize) || 'medium';
  });

  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem('slideAccent');
    // If no saved color, return new default
    if (!saved) return '#e78a53';
    
    // Auto-migrate: If user has the old purple (#6366f1), switch to new orange
    if (saved === '#6366f1') return '#e78a53';
    
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('slideTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('slideFontSize', fontSize);
    const scaleMap: Record<FontSize, number> = {
      xs: 0.7,
      small: 0.85,
      medium: 1,
      large: 1.2,
      xl: 1.4,
      xxl: 1.6,
    };
    const scale = scaleMap[fontSize];
    document.documentElement.style.setProperty('--font-scale', scale.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('slideAccent', accentColor);
    document.documentElement.style.setProperty('--accent', accentColor);
  }, [accentColor]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      fontSize,
      setFontSize,
      accentColor,
      setAccentColor,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
