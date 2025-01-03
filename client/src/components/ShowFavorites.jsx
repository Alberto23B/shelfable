import { useContext } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";

export default function ShowFavorites() {
  const showFavoritesClass = {
    active:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white bg-zinc-600 press top-[2px] shadow-none rounded-lg bg-[#366b71] h-16 mr-2",
    inactive:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white h-16 rounded-lg bg-[#2faeb7] press mr-2",
  };
  const dispatch = useContext(ShowElementsDispatchContext);
  const showElements = useContext(ShowElementsContext);

  const handleShowFavoritesClick = () => {
    console.log(showElements);
    if (showElements.showFavorites) {
      dispatch({ type: "showSearch" });
    } else {
      dispatch({ type: "showFavorites" });
    }
  };

  return (
    <button
      type="button"
      className={
        showElements.showFavorites
          ? showFavoritesClass.active
          : showFavoritesClass.inactive
      }
      onClick={handleShowFavoritesClick}
    >
      ♡
    </button>
  );
}
