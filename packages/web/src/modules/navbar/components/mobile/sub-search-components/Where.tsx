import { Paper, TextField, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useContext } from "react";
import { GoogleLocationAutoComplete } from "../../../../../components/fields/GoogleLocationAutoComplete";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../CollapsedSubSearch";

export const Where = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  if (subSearch !== 1) {
    return (
      <Field name="where">
        {({ field: { value } }: FieldProps) => (
          <CollapsedSubSearch
            value={value ? value : "Anywhere"}
            text="Where"
            handleClick={() =>
              dispatch({
                type: "SET_SUB_SEARCH",
                payload: 1,
              })
            }
          />
        )}
      </Field>
    );
  }
  return (
    <Paper sx={{ p: 3, pt: 2, pb: 2, borderRadius: 4 }}>
      <Typography fontSize={20} fontWeight={700}>
        Where to?
      </Typography>
      <Field name="where">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
          <GoogleLocationAutoComplete
            textFieldProps={{
              placeholder: "Search Destinations",
              variant: "standard",
              label: "",
            }}
            textFieldInputProps={{
              disableUnderline: true,
              endAdornment: undefined,
              sx: {
                fontSize: 14,
              },
            }}
            onInputChange={(value) =>
              setFieldValue && setFieldValue("where", value)
            }
            outsideValue={value ? value : undefined}
            popperWidth={400}
          />
        )}
      </Field>
    </Paper>
  );
};
