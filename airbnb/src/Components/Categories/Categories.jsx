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
import CategoryBox from "../CategoryBox/CategoryBox";

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



const Categories = () => {
  return (
    <div
      className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        px-20
        "
    >
      {categories.map((category) => {
        return (
          <CategoryBox
            key={category.name}
            icon={category.icon}
            label={category.name}
          />
        );
      })}
    </div>
  );
};

export default Categories;
