import { Box } from "@mui/material";
import { LuPalmtree } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        cursor:'pointer'
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
        onClick={() => navigate("/home")}
      >
        vacation estates
      </span>
    </Box>
  );
};

export default Logo;
