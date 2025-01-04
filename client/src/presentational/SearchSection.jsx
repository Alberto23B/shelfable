import PropTypes from "prop-types";
import SearchBar from "../components/SearchBar";

SearchSection.propTypes = {
  setData: PropTypes.func,
  setIsLoading: PropTypes.func,
  setShowFavorites: PropTypes.func,
  showFavorites: PropTypes.bool,
};

export default function SearchSection({
  setData,
  setIsLoading,
  setShowFavorites,
}) {
  return (
    <div className="flex">
      <SearchBar
        setShowFavorites={setShowFavorites}
        setIsLoading={setIsLoading}
        setData={setData}
      />

      {/* <div className="flex items-center justify-center sm:justify-end lg:w-[80vw] w-full border-slate-200 border rounded-t-xs m-auto bg-pearl dark:bg-black "> */}
      {/* <SwitchList /> */}
      {/* </div> */}
    </div>
  );
}
