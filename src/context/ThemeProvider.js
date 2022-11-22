import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

const ThemeProvider = ({ children }) => {
  const toggleTheme = () => {
    const oldTheme = getTheme();
    if (!oldTheme) {
      let newTheme = darkTheme;
      updateTheme(newTheme, oldTheme);
      //   document.documentElement.classList.remove(defaultTheme);
      //   document.documentElement.classList.add(newTheme);
      //   localStorage.setItem("theme", newTheme);
    } else {
      const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
      updateTheme(newTheme, oldTheme);
      //   document.documentElement.classList.remove(oldTheme);
      //   document.documentElement.classList.add(newTheme);
      //   localStorage.setItem("theme", newTheme);
    }
  };
  useEffect(() => {
    const theme = getTheme();
    // console.log(theme);
    if (!theme) updateTheme(defaultTheme);
    else updateTheme(theme);
    // if (!theme) document.documentElement.classList.add(defaultTheme);
    // else document.documentElement.classList.add(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const getTheme = () => {
  return localStorage.getItem("theme");
};

const updateTheme = (theme, themeToRemove) => {
  if (themeToRemove) document.documentElement.classList.remove(themeToRemove);
  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};

export default ThemeProvider;
