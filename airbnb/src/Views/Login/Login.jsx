import "./Login.css";
import Input from "../../Components/Input/Input";
import { LuPalmtree } from "react-icons/lu";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const { setAuthentication, setUser, user } = useContext(AppContext);

  // console.log(user);
  // const LogUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:3000/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: emailValue, password: password }),
  //     });
  //     const data = await response.json();

  //     if (response.ok) {
  //       setAuthentication(true);
  //       setUser(data);
  //       navigate("/home");
  //     } else {
  //       toast.error(data.message, {
  //         position: "top-center",
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const LogUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailValue, password: password }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setAuthentication(true);
        setUser(data);
        navigate("/home");
      } else {
        toast.error(data.message, {
          position: "top-center",
        });
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
            vacation estates
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
            <form
              onSubmit={(e) => LogUser(e)}
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: "15px",
              }}
            >
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
              <input
                type="submit"
                style={{
                  backgroundColor: "#f43f5e",
                  width: "85%",
                  height: "45px",
                  border: "none",
                  borderRadius: "10px",
                  color: "white",
                  fontFamily: "Nunito,sans-serif",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                value="Continue"
              />
            </form>
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
                onClick={() => navigate("/sign-up")}
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
