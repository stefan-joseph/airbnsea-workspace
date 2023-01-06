import { Paper, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useContext } from "react";
import { NumberSelect } from "../../../../../components/fields/NumberSelect";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../CollapsedSubSearch";

export const Who = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  if (subSearch !== 3) {
    return (
      <Field name="guests">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
          <CollapsedSubSearch
            value={
              value ? `${value} guest${value !== 1 ? "s" : ""}` : "Add guests"
            }
            text="Who"
            handleClick={() =>
              dispatch({
                type: "SET_SUB_SEARCH",
                payload: 3,
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
        Who's coming?
      </Typography>
      <Field name="guests">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
          <NumberSelect
            name="Guests"
            value={value}
            handleRemove={() => {
              if (value > 0) {
                setFieldValue("guests", +value - 1);
              }
            }}
            handleAdd={() => {
              if (value < 16) {
                setFieldValue("guests", +value + 1);
              }
            }}
            disableRemove={value <= 0}
            disableAdd={value >= 16}
          />
        )}
      </Field>
    </Paper>
  );
};
