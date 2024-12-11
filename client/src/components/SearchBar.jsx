import { useState, useContext } from "react";
import { SelectInputDispatchContext } from "../context/SelectInputContext";
import { extractVolumeInfo } from "../helpers/extractVolumeInfo";
import { fetchData } from "../helpers/fetchData";

export default function SearchBar({ setData, setIsLoading, setShowFavorites }) {
  const [query, setQuery] = useState("");
  const dispatch = useContext(SelectInputDispatchContext);
  let results = [];

  const handleClick = async (e) => {
    e.preventDefault();
    if (query === "") {
      alert("Please provide a title");
      return;
    }
    setData([]);
    setShowFavorites(false);
    setIsLoading(true);
    const response = await fetchData(query);
    if (!response) {
      alert("No results matching the search");
    } else {
      extractVolumeInfo(results, response);
      setData(() => results);
    }
    setQuery("");
    setIsLoading(false);
  };

  return (
    <div className="items-center flex-none my-2 md:flex">
      <form method="get" className="flex flex-col items-center md:flex-row">
        <input
          className="h-10 px-3 rounded-md min-w-[40vw] border-slate-200 shadow-sm shadow-slate-600 border"
          type="search"
          name="q"
          value={query}
          onFocus={() => dispatch({ type: true })}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your next read..."
          required
        />
        <input
          className="block px-4 my-2 text-white rounded-md md:ml-4 bg-zinc-600 w-fit "
          type="submit"
          value="Search"
          onClick={handleClick}
        />
      </form>
    </div>
  );
}
