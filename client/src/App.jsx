import { useState, useEffect } from "react";
import UpperSection from "./presentational/UpperSection";
import { fetchFavorites } from "./helpers/fetchFavorites";
import { DisplayContextProvider } from "./context/DisplayContext";
import { PageContextProvider } from "./context/PagesContext";
import { NavbarContextProvider } from "./context/NavbarContext";
import { DialogContextProvider } from "./context/DialogContext";
import { ShowElementsContextProvider } from "./context/ShowElementsContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./App.css";
import Main from "./presentational/Main";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import UserSettings from "./components/UserSettings";
import { AuthContextProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/react";

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
    <AuthContextProvider>
      <ThemeContextProvider>
        <NavbarContextProvider>
          <ShowElementsContextProvider>
            <DialogContextProvider>
              <DisplayContextProvider>
                <PageContextProvider>
                  <div
                    className={
                      "bg-gradient-to-br from-[#91d2da] to-[#3cb2bc] dark:bg-gradient-to-br dark:from-black dark:to-black dark:text-stone-300 min-h-screen max-h-full gutter"
                    }
                  >
                    <UpperSection
                      setData={setData}
                      setIsLoading={setIsLoading}
                    />
                    <LoginForm />
                    <RegistrationForm />
                    <UserSettings />
                    <Main
                      data={data}
                      isLoading={isLoading}
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                    <Analytics />
                  </div>
                </PageContextProvider>
              </DisplayContextProvider>
            </DialogContextProvider>
          </ShowElementsContextProvider>
        </NavbarContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
