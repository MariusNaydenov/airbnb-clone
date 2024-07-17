import { createContext } from "react";

const AppContext = createContext({
  isAuthenticated: false,
  setAuthentication() {},
  user:null,
  setUser(){},
  userProperties:[],
  setUserProperties(){},
});

export default AppContext;
