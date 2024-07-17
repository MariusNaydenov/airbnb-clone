import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import Categories from "../../Components/Categories/Categories";
import Logo from "../../Components/Logo/Logo";

const Home = () => {
  const { isAuthenticated, user } = useContext(AppContext);
  // console.log(user);

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
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Home;
