import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Logo from "../../Components/Logo/Logo";
import Search from "../../Components/Search/Search";
import UserMenu from "../../Components/UserMenu/UserMenu";
import Heading from "../../Components/Heading/Heading";
import { data } from "autoprefixer";
import StyledButton from "../../Components/Button/Button";

const Trips = () => {
  const [trips, setTrips] = useState([]);

  const getReservations = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations`
      );
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "15px 0px",
          width: "100%",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Logo />
        <Search />
        <UserMenu />
      </Box>
      {trips?.length === 0 ? (
        <div className="flex items-center justify-center h-3/4 flex-col gap-2">
          <Heading
            title={"No reservations found"}
            subtitle={"Looks like you haven't reserved any trips."}
            center={true}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <div style={{ padding: "25px 180px" }}>
            <Heading
              title={"Reservations"}
              subtitle={"Where you've been and where you're going."}
            />
          </div>
          <div style={{ padding: "25px 180px" }}>
            <div className="grid grid-cols-5 gap-y-10 gap-7 ">
              {trips.map((trip) => {
                return (
                  <div
                    className="flex flex-col h-full gap-1 cursor-pointer w-full "
                    key={trip._id}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "190px",
                        height: "130px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={trip.imageUrl}
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
                      {trip.country}
                    </span>
                    <span
                      style={{
                        fontFamily: "Nunito,sans-serif",
                        color: "#737373",
                        fontSize: "14px",
                      }}
                    >
                      {trip.startDate} - {trip.endDate}
                    </span>
                    <div className="flex gap-1" style={{ fontSize: "15px" }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Nunito,sans-serif",
                        }}
                      >
                        ${trip.price}
                      </span>
                      <span
                        style={{
                          fontFamily: "Nunito,sans-serif",
                          color: "#737373",
                        }}
                      >
                        total
                      </span>
                    </div>
                    <StyledButton
                      text={"Cancel reservation"}
                      width={"100%"}
                      color={"rgb(244, 63, 94)"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Trips;
