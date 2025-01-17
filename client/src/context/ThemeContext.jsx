import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
export const ThemeContext = createContext(null);
export const ThemeDispatchContext = createContext(null);

function themeReducer(theme, action) {
  switch (action.type) {
    case "toLight": {
      return "light";
    }
    case "toDark": {
      return "dark";
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTheme = localStorage.getItem("theme") || "light";

ThemeContextProvider.propTypes = {
  children: PropTypes.object,
};

export function ThemeContextProvider({ children }) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}
