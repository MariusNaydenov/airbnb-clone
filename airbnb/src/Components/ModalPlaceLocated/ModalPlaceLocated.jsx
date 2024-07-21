import { Box } from "@mui/material";
import "./styles.css";
import Heading from "../Heading/Heading";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import countries from "world-countries";
import StyledButton from "../Button/Button";
import BackButton from "../BackButton/BackButton";

const ModalPlaceLocated = ({
  setCountry,
  country,
  setStep,
  setCoordinates,
}) => {
  const [mapZIndex, setMapZIndex] = useState(0);

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowUrl: "/marker-shadow.png", // url for the shadow image
    shadowSize: [41, 41], // size of the shadow
  });

  useEffect(() => {
    if (country) {
      setCoordinates(country.coordinates);
    }
  }, [country]);

  const countryOptions = countries.map((country) => ({
    value: country.name.official,
    label: country.name.common,
    coordinates: country.latlng,
  }));

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
  };

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
        value={country}
        options={countryOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        onFocus={handleMenuOpen}
        onBlur={handleMenuClose}
        onChange={handleCountryChange}
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
            color: "black",
          }),
        }}
      />

      <MapContainer
        center={country === null ? [0, 0] : country.coordinates}
        zoom={3}
        scrollWheelZoom={false}
        style={{ zIndex: mapZIndex }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {country && <ChangeMapView coords={country.coordinates} />}
        <Marker
          icon={customIcon}
          position={country === null ? [0, 0] : country.coordinates}
        >
          <Popup></Popup>
        </Marker>
      </MapContainer>
      <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <BackButton
          width={"50%"}
          text={"Back"}
          func={() => setStep("categories")}
        />
        <StyledButton
          width={"50%"}
          color={"rgb(244, 63, 94)"}
          text={"Continue"}
          func={() => setStep("homeFeatures")}
          disabled={!country ? true : false}
        />
      </Box>
    </Box>
  );
};

export default ModalPlaceLocated;
