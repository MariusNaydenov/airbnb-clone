import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ModalCategories from "../ModalCategories/ModalCategories";
import ModalPlaceLocated from "../ModalPlaceLocated/ModalPlaceLocated";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import ImageModal from "../ImageModal/ImageModal";
import DescriptionModal from "../DescriptionModal/DescriptionModal";
import PriceModal from "../PriceModal/PriceModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "white",
  // border: "2px solid rgb(255,255,255)",
  boxShadow: 24,
  overflow: "auto",
  borderRadius: "10px",
  outline: "none",
};

const HomeModal = ({
  open,
  handleClose,
  step,
  setStep,
  setCountry,
  country,
  guests,
  setGuests,
  rooms,
  setRooms,
  bathrooms,
  setBathrooms,
  imageUrl,
  setImageUrl,
  createProperty,
  description,
  setDescription,
  title,
  setTitle,
  price,
  setPrice,
  category,
  setCategory,
  setCoordinates
}) => {
  

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              width: "100%",
              px: 3,
              py: 1,
            }}
          >
            <span
              onClick={handleClose}
              style={{
                fontFamily: "Nunito,sans-serif",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              x
            </span>
            <span style={{ fontFamily: "Nunito,sans-serif", fontSize: "18px" }}>
              Share your home!
            </span>
            <hr />
          </Box>
          {step === "categories" && (
            <ModalCategories
              selectedCategory={category}
              setCategory={setCategory}
              setStep={setStep}
            />
          )}
          {step === "place" && (
            <ModalPlaceLocated
              country={country}
              setCountry={setCountry}
              setStep={setStep}
              setCoordinates={setCoordinates}
            />
          )}
          {step === "homeFeatures" && (
            <HomeFeatures
              step={step}
              setStep={setStep}
              guests={guests}
              setGuests={setGuests}
              rooms={rooms}
              setRooms={setRooms}
              bathrooms={bathrooms}
              setBathrooms={setBathrooms}
            />
          )}
          {step === "image" && (
            <ImageModal
              setStep={setStep}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
          )}
          {step === "description" && (
            <DescriptionModal
              description={description}
              setDescription={setDescription}
              setStep={setStep}
              title={title}
              setTitle={setTitle}
            />
          )}
          {step === "price" && (
            <PriceModal
              setStep={setStep}
              createProperty={createProperty}
              price={price}
              setPrice={setPrice}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default HomeModal;
