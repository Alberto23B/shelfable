import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";
import { DialogDispatchContext } from "../context/DialogContext";
import { AuthContext } from "../context/AuthContext";
import ToggleTheme from "./ToggleTheme";

export default function UserSettings() {
  const url = import.meta.env.VITE_API_URL || "";

  const showElements = useContext(ShowElementsContext);
  const dispatchShowElements = useContext(ShowElementsDispatchContext);
  const dispatchDialog = useContext(DialogDispatchContext);
  const { isLoggedIn, username } = useContext(AuthContext);

  const handleClose = (e) => {
    e.preventDefault();
    dispatchShowElements({ type: "hideUserSettings" });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${url}api/logout`, {
        credentials: "include",
      });

      if (!response.ok) {
        alert("Failed to logout, or the session may be expired");
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
        return;
      }

      const data = await response.json(response);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (e) {
      console.error("Error during logout:", e);
      alert("An error occurred.");
    }
    dispatchShowElements({ type: "hideUserSettings" });
    dispatchDialog({ type: "user/logout" });
  };

  return (
    <div
      className={
        showElements.showUserSettings ? "absolute w-full top-1/4" : "hidden"
      }
    >
      <div className="relative z-50 flex items-center justify-center bg-no-repeat bg-cover w-ful">
        <div className="px-16 py-10 bg-gray-800 bg-opacity-50 shadow-lg rounded-xl backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="flex flex-col items-center mb-8">
              <FontAwesomeIcon icon={faBook} size="xl" />
              <h1 className="mb-2 text-2xl ">shelfable</h1>
              {isLoggedIn ? (
                <span className="mb-2 text-gray-300">
                  {username}&apos;s profile{" "}
                </span>
              ) : (
                <span className="mb-2 text-gray-300">Welcome, stranger </span>
              )}
              <ToggleTheme />
            </div>
            <div className="flex justify-center gap-2 mt-8 text-lg text-black">
              <button
                className={
                  isLoggedIn
                    ? "w-fit py-2 px-2 ml-2 text-white  bg-verdigris bg-opacity-50 shadow-xl rounded-lg backdrop-blur-md hover:bg-slate-700"
                    : "hidden"
                }
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="px-2 py-2 ml-2 text-white bg-opacity-50 rounded-lg shadow-xl w-fit bg-verdigris hover:bg-red-700 backdrop-blur-md"
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
