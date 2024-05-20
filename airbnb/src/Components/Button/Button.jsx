import { Button } from "@mui/material";
import { lighten } from "@mui/system";

const StyledButton = (props) => {
  return (
    <Button
    onClick={props.func}
      variant="text"
      sx={{
        backgroundColor: `${props.color}`,
        width: `${props.width}`,
        fontFamily:'Nunito,sans-serif',
        color: "white",
        "&:hover": {
          backgroundColor: lighten(`${props.color}`, 0.2),
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default StyledButton;
