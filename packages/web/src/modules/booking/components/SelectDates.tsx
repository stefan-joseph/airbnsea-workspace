import { Box, Divider } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PopperMenu } from "../../../components/PopperMenu";
import { formBorderColor } from "../../../constants/constants";
import { DateTextField } from "./DateTextField";
import { Calendar } from "../../../components/calendar/Calendar";

type Props = {
  calendarOpen: boolean;
  setCalendarOpen: (value: boolean) => void;
};

export const SelectDates = ({ calendarOpen, setCalendarOpen }: Props) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const popperAnchorEl = useRef<HTMLButtonElement>(null);

  // const [isStartSelection, setIsStartSelection] = useState<boolean>(
  //   !start || (start && end) ? true : false
  // );

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setCalendarOpen(!calendarOpen)}
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
            <Calendar
              start={values.start}
              end={values.end}
              setFieldValue={setFieldValue}
              bookingCalendar
              handleClose={() => setCalendarOpen(false)}
            />
          )}
        </Field>
      </PopperMenu>
    </>
  );
};
