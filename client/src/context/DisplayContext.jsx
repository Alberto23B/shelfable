import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
export const DisplayContext = createContext(null);
export const DisplayDispatchContext = createContext(null);

function displayReducer(display, action) {
  switch (action.type) {
    case "toIcons": {
      return "icons";
    }
    case "toList": {
      return "list";
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialDisplay = "icons";

DisplayContextProvider.propTypes = {
  children: PropTypes.object,
};

export function DisplayContextProvider({ children }) {
  const [display, dispatch] = useReducer(displayReducer, initialDisplay);

  return (
    <DisplayContext.Provider value={display}>
      <DisplayDispatchContext.Provider value={dispatch}>
        {children}
      </DisplayDispatchContext.Provider>
    </DisplayContext.Provider>
  );
}
