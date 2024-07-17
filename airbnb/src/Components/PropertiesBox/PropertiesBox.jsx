import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { PiChatDotsThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

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
  deleteLine
}) => {
  return (
    <div
      className="grid grid-cols-5 gap-y-10 gap-5"
      style={{ padding: "25px 180px" }}
    >
      {properties.map((property) => {
        return (
          <div
            className="flex flex-col h-full gap-1 relative cursor-pointer"
            key={property._id}
            // onClick={() => navigate(`/properties/${property._id}`)}
          >
            {favourites.includes(property.imageUrl) ? (
              <FaHeart
                size={25}
                color="red"
                className="absolute top-2 right-10 cursor-pointer"
                onClick={() => removeFavourite(property)}
              />
            ) : (
              <CiHeart
                size={25}
                color="white"
                className="absolute top-2 right-10 cursor-pointer"
                onClick={() => addFavourite(property)}
              />
            )}
            {deleteIcon && (
              <PiChatDotsThin
                size={25}
                className="absolute top-2 left-3 cursor-pointer"
                color="white"
                onClick={() => toggle(property._id)}
              />
            )}
            {deleteLine && open[property._id] && (
              <div
                className="bg-white absolute top-9 left-3 rounded-lg px-4 cursor-pointer"
                style={{ fontFamily: "Nunito,sans-serif" }}
                onClick={() =>
                  deleteProperty(property._id, property.imageUrl, property)
                }
              >
                Delete Property
              </div>
            )}
            <img
              src={property.imageUrl}
              alt=""
              width="190px"
              style={{ borderRadius: "15px" }}
            />
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
