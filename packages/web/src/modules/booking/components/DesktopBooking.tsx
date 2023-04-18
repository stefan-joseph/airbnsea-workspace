import {
  Box,
  Button,
  ButtonBase,
  Dialog,
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
import { CompletionOfBooking } from "./CompletionOfBooking";
import { RequestErrorMessage } from "../../../components/RequestErrorMessage";
import { useLoadingDelay } from "../../../components/hooks/useLoadingDelay";

export const DesktopBooking = ({
  listingData,
  calendarOpen,
  setCalendarOpen,
  result,
}: BookingProps) => {
  const [openBookingResponse, setOpenBookingResponse] =
    useState<boolean>(false);

  const { data, error, loading } = result;

  const { delay } = useLoadingDelay(loading);

  const { price, rating, guests: maxGuests } = listingData;

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
          <Rating rating={rating} fontSize={14} />
          <ButtonBase
            sx={{
              whiteSpace: "nowrap",
              textDecoration: "underline",
              fontSize: 14,
              fontWeight: 600,
              color: "grey.700",
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
      <BookingButton
        handleClick={() => setOpenBookingResponse(true)}
        setCalendarOpen={setCalendarOpen}
        fullWidth
      />
      <Receipt price={price} />
      <Dialog
        open={openBookingResponse}
        onClose={() => {
          if (loading) return;
          if (data?.createBooking) {
            window.location.reload();
          }
          setOpenBookingResponse(false);
        }}
        PaperProps={{
          sx: {
            width: "100%",

            p: 4,
            display: "flex",
            gap: 4,
            borderRadius: borderRadius,
          },
        }}
      >
        {loading || delay ? (
          <>
            <Loader />
            <Typography
              fontWeight={600}
              fontSize={18}
              color="grey.700"
              textAlign="center"
            >
              Please wait while we place your reservation...
            </Typography>
          </>
        ) : data?.createBooking ? (
          <CompletionOfBooking
            data={data.createBooking}
            handleClose={() => setOpenBookingResponse(false)}
          />
        ) : (
          <>
            <RequestErrorMessage
              header={error?.message}
              body="Please refresh the page or try again."
            />
            <Box ml="auto" mt="auto" mb={-2}>
              <Button
                size="small"
                onClick={() => setOpenBookingResponse(false)}
              >
                Close
              </Button>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
};
