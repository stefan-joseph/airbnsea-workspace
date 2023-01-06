import { Paper, TextField, Typography } from "@mui/material";
import {
  LocalizationProvider,
  MobileDatePicker,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useContext } from "react";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../CollapsedSubSearch";

export const When = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  if (subSearch !== 2) {
    return (
      <CollapsedSubSearch
        value={"" || "Add dates"}
        text="When"
        handleClick={() =>
          dispatch({
            type: "SET_SUB_SEARCH",
            payload: 2,
          })
        }
      />
    );
  }
  return (
    <Paper>
      <Typography>When's your trip?</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={undefined}
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Paper>
  );
};
