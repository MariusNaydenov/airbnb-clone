import { Avatar } from "@mui/material";
import { useCallback, useState, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuOption from "../MenuOption/MenuOption";
import HomeModal from "../HomeModal/HomeModal";
import AppContext from "../../Context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user, setUser, setAuthentication } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("categories");
  const [country, setCountry] = useState(null);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(1);
  const [category, setCategory] = useState("Beach");
  const [coordinates, setCoordinates] = useState([]);

  const handleMenuOptionPath = (path) => {
    navigate(`/${path}`);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
    setAuthentication(false);
    navigate("/");
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setStep("categories");
    setCountry(null);
    setImageUrl("");
    setTitle("");
    setDescription("");
    setPrice(1);
    setOpen(false);
    setCategory("Beach");
  };

  const createProperty = async () => {
    const property = {
      country: country.value,
      guests: guests,
      rooms: rooms,
      bathrooms: bathrooms,
      imageUrl: imageUrl,
      price: price,
      description: description,
      title: title,
      user: user.email,
      userId: user._id,
      category: category,
      coordinates: coordinates,
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });

    if (response.ok) {
      toast.success("You've successfully added your property", {
        position: "top-center",
      });
      const newProperties = [...user.properties, property];
      setUser({ ...user, properties: newProperties });
    }

    setStep("categories");
    setCountry(null);
    setImageUrl("");
    setTitle("");
    setDescription("");
    setPrice(1);
    setOpen(false);
    setGuests(1);
    setBathrooms(1);
    setRooms(1);
  };

  const toggleUserMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
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
        onClick={handleOpen}
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
        text-sm
        z-10"
        >
          <div
            className="
          flex flex-col cursor-pointer
          "
          >
            <MenuOption
              label="My favourites"
              onClick={() => handleMenuOptionPath("favourites")}
            />
            <MenuOption
              label="My reservations"
              onClick={() => handleMenuOptionPath("reservations")}
            />
            <MenuOption
              label="My properties"
              onClick={() => handleMenuOptionPath("properties")}
            />
            <MenuOption label="Logout" onClick={handleLogout} />
          </div>
        </div>
      )}
      <HomeModal
        open={open}
        handleClose={handleClose}
        step={step}
        setStep={setStep}
        setCountry={setCountry}
        country={country}
        guests={guests}
        setGuests={setGuests}
        rooms={rooms}
        setRooms={setRooms}
        setBathrooms={setBathrooms}
        bathrooms={bathrooms}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        createProperty={createProperty}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        setCoordinates={setCoordinates}
      />
    </div>
  );
};

export default UserMenu;
