import { createContext } from "react";

const AppContext = createContext({
  isAuthenticated: false,
  setAuthentication() {},
});

export default AppContext;
