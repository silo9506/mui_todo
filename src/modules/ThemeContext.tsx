import { createContext, ReactNode, useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextValue = {
  darkTheme: boolean;
};
type ThemeUpdateContextValue = {
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({ darkTheme: true });
const ThemeUpdateContext = createContext<ThemeUpdateContextValue>({
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeUpdateContext);

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const theme = createTheme({
    typography: {
      fontFamily: "Josefin Sans, sans-serif",
    },
    palette: {
      mode: darkTheme ? "dark" : "light",
      primary: { main: "#423c3c", light: "#fff ", dark: "#000000" },
      success: { main: "#87ceeb" },
    },
  });

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme }}>
      <ThemeUpdateContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
