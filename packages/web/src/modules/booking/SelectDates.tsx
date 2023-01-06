import { Box, Divider } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import { Calendar } from "../../components/calendar/Calendar";
import { PopperMenu } from "../../components/PopperMenu";
import { formBorderColor } from "../../constants/constants";
import { DateTextField } from "./DateTextField";
import { ValuesOfCorrectTypeRule } from "graphql";

type Props = {
  calendarOpen: boolean;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SelectDates = ({ calendarOpen, setCalendarOpen }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const popperAnchorEl = useRef<HTMLButtonElement>(null);

  // const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const [isStartSelection, setIsStartSelection] = useState<boolean>(
    !start || (start && end) ? true : false
  );

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
        // marginRight={-9}
      >
        {/* for 'start' and 'end' */}
        <Field>
          {({ form: { setFieldValue, values } }: FieldProps) => (
            <Calendar
              start={values.start}
              end={values.end}
              isStartSelection={isStartSelection}
              setIsStartSelection={setIsStartSelection}
              handleChange={(value) => {
                const formattedValue = dayjs(value).format("YYYY-MM-DD");
                if (isStartSelection) {
                  setFieldValue("start", formattedValue);
                  searchParams.set("start", formattedValue);
                  // if (dayjs(value).isAfter(dayjs(end))) {
                  setFieldValue("end", null);
                  searchParams.delete("end");
                  // }
                  setSearchParams(searchParams);
                  setIsStartSelection(false);
                } else if (!isStartSelection) {
                  setFieldValue("end", formattedValue);
                  searchParams.set("end", formattedValue);
                  setSearchParams(searchParams);
                  setIsStartSelection(true);
                  setCalendarOpen(false);
                }
              }}
              handleClose={() => setCalendarOpen(false)}
              handleClear={() => {
                setFieldValue("start", null);
                setFieldValue("end", null);
                searchParams.delete("start");
                searchParams.delete("end");
                setSearchParams(searchParams);
                setIsStartSelection(true);
              }}
              bookingCalendar
            />
          )}
        </Field>
      </PopperMenu>
    </>
  );
};
