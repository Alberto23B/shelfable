import { createContext, useState, useEffect } from "react";
import { checkAuthStatus } from "../helpers/checkAuthStatus";
import PropTypes from "prop-types";
import Loading from "../presentational/Loading";

export const AuthContext = createContext();

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
