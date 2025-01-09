import library from "../img/library.png";
import Quote from "../components/Quote";
import LoginButton from "../components/LoginButton";
import RegistrationButton from "../components/RegistrationButton";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Homepage() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center mx-5 md:flex-row">
      <img src={library}></img>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl text-white">
          Book search engine built upon Google Books API
        </h2>
        <Quote />
        <div className={isLoggedIn ? "hidden" : "flex w-full"}>
          <LoginButton />
          <RegistrationButton />
        </div>
        <div className={isLoggedIn ? "flex flex-col items-center" : "hidden"}>
          <h2 className="text-4xl text-white">Welcome back, {username}</h2>
        </div>
        <div></div>
      </div>
    </div>
  );
}
