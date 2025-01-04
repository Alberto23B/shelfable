import library from "../img/library.png";
import Quote from "../components/Quote";
import LoginButton from "../components/LoginButton";
import RegistrationButton from "../components/RegistrationButton";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center mx-5 md:flex-row">
      <img src={library}></img>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl text-white">
          Book search engine built upon Google Books API
        </h2>
        <Quote />
        <div className="flex w-full">
          <LoginButton />
          <RegistrationButton />
        </div>
      </div>
    </div>
  );
}
