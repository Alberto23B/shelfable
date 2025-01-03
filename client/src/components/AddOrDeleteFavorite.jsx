import { useContext } from "react";
import { DisplayContext } from "../context/DisplayContext";
import { DialogDispatchContext } from "../context/DialogContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

AddOrDeleteFavorite.propTypes = {
  data: PropTypes.object,
  setFavorites: PropTypes.func,
  isFavorite: PropTypes.bool,
};

export default function AddOrDeleteFavorite({
  data,
  setFavorites,
  isFavorite,
}) {
  const display = useContext(DisplayContext);
  const dispatch = useContext(DialogDispatchContext);

  const displayStyle = {
    icons:
      "px-2 text-xl font-thin text-white h-8 dark:shadow-none bg-[#2faeb7] dark:bg-slate-900 dark:text-white w-16",
    list: "px-2 mx-2 text-white dark:shadow-none bg-[#2faeb7] dark:bg-slate-900 dark:text-white h-2/5 w-16",
  };

  const handleAddFavorites = async (data) => {
    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Add Request Failed");
      return;
    }

    setFavorites((prev) => [...prev, data]);
    dispatch({ type: "add" });
  };

  const handleDeleteFavorites = async (data) => {
    const response = await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Delete Request Failed");
      return;
    }

    setFavorites((prev) => prev.filter((fav) => fav.info !== data.info));
    dispatch({ type: "remove" });
  };

  return (
    <button
      className={display === "icons" ? displayStyle.icons : displayStyle.list}
      type="button"
      onClick={
        isFavorite
          ? () => handleDeleteFavorites(data)
          : () => handleAddFavorites(data)
      }
    >
      {isFavorite ? (
        <FontAwesomeIcon icon={faX} />
      ) : (
        <FontAwesomeIcon icon={faHeart} />
      )}
    </button>
  );
}
