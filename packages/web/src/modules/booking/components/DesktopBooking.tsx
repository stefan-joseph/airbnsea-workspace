import {
  Box,
  ButtonBase,
  Dialog,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { SelectDates } from "./SelectDates";
import { SelectGuests } from "./SelectGuests";
import { borderRadius, formBorderColor } from "../../../constants/constants";
import { BookingButton } from "./BookingButton";
import { BookingProps } from "../Booking";
import { Receipt } from "./Receipt";
import { Rating } from "../../../components/Rating";
import { useState } from "react";
import { Loader } from "../../../components/Loader";

export const DesktopBooking = ({
  listingData,
  calendarOpen,
  setCalendarOpen,
  loading,
}: BookingProps) => {
  const [openBookingResponse, setOpenBookingResponse] = useState(false);

  const {
    price,
    rating,
    guests: maxGuests,
    photos,
    vesselType,
    name,
  } = listingData;

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
      <BookingButton
        handleClick={() => setOpenBookingResponse(true)}
        setCalendarOpen={setCalendarOpen}
        fullWidth
      />
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
      <Dialog
        open={openBookingResponse}
        onClose={() => !loading && setOpenBookingResponse(false)}
        PaperProps={{
          sx: {
            width: "100%",
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: borderRadius,
          },
        }}
      >
        {loading ? (
          <Stack gap={2}>
            <Loader />
            <Typography fontWeight={600} fontSize={18} color="grey.700">
              Please wait while we place your reservation...
            </Typography>
          </Stack>
        ) : (
          <Stack width="100%" p={4} gap={3} divider={<Divider />}>
            <Stack gap={4}>
              <Stack textAlign="center">
                <Typography fontWeight={600} fontSize={18}>
                  Success!
                </Typography>
                <Typography>Your reservation is complete.</Typography>
                <Typography>Confirmation #: skjdnfjkdsfnkj</Typography>
              </Stack>
              <Stack direction="row" gap={2}>
                <Box
                  component={"img"}
                  src={photos[0]}
                  alt="main listing photo"
                  width={126}
                  height={96} // 106
                  borderRadius={2}
                  sx={{ objectFit: "cover" }}
                ></Box>
                <Stack>
                  <Typography
                    fontSize={12}
                    color="grey.600"
                    textTransform="capitalize"
                  >
                    {vesselType}
                  </Typography>
                  <Typography fontSize={14} textTransform="capitalize">
                    {name}
                  </Typography>
                  <Stack direction="row" gap={0.4} mt="auto">
                    <Rating rating={rating} fontSize={12} />
                    <Typography fontSize={12} color="grey.600">
                      ({7})
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Typography fontSize={22} fontWeight={600}>
                Your trip
              </Typography>
              <Stack gap={0.4}>
                <Typography fontWeight={600}>Dates</Typography>
                <Typography>Apr. 16 - 21</Typography>
              </Stack>
              <Stack gap={0.4}>
                <Typography fontWeight={600}>Guests</Typography>
                <Typography>1 guest</Typography>
              </Stack>
            </Stack>
            <Stack>
              <Receipt price={price} />
            </Stack>
          </Stack>
        )}
      </Dialog>
    </>
  );
};
