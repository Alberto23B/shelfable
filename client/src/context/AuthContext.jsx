import { createContext, useState, useEffect } from "react";
import { checkAuthStatus } from "../helpers/checkAuthStatus";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await checkAuthStatus();
        setIsLoggedIn(data.loggedIn);
        setUsername(data.username || null);
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsLoggedIn(false);
        setUsername(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
