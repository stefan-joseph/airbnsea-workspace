import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { CreateBookingMutation } from "@airbnb-clone/controller";
import dayjs from "dayjs";
import { getDayDifference } from "@airbnb-clone/common";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

import { Rating } from "../../../components/Rating";

export const CompletionOfBooking = ({
  data,
  handleClose,
}: {
  data: CreateBookingMutation["createBooking"];
  handleClose: () => void;
}) => {
  const {
    listing,
    pricePerNight,
    start,
    end,
    guests,
    serviceFee,
    taxes,
    total,
  } = data;

  const dayDiff = getDayDifference(start, end);
  return (
    <>
      <Box position="absolute" top={10} left={10}>
        <IconButton
          onClick={() => {
            handleClose();
            window.location.reload();
          }}
        >
          <IoClose />
        </IconButton>
      </Box>
      <Stack width="100%" gap={3} divider={<Divider />}>
        <Stack gap={4}>
          <Stack textAlign="center">
            <Typography fontWeight={600} fontSize={22}>
              Success!
            </Typography>
            <Typography>Your reservation is complete.</Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            {listing?.img && (
              <Box
                component={"img"}
                src={listing.img}
                alt="main listing photo"
                width={126}
                height={96} // 106
                borderRadius={2}
                sx={{ objectFit: "cover" }}
              />
            )}
            <Stack>
              <Typography
                fontSize={12}
                color="grey.600"
                textTransform="capitalize"
              >
                {listing?.vesselType}
              </Typography>
              <Typography fontSize={14} textTransform="capitalize">
                {listing?.name}
              </Typography>
              <Stack direction="row" gap={0.4} mt="auto">
                {listing?.rating && (
                  <Rating rating={listing?.rating} fontSize={12} />
                )}
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
            <Typography>
              {dayjs(start).format("MMM DD")} –{" "}
              {dayjs(end).isAfter(start, "month")
                ? dayjs(end).format("MMM DD")
                : dayjs(end).format("DD")}
            </Typography>
          </Stack>
          <Stack gap={0.4}>
            <Typography fontWeight={600}>Guests</Typography>
            <Typography>
              {guests} guest{guests !== 1 ? "s" : ""}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography fontSize={22} fontWeight={600} gutterBottom>
            Price details
          </Typography>
          {[
            {
              label: `$${pricePerNight} USD x ${dayDiff} night${
                dayDiff !== 1 ? "s" : ""
              }`,
              value: pricePerNight * dayDiff,
            },
            {
              label: "Airbnsea service fee",
              value: serviceFee,
            },
            {
              label: "Taxes",
              value: taxes,
            },
          ].map(({ label, value }) => (
            <Stack key={label} direction="row" justifyContent="space-between">
              <Typography>{label}</Typography>
              <Typography>${value} USD</Typography>
            </Stack>
          ))}
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Total</Typography>
            <Typography fontWeight={600}>${total} USD</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
