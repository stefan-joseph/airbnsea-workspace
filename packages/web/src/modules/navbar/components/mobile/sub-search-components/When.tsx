import { Box, Button, Divider, Stack } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Calendar } from "../../../../../components/calendar/Calendar";
import { formatDateRange } from "../../../../../utils/formatDateRange";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../components/CollapsedSubSearch";
import { ExpandedSubSearch } from "../components/ExpandedSubSearch";

export const When = () => {
  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [isStartSelection, setIsStartSelection] = useState<boolean>(
    !start || (start && end) ? true : false
  );

  if (subSearch === 1) return null;

  if (subSearch !== 2) {
    return (
      <Field>
        {/* for 'start' and 'end' */}
        {({
          form: {
            values: { start, end },
          },
        }: FieldProps) => (
          <CollapsedSubSearch
            value={start && end ? formatDateRange(start, end) : "Add dates"}
            text="When"
            handleClick={() =>
              dispatch({
                type: "SET_SUB_SEARCH",
                payload: 2,
              })
            }
          />
        )}
      </Field>
    );
  }

  return (
    <ExpandedSubSearch text="When's your trip?">
      <Field>
        {/* for 'start' and 'end' */}
        {({ form: { setFieldValue, values } }: FieldProps) => (
          <>
            <Box sx={{ overflowY: "auto", width: "100%", flex: 1 }}>
              <Calendar
                start={values.start}
                end={values.end}
                setFieldValue={setFieldValue}
                mobile
                isStartSelection={isStartSelection}
                setIsStartSelection={setIsStartSelection}
              />
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="space-between" padding={2}>
              <Button
                onClick={() => {
                  if (values.start || values.end) {
                    setFieldValue("start", null);
                    setFieldValue("end", null);
                    setIsStartSelection(true);
                  } else {
                    dispatch({
                      type: "SET_SUB_SEARCH",
                      payload: 3,
                    });
                  }
                }}
              >
                {values.start || values.end ? "Clear" : "Skip"}
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  dispatch({
                    type: "SET_SUB_SEARCH",
                    payload: 3,
                  })
                }
              >
                Next
              </Button>
            </Stack>
          </>
        )}
      </Field>
    </ExpandedSubSearch>
  );
};
