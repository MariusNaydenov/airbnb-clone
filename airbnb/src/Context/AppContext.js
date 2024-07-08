import { createContext } from "react";

const AppContext = createContext({
  isAuthenticated: false,
  setAuthentication() {},
  user:null,
  setUser(){},
});

export default AppContext;
