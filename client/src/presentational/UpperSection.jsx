import Header from "./Header";
import Dialog from "../components/Dialog";
import SearchSection from "./SearchSection";
import ShowFavorites from "../components/ShowFavorites";
import ShowUserSettings from "../components/ShowUserSettings";
import PropTypes from "prop-types";

UpperSection.propTypes = {
  setData: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default function UpperSection({ setData, setIsLoading }) {
  return (
    <div
      id="upper"
      className="flex flex-wrap items-center pt-5 justify-evenly md:justify-between md:mx-20 md:flex-nowrap"
    >
      <Dialog />
      <Header />
      <div className="md:hidden">
        <ShowFavorites />
        <ShowUserSettings />
      </div>
      <SearchSection setData={setData} setIsLoading={setIsLoading} />
      <div className="hidden md:block">
        <ShowFavorites />
      </div>
      <div className="hidden md:block">
        <ShowUserSettings />
      </div>
    </div>
  );
}
