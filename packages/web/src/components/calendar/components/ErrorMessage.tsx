import { ButtonBase, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ErrorMessage = () => {
  const navigate = useNavigate();
  return (
    <FormHelperText
      error
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
      }}
    >
      Available dates could not be accessed at this time. Please{" "}
      <ButtonBase
        onClick={() => navigate(0)}
        sx={{ textDecoration: "underline", fontSize: "inherit" }}
      >
        try again.
      </ButtonBase>
    </FormHelperText>
  );
};
