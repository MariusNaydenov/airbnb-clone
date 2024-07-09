import { Button } from "@mui/material";
import { lighten } from "@mui/system";

const BackButton = (props) => {
  const defaultColor = "rgb(255,255,255)";
  return (
    <Button
      onClick={props.func}
      variant="text"
      sx={{
        border: "1px solid #000000",
        backgroundColor: defaultColor,
        width: `${props.width}`,
        fontFamily: "Nunito,sans-serif",
        color: "#000000",
        "&:hover": {
          backgroundColor: lighten(defaultColor, 0.2),
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default BackButton;
