import PropTypes from "prop-types";
import { useContext } from "react";
import Card from "../components/Card";
import Loading from "./Loading";
import { PageContext } from "../context/PagesContext";
import ChangePageButton from "../components/ChangePageButton";
import ClearAll from "../components/ClearAll";
import SwitchList from "../components/SwitchList";

Favorites.propTypes = {
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default function Favorites({ favorites, setFavorites, isLoading }) {
  const { elementsInPage } = useContext(PageContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-16 md:min-h-[50vh] flex  gap-1 rounded-lg flex-row flex-wrap items-center justify-center lg:w-[80vw] min-h-[40vh] bg-white display-results dark:bg-cadet">
        <SwitchList />
        <h3 className="w-full my-2 text-2xl font-light text-center ">
          Favorites
        </h3>
        <div className="hidden w-full mb-2 sm:block">
          <ChangePageButton data={favorites} />
        </div>
        {favorites.length !== 0 ? (
          elementsInPage.map((data, i) => {
            return (
              <Card
                key={i}
                data={data}
                i={i}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          })
        ) : (
          <div>
            <p className="italic font-thin">
              You don&apos;t have favorites yet!
            </p>
          </div>
        )}
        <div className="w-full mt-2">
          <ChangePageButton data={favorites} />
        </div>
        <div className="w-full text-center">
          {favorites.length !== 0 && <ClearAll setFavorites={setFavorites} />}
        </div>
      </div>
    </>
  );
}
