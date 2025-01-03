import { useContext, useRef } from "react";
import { DialogDispatchContext } from "../context/DialogContext";
import PropTypes from "prop-types";

ClearAll.propTypes = {
  setFavorites: PropTypes.func,
};

export default function ClearAll({ setFavorites }) {
  const alertRef = useRef(null);
  const dispatch = useContext(DialogDispatchContext);

  const toggleAlert = () => {
    if (!alertRef.current) {
      return;
    }
    alertRef.current.hasAttribute("open")
      ? alertRef.current.close()
      : alertRef.current.showModal();
  };

  const handleClearAll = async () => {
    await fetch("/api/all", {
      method: "DELETE",
    });
    dispatch({ type: "clear" });
    setFavorites([]);
    toggleAlert();
  };

  return (
    <>
      <dialog ref={alertRef}>
        <div className="px-16 text-center border-2 border-white rounded-lg bg-[#6bc4cd] dark:bg-cadet py-14">
          <h1 className="mb-4 text-xl font-bold text-slate-500">
            Are you sure? You can&apos;t recover your favorites after delete
          </h1>
          <button
            className="px-4 py-2 text-white rounded-lg bg-pearl dark:bg-slate-700 text-md"
            onClick={toggleAlert}
          >
            Cancel
          </button>
          <button
            className="py-2 ml-2 font-semibold text-white rounded-md bg-teak dark:bg-slate-500 px-7 text-md"
            onClick={handleClearAll}
          >
            Ok
          </button>
        </div>
      </dialog>
      <button
        className="px-4 m-2 text-white rounded-md w-36 h-fit bg-[#2faeb7] dark:bg-iron"
        onClick={toggleAlert}
      >
        Clear All
      </button>
    </>
  );
}
