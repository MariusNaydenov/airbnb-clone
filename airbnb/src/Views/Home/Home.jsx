import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import Categories from "../../Components/Categories/Categories";

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
          <Categories />
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Home;
