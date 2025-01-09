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
      className="w-16 hover:bg-cadet dark:bg-iron text-white md:h-16 shadow-sm shadow-slate-600 rounded-lg bg-[#2faeb7] mr-2"
    >
      <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
    </button>
  );
}
