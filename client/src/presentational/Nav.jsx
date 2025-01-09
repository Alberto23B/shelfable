import { useState, useContext } from "react";
import { NavbarDispatchContext } from "../context/NavbarContext";
import { useOutsideClick } from "../helpers/useOutsideClick.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

Nav.propTypes = {
  children: PropTypes.object,
};

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
      className="flex items-center overflow-hidden w-min dark:bg-black"
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
      <button
        className="hover:bg-none"
        aria-label="show about and contacts"
        onClick={showMenu}
      >
        <FontAwesomeIcon icon={faBars} className="m-4 font-6xl" size="xl" />
      </button>
    </nav>
  );
}
