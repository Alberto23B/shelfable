import { useContext } from "react";
import PropTypes from "prop-types";
import Favorites from "./Favorites";
import Homepage from "./Homepage";
import Results from "./Results";
import { ShowElementsContext } from "../context/ShowElementsContext";

Main.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
};

export default function Main({ data, isLoading, favorites, setFavorites }) {
  const showElements = useContext(ShowElementsContext);

  return (
    <div>
      {showElements.showHomepage && (
        <div className="min-h-fit">
          <Homepage />
        </div>
      )}
      {showElements.showFavorites && (
        <div className="min-h-fit">
          <Favorites
            favorites={favorites}
            setFavorites={setFavorites}
            isLoading={isLoading}
          />
        </div>
      )}
      {showElements.showSearch && (
        <div className="min-h-fit">
          <Results
            data={data}
            favorites={favorites}
            setFavorites={setFavorites}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
