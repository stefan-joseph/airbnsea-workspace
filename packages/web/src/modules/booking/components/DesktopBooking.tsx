import { Box, ButtonBase, Stack, Typography } from "@mui/material";

import { SelectDates } from "./SelectDates";
import { SelectGuests } from "./SelectGuests";
import { formBorderColor } from "../../../constants/constants";
import { BookingButton } from "./BookingButton";
import { BookingProps } from "../Booking";
import { Receipt } from "./Receipt";
import { Rating } from "../../../components/Rating";

export const DesktopBooking = ({
  price,
  rating,
  maxGuests,
  calendarOpen,
  setCalendarOpen,
}: BookingProps) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={0}
        mb={3}
      >
        <Typography
          variant="h3"
          fontSize={22}
          fontWeight={600}
          marginRight={2}
          noWrap
        >
          ${(price + 1000).toLocaleString()} USD{" "}
          <Box component="span" fontSize={16} fontWeight="initial">
            day
          </Box>
        </Typography>
        <Stack direction="row" spacing={1} divider={<Typography>·</Typography>}>
          <Rating rating={rating} />
          <ButtonBase
            sx={{
              whiteSpace: "nowrap",
              textDecoration: "underline",
              fontSize: 14,
            }}
          >
            7 reviews
          </ButtonBase>
        </Stack>
      </Stack>
      <Box
        width="100%"
        marginBottom={2}
        border="1px solid"
        borderColor={formBorderColor}
        borderRadius={2}
        position="relative"
      >
        <SelectDates
          calendarOpen={calendarOpen}
          setCalendarOpen={setCalendarOpen}
        />
        <SelectGuests maxGuests={maxGuests} />
      </Box>
      {/* {error?.message && (
        <FormHelperText error>{error.message}</FormHelperText>
      )} */}
      <BookingButton setCalendarOpen={setCalendarOpen} fullWidth />
      {/* {data?.createBooking && (
        <FormHelperText
          sx={{
            fontSize: 16,
            color: "success.main",
          }}
        >
          Your booking is complete!
        </FormHelperText>
      )} */}

      <Receipt price={price} />
    </>
  );
};
