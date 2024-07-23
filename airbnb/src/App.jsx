import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContext from "./Context/AppContext.js";
import { useEffect, useState } from "react";
import Login from "./Views/Login/Login.jsx";
import SignUp from "./Views/SignUp/SignUp.jsx";
import toast, { Toaster } from "react-hot-toast";
import Home from "./Views/Home/Home.jsx";
import Properties from "./Views/Properties/Properties.jsx";
import PropertyView from "./Views/PropertyView/PropertyView.jsx";
import Favourites from "./Views/Favourites/Favourites.jsx";
import Trips from "./Views/Trips/Trips.jsx";

function App() {
  const [isAuthenticated, setAuthentication] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const savedUser = localStorage.getItem("user");
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        user,
        setUser,
      }}
    >
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyView />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/reservations" element={<Trips />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
