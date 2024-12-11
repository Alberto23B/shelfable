import { useContext } from "react";
import missingImg from "../img/img_missing.jpg";
import { DisplayContext } from "../context/DisplayContext";

export default function Card({ data, i, favorites, setFavorites }) {
  const isFavorite = favorites.some((fav) => fav.info === data.info);
  const display = useContext(DisplayContext);
  const favoritesStorage = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  const handleClickFavorites = (data) => {
    const nextStorage = [...favoritesStorage, data];
    localStorage.setItem("favorites", JSON.stringify(nextStorage));
    setFavorites((prev) => {
      return [...prev, data];
    });
  };

  const handleRemoveFavorites = (data, i) => {
    const nextStorage = favoritesStorage
      .slice(0, i)
      .concat(favoritesStorage.slice(i + 1));
    console.log(nextStorage);
    localStorage.setItem("favorites", JSON.stringify(nextStorage));
    setFavorites((prev) => prev.filter((fav) => fav.info !== data.info));
  };

  return (
    <div
      key={i}
      className={`flex sm:flex-row mx-1 my-2 bg-cream-100 rounded-lg dark:bg-black
        shadow-md shadow-slate-600 dark:shadow-slate-900
        ${display === "icons" ? "sm:w-80" : "w-11/12"} 
        ${display === "icons" ? "flex-col" : "sm: flex-row"}`}
    >
      <a href={data.info}>
        <img
          className={`h-32 my-auto mr-2 rounded-l-lg max-w-24 aspect-square`}
          src={data.img ? data.img : missingImg}
          alt="book cover"
        ></img>
      </a>
      {display === "icons" && (
        <button
          className="w-full px-2 text-black rounded-md dark:text-white card-button sm:hidden"
          type="button"
          onClick={
            isFavorite
              ? () => handleRemoveFavorites(data, i)
              : () => handleClickFavorites(data)
          }
        >
          {isFavorite ? "X" : "♡"}
        </button>
      )}
      <div
        className={`flex-col justify-between w-full overflow-hidden ${
          display === "icons" ? "sm:flex hidden" : "flex"
        }`}
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
            <button className="px-2 text-black rounded-md dark:shadow-none bg-cream-200 dark:bg-slate-900 dark:text-white w-fit ">
              More
            </button>
          </a>
          <button
            className="px-2 mx-2 text-black rounded-md dark:shadow-none bg-cream-200 dark:bg-slate-900 dark:text-white w-fit"
            type="button"
            onClick={
              isFavorite
                ? () => handleRemoveFavorites(data, i)
                : () => handleClickFavorites(data)
            }
          >
            {isFavorite ? "X" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}
