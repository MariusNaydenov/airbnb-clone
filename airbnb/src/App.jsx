import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppContext from "./Context/AppContext.js";
import { useEffect, useState } from "react";
import Login from "./Views/Login/Login.jsx";
import SignUp from "./Views/SignUp/SignUp.jsx";
import toast, { Toaster } from "react-hot-toast";
import Home from "./Views/Home/Home.jsx";

function App() {
  const [isAuthenticated, setAuthentication] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthentication }}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
