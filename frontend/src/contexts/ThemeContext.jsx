import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Only dark theme is enabled
    const theme = 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light');
        root.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }, []);

    const toggleTheme = () => {
        // Light mode is disabled - kept strictly dark
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
