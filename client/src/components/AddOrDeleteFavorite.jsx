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
  const url = import.meta.env.VITE_API_URL || "http://localhost:5050/";

  const display = useContext(DisplayContext);
  const dispatch = useContext(DialogDispatchContext);

  const displayStyle = {
    icons:
      "px-2 text-xl font-thin text-white h-8 bg-verdigris rounded-lg dark:shadow-none hover:bg-slate-700 dark:bg-slate-900 dark:text-white w-16",
    list: "px-2 mx-2 text-white rounded-lg bg-verdigris hover:bg-slate-700 dark:shadow-none dark:bg-slate-900 dark:text-white w-16",
  };

  const handleAddFavorites = async (data) => {
    const response = await fetch(`${url}api`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Add Request Failed");
      return;
    }

    setFavorites((prev) => [...prev, data]);
    dispatch({ type: "favorites/add" });
  };

  const handleDeleteFavorites = async (data) => {
    const response = await fetch(`${url}api`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Delete Request Failed");
      return;
    }

    setFavorites((prev) => prev.filter((fav) => fav.info !== data.info));
    dispatch({ type: "favorites/remove" });
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
        <FontAwesomeIcon icon={faX} size="sm" />
      ) : (
        <FontAwesomeIcon icon={faHeart} size="sm" />
      )}
    </button>
  );
}
