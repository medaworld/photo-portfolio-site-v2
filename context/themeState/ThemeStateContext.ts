import { createContext } from 'react';

interface ThemeStateContextProps {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeStateContext = createContext<ThemeStateContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});
