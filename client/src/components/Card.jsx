import PropTypes from "prop-types";
import { useContext } from "react";
import no_picture_available from "../img/no_picture_available.png";
import { DisplayContext } from "../context/DisplayContext";
import { AuthContext } from "../context/AuthContext";
import AddOrDeleteFavorite from "./AddOrDeleteFavorite";

Card.propTypes = {
  data: PropTypes.object,
  i: PropTypes.number,
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
};

export default function Card({ data, i, favorites, setFavorites }) {
  const isFavorite = favorites.some((fav) => fav.info === data.info);
  const display = useContext(DisplayContext);
  const { isLoggedIn } = useContext(AuthContext);

  const cardAspectClass = {
    icons:
      "flex flex-col sm:flex-row basis-36 sm:basis-80 shrink sm:shrink-0 sm:mx-1 my-2 sm:w-80 bg-robin rounded-lg shadow-md shadow-slate-600 dark:bg-black dark:shadow-slate-900",
    list: "flex sm:flex-row w-11/12 mx-1 my-2 rounded-lg shadow-md shadow-slate-600  bg-robin dark:bg-black dark:shadow-slate-900",
  };

  const textAspectClass = {
    icons:
      "hidden sm:flex flex-col ml-1 justify-between w-full overflow-hidden",
    list: "flex ml-1 w-full",
  };

  const containerAspectClass = {
    icons: "flex flex-col py-2 justify-between w-full",
    list: "flex w-full",
  };

  const buttonsAspectClass = {
    icons: "flex self-center",
    list: "flex flex-col justify-evenly",
  };

  const imageAspectClass = {
    icons:
      "h-64 py-2 px-2 sm:h-32 my-auto mr-2 rounded-l-lg sm:w-24 sm:aspect-square",
    list: "object-cover h-32 my-auto mr-2 rounded-l-lg sm:max-w-24 aspect-square",
  };

  const moreAspectClass = {
    icons:
      "hidden w-16 h-8 px-2 mr-2 sm:inline-block rounded-lg bg-verdigris text-black hover:bg-slate-700 dark:bg-slate-900 dark:text-white dark:shadow-none",
    list: "w-16 h-2/5 px-2 mx-2 rounded-lg bg-verdigris text-black hover:bg-slate-700 dark:bg-slate-900 dark:text-white dark:shadow-none",
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
          className={
            display === "icons" ? imageAspectClass.icons : imageAspectClass.list
          }
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
            <a
              href={data.info}
              rel="noopener noreferrer"
              target="_blank"
              className="text-white"
            >
              <i>info</i>
            </a>
          </button>
          <div className={isLoggedIn ? "" : "hidden"}>
            <AddOrDeleteFavorite
              data={data}
              setFavorites={setFavorites}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
