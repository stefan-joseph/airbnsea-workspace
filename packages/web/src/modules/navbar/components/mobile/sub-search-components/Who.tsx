import { Box, Paper, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useContext } from "react";
import { NumberSelect } from "../../../../../components/fields/NumberSelect";
import { GuestsSelect } from "../../../../../components/GuestsSelect";
import { NavbarContext } from "../../../Navbar";

import { CollapsedSubSearch } from "../components/CollapsedSubSearch";
import { ExpandedSubSearch } from "../components/ExpandedSubSearch";

export const Who = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  if (subSearch === 1 || subSearch === 2) return null;

  return (
    <Field name="guests">
      {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
        <CollapsedSubSearch
          value={
            value ? `${value} guest${value !== 1 ? "s" : ""}` : "Add guests"
          }
          text="Who"
          subtitle="Who's coming?"
          handleClick={() =>
            dispatch({
              type: "SET_SUB_SEARCH",
              payload: 3,
            })
          }
          selected={subSearch === 3}
        >
          <Box padding={2}>
            <GuestsSelect value={value} setFieldValue={setFieldValue} />
          </Box>
        </CollapsedSubSearch>
      )}
    </Field>
  );
};
