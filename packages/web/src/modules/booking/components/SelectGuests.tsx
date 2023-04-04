import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import { Field, FieldProps } from "formik";
import { PopperMenu } from "../../../components/PopperMenu";
import { formBorderColor } from "../../../constants/constants";
import { NumberSelect } from "../../../components/fields/NumberSelect";

export const SelectGuests = ({ maxGuests }: { maxGuests?: number }) => {
  const popperAnchorEl = useRef<HTMLButtonElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [guestsOpen, setGuestsOpen] = useState<boolean>(false);

  return (
    <>
      <Field name="guests">
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
          <>
            <Box
              component="button"
              type="button"
              onClick={() => setGuestsOpen(!guestsOpen)}
              ref={popperAnchorEl}
              sx={{
                m: "-1px",
                backgroundColor: "unset",
                width: "calc(100% + 2px)",
                cursor: "pointer",
                borderRadius: 2,
                border: guestsOpen
                  ? "2px solid black"
                  : "2px solid rgb(0,0,0,0)",
                "&:hover": {
                  border: "2px solid black",
                },
                "&:hover ~ .MuiDivider-root": {
                  display: "none",
                },
              }}
            >
              <TextField
                value={value ? `${value} guest${value !== 1 ? "s" : ""}` : ""}
                label="GUESTS"
                variant="standard"
                sx={{
                  border: "unset",
                  p: 0.4,
                  pl: 1,
                  pr: 1,
                  "& fieldset": { border: "none" },
                }}
                InputLabelProps={{ shrink: true, sx: { p: 1 } }}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ transform: "translateY(-5px)" }}
                    >
                      {guestsOpen ? (
                        <KeyboardArrowUpRoundedIcon />
                      ) : (
                        <KeyboardArrowDownRoundedIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
            <PopperMenu
              anchorEl={popperAnchorEl}
              open={!!guestsOpen}
              handleClose={() => setGuestsOpen(false)}
              width={312}
            >
              <Stack padding={2}>
                <NumberSelect
                  name="Guests"
                  value={value}
                  handleRemove={() => {
                    if (value > 1) {
                      searchParams.set("guests", `${value - 1}`);
                      setSearchParams(searchParams);
                      setFieldValue("guests", +value - 1);
                    }
                  }}
                  handleAdd={() => {
                    if (value <= (maxGuests || 16)) {
                      searchParams.set("guests", `${value + 1}`);
                      setSearchParams(searchParams);
                      setFieldValue("guests", value + 1);
                    }
                  }}
                  disableRemove={value <= 1}
                  disableAdd={value >= (maxGuests || 16)}
                />
                <Typography fontSize={12} color="grey.800" mt={2} mb={1}>
                  This vessel has a maximum capacity of {maxGuests} guest
                  {maxGuests !== 1 ? "s" : ""}.
                </Typography>
                <Button
                  onClick={() => setGuestsOpen(false)}
                  sx={{ ml: "auto", p: 0.6 }}
                >
                  Close
                </Button>
              </Stack>
            </PopperMenu>
          </>
        )}
      </Field>
      <Divider
        sx={{
          backgroundColor: formBorderColor,
          height: "1px",
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          display: guestsOpen ? "none" : undefined,
        }}
      />
    </>
  );
};
