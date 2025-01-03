import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
export const ShowElementsContext = createContext(null);
export const ShowElementsDispatchContext = createContext(null);

function showElementsReducer(state, action) {
  switch (action.type) {
    case "showSearch": {
      return {
        showHomepage: false,
        showSearch: true,
        showFavorites: false,
      };
    }
    case "showFavorites": {
      return {
        showHomepage: false,
        showSearch: false,
        showFavorites: true,
      };
    }
    default: {
      return {
        showHomepage: true,
        showSearch: false,
        showFavorites: false,
      };
    }
  }
}

const initialShowElements = {
  showHomepage: true,
  showSearch: false,
  showFavorites: false,
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
