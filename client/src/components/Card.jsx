import { useContext } from "react";
import missingImg from "../img/img_missing.jpg";
import { DisplayContext } from "../context/DisplayContext";
import AddOrDeleteFavorite from "./AddOrDeleteFavorite";

export default function Card({ data, i, favorites, setFavorites }) {
  const isFavorite = favorites.some((fav) => fav.info === data.info);
  const display = useContext(DisplayContext);

  const cardAspectClass = {
    icons:
      "flex sm:flex-row mx-1 my-2 bg-cream-100 rounded-lg dark:bg-black shadow-md shadow-slate-600 dark:shadow-slate-900 sm:w-80 flex-col",
    list: "flex sm:flex-row mx-1 my-2 bg-cream-100 rounded-lg dark:bg-black shadow-md shadow-slate-600 dark:shadow-slate-900 w-11/12 sm:flex-row",
  };

  const buttonAspectClass = {
    icons: "flex-col justify-between w-full overflow-hidden sm:flex hidden",
    list: "flex",
  };

  return (
    <div
      key={i}
      className={
        display === "icons" ? cardAspectClass.icons : cardAspectClass.list
      }
    >
      <a href={data.info}>
        <img
          className={`h-32 my-auto mr-2 rounded-l-lg max-w-24 aspect-square`}
          src={data.img ? data.img : missingImg}
          alt="book cover"
        ></img>
      </a>
      <div
        className={
          display === "icons" ? buttonAspectClass.icons : buttonAspectClass.list
        }
      >
        <div>
          <a href={data.info}>
            <h3 className="font-semibold line-clamp-2">{data.title}</h3>
            {data.author[0] && (
              <p className="text-sm line-clamp-1">{data.author[0]}</p>
            )}
            {display === "list" && (
              <p className="text-xs font-light line-clamp-2">
                {data.description}
              </p>
            )}
          </a>
        </div>
        <div className="flex justify-center">
          <a href={data.info} rel="noopener noreferrer" target="_blank">
            <button className="px-2 mr-2 text-black rounded-md dark:shadow-none bg-cream-200 dark:bg-slate-900 dark:text-white w-fit ">
              More
            </button>
          </a>
          <AddOrDeleteFavorite
            data={data}
            setFavorites={setFavorites}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </div>
  );
}
