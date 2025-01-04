import PropTypes from "prop-types";
import { useState, useRef, useContext } from "react";
import { extractVolumeInfo } from "../helpers/extractVolumeInfo.jsx";
import { fetchData } from "../helpers/fetchData.jsx";
import { ShowElementsDispatchContext } from "../context/ShowElementsContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

SearchBar.propTypes = {
  setData: PropTypes.func,
  setIsLoading: PropTypes.func,
  setShowFavorites: PropTypes.func,
};

export default function SearchBar({ setData, setIsLoading }) {
  const [query, setQuery] = useState("");
  let results = [];
  const dispatch = useContext(ShowElementsDispatchContext);

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
    dispatch({ type: "showSearch" });
  };

  return (
    <div className="flex w-5/6 my-2">
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
      <form method="get" className="flex items-center md:flex-row">
        <input
          className="px-3 h-16 min-w-[50vw] bg-[#2faeb7] rounded-lg dark:bg-iron border-slate-200 shadow-sm shadow-slate-600 border placeholder:text-white"
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your next read..."
          required
        />
        <button
          className="block h-16 px-4 md:my-2 text-white rounded-md md:ml-4 shadow-sm dark:bg-iron shadow-slate-600 bg-[#2faeb7] w-fit "
          type="submit"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </form>
    </div>
  );
}
