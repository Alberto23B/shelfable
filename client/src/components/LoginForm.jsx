import { faBook, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";
import { DialogDispatchContext } from "../context/DialogContext";
import { AuthContext } from "../context/AuthContext";
import TogglePassword from "./TogglePassword";

export default function LoginForm() {
  const url = import.meta.env.VITE_API_URL || "http://localhost:5050/";

  const showElements = useContext(ShowElementsContext);
  const dispatchShowElements = useContext(ShowElementsDispatchContext);
  const dispatchDialog = useContext(DialogDispatchContext);

  const { loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    dispatchShowElements({ type: "hideLogin" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include",
      });

      if (response.status === 400) {
        alert("User already logged in");
        dispatchShowElements({ type: "hideLogin" });
        return;
      }

      if (response.status === 401) {
        alert("Incorrect username or password");
        return;
      }

      const data = await response.json();

      if (data.success) {
        dispatchDialog({ type: "user/login" });
        dispatchShowElements({ type: "hideLogin" });
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }

      return data;
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  };

  return (
    <div
      className={showElements.showLogin ? "absolute w-full top-1/4" : "hidden"}
    >
      <div className="z-40 flex items-center justify-center bg-no-repeat bg-cover w-ful">
        <div className="z-40 px-16 py-10 bg-gray-800 bg-opacity-50 shadow-lg rounded-xl backdrop-blur max-sm:px-8">
          <div className="text-white">
            <div className="flex flex-col items-center mb-8">
              <FontAwesomeIcon icon={faBook} size="xl" className="mb-4" />
              <h1 className="mb-2 text-2xl">shelfable</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute z-50 w-4 h-4 pt-4 pl-4 pointer-events-none"
                />
                <input
                  className="px-6 py-2 text-center bg-black border-none rounded-lg shadow-lg outline-none focus:bg-slate-700 text-inherit placeholder-slate-400 backdrop-blur"
                  aria-label="input username"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 text-lg">
                <FontAwesomeIcon
                  icon={faKey}
                  className="absolute z-50 w-4 h-4 pt-4 pl-4 pointer-events-none"
                />
                <input
                  className="px-6 py-2 text-center bg-black border-none rounded-lg shadow-lg outline-none focus:bg-slate-700 text-inherit placeholder-slate-400 backdrop-blur"
                  aria-label="input password"
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TogglePassword
                  setIsVisible={setIsVisible}
                  isVisible={isVisible}
                />
              </div>
              <div className="flex justify-center mt-8 text-lg text-black">
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white bg-opacity-50 rounded-lg shadow-xl bg-verdigris backdrop-blur-md hover:bg-slate-700"
                  disabled={loading}
                >
                  Login
                </button>
                <button
                  className="w-1/3 py-2 ml-2 text-white bg-opacity-50 rounded-lg shadow-xl bg-verdigris hover:bg-red-700 backdrop-blur-md"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
