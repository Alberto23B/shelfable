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
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white shadow-sm shadow-slate-600 top-[2px] shadow-none rounded-lg bg-[#366b71] h-16 mr-2",
    inactive:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white h-16 shadow-sm shadow-slate-600 rounded-lg bg-[#2faeb7] mr-2",
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
      type="submit"
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
