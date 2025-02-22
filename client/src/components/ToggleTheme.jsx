import { NavbarDispatchContext, NavbarContext } from "../context/NavbarContext";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ToggleTheme() {
  const dispatch = useContext(NavbarDispatchContext);
  const { theme } = useContext(NavbarContext);

  useEffect(() => {
    if (theme === "light") {
      localStorage.setItem("theme", theme);
      document.querySelector("body")?.classList.remove("dark");
    } else if (theme === "dark") {
      localStorage.setItem("theme", theme);
      document.querySelector("body")?.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleChange = () => {
    if (theme === "light") {
      dispatch({ type: `theme/toDark` });
    } else {
      dispatch({ type: `theme/toLight` });
    }
  };

  return (
    <>
      <div className="z-0 inline ">
        {theme === "light" ? (
          <>
            <button
              id="light"
              value={"Dark"}
              onClick={handleChange}
              className="bg-verdigris w-16 md:w-24 hover:bg-cadet dark:bg-iron text-white shadow-sm shadow-slate-600 top-[2px]  rounded-lg md:h-16"
            >
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
            </button>
          </>
        ) : (
          <>
            <button
              id="dark"
              value={"Light"}
              onClick={handleChange}
              className="bg-verdigris w-16 md:w-24 hover:bg-cadet dark:bg-iron text-white shadow-sm shadow-slate-600 top-[2px]  rounded-lg md:h-16"
            >
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
            </button>
          </>
        )}
      </div>
    </>
  );
}
