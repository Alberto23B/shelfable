import Header from "./Header";
import Alert from "../components/Alert";
import SearchSection from "./SearchSection";
import ShowFavorites from "../components/ShowFavorites";
import ShowUserSettings from "../components/ShowUserSettings";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

UpperSection.propTypes = {
  setData: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default function UpperSection({ setData, setIsLoading }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div
      id="upper"
      className="flex flex-wrap items-center pt-5 justify-evenly md:justify-between md:mx-20 md:flex-nowrap"
    >
      <Alert />
      <Header />
      <div className="flex flex-row md:hidden">
        <div className={isLoggedIn ? "" : "hidden"}>
          <ShowFavorites />
        </div>
        <ShowUserSettings />
      </div>
      <SearchSection setData={setData} setIsLoading={setIsLoading} />
      <div className={isLoggedIn ? "hidden md:block" : "hidden"}>
        <ShowFavorites />
      </div>
      <div className="hidden md:block">
        <ShowUserSettings />
      </div>
    </div>
  );
}
