import { useEffect } from 'react';
import { useState } from 'react';

const { createContext } = require('react');

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const defaultTheme = JSON.parse(localStorage.getItem('theme_setting')) || 'light';
  const [theme, setTheme] = useState(defaultTheme);
  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme_setting', JSON.stringify(theme));
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};
