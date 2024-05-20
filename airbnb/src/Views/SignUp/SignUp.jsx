import "./SignUp.css";
import Input from "../../Components/Input/Input";
import { Box } from "@mui/material";
import StyledButton from "../../Components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [username, setUsernameValue] = useState("");

  const createUser = async () => {
    const user = { username: username, email: emailValue, password: password };
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setEmailValue("");
        setPasswordValue("");
        setUsernameValue("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box className="login-main">
        <Box sx={{ boxShadow: 4 }} className="login-form">
          <span className="login-text">Sign up</span>
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
            <span className="login-log"> Create an account!</span>
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
              type="text"
              label="Username"
              width="85%"
              className="input-text"
              value={username}
              setValue={setUsernameValue}
            />
            <Input
              type="email"
              label="Email"
              width="85%"
              value={emailValue}
              setValue={setEmailValue}
              className="input-text"
            />
            <Input
              type="password"
              label="Password"
              width="85%"
              value={password}
              setValue={setPasswordValue}
            />
            <StyledButton
              color="#f43f5e"
              text="Continue"
              width="85%"
              func={createUser}
            />

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
                Already have an account?
              </span>
              <span
                className="create-account-text"
                style={{ color: "#000000", fontSize: "0.9rem" }}
                onClick={() => navigate("/")}
              >
                Log in
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
