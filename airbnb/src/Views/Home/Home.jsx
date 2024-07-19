import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import Categories from "../../Components/Categories/Categories";
import Logo from "../../Components/Logo/Logo";
import PropertiesBox from "../../Components/PropertiesBox/PropertiesBox";

const Home = () => {
  const { isAuthenticated, user, setUser } = useContext(AppContext);
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const fetchAllProperties = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/all-properties`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    if (response.ok) {
      setProperties(data);
    } else {
      console.log("error during fetching");
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllProperties();
      setFavourites(user.favourites.map((fav) => fav.imageUrl));
    }
  }, [user]);

  const removeFavourite = async (item, id) => {
    const property = item;
    const userId = id;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/remove-favourite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ property, userId }),
        }
      );

      if (response.ok) {
        setFavourites((prev) =>
          prev.filter((url) => url !== property.imageUrl)
        );
        const newArrayOfFavProperties = user.favourites.filter(
          (fav) => fav.imageUrl !== property.imageUrl
        );
        setUser({ ...user, favourites: newArrayOfFavProperties });
      } else {
        const errorData = await response.json();
        console.log("Failed to remove favourite", errorData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addFavourite = async (item, id) => {
    const property = item;
    const userId = id;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/add-favourite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ property, userId }),
        }
      );

      if (response.ok) {
        setFavourites((prev) => [...prev, property.imageUrl]);
        const newPropertyToFavourites = [...user.favourites, property];
        setUser({ ...user, favourites: newPropertyToFavourites });
      } else {
        console.log("not added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "white",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "15px 0px",
              width: "100%",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <Logo />
            <Search />
            <UserMenu />
          </Box>
          <Categories />
          
          <PropertiesBox
            properties={properties}
            favourites={favourites}
            removeFavourite={removeFavourite}
            addFavourite={addFavourite}
          />
          
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Home;
