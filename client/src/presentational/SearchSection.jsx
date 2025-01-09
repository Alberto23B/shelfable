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
    <div className="flex w-full md:w-auto">
      <SearchBar
        setShowFavorites={setShowFavorites}
        setIsLoading={setIsLoading}
        setData={setData}
      />
    </div>
  );
}
