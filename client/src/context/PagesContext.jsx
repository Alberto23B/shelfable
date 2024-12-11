import { createContext, useReducer } from "react";
export const PageContext = createContext(null);
export const PageDispatchContext = createContext(null);

function pageReducer(page, action) {
  switch (action.type) {
    case "set": {
      return {
        page: 1,
        elementsInPage: action.elements,
      };
    }
    case "increment": {
      return {
        page: page.page + 1,
        elementsInPage: action.elements,
      };
    }
    case "decrement": {
      return {
        page: page.page - 1,
        elementsInPage: action.elements,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialPage = {
  page: 1,
  elementsInPage: [],
};

export function PageContextProvider({ children }) {
  const [page, dispatch] = useReducer(pageReducer, initialPage);

  return (
    <PageContext.Provider value={page}>
      <PageDispatchContext.Provider value={dispatch}>
        {children}
      </PageDispatchContext.Provider>
    </PageContext.Provider>
  );
}
