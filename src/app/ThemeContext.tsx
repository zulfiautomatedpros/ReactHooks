// context/ThemeContext.tsx
"use client";
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Flag to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  // Use localStorage to persist theme value
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Until the client mounts, render a fallback to avoid hydration mismatch.
  if (!mounted) {
    return <div className="theme-light" />;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "light" ? "theme-light" : "theme-dark"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
