import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Property from "..//..//Models/propertyModel";

const PropertyView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/property`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.log("error");
      }
    };

    getProperty();
  }, []);

  return <h1>hello</h1>;
};

export default PropertyView;
