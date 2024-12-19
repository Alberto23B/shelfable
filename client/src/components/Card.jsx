import { useContext } from "react";
import no_picture_available from "../img/no_picture_available.png";
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

  const textAspectClass = {
    icons: "flex-col justify-between w-full overflow-hidden sm:flex hidden",
    list: "flex w-full",
  };

  const containerAspectClass = {
    icons: "flex flex-col justify-between w-full",
    list: "flex w-full",
  };

  const buttonsAspectClass = {
    icons: "self-center",
    list: "flex flex-col justify-evenly",
  };

  const moreAspectClass = {
    icons:
      "hidden px-2 w-16 mr-2 text-black h-8 dark:shadow-none sm:inline-block bg-cream-200 dark:bg-slate-900 dark:text-white",
    list: "px-2 mx-2 text-black w-16 dark:shadow-none h-2/5 bg-cream-200 dark:bg-slate-900 dark:text-white ",
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
          className="object-cover h-32 my-auto mr-2 rounded-l-lg max-w-24 aspect-square"
          src={data.img ? data.img : no_picture_available}
          alt="book cover"
        ></img>
      </a>
      <div
        id="container"
        className={
          display === "icons"
            ? containerAspectClass.icons
            : containerAspectClass.list
        }
      >
        <div
          id="text"
          className={
            display === "icons" ? textAspectClass.icons : textAspectClass.list
          }
        >
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
        <div
          id="buttons"
          className={
            display === "icons"
              ? buttonsAspectClass.icons
              : buttonsAspectClass.list
          }
        >
          <button
            type="button"
            className={
              display === "icons" ? moreAspectClass.icons : moreAspectClass.list
            }
          >
            <a href={data.info} rel="noopener noreferrer" target="_blank">
              <i>info</i>
            </a>
          </button>
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
