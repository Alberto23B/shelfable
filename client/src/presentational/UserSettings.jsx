import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";

export default function UserSettings() {
  const showElements = useContext(ShowElementsContext);
  const dispatch = useContext(ShowElementsDispatchContext);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch({ type: "hideUserSettings" });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout");

      if (!response.ok) {
        alert("failed to logout");
        return;
      }
    } catch (e) {
      console.error("Error during logout:", e);
      alert("An error occurred.");
    }
    dispatch({ type: "hideUserSettings" });
  };

  return (
    <div
      className={
        showElements.showUserSettings ? "absolute w-full top-1/4" : "hidden"
      }
    >
      <div className="flex items-center justify-center bg-no-repeat bg-cover w-ful">
        <div className="px-16 py-10 bg-gray-800 bg-opacity-50 shadow-lg rounded-xl backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="flex flex-col items-center mb-8">
              <FontAwesomeIcon icon={faBook} size="xl" />
              <h1 className="mb-2 text-2xl">shelfable</h1>
              <span className="text-gray-300">Enter Profile Details</span>
            </div>
            <div className="flex justify-center mt-8 text-lg text-black">
              <button
                className="w-1/3 py-2 ml-2 text-white transition-colors duration-300 bg-[#2faeb7] bg-opacity-50 shadow-xl rounded-lg backdrop-blur-md hover:bg-iron-700"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="w-1/3 py-2 ml-2 text-white transition-colors duration-300 bg-[#2faeb7] bg-opacity-50 shadow-xl rounded-lg backdrop-blur-md hover:bg-red-700"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
