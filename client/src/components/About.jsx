import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";

export default function Contacts() {
  const { showAbout } = useContext(NavbarContext);

  return (
    <div
      className={`${
        showAbout ? "absolute" : "hidden"
      } z-10 w-full md:w-1/3 border border-white rounded-lg shadow-sm bg-cream-100 dark:bg-cadet top-12 left-2`}
    >
      <div className="py-1">
        <p className="mx-2">
          The Good Reads uses Google Books API to retrieve the result of user's
          search.
        </p>
        <p className="mx-2">
          Type a book's name or author to get started, and save the ones you
          prefer to your favorites
        </p>
        <p className="text-xs text-right font-extralight">
          icons from
          <a className="mx-2 underline" href="http://iconfinder.com">
            ICONFINDER
          </a>
        </p>
      </div>
    </div>
  );
}
