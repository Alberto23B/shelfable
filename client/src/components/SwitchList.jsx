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
    <div className="relative top-[3px] w-full text-end sm:right-4 ml-4 rounded-lg right-0">
      <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="absolute block w-8 h-8 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
          onChange={handleClick}
          checked={display === "list"}
        />
        <label
          htmlFor="toggle"
          className="block w-12 h-8 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
        ></label>
      </div>
      <label
        htmlFor="toggle"
        className="p-2 pl-4 text-sm text-black dark:text-white bg-verdigris inv-border"
      >
        List View
      </label>
    </div>
  );
}
