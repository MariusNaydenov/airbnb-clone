import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { PiChatDotsThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState(user.properties);
  const [open, isOpen] = useState({});
  const [favourites, setFavourites] = useState([]);

  const addFavourite = async (item) => {
    const property = item;

    try {
      const response = await fetch("http://localhost:3000/add-favourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        setFavourites((prev) => [...prev, property.imageUrl]);
      } else {
        console.log("not added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFavourite = async (item) => {
    const property = item;

    try {
      const response = await fetch("http://localhost:3000/remove-favourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        setFavourites((prev) =>
          prev.filter((url) => url !== property.imageUrl)
        );
      } else {
        const errorData = await response.json();
        console.log("Failed to remove favourite", errorData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProperty = async (id, imageUrl) => {
    try {
      const response = await fetch("http://localhost:3000/remove-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, imageUrl }),
      });

      if (response.ok) {
        setProperties((prev) => prev.filter((property) => property._id !== id));
        const newArrOfProps = user.properties.filter(
          (property) => property._id !== id
        );
        setUser({ ...user, properties: newArrOfProps });
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
        `http://localhost:3000/properties/owner?email=${user.email}`
      );
      const data = await response.json();
      if (response.ok) {
        setProperties(data.properties);
        setUserProperties(data.properties);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LuPalmtree style={{ color: "#f43f5e" }} size={30} />
          <span
            style={{
              color: "#f43f5e",
              fontFamily: "Nunito, sans-serif",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            vacation estates
          </span>
        </Box>
        <Search />
        <UserMenu />
      </Box>
      {properties?.length === 0 ? (
        <div className="flex items-center justify-center h-3/4 flex-col gap-2">
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: "Nunito,sans-serif" }}
          >
            No properties found
          </h3>
          <p style={{ fontFamily: "Nunito,sans-serif", color: "#737373" }}>
            Looks like you have no properties.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div
            className="flex flex-col gap-3"
            style={{ padding: "25px 180px" }}
          >
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: "Nunito,sans-serif" }}
            >
              Properties
            </h3>
            <p style={{ fontFamily: "Nunito,sans-serif", color: "#737373" }}>
              List of your properties
            </p>
          </div>
          <div
            className="grid grid-cols-5 gap-y-10 gap-5"
            style={{ padding: "25px 180px" }}
          >
            {properties.map((property) => {
              return (
                <div
                  className="flex flex-col h-full gap-1 relative cursor-pointer"
                  key={property._id}
                  // onClick={() => navigate(`/properties/${property._id}`)}
                >
                  {favourites.includes(property.imageUrl) ? (
                    <FaHeart
                      size={25}
                      color="red"
                      className="absolute top-2 right-10 cursor-pointer"
                      onClick={() => removeFavourite(property)}
                    />
                  ) : (
                    <CiHeart
                      size={25}
                      color="white"
                      className="absolute top-2 right-10 cursor-pointer"
                      onClick={() => addFavourite(property)}
                    />
                  )}
                  <PiChatDotsThin
                    size={25}
                    className="absolute top-2 left-3 cursor-pointer"
                    color="white"
                    onClick={() => toggle(property._id)}
                  />
                  {open[property._id] && (
                    <div
                      className="bg-white absolute top-9 left-3 rounded-lg px-4 cursor-pointer"
                      style={{ fontFamily: "Nunito,sans-serif" }}
                      onClick={() =>
                        deleteProperty(property._id, property.imageUrl)
                      }
                    >
                      Delete Property
                    </div>
                  )}
                  <img
                    src={property.imageUrl}
                    alt=""
                    width="190px"
                    style={{ borderRadius: "15px" }}
                  />
                  <span
                    style={{
                      fontFamily: "Nunito,sans-serif",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {property.country}
                  </span>
                  <span
                    style={{
                      fontFamily: "Nunito,sans-serif",
                      color: "#737373",
                      fontSize: "14px",
                    }}
                  >
                    {property.category}
                  </span>
                  <div className="flex gap-1" style={{ fontSize: "15px" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Nunito,sans-serif",
                      }}
                    >
                      ${property.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito,sans-serif",
                        color: "#737373",
                      }}
                    >
                      night
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Box>
  );
};

export default Properties;
