import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { DialogContext, DialogDispatchContext } from "../context/DialogContext";
import { useContext, useEffect } from "react";

Alert.propTypes = {
  action: PropTypes.string,
};

export default function Alert() {
  const dialogState = useContext(DialogContext);
  const dispatch = useContext(DialogDispatchContext);

  const style = {
    open: "absolute bottom-2 block w-5/6 p-4 mb-4 mx-auto border-2 border-white leading-5 rounded-lg opacity-100 font-regular bg-gradient-to-tr from-cream-100 to-cream-200 dark:bg-gradient-to-tr from-cadet to-black dark:text-white",
    closed: "hidden",
  };

  useEffect(() => {
    if (dialogState.state === "closed") {
      return;
    } else {
      setTimeout(() => {
        dispatch({ type: "close" });
      }, 1000);
    }
  }, [dialogState.state, dispatch]);

  return (
    <dialog
      className={dialogState.state === "open" ? style.open : style.closed}
    >
      <FontAwesomeIcon className="mr-2" icon={faThumbsUp}></FontAwesomeIcon>
      {dialogState.message}
    </dialog>
  );
}
