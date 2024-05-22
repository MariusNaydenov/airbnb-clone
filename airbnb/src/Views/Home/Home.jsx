import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useContext(AppContext);
  return <>{isAuthenticated ? <h1>Hello</h1> : <Navigate to="/" />}</>;
};

export default Home;
