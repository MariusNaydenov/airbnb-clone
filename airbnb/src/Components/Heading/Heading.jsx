import Box from "@mui/material/Box";

const Heading = ({ title, subtitle, center }) => {
  return (
    <Box
      className="flex flex-col gap-2"
      style={{ alignItems: center ? "center" : "" }}
    >
      <span
        style={{
          fontFamily: "Nunito,sans-serif",
          color: "#000000",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {title}
      </span>
      <span style={{ fontFamily: "Nunito,sans-serif", color: "#737373" }}>
        {subtitle}
      </span>
    </Box>
  );
};

export default Heading;
