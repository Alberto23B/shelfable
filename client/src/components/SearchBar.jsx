import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { extractVolumeInfo } from "../helpers/extractVolumeInfo.jsx";
import { fetchData } from "../helpers/fetchData.jsx";

SearchBar.propTypes = {
  setData: PropTypes.func,
  setIsLoading: PropTypes.func,
  setShowFavorites: PropTypes.func,
};

export default function SearchBar({ setData, setIsLoading, setShowFavorites }) {
  const [query, setQuery] = useState("");
  let results = [];

  const alertRef = useRef(null);

  const toggleAlert = () => {
    if (!alertRef.current) {
      return;
    }
    alertRef.current.hasAttribute("open")
      ? alertRef.current.close()
      : alertRef.current.showModal();
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (query === "") {
      toggleAlert();
      return;
    }
    setData([]);
    setShowFavorites(false);
    setIsLoading(true);
    const response = await fetchData(query);
    if (!response) {
      toggleAlert();
    } else {
      extractVolumeInfo(results, response);
      setData(() => results);
      setQuery("");
    }
    setIsLoading(false);
  };

  return (
    <div className="items-center flex-none my-2 md:flex">
      <dialog ref={alertRef}>
        <div className="px-16 text-center border-2 border-white rounded-md bg-[#2faeb7] py-14 dark:bg-cadet">
          <h1 className="mb-4 text-xl font-bold text-white dark:text-white">
            {query === ""
              ? "Please provide a title"
              : `No results found matching the string ${query}`}
          </h1>
          <button
            className="py-2 ml-2 font-semibold bg-white rounded-md dark:bg-slate-500 px-7 text-md"
            onClick={() => {
              toggleAlert();
              setQuery("");
            }}
          >
            Ok
          </button>
        </div>
      </dialog>
      <form method="get" className="flex flex-col items-center md:flex-row">
        <input
          className="px-3 h-16 min-w-[50vw] bg-[#2faeb7] rounded-lg border-slate-200 shadow-sm shadow-slate-600 border placeholder:text-white"
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your next read..."
          required
        />
        <input
          className="block h-16 px-4 my-2 text-white rounded-md md:ml-4 bg-[#2faeb7] w-fit "
          type="submit"
          value="Search"
          onClick={handleClick}
        />
      </form>
    </div>
  );
}
