import { useState, useContext } from "react";
import { NavbarDispatchContext } from "../context/NavbarContext";
import { useOutsideClick } from "../helpers/useOutsideClick.jsx";

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
    <nav ref={ref} className="relative w-full overflow-hidden dark:bg-black">
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
        <i className="block p-4 fa fa-bars hover:shadow-sm"></i>
      </button>
    </nav>
  );
}
