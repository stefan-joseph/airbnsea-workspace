import { Button, Paper, Stack } from "@mui/material";
import { useContext } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { Field, FieldProps } from "formik";
import { NavbarContext } from "../../../Navbar";

export const BottomToolbar = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  if (subSearch === 1 || subSearch === 2) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        bottom: 0,
        width: "100vw",
        padding: 2,
      }}
    >
      <Field>
        {({ form: { handleSubmit, setFieldValue } }: FieldProps) => (
          <>
            <Button
              onClick={() => {
                setFieldValue("where", null);
                setFieldValue("start", null);
                setFieldValue("end", null);
                setFieldValue("guests", null);
              }}
            >
              Clear all
            </Button>
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              color="primary"
            >
              <SearchRoundedIcon sx={{ fonstSize: 18, mr: 1 }} />
              Search
            </Button>
          </>
        )}
      </Field>
    </Paper>
  );
};
