import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import Logo from "../../Components/Logo/Logo";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import "./styles.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Heading from "../../Components/Heading/Heading";
import AppContext from "../../Context/AppContext";

const PropertyView = () => {
  const { user } = useContext(AppContext);
  const { id } = useParams();
  const [property, setProperty] = useState([]);
  const [value, setValue] = useState([null, null]);

  const today = dayjs();
  const propCoordinates = property?.coordinates || [0, 0];

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  };

  const shouldDisableDate = (date) => {
    return date.isBefore(today, "day");
  };

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/property`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.log("error");
      }
    };
    getProperty();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
        minHeight: "100vh",
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
      <Box
        sx={{
          padding: "25px 180px",
          display: "flex",
          flexDirection: "column",
          height: "auto",
          flexGrow: 1,
        }}
      >
        <Heading title={property?.description} subtitle={property?.country} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "55vh",
            overflow: "hidden",
            borderRadius: "20px",
            position: "relative",
            marginTop: "15px",
          }}
        >
          <img
            src={property?.imageUrl}
            alt="Image"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", marginTop: "20px" }}>
          <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "Nunito,sans-serif",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              Hosted by <Avatar /> <span>{user?.username}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "Nunito,sans-serif",
                color: "#737373",
                fontSize: "15px",
                marginTop: "10px",
              }}
            >
              <span>{property?.guests} guests</span>{" "}
              <span>{property?.rooms} rooms</span>{" "}
              <span>{property?.bathrooms} bathrooms</span>
            </Box>
            <hr style={{ width: "100%", marginTop: "30px",marginBottom:'30px' }} />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Nunito,sans-serif",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "23px", fontWeight: "600" }}>
                {property?.category}
              </span>
              <span style={{ color: "#737373" }}>
                This property is in the {property?.category}
              </span>
            </Box>
            <hr style={{ width: "100%",marginTop: "30px",marginBottom:'30px' }} />
            <Box
              style={{
                fontFamily: "Nunito,sans-serif",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#737373" }}>{property?.description}</span>
            </Box>
            <hr style={{ width: "100%",marginTop: "30px",marginBottom:'30px' }} />
            <Box>
              <MapContainer
                center={propCoordinates}
                zoom={3}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {property && <ChangeMapView coords={propCoordinates} />}
                <Marker position={propCoordinates}>
                  <Popup></Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>

          {/* <Box sx={{ width: "40%" }}></Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyView;

{
  /* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DateCalendar views={["day"]} shouldDisableDate={shouldDisableDate} />
        </DemoContainer>
      </LocalizationProvider> */
}
