import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";

export default function Contacts() {
  const { showAbout } = useContext(NavbarContext);
  const aboutClass = {
    absolute:
      "absolute top-12 left-2 z-10 w-5/6 md:w-1/3 border border-white rounded-lg shadow-sm bg-cream-100 dark:bg-cadet",
    hidden:
      "hidden z-10 top-12 left-2 w-5/6 md:w-1/3 border border-white rounded-lg shadow-sm bg-cream-100 dark:bg-cadet",
  };

  return (
    <div className={showAbout ? aboutClass.absolute : aboutClass.hidden}>
      <div className="py-1">
        <p className="mx-2">
          The Good Reads uses Google Books API to retrieve the result of
          user&apos;s search.
        </p>
        <p className="mx-2">
          Type a book&apos;s name or author to get started, and save the ones
          you prefer to your favorites
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
