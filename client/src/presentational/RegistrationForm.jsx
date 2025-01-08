import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";
import { DialogDispatchContext } from "../context/DialogContext";

export default function RegistrationForm() {
  const showElements = useContext(ShowElementsContext);
  const dispatchShowElements = useContext(ShowElementsDispatchContext);
  const dispatchDialog = useContext(DialogDispatchContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    dispatchShowElements({ type: "hideRegistration" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (response.status === 400) {
        alert("Email already registered");
      }

      if (response.body.success) {
        const data = await response.json();
        setPassword("");
        setUsername("");
        setEmail("");
        dispatchShowElements({ type: "hideRegistration" });
        dispatchDialog({ type: "user/register" });
        return data;
      } else {
        alert("Registration Failed");
      }
    } catch (e) {
      console.error("Error during registration:", e);
      alert("An error occurred.");
    }
  };

  return (
    <div
      className={
        showElements.showRegistration ? "absolute w-full top-1/4" : "hidden"
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
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="px-6 py-2 text-center bg-black bg-opacity-50 border-none rounded-lg shadow-lg outline-none text-inherit placeholder-slate-400 backdrop-blur-md"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="px-6 py-2 text-center bg-black bg-opacity-50 border-none rounded-lg shadow-lg outline-none text-inherit placeholder-slate-400 backdrop-blur-md"
                  type="text"
                  name="email"
                  placeholder="id@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="px-6 py-2 text-center bg-black bg-opacity-50 border-none rounded-lg shadow-lg outline-none text-inherit placeholder-slate-400 backdrop-blur-md"
                  type="password"
                  name="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-8 text-lg text-black">
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white transition-colors duration-300 bg-[#2faeb7] bg-opacity-50 shadow-xl rounded-lg backdrop-blur-md hover:bg-yellow-600"
                >
                  Register
                </button>
                <button
                  className="w-1/3 py-2 ml-2 text-white transition-colors duration-300 bg-[#2faeb7] bg-opacity-50 shadow-xl rounded-lg backdrop-blur-md hover:bg-red-700"
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
