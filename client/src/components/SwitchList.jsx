import list from "../img/list_view.svg";
import icons from "../img/icons_view.svg";
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
    <div className="relative top-[3px]">
      <button
        className={`w-12 hover:bg-cadet dark:hover:bg-iron px-2 press text-white rounded-l-md h-fit bg-zinc-600 ${
          display === "icons" ? " top-[2px] shadow-none bg-zinc-800" : ""
        }`}
        onClick={handleClick}
        disabled={display === "icons"}
      >
        <img
          className="h-6 m-auto invert"
          src={icons}
          alt="result view toggle"
        />
      </button>
      <button
        className={`w-12 hover:bg-cadet dark:hover:bg-iron px-2 press text-white rounded-r-md ${
          display === "list" ? " top-[2px] shadow-none bg-zinc-800" : ""
        } h-fit bg-zinc-600`}
        disabled={display === "list"}
        onClick={handleClick}
      >
        <img
          className="h-6 m-auto invert"
          src={list}
          alt="result view toggle"
        />
      </button>
    </div>
  );
}
