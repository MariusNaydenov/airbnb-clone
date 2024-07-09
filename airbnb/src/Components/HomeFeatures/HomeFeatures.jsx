import Heading from "../Heading/Heading";
import RoomFeatures from "../RoomFeatures/RoomFeatures";
import StyledButton from "../Button/Button";
import { Box } from "@mui/material";
import BackButton from "../BackButton/BackButton";

const HomeFeatures = ({
  step,
  setStep,
  guests,
  setGuests,
  rooms,
  setRooms,
  bathrooms,
  setBathrooms,
}) => {
  return (
    <div className="flex flex-col gap-2 py-5 px-6">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenitis do you have?"
      />
      <RoomFeatures
        title="Guests"
        subtitle="How many guests do you allow?"
        feature={guests}
        setFeature={setGuests}
      />
      <RoomFeatures
        title="Rooms"
        subtitle="How many rooms do you have?"
        feature={rooms}
        setFeature={setRooms}
      />
      <RoomFeatures
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        feature={bathrooms}
        setFeature={setBathrooms}
      />
       <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
       <BackButton width={"50%"} text={"Back"} func={() => setStep("place")} />
        <StyledButton
          width={"50%"}
          color={"rgb(244, 63, 94)"}
          text={"Continue"}
          func={() => setStep("image")}
        />
      </Box>
    </div>
  );
};

export default HomeFeatures;
