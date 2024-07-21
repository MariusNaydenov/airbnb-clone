import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box } from "@mui/material";
import Logo from "../../Components/Logo/Logo";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import "./styles.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Heading from "../../Components/Heading/Heading";
import AppContext from "../../Context/AppContext";
import StyledButton from "../../Components/Button/Button";

const PropertyView = () => {
  const { user } = useContext(AppContext);
  const { id } = useParams();
  const [property, setProperty] = useState([]);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const startDate = dayjs(dates[0].startDate);
  const endDate = dayjs(dates[0].endDate);

  // console.log(startDate.date());
  // console.log(startDate.format("MMMM"));

  const customIcon = new L.Icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const differenceInDays = Math.abs(startDate.diff(endDate, "day")) + 1;

  const price = !differenceInDays
    ? property?.price
    : differenceInDays * property?.price;

  const today = dayjs().toDate();
  const propCoordinates = property?.coordinates || [0, 0];

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginTop: "20px",
            gap: "45px",
          }}
        >
          <Box sx={{ width: "55%", display: "flex", flexDirection: "column" }}>
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
            <hr
              style={{ width: "100%", marginTop: "30px", marginBottom: "30px" }}
            />
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
            <hr
              style={{ width: "100%", marginTop: "30px", marginBottom: "30px" }}
            />
            <Box
              style={{
                fontFamily: "Nunito,sans-serif",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#737373" }}>{property?.description}</span>
            </Box>
            <hr
              style={{ width: "100%", marginTop: "30px", marginBottom: "30px" }}
            />
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
                <Marker icon={customIcon} position={propCoordinates}>
                  <Popup></Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>

          <Box sx={{ width: "40%", display: "flex", flexDirection: "column" }}>
            <div
              style={{ borderRadius: "1rem 1rem 0 0" }}
              className="
            bg-white
            
            border-[1px]
            border-neutral-200
            overflow-hidden
            "
            >
              <div
                className="
              flex flex-row items-center gap-1 p-4
              "
              >
                <span className="text-2xl font-semibold">
                  $ {property?.price}
                </span>
                <span className="font-light text-neutral-600">night</span>
              </div>
            </div>
            <div
              className="
            bg-white
            border-[1px]
            border-neutral-200
            overflow-hidden
            "
            >
              <DateRange
                rangeColors={["#262626"]}
                ranges={dates}
                // date={new Date()}
                onChange={(item) => setDates([item.selection])}
                direction="vertical"
                minDate={today}
                showDateDisplay={false}
              />
            </div>
            <div
              className="
            bg-white
            border-[1px]
            border-neutral-200
            overflow-hidden
            p-4
            "
              style={{ borderRadius: "0 0 1rem 1rem" }}
            >
              <StyledButton
                width={"100%"}
                color={"rgb(244, 63, 94)"}
                text={"Reserve"}
              />
              <div
                className="
              py-4
              flex
              flex-row
              items-center
              justify-between
              font-semibold
              text-lg
              "
              >
                <span>Total</span>
                <span>
                  ${" "}
                  {!differenceInDays
                    ? property?.price
                    : differenceInDays * property?.price}
                </span>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyView;
