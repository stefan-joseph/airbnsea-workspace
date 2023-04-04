import { Box, Button, Divider, Stack } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PopperMenu } from "../../../components/PopperMenu";
import { formBorderColor } from "../../../constants/constants";
import { DateTextField } from "./DateTextField";
import { Calendar } from "../../../components/calendar/Calendar";
import { BookingHeader } from "../../../components/calendar/components/BookingHeader";

type Props = {
  calendarOpen: boolean;
  setCalendarOpen: (value: boolean) => void;
};

export const SelectDates = ({ calendarOpen, setCalendarOpen }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const popperAnchorEl = useRef<HTMLButtonElement>(null);

  const [isStartSelection, setIsStartSelection] = useState<boolean>(
    !start || (start && end) ? true : false
  );

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => {
          setIsStartSelection(start && !end ? false : true);
          setCalendarOpen(true);
        }}
        ref={popperAnchorEl}
        sx={{
          m: "-1px",
          backgroundColor: "unset",
          display: "flex",
          cursor: "pointer",
          borderRadius: 2,
          border: "2px solid rgb(0,0,0,0)",
          "&:hover": {
            border: "2px solid black",
          },
          "&:hover ~ .MuiDivider-root": {
            display: "none",
          },
        }}
      >
        <DateTextField value={start} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: formBorderColor, mt: "-1px", mb: "-2px" }}
        />
        <DateTextField value={end} />
      </Box>
      <PopperMenu
        open={calendarOpen}
        anchorEl={popperAnchorEl}
        handleClose={() => setCalendarOpen(false)}
        marginTop={-9}
      >
        {/* for 'start' and 'end' */}
        <Field>
          {({ form: { setFieldValue, values } }: FieldProps) => (
            <>
              <BookingHeader
                start={start}
                end={end}
                isStartSelection={isStartSelection}
                setIsStartSelection={setIsStartSelection}
              />
              <Calendar
                start={values.start}
                end={values.end}
                setFieldValue={setFieldValue}
                bookingCalendar
                isStartSelection={isStartSelection}
                setIsStartSelection={setIsStartSelection}
                setCalendarOpen={setCalendarOpen}
              />

              <Stack
                direction="row"
                justifyContent="end"
                gap={2}
                sx={{ mt: -2, pb: 2, pr: 2 }}
              >
                <Button
                  onClick={() => {
                    setFieldValue("start", null);
                    setFieldValue("end", null);
                    searchParams.delete("start");
                    searchParams.delete("end");
                    setSearchParams(searchParams);
                    setIsStartSelection(true);
                  }}
                  sx={{ fontSize: 14 }}
                >
                  Clear dates
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setCalendarOpen(false)}
                  size="small"
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    p: 0,
                    pl: 1,
                    pr: 1,
                  }}
                >
                  Close
                </Button>
              </Stack>
            </>
          )}
        </Field>
      </PopperMenu>
    </>
  );
};
