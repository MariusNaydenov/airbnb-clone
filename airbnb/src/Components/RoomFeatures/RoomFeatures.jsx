
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";


const RoomFeatures = ({ title, subtitle, feature, setFeature }) => {
  const handleSubtraction = () => {
    if (feature === 1) {
      return;
    }
    setFeature((prev) => prev - 1);
  };

  const handleAddition = () => {
    setFeature((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row gap-10 mt-9 border-b-2 w-full">
      <div className="flex flex-col mb-5 w-3/5">
        <span
          style={{
            fontFamily: "Nunito,sans-serif",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "Nunito,sans-serif",
            fontSize: "15px",
            color: "#4b5563",
          }}
        >
          {subtitle}
        </span>
      </div>
      <div className="flex flex-row items-center mb-5 w-2/5 gap-5">
        <CiCircleMinus
          size={37}
          className="cursor-pointer"
          onClick={handleSubtraction}
          color="#4b5563"
        />
        {feature}
        <CiCirclePlus
          size={37}
          className="cursor-pointer"
          onClick={handleAddition}
          color="#4b5563"
        />
      </div>
    </div>
    
  );
};

export default RoomFeatures;
