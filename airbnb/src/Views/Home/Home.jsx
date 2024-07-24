import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import Categories from "../../Components/Categories/Categories";
import Logo from "../../Components/Logo/Logo";
import PropertiesBox from "../../Components/PropertiesBox/PropertiesBox";
import Heading from "../../Components/Heading/Heading";
import BackButton from "../../Components/BackButton/BackButton";

const Home = () => {
  const { isAuthenticated, user, setUser } = useContext(AppContext);
  const [properties, setProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesObject, setCategoriesObject] = useState({});

  const removeFilterCategory = () => {
    setSelectedCategory("");
    localStorage.setItem("category", "");
  };

  const handleCategories = (label) => {
    setSelectedCategory(label);

    setCategoriesObject((prevCategoriesObject) => {
      const newCategoriesObject = { ...prevCategoriesObject, [label]: label };

      localStorage.setItem("categories", JSON.stringify(newCategoriesObject));
      localStorage.setItem("category", JSON.stringify(label));

      return newCategoriesObject;
    });
  };

  const fetchAllProperties = async (category) => {
    if (!category) {
      try {
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
      } catch (err) {
        throw new Error(err.message);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/all-properties`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (response.ok) {
          const filteredPropertiesByCategory = data.filter(
            (prop) => prop.category === category
          );
          setProperties(filteredPropertiesByCategory);
        } else {
          console.log("error during fetching");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllProperties(selectedCategory);
      setFavourites(user.favourites.map((fav) => fav.imageUrl));
    }

    const storedCategory = localStorage.getItem("category");
    const storedCategories = localStorage.getItem("categories");

    setSelectedCategory(storedCategory ? JSON.parse(storedCategory) : "");
    setCategoriesObject(storedCategories ? JSON.parse(storedCategories) : {});
  }, [user, selectedCategory]);

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
          <Categories
            selectedCategory={selectedCategory}
            handleCategories={handleCategories}
            categoriesObject={categoriesObject}
          />
          <div style={{ padding: "25px 90px" }}>
            {selectedCategory && properties.length === 0 ? (
              <div className="flex flex-col gap-3 h-[60vh] justify-center items-center">
                <Heading
                  center={true}
                  title="No exact matches"
                  subtitle="Try changing or removing some of your filters"
                />
                <BackButton
                  text="Remove all filters"
                  func={removeFilterCategory}
                />
              </div>
            ) : (
              <PropertiesBox
                properties={properties}
                favourites={favourites}
                removeFavourite={removeFavourite}
                addFavourite={addFavourite}
              />
            )}
          </div>
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Home;
