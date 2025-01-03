import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
export const ShowElementsContext = createContext(null);
export const ShowElementsDispatchContext = createContext(null);

function showElementsReducer(state, action) {
  switch (action.type) {
    case "showSearch": {
      return {
        ...state,
        showHomepage: false,
        showSearch: true,
        showFavorites: false,
      };
    }
    case "showFavorites": {
      return {
        ...state,
        showHomepage: false,
        showSearch: false,
        showFavorites: true,
      };
    }
    case "showLogin": {
      return {
        ...state,
        showLogin: true,
        showRegistration: false,
      };
    }
    case "hideLogin": {
      return {
        ...state,
        showLogin: false,
      };
    }
    case "showRegistration": {
      return {
        ...state,
        showLogin: false,
        showRegistration: true,
      };
    }
    case "hideRegistration": {
      return {
        ...state,
        showRegistration: false,
      };
    }
    default: {
      return {
        showHomepage: true,
        showSearch: false,
        showFavorites: false,
        showLogin: false,
        showRegistration: false,
      };
    }
  }
}

const initialShowElements = {
  showHomepage: true,
  showSearch: false,
  showFavorites: false,
  showLogin: false,
  showRegistration: false,
};

ShowElementsContextProvider.propTypes = {
  children: PropTypes.object,
};

export function ShowElementsContextProvider({ children }) {
  const [showElements, dispatch] = useReducer(
    showElementsReducer,
    initialShowElements
  );

  return (
    <ShowElementsContext.Provider value={showElements}>
      <ShowElementsDispatchContext.Provider value={dispatch}>
        {children}
      </ShowElementsDispatchContext.Provider>
    </ShowElementsContext.Provider>
  );
}
