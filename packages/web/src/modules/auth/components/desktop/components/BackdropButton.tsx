import { Backdrop } from "@mui/material";
import { useContext } from "react";
import { NavbarContext } from "../../../Navbar";

export const BackdropButton = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  return (
    <Backdrop
      open={!!subSearch}
      sx={{ zIndex: 98 }}
      onClick={() => {
        dispatch({
          type: "SET_SUB_SEARCH",
          payload: 0,
        });
      }}
    />
  );
};
