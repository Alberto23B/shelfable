import PropTypes from "prop-types";
import SearchBar from "../components/SearchBar";
import ShowFavorites from "../components/ShowFavorites";
import SwitchList from "../components/SwitchList";

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
  showFavorites,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center m-auto md:flex-row">
        <SearchBar
          setShowFavorites={setShowFavorites}
          setIsLoading={setIsLoading}
          setData={setData}
        />
      </div>
      <div className="flex items-center justify-center sm:justify-end lg:w-[80vw] w-full border-slate-200 border rounded-t-xs m-auto bg-pearl dark:bg-black ">
        <ShowFavorites
          setShowFavorites={setShowFavorites}
          showFavorites={showFavorites}
        />
        <SwitchList />
      </div>
    </div>
  );
}
