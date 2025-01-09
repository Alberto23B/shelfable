import { useContext } from "react";
import { ShowElementsDispatchContext } from "../context/ShowElementsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function ShowUserSettings() {
  const dispatch = useContext(ShowElementsDispatchContext);

  const handleClick = () => {
    dispatch({ type: "showUserSettings" });
  };

  return (
    <button
      aria-label="show-settings"
      onClick={handleClick}
      className="w-16 mr-2 text-white rounded-lg shadow-sm hover:bg-cadet dark:bg-iron md:h-16 shadow-slate-600 bg-verdigris"
    >
      <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
    </button>
  );
}
