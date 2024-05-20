import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppContext from "./Context/AppContext.js";
import { useState } from "react";
import Login from "./Views/Login/Login.jsx";
import SignUp from "./Views/SignUp/SignUp.jsx";


function App() {
  const [isAuthenticated, setAuthentication] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthentication }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
