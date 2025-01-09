import { useContext } from "react";
import { ShowElementsDispatchContext } from "../context/ShowElementsContext";

export default function LoginButton() {
  const dispatch = useContext(ShowElementsDispatchContext);

  const handleClick = () => {
    dispatch({ type: "showLogin" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="login"
      className="w-1/3 h-16 mx-auto bg-white border rounded-lg dark:text-black"
    >
      Login
    </button>
  );
}
