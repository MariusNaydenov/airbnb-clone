import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import PropertiesBox from "../../Components/PropertiesBox/PropertiesBox";
import Heading from "../../Components/Heading/Heading";
import Logo from "../../Components/Logo/Logo";

const Properties = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [open, isOpen] = useState({});
  const [favourites, setFavourites] = useState([]);

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

  const deleteProperty = async (id, imageUrl, property) => {
    try {
      if (favourites.includes(property.imageUrl)) {
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
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/remove-property`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, imageUrl }),
        }
      );

      if (response.ok) {
        setProperties((prev) => prev.filter((property) => property._id !== id));
        const newProperties = user.properties.filter(
          (property) => property.imageUrl !== imageUrl
        );
        setUser({ ...user, properties: newProperties });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggle = (id) => {
    isOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getProperties = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/properties/owner?email=${user.email}`
      );
      const data = await response.json();
      if (response.ok) {
        setProperties(data.properties);
        setFavourites(data.favourites.map((fav) => fav.imageUrl));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getProperties();
      setProperties(user.properties);
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
            title={"No properties found"}
            subtitle={"Looks like you have no properties."}
            center={true}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <div style={{ padding: "25px 180px" }}>
            <Heading
              title={"Properties"}
              subtitle={"List of your properties"}
            />
          </div>

          <PropertiesBox
            properties={properties}
            favourites={favourites}
            removeFavourite={removeFavourite}
            addFavourite={addFavourite}
            toggle={toggle}
            open={open}
            isOpen={isOpen}
            deleteProperty={deleteProperty}
            deleteIcon={true}
            deleteLine={true}
          />
        </div>
      )}
    </Box>
  );
};

export default Properties;
