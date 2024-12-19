import PropTypes from "prop-types";

ShowFavorites.propTypes = {
  setShowFavorites: PropTypes.func,
  showFavorites: PropTypes.bool,
};

export default function ShowFavorites({ setShowFavorites, showFavorites }) {
  const showFavoritesClass = {
    active:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white h-fit bg-zinc-600 press top-[2px] shadow-none bg-zinc-800 mr-2",
    inactive:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white h-fit bg-zinc-600 press mr-2",
  };

  const handleShowFavoritesClick = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <button
      type="button"
      className={
        showFavorites ? showFavoritesClass.active : showFavoritesClass.inactive
      }
      onClick={handleShowFavoritesClick}
    >
      ♡
    </button>
  );
}
