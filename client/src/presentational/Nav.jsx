import { useState, useContext } from "react";
import { NavbarDispatchContext } from "../context/NavbarContext";
import { useOutsideClick } from "../helpers/useOutsideClick.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Nav({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useContext(NavbarDispatchContext);

  const handleResetDropdowns = () => {
    dispatch({ type: "resetAboutAndContacts" });
  };

  const ref = useOutsideClick(handleResetDropdowns);

  const showMenu = () => {
    handleResetDropdowns();
    setIsOpen(!isOpen);
  };

  return (
    <nav
      ref={ref}
      className="flex items-center w-full overflow-hidden dark:bg-black"
    >
      <div className={isOpen ? "inline-block" : "hidden"}>
        <button
          onClick={() => dispatch({ type: "contacts/toggle" })}
          className="px-4 "
        >
          Contacts
        </button>
        <button onClick={() => dispatch({ type: "about/toggle" })}>
          About
        </button>
        {children}
      </div>
      <button className="hover:bg-none" onClick={showMenu}>
        <FontAwesomeIcon icon={faBars} className="m-4 font-6xl" size="xl" />
      </button>
    </nav>
  );
}
