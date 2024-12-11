export default function ShowFavorites({ setShowFavorites, showFavorites }) {
  const handleShowFavoritesClick = (e) => {
    setShowFavorites(!showFavorites);
  };

  return (
    <button
      type="button"
      className={`w-24 hover:bg-cadet dark:hover:bg-iron text-white mx-2 rounded-md h-fit bg-zinc-600 press ${
        showFavorites ? "top-[2px] shadow-none bg-zinc-800" : ""
      }`}
      onClick={handleShowFavoritesClick}
    >
      ♡
    </button>
  );
}
