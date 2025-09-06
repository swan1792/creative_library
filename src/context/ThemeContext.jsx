import React, { createContext, useState, useEffect } from "react";

// Create the context with default values
const ThemeContext = createContext();

// ThemeContextProvider Component
const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Default theme is light

    // Load theme from localStorage when the app mounts
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme); // Apply saved theme
        }
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'; // Toggle between light and dark
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save the theme in localStorage
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider };
