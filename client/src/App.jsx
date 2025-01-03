import { useState, useEffect } from "react";
import Header from "./presentational/Header";
import ShowFavorites from "./components/ShowFavorites";
import ToggleTheme from "./components/ToggleTheme";
import SearchSection from "./presentational/SearchSection";
import Dialog from "./components/Dialog";
import { fetchFavorites } from "./helpers/fetchFavorites";
import { DisplayContextProvider } from "./context/DisplayContext";
import { PageContextProvider } from "./context/PagesContext";
import { NavbarContextProvider } from "./context/NavbarContext";
import { DialogContextProvider } from "./context/DialogContext";
import { ShowElementsContextProvider } from "./context/ShowElementsContext";
import "./App.css";
import Main from "./presentational/Main";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  return (
    <NavbarContextProvider>
      <ShowElementsContextProvider>
        <DialogContextProvider>
          <DisplayContextProvider>
            <PageContextProvider>
              <div
                className={
                  "bg-gradient-to-br from-[#91d2da] to-[#3cb2bc] dark:bg-gradient-to-br dark:from-black dark:to-black dark:text-stone-300 h-screen overflow-auto gutter"
                }
              >
                <div className="flex items-center justify-between m-5">
                  <Dialog />
                  <Header />
                  <SearchSection
                    setData={setData}
                    setIsLoading={setIsLoading}
                  />
                  <ShowFavorites />
                  <ToggleTheme />
                </div>
                <Main
                  data={data}
                  isLoading={isLoading}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </div>
            </PageContextProvider>
          </DisplayContextProvider>
        </DialogContextProvider>
      </ShowElementsContextProvider>
    </NavbarContextProvider>
  );
}

export default App;
