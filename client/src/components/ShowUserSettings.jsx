import { useContext } from "react";
import { ShowElementsDispatchContext } from "../context/ShowElementsContext";

export default function ShowUserSettings() {
  const dispatch = useContext(ShowElementsDispatchContext);

  const handleClick = () => {
    dispatch({ type: "showUserSettings" });
  };

  return (
    <button
      onClick={handleClick}
      className="w-1/3 h-16 mx-auto bg-white border rounded-lg dark:text-black"
    >
      Settings
    </button>
  );
}
