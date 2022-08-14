import { createContext, useContext, useEffect, useState } from "react";
import { apiCall } from "../services/api";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = (props) => {
  const existingTokens = localStorage.getItem("tokens");
  const existingIsAdmin = localStorage.getItem("isAdmin");

  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isAdmin, setAuthIsAdmin] = useState(Number.parseInt(existingIsAdmin, 10));

  useEffect(() => {
    apiCall.defaults.headers.common["Authorization"] = `Bearer ${authTokens}`;
  }, [authTokens]);
  const setTokens = (token) => {
    localStorage.setItem("tokens", token);
    setAuthTokens(token);
  };

  const setIsAdmin = (isAdmin) => {
    localStorage.setItem("isAdmin", isAdmin);
    setAuthIsAdmin(isAdmin);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setTokens, isAdmin, setIsAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
};