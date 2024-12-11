import { createContext, useReducer } from "react";
export const NavbarContext = createContext(null);
export const NavbarDispatchContext = createContext(null);

function navbarReducer(state, action) {
  switch (action.type) {
    case "theme/toLight": {
      return {
        ...state,
        theme: "light",
      };
    }
    case "theme/toDark": {
      return {
        ...state,
        theme: "dark",
      };
    }
    case "contacts/toggle": {
      return {
        ...state,
        showContacts: !state.showContacts,
        showAbout: false,
      };
    }
    case "about/toggle": {
      return {
        ...state,
        showAbout: !state.showAbout,
        showContacts: false,
      };
    }
    case "resetAboutAndContacts": {
      return {
        ...state,
        showAbout: false,
        showContacts: false,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialNavbarState = {
  theme: localStorage.getItem("theme"),
  showContacts: false,
  showAbout: false,
};

export function NavbarContextProvider({ children }) {
  const [navState, dispatch] = useReducer(navbarReducer, initialNavbarState);

  return (
    <NavbarContext.Provider value={navState}>
      <NavbarDispatchContext.Provider value={dispatch}>
        {children}
      </NavbarDispatchContext.Provider>
    </NavbarContext.Provider>
  );
}
