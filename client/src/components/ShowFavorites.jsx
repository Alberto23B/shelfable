export default function ShowFavorites({ setShowFavorites, showFavorites }) {
  const showFavoritesClass = {
    active:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white mx-2 h-fit bg-zinc-600 press top-[2px] shadow-none bg-zinc-800",
    inactive:
      "w-24 hover:bg-cadet dark:hover:bg-iron text-white mx-2 h-fit bg-zinc-600 press",
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
