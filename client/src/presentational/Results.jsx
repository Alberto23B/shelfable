import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import ChangePageButton from "../components/ChangePageButton";
import search from "../img/search.png";
import Loading from "./Loading";
import { PageContext } from "../context/PagesContext";
import { SelectInputContext } from "../context/SelectInputContext";

export default function Results({ data, isLoading, favorites, setFavorites }) {
  const { elementsInPage } = useContext(PageContext);
  const isInputSelected = useContext(SelectInputContext);
  const [hasAnimationRun, setHasAnimationRun] = useState(false);

  useEffect(() => {
    if (isInputSelected === true) {
      setHasAnimationRun(true);
    }
  }, [hasAnimationRun]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`${
          isInputSelected ? "md:min-h-72" : "md:min-h-56"
        } flex border border-slate-200 flex-row py-4 flex-wrap items-center justify-center lg:w-[80vw] rounded-b-md overflow-auto min-h-56 max-h-96 md:max-h-full display-results dark:bg-cadet`}
      >
        <ChangePageButton data={data} />
        {data.length !== 0 ? (
          elementsInPage.map((element, i) => {
            return (
              <Card
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
        <ChangePageButton data={data} />
      </div>
    </>
  );
}
