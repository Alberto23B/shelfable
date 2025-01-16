import {
  faBook,
  faKey,
  faMailBulk,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  ShowElementsContext,
  ShowElementsDispatchContext,
} from "../context/ShowElementsContext";
import { DialogDispatchContext } from "../context/DialogContext";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../helpers/validation";

export default function RegistrationForm() {
  const url = import.meta.env.VITE_API_URL || "/api";

  const showElements = useContext(ShowElementsContext);
  const dispatchShowElements = useContext(ShowElementsDispatchContext);
  const dispatchDialog = useContext(DialogDispatchContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [loading, setLoading] = useState(false);

  const [focus, setFocus] = useState(null);

  const infoText = {
    username: `Must be: 
        - At least six character long
        - No spaces
        - Only letters, digits and .-_`,
    password: `Must be: 
    - At least six character long
    - At least one UpperCase letter
    - At least one LowerCase letter
    - At least a digit
    - At least a special character #?!@$%^&*-`,
    email: `Only valid format: 
    name@domain.x / name@domain.x.y`,
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatchShowElements({ type: "hideRegistration" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateUsername(username)) {
      alert(`Invalid Username
        Must be: 
        - At least six character long
        - No spaces
        - Only letters, digits and .-_
        `);
      return;
    }

    if (!validatePassword(password, passwordCheck)) {
      alert(`Invalid Password
        Must be: 
        - At least six character long
        - At least one UpperCase letter
        - At least one LowerCase letter
        - At least a digit
        - At least a special character #?!@$%^&*-
        `);
      return;
    }

    if (!validateEmail(email)) {
      alert(`Invalid Email
        Only valid format: 
        name@domain.x / name@domain.x.y
        `);
      return;
    }

    try {
      const response = await fetch(`${url}api/register`, {
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

      if (response.status === 201) {
        const data = await response.json();
        setPassword("");
        setUsername("");
        setEmail("");
        dispatchShowElements({ type: "hideRegistration" });
        dispatchDialog({ type: "user/register" });
        setLoading(false);
        return data;
      } else {
        setLoading(false);
        alert("Registration Failed");
      }
    } catch (e) {
      console.error("Error during registration:", e);
      setLoading(false);
      alert("An error occurred.");
    }
  };

  return (
    <div
      className={
        showElements.showRegistration ? "absolute w-full top-1/4" : "hidden"
      }
    >
      <div className="z-40 flex items-center justify-center bg-no-repeat bg-cover">
        <div className="z-40 w-full px-16 py-10 bg-gray-800 bg-opacity-50 shadow-lg md:w-2/3 backdrop-blur rounded-xl max-sm:px-8 ">
          <div className="w-full text-center text-white ">
            <div className="flex flex-col items-center mb-8 ">
              <FontAwesomeIcon icon={faBook} size="xl" />
              <h1 className="mb-2 text-2xl">shelfable</h1>
              <span className="text-gray-300">Enter Profile Details</span>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="grid-cols-2 gap-2 md:grid ">
                <div className="mb-4 text-sm md:text-lg">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute z-50 w-4 h-4 pt-4 pl-4 pointer-events-none"
                  />
                  <input
                    className="py-2 text-center bg-black border-none rounded-lg shadow-lg outline-none lg:px-6 focus:bg-slate-700 text-inherit placeholder-slate-400 backdrop-blur-md"
                    aria-label="input username"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocus("username")}
                    required
                  />
                </div>
                <div className="mb-4 text-sm md:text-lg">
                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute z-50 w-4 h-4 pt-4 pl-4 pointer-events-none"
                  />
                  <input
                    className="py-2 text-center bg-black border-none rounded-lg shadow-lg outline-none lg:px-6 focus:bg-slate-700 text-inherit placeholder-slate-400 backdrop-blur-md"
                    aria-label="input password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocus("password")}
                    required
                  />
                </div>
                <div className="mb-4 text-sm md:text-lg">
                  <FontAwesomeIcon
                    icon={faMailBulk}
                    className="absolute z-50 w-4 h-4 pt-4 pl-4 pointer-events-none"
                  />
                  <input
                    className="py-2 text-center bg-black border-none rounded-lg shadow-lg outline-none lg:px-6 focus:bg-slate-700 text-inherit placeholder-slate-400 backdrop-blur-md"
                    aria-label="input email"
                    type="text"
                    name="email"
                    placeholder="id@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocus("email")}
                    required
                  />
                </div>
                <div className="mb-4 text-sm md:text-lg">
                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute z-50 w-4 h-4 pt-4 pl-4 pointer-events-none"
                  />
                  <input
                    className="py-2 text-center bg-black border-none rounded-lg shadow-lg outline-none lg:px-6 focus:bg-slate-700 text-inherit placeholder-slate-400 backdrop-blur-md"
                    aria-label="repeat password"
                    type="password"
                    name="password"
                    placeholder="repeat password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    onFocus={() => setFocus("password")}
                    required
                  />
                </div>
              </div>
              <div id="infos">
                <p>{infoText[focus]}</p>
              </div>
              <div className="flex justify-center mt-8 text-lg text-black">
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white rounded shadow-xl bg-verdigris backdrop-blur-md"
                >
                  Register
                </button>
                <button
                  className="w-1/3 py-2 ml-2 text-white rounded-lg shadow-xl bg-verdigris backdrop-blur-md hover:bg-red-700"
                  onClick={handleClose}
                  disabled={loading}
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
