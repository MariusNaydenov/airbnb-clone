import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { PiChatDotsThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const PropertiesBox = ({
  properties,
  favourites,
  removeFavourite,
  addFavourite,
  toggle,
  open,
  isOpen,
  deleteIcon,
  deleteProperty,
  deleteLine,
}) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-y-10 gap-7 ">
      {properties.map((property) => {
        return (
          <div
            className="flex flex-col h-full gap-1 cursor-pointer w-full "
            key={property._id}
            onClick={(e) => {
              if (
                !e.target.closest("[data-full-heart-icon]") ||
                (!e.target.closest("[data-heart-icon]") &&
                  !e.target.closest("[data-delete-icon]"))
              ) {
                navigate(`/properties/${property._id}`);
              }
            }}
          >
            <div
              style={{
                position: "relative",
                width: "190px",
                height: "130px",
                marginBottom: "10px",
              }}
            >
              {favourites.includes(property.imageUrl) ? (
                <FaHeart
                  size={25}
                  color="red"
                  data-full-heart-icon
                  className="absolute z-10 top-2 right-5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavourite(property, user._id);
                  }}
                />
              ) : (
                <CiHeart
                  size={25}
                  color="white"
                  className="absolute z-10 top-2 right-5 cursor-pointer"
                  data-heart-icon
                  onClick={(e) => {
                    e.stopPropagation();
                    addFavourite(property, user._id);
                  }}
                />
              )}
              {deleteIcon && (
                <PiChatDotsThin
                  size={25}
                  className="absolute top-2 left-3 cursor-pointer z-10"
                  color="white"
                  data-delete-icon
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(property._id);
                  }}
                />
              )}
              {deleteLine && open[property._id] && (
                <div
                  className="bg-white absolute top-9 left-3 rounded-lg px-4 cursor-pointer z-10"
                  style={{ fontFamily: "Nunito,sans-serif" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProperty(user._id, property.imageUrl, property);
                  }}
                >
                  Delete Property
                </div>
              )}
              <img
                src={property.imageUrl}
                alt=""
                style={{
                  borderRadius: "15px",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "Nunito,sans-serif",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {property.country}
            </span>
            <span
              style={{
                fontFamily: "Nunito,sans-serif",
                color: "#737373",
                fontSize: "14px",
              }}
            >
              {property.category}
            </span>
            <div className="flex gap-1" style={{ fontSize: "15px" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontFamily: "Nunito,sans-serif",
                }}
              >
                ${property.price}
              </span>
              <span
                style={{
                  fontFamily: "Nunito,sans-serif",
                  color: "#737373",
                }}
              >
                night
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertiesBox;
