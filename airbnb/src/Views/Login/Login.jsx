import "./Login.css";
import Input from "../../Components/Input/Input";
import { LuPalmtree } from "react-icons/lu";
import { Box } from "@mui/material";
import StyledButton from "../../Components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: emailValue, password: password }),
      });
      if (response.ok) {
        console.log("user found");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box className="login-main">
        <Box className="login-title-box">
          <LuPalmtree style={{ color: "#f43f5e" }} size={30} />
          <span
            style={{
              color: "#f43f5e",
              fontFamily: "Nunito, sans-serif",
              fontSize: "2.7rem",
            }}
          >
            vacationhub
          </span>
        </Box>

        <Box sx={{ boxShadow: 4 }} className="login-form">
          <span className="login-text">Login</span>
          <hr style={{ width: "100%" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "8%",
              gap: "4%",
              height: "15%",
              marginTop: "2%",
            }}
          >
            <span className="login-welcome">Welcome</span>
            <span className="login-log"> Login to your account!</span>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "60%",
              gap: "6%",
            }}
          >
            <Input
              label="Email"
              width="85%"
              value={emailValue}
              setValue={setEmailValue}
              className="input-text"
            />
            <Input
              label="Password"
              width="85%"
              value={password}
              setValue={setPasswordValue}
            />
            <StyledButton
              color="#f43f5e"
              text="Continue"
              width="85%"
              func={handleClick}
            />
            {/* <span className="login-password-text">Forgot your password?</span>
            <span className="login-password-text">Create an account</span> */}
            <Box
              sx={{
                display: "flex",
                fontFamily: "Nunito,sans-serif",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#737373",
                  marginRight: "5px",
                }}
              >
                First time using vacationhub?
              </span>
              <span
                className="create-account-text"
                style={{ color: "#000000", fontSize: "0.9rem" }}
              >
                Create an account
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
