import { createContext, useReducer } from "react";
export const SelectInputContext = createContext(null);
export const SelectInputDispatchContext = createContext(null);

function selectInputReducer(isSelected, action) {
  switch (action.type) {
    case true: {
      return true;
    }
    case false: {
      return false;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialIsSelected = false;

export function SelectInputContextProvider({ children }) {
  const [isSelected, dispatch] = useReducer(
    selectInputReducer,
    initialIsSelected
  );

  return (
    <SelectInputContext.Provider value={isSelected}>
      <SelectInputDispatchContext.Provider value={dispatch}>
        {children}
      </SelectInputDispatchContext.Provider>
    </SelectInputContext.Provider>
  );
}
