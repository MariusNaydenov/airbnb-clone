import React, { useRef, useEffect, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Heading from "../Heading/Heading";
import StyledButton from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import { Box } from "@mui/material";
const MY_CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const MY_UPLOAD_PRESET_NAME = import.meta.env.VITE_UPLOAD_PRESET_NAME;

const ImageModal = ({  setStep, imageUrl, setImageUrl }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: MY_CLOUDINARY_NAME,
        uploadPreset: MY_UPLOAD_PRESET_NAME,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
        if (error) {
          console.error("Upload error:", error);
        }
      }
    );
  }, []);

  return (
    <div className="flex flex-col py-5 px-5">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
      <div
        onClick={() => widgetRef.current.open()}
        className="relative
         cursor-pointer 
         hover:opacity-70 
         transition 
         border-dashed 
         border-2 
         p-20
         mt-5
         border-neutral-300
         flex
         flex-col
         justify-center
         items-center
         gap-4
         text-neutral-600
    "
      >
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        {imageUrl && (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <BackButton width={"50%"} text={"Back"} func={() => setStep("homeFeatures")} />
        <StyledButton
          width={"50%"}
          color={"rgb(244, 63, 94)"}
          text={"Next"}
          disabled={!imageUrl ? true : false}
          func={() => setStep('description')}
        />
      </Box>
    </div>
  );
};

export default ImageModal;


