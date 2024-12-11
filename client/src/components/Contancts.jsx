import { useContext } from "react";
import mail from "../img/mail_icon.svg";
import linkedin from "../img/linkedin_icon.svg";
import { NavbarContext } from "../context/NavbarContext";

export default function Contacts() {
  const { showContacts } = useContext(NavbarContext);

  return (
    <div
      className={`${
        showContacts ? "absolute" : "hidden"
      } z-10 w-full md:w-1/4 border border-white rounded-lg shadow-sm bg-cream-100 dark:bg-cadet top-12 left-2`}
    >
      <div className="py-1">
        <img src={mail} className="inline-block w-5 mx-2" alt="send mail"></img>
        <a href="mailto:biolchi.alberto23@gmail.com">
          biolchi.alberto23@gmail.com
        </a>
      </div>
      <div className="py-1">
        <img
          src={linkedin}
          className="inline-block w-6 mx-2"
          alt="send mail"
        ></img>
        <a href="mailto:biolchi.alberto23@gmail.com">LinkedIn</a>
      </div>
    </div>
  );
}
