import { Box } from "@mui/material";
import "./styles.css";
import Heading from "../Heading/Heading";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ModalPlaceLocated = () => {
  return (
    <Box className="flex flex-col gap-2 py-5 px-6">
      <Heading
        title={"Where is your place located?"}
        subtitle={"Help guests find you!"}
      />
      <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          {/* <Popup>
            
          </Popup> */}
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default ModalPlaceLocated;
