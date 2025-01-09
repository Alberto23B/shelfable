import { useContext } from "react";
import { ShowElementsDispatchContext } from "../context/ShowElementsContext";

export default function RegistrationButton() {
  const dispatch = useContext(ShowElementsDispatchContext);

  const handleClick = () => {
    dispatch({ type: "showRegistration" });
  };
  return (
    <button
      onClick={handleClick}
      className="w-1/3 h-16 mx-auto bg-white border rounded-lg dark:text-black"
    >
      Register
    </button>
  );
}
