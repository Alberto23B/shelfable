import PropTypes from "prop-types";
import { useContext } from "react";
import Card from "../components/Card";
import ChangePageButton from "../components/ChangePageButton";
import search from "../img/search.png";
import Loading from "./Loading";
import { PageContext } from "../context/PagesContext";
import SwitchList from "../components/SwitchList";

Results.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
};

export default function Results({ data, isLoading, favorites, setFavorites }) {
  const { elementsInPage } = useContext(PageContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-16 md:min-h-[50vh] flex gap-1 flex-row py-4 flex-wrap items-center justify-center bg-cream-100 lg:w-[80vw] rounded-lg overflow-auto min-h-[40vh] h-[75vh] md:max-h-full display-results dark:bg-cadet">
        {data.length !== 0 && <SwitchList />}
        <div className="hidden w-full mb-2 sm:block">
          <ChangePageButton data={data} />
        </div>
        {data.length !== 0 ? (
          elementsInPage.map((element, i) => {
            return (
              <Card
                key={i}
                data={element}
                i={i}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          })
        ) : (
          <div>
            <img
              className="h-20 mt-2"
              src={search}
              alt="no content to display"
            ></img>
            <p className="italic font-thin">Waiting to dive in</p>
          </div>
        )}
        <div className="w-full mt-2">
          <ChangePageButton data={data} />
        </div>
      </div>
    </>
  );
}
