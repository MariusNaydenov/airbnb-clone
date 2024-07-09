import { Button } from "@mui/material";
import { lighten } from "@mui/system";

const StyledButton = (props) => {
  return (
    <Button
      onClick={props.func}
      variant="text"
      disabled={props.disabled}
      sx={{
        backgroundColor: `${props.color}`,
        width: `${props.width}`,
        fontFamily: "Nunito,sans-serif",
        color: "white",
        "&:hover": {
          backgroundColor: lighten(`${props.color}`, 0.2),
        },
        "&.Mui-disabled": {
          color: "white",
          backgroundColor: lighten(`${props.color}`, 0.5), 
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default StyledButton;
