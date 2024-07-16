import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContext from "./Context/AppContext.js";
import { useEffect, useState } from "react";
import Login from "./Views/Login/Login.jsx";
import SignUp from "./Views/SignUp/SignUp.jsx";
import toast, { Toaster } from "react-hot-toast";
import Home from "./Views/Home/Home.jsx";
import Properties from "./Views/Properties/Properties.jsx";

function App() {
  const [isAuthenticated, setAuthentication] = useState(true);
  const [user, setUser] = useState(null);


  return (
    <AppContext.Provider
      value={{ isAuthenticated, setAuthentication, user, setUser }}
    >
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
