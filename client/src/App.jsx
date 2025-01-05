import { useState, useEffect } from "react";
import UpperSection from "./presentational/UpperSection";
import { fetchFavorites } from "./helpers/fetchFavorites";
import { DisplayContextProvider } from "./context/DisplayContext";
import { PageContextProvider } from "./context/PagesContext";
import { NavbarContextProvider } from "./context/NavbarContext";
import { DialogContextProvider } from "./context/DialogContext";
import { ShowElementsContextProvider } from "./context/ShowElementsContext";
import "./App.css";
import Main from "./presentational/Main";
import LoginForm from "./presentational/LoginForm";
import RegistrationForm from "./presentational/RegistrationForm";
import UserSettings from "./presentational/UserSettings";

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
                <UpperSection setData={setData} setIsLoading={setIsLoading} />
                <LoginForm />
                <RegistrationForm />
                <UserSettings />
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
