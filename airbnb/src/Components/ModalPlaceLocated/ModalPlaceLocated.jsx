import { Box } from "@mui/material";
import "./styles.css";
import Heading from "../Heading/Heading";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Select from "react-select";
import { useState } from "react";

const ModalPlaceLocated = () => {
  const [mapZIndex, setMapZIndex] = useState(0);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleMenuOpen = () => {
    setMapZIndex(-1);
  };

  const handleMenuClose = () => {
    setMapZIndex(0);
  };

  return (
    <Box className="flex flex-col gap-2 py-5 px-6">
      <Heading
        title={"Where is your place located?"}
        subtitle={"Help guests find you!"}
      />

      <Select
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
        onFocus={handleMenuOpen}
        onBlur={handleMenuClose}
        styles={{
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "rgb(244, 63, 94)"
              : state.isFocused
              ? "rgba(244, 63, 94, 0.2)"
              : "transparent",
            ":active": {
              backgroundColor: "rgba(244, 63, 94, 0.2)",
            },
            ":hover": {
              backgroundColor: "rgba(244, 63, 94, 0.2)",
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "black", // Color for selected option
          }),
        }}
      />

      <MapContainer
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ zIndex: mapZIndex }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup></Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default ModalPlaceLocated;
