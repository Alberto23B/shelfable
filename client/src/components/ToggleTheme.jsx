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

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch({ type: `theme/to${e.target.value}` });
  };

  return (
    <>
      <label htmlFor="theme" className="pl-4">
        Theme:
      </label>
      <select
        className="hidden ml-2 mr-4 dark:bg-cadet sm:inline"
        defaultValue={theme === "light" ? "Light" : "Dark"}
        id="theme"
        onChange={handleChange}
      >
        <option key={1} value={"Light"}>
          Light
        </option>
        <option key={2} value={"Dark"}>
          Dark
        </option>
      </select>
      <div className="inline ml-2 sm:hidden">
        {theme === "light" ? (
          <>
            <label htmlFor="light">
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
            </label>
            <button id="light" value={"Dark"} onClick={handleChange}></button>
          </>
        ) : (
          <>
            <label htmlFor="dark">
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
            </label>
            <button id="dark" value={"Light"} onClick={handleChange}></button>
          </>
        )}
      </div>
    </>
  );
}
