import { useContext } from "react";
import {
  DisplayDispatchContext,
  DisplayContext,
} from "../context/DisplayContext";

export default function SwitchList() {
  const display = useContext(DisplayContext);
  const dispatch = useContext(DisplayDispatchContext);

  const handleClick = () => {
    display === "icons"
      ? dispatch({ type: "toList" })
      : dispatch({ type: "toIcons" });
  };

  return (
    <div className="relative top-[3px] sm:right-2 ml-4 rounded-lg">
      <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
          onChange={handleClick}
          checked={display === "list"}
        />
        <label
          htmlFor="toggle"
          className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
        ></label>
      </div>
      <label htmlFor="toggle" className="text-xs text-gray-700">
        List View
      </label>
    </div>
  );
}
