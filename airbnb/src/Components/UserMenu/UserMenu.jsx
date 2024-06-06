import { Avatar } from "@mui/material";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuOption from "../MenuOption/MenuOption";
import HomeModal from "../HomeModal/HomeModal";

const UserMenu = ({ openModal, handleClose, open }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div
      className="
        flex flex-row items-center gap-3 relative
        "
    >
      <div
        className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            "
        onClick={openModal}
      >
        Airbnb your home
      </div>
      <div
        onClick={toggleUserMenu}
        className="
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
      "
      >
        <AiOutlineMenu />
        <div
          className="
        hidden md:block"
        >
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm"
        >
          <div
            className="
          flex flex-col cursor-pointer
          "
          >
            <MenuOption label="My trips" />
            <MenuOption label="My favorites" />
            <MenuOption label="My reservations" />
            <MenuOption label="My properties" />
            <MenuOption label="Logout" />
          </div>
        </div>
      )}
      <HomeModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default UserMenu;
