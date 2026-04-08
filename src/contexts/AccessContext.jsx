import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessContext = createContext();

export const useAccess = () => useContext(AccessContext);

export const AccessProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [fontMultiplier, setFontMultiplier] = useState(() => {
    return parseFloat(localStorage.getItem('fontMultiplier')) || 1;
  });

  useEffect(() => {
    // Modo Oscuro
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Tamaño de Fuente
    document.documentElement.style.setProperty('--font-multiplier', fontMultiplier);
    localStorage.setItem('fontMultiplier', fontMultiplier.toString());
  }, [fontMultiplier]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  const increaseFont = () => {
    setFontMultiplier(prev => (prev < 1.4 ? prev + 0.2 : prev));
  };
  
  const decreaseFont = () => {
    setFontMultiplier(prev => (prev > 1.0 ? prev - 0.2 : prev));
  };

  return (
    <AccessContext.Provider value={{ isDarkMode, toggleDarkMode, fontMultiplier, increaseFont, decreaseFont }}>
      {children}
    </AccessContext.Provider>
  );
};
