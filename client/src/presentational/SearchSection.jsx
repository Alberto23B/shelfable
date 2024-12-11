import SearchBar from "../components/SearchBar";
import ShowFavorites from "../components/ShowFavorites";
import SwitchList from "../components/SwitchList";

export default function SearchSection({
  setData,
  setIsLoading,
  setShowFavorites,
  showFavorites,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center m-auto md:flex-row">
        <SearchBar
          setShowFavorites={setShowFavorites}
          setIsLoading={setIsLoading}
          setData={setData}
        />
      </div>
      <div className="flex items-center justify-end lg:w-[80vw] w-full border-slate-200 border rounded-t-md m-auto bg-pearl dark:bg-black ">
        <ShowFavorites
          setShowFavorites={setShowFavorites}
          showFavorites={showFavorites}
        />
        <SwitchList />
      </div>
    </div>
  );
}
