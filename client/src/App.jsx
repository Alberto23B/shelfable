import { useState, useEffect } from "react";
import Header from "./presentational/Header";
import Results from "./presentational/Results";
import Favorites from "./presentational/Favorites";
import Homepage from "./presentational/Homepage";
import ShowFavorites from "./components/ShowFavorites";
import Nav from "./presentational/Nav";
import Contacts from "./components/Contancts";
import About from "./components/About";
import ToggleTheme from "./components/ToggleTheme";
import SearchSection from "./presentational/SearchSection";
import Dialog from "./components/Dialog";
import { fetchFavorites } from "./helpers/fetchFavorites";
import { DisplayContextProvider } from "./context/DisplayContext";
import { PageContextProvider } from "./context/PagesContext";
import { NavbarContextProvider } from "./context/NavbarContext";
import { DialogContextProvider } from "./context/DialogContext";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <NavbarContextProvider>
      <DialogContextProvider>
        <DisplayContextProvider>
          <PageContextProvider>
            <div
              className={
                "bg-[#66c3cb] dark:bg-cool dark:text-stone-300 h-screen overflow-auto gutter"
              }
            >
              <div className="flex items-center justify-between m-5">
                <Dialog />
                <Header />
                <SearchSection
                  setData={setData}
                  setIsLoading={setIsLoading}
                  setShowFavorites={setShowFavorites}
                  showFavorites={showFavorites}
                />
                <ShowFavorites
                  setShowFavorites={setShowFavorites}
                  showFavorites={showFavorites}
                />
                <Contacts />
                <About />
                <Nav>
                  <ToggleTheme />
                </Nav>
              </div>
              {/* {showFavorites ? (
                <div className="min-h-fit">
                  <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    isLoading={isLoading}
                  />
                </div>
              ) : (
                <div className="min-h-fit">
                  <Results
                    data={data}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    isLoading={isLoading}
                  />
                </div>
              )} */}
              <Homepage />
            </div>
          </PageContextProvider>
        </DisplayContextProvider>
      </DialogContextProvider>
    </NavbarContextProvider>
  );
}

export default App;
