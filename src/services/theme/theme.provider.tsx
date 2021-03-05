import React from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import themes from "../../styles/themes";

interface ThemeContextValue {
  toggle: Function;
  selectedTheme: "light" | "dark";
}

const INITIAL_THEME_CONTEXT_VALUE: ThemeContextValue = {
  selectedTheme: "light",
  toggle: () => {},
};

export const ThemeContext = React.createContext<ThemeContextValue>(
  INITIAL_THEME_CONTEXT_VALUE
);

const ThemeProvider: React.FC = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = React.useState<"light" | "dark">(
    "light"
  );

  const toggle = React.useCallback(() => {
    setSelectedTheme(selectedTheme === "light" ? "dark" : "light");
  }, [selectedTheme, setSelectedTheme]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, toggle }}>
      <StyledComponentsThemeProvider theme={themes[selectedTheme]}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
