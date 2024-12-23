import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
export const DialogContext = createContext(null);
export const DialogDispatchContext = createContext(null);

function dialogReducer(state, action) {
  switch (action.type) {
    case "add": {
      return {
        state: "open",
        message: "Book added to favorites",
      };
    }
    case "remove": {
      return {
        state: "open",
        message: "Book removed from favorites",
      };
    }
    case "clear": {
      return {
        state: "open",
        message: "Favorites cleared",
      };
    }
    case "close": {
      return {
        state: "closed",
        message: "",
      };
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}

const initialDialog = {
  state: "closed",
  message: "",
};

DialogContextProvider.propTypes = {
  children: PropTypes.object,
};

export function DialogContextProvider({ children }) {
  const [dialog, dispatch] = useReducer(dialogReducer, initialDialog);

  return (
    <DialogContext.Provider value={dialog}>
      <DialogDispatchContext.Provider value={dispatch}>
        {children}
      </DialogDispatchContext.Provider>
    </DialogContext.Provider>
  );
}
