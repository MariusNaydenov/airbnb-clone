import PropertiesBox from "../../Components/PropertiesBox/PropertiesBox";
import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Heading from "../../Components/Heading/Heading";
import Logo from "../../Components/Logo/Logo";

const Favourites = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState(user.properties);
  const [favourites, setFavourites] = useState([]);

  const removeFavourite = async (item) => {
    const property = item;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/remove-favourite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(property),
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

  const getProperties = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/owner?email=${user.email}`
      );
      const data = await response.json();
      if (response.ok) {
        setProperties(data.favourites);
        setFavourites(data.favourites.map((fav) => fav.imageUrl));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getProperties();
    }
  }, [user]);

  return (
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
      {properties?.length === 0 ? (
        <div className="flex items-center justify-center h-3/4 flex-col gap-2">
          <Heading
            title={"No Favourites found"}
            subtitle={"Looks like you have no favourite listings."}
            center={true}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <div style={{ padding: "25px 180px" }}>
            <Heading
              title={"Favourites"}
              subtitle={"List of your favourite places!"}
            />
          </div>

          <PropertiesBox
            properties={properties}
            favourites={favourites}
            removeFavourite={removeFavourite}
            deleteIcon={false}
            deleteLine={false}
          />
        </div>
      )}
    </Box>
  );
};

export default Favourites;
