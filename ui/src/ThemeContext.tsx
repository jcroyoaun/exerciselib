import { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'yellow' | 'green' | 'cyan' | 'white' | 'amber' | 'pink';

export const themes = {
  yellow: {
    bg: 'bg-neutral-950',
    bgSecondary: 'bg-neutral-900',
    bgTertiary: 'bg-neutral-800',
    accent: 'bg-yellow-400',
    accentHover: 'hover:bg-yellow-500',
    border: 'border-yellow-400',
    borderSecondary: 'border-yellow-500',
    text: 'text-yellow-400',
    textHover: 'hover:text-yellow-300',
    textSecondary: 'text-neutral-300',
    textMuted: 'text-neutral-500',
    shadow: 'shadow-yellow-400/20',
    ring: 'ring-yellow-400',
    iconBg: 'text-neutral-950',
  },
  green: {
    bg: 'bg-black',
    bgSecondary: 'bg-neutral-950',
    bgTertiary: 'bg-neutral-900',
    accent: 'bg-green-500',
    accentHover: 'hover:bg-green-600',
    border: 'border-green-500',
    borderSecondary: 'border-green-600',
    text: 'text-green-400',
    textHover: 'hover:text-green-300',
    textSecondary: 'text-green-300',
    textMuted: 'text-green-700',
    shadow: 'shadow-green-500/20',
    ring: 'ring-green-400',
    iconBg: 'text-black',
  },
  cyan: {
    bg: 'bg-neutral-950',
    bgSecondary: 'bg-neutral-950',
    bgTertiary: 'bg-neutral-900',
    accent: 'bg-cyan-500',
    accentHover: 'hover:bg-cyan-600',
    border: 'border-cyan-500',
    borderSecondary: 'border-cyan-600',
    text: 'text-cyan-400',
    textHover: 'hover:text-cyan-300',
    textSecondary: 'text-cyan-200',
    textMuted: 'text-cyan-700',
    shadow: 'shadow-cyan-500/20',
    ring: 'ring-cyan-400',
    iconBg: 'text-black',
  },
  white: {
    bg: 'bg-neutral-950',
    bgSecondary: 'bg-neutral-900',
    bgTertiary: 'bg-neutral-800',
    accent: 'bg-white',
    accentHover: 'hover:bg-neutral-200',
    border: 'border-white',
    borderSecondary: 'border-neutral-300',
    text: 'text-white',
    textHover: 'hover:text-neutral-200',
    textSecondary: 'text-neutral-300',
    textMuted: 'text-neutral-500',
    shadow: 'shadow-white/20',
    ring: 'ring-white',
    iconBg: 'text-neutral-950',
  },
  amber: {
    bg: 'bg-neutral-950',
    bgSecondary: 'bg-neutral-950',
    bgTertiary: 'bg-neutral-900',
    accent: 'bg-amber-500',
    accentHover: 'hover:bg-amber-600',
    border: 'border-amber-500',
    borderSecondary: 'border-amber-600',
    text: 'text-amber-400',
    textHover: 'hover:text-amber-300',
    textSecondary: 'text-amber-200',
    textMuted: 'text-amber-700',
    shadow: 'shadow-amber-500/20',
    ring: 'ring-amber-400',
    iconBg: 'text-black',
  },
  pink: {
    bg: 'bg-neutral-950',
    bgSecondary: 'bg-neutral-950',
    bgTertiary: 'bg-neutral-900',
    accent: 'bg-pink-500',
    accentHover: 'hover:bg-pink-600',
    border: 'border-pink-500',
    borderSecondary: 'border-pink-600',
    text: 'text-pink-400',
    textHover: 'hover:text-pink-300',
    textSecondary: 'text-pink-200',
    textMuted: 'text-pink-700',
    shadow: 'shadow-pink-500/20',
    ring: 'ring-pink-400',
    iconBg: 'text-black',
  },
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeColors: typeof themes[Theme];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('yellow');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors: themes[theme] }}>
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
