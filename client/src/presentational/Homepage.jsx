import library from "../img/library.webp";
import Quote from "../components/Quote";
import ShowLogin from "../components/ShowLogin";
import ShowRegistration from "../components/ShowRegistration";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Homepage() {
  const { isLoggedIn, username } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center mx-5 lg:flex-row touch-auto">
      <img
        src={library}
        className="aspect-square"
        alt="an illustration of a library"
      ></img>
      <div className="flex flex-col items-center w-4/5 h-3/4">
        <h2 className="hidden text-4xl text-center text-white md:text-start md:block">
          A library in your pocket, built upon Google Books API
        </h2>
        <h2 className="text-4xl text-center text-white md:text-start md:hidden">
          A library in your pocket
        </h2>
        <div className="z-0 flex justify-center">
          <Quote />
        </div>
        <div className={isLoggedIn ? "hidden" : "flex w-full"}>
          <ShowLogin />
          <ShowRegistration />
        </div>
        <div className={isLoggedIn ? "flex flex-col items-center" : "hidden"}>
          <h2 className="text-4xl text-center text-white">
            Welcome back, {username}
          </h2>
        </div>
        <div></div>
      </div>
    </div>
  );
}
