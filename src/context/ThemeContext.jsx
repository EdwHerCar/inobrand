import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext(null);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize state with localStorage value or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Only access localStorage if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : true;
    }
    return true; // Default to dark mode
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Provide context value to children
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined || context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};