import { useContext } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function ShowFavorites() {
  const showFavoritesClass = {
    active:
      "w-16 md:w-24 hover:bg-cadet dark:bg-iron text-white shadow-sm shadow-slate-600 top-[2px] shadow-none rounded-lg bg-[#366b71] md:h-16 mr-2",
    inactive:
      "w-16 md:w-24 hover:bg-cadet dark:bg-iron text-white md:h-16 shadow-sm shadow-slate-600 rounded-lg bg-verdigris mr-2",
  };
  const dispatch = useContext(ShowElementsDispatchContext);
  const showElements = useContext(ShowElementsContext);

  const handleShowFavoritesClick = () => {
    if (showElements.showFavorites) {
      dispatch({ type: "showSearch" });
    } else {
      dispatch({ type: "showFavorites" });
    }
  };

  return (
    <button
      type="submit"
      aria-label="show-favorites"
      className={
        showElements.showFavorites
          ? showFavoritesClass.active
          : showFavoritesClass.inactive
      }
      onClick={handleShowFavoritesClick}
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}
