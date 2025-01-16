import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

TogglePassword.propTypes = {
  setIsVisible: PropTypes.func,
  isVisible: PropTypes.bool,
};

export default function TogglePassword({ setIsVisible, isVisible }) {
  const [icon, setIcon] = useState(faEyeSlash);

  const handleClick = () => {
    if (isVisible) {
      setIsVisible(false);
      setIcon(faEyeSlash);
    } else {
      setIsVisible(true);
      setIcon(faEye);
    }
  };

  return (
    <>
      <p className="py-2 text-center">
        Show password
        <span className="pl-2">
          <FontAwesomeIcon icon={icon} onClick={handleClick} />
        </span>
      </p>
    </>
  );
}
