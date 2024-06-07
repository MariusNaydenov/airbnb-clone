import Heading from "../Heading/Heading";
import Box from "@mui/material/Box";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { IoDiamond } from "react-icons/io5";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import StyledButton from "../Button/Button";

const categories = [
  { name: "Beach", icon: TbBeach },
  { name: "Windmills", icon: GiWindmill },
  { name: "Modern", icon: MdOutlineVilla },
  { name: "Countryside", icon: TbMountain },
  { name: "Pools", icon: TbPool },
  { name: "Islands", icon: GiIsland },
  { name: "Lake", icon: GiBoatFishing },
  { name: "Skiing", icon: FaSkiing },
  { name: "Castles", icon: GiCastle },
  { name: "Camping", icon: GiForestCamp },
  { name: "Arctic", icon: BsSnow },
  { name: "Cave", icon: GiCaveEntrance },
  { name: "Desert", icon: GiCactus },
  { name: "Barns", icon: GiBarn },
  { name: "Lux", icon: IoDiamond },
];

const ModalCategories = ({ setCategory, selectedCategory, setStep }) => {
  return (
    <Box className="flex flex-col py-5 px-6">
      <Heading
        title={"Which of these best describes your place?"}
        subtitle={"Pick a category"}
      />
      <Box
        sx={{ maxHeight: "300px" }}
        className="grid grid-cols-2 gap-2 overflow-y-auto mb-6 mt-4"
      >
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.name}
              className={`flex flex-col border p-4 rounded-xl gap-1 cursor-pointer hover:border-black
                ${
                  selectedCategory === category.name
                    ? "border-black"
                    : "border p-4"
                }
                `}
              onClick={() => setCategory(category.name)}
            >
              <IconComponent size={24} />
              <span
                style={{ fontSize: "14px", fontFamily: "Nunito,sans-serif" }}
              >
                {category.name}
              </span>
            </div>
          );
        })}
      </Box>
      <StyledButton
        width={"100%"}
        color={"rgb(244, 63, 94)"}
        text={"Next"}
        func={() => setStep("place")}
      />
    </Box>
  );
};

export default ModalCategories;
