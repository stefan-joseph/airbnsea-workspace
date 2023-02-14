import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import dayjs from "dayjs";

import { Field, FieldProps } from "formik";

type Props = {
  price: number;
  rating: number | null | undefined;
  start?: string;
  end?: string;
  handleClick?: () => void;
};

export const PriceAndRatingStack = ({
  price,
  rating,
  start,
  end,
  handleClick,
}: Props) => {
  return (
    <Stack rowGap={0.2}>
      <Stack
        direction="row"
        alignItems="baseline"
        columnGap={0.6}
        flexWrap="wrap"
      >
        <Typography fontWeight={600} fontSize={16}>
          ${price} USD
        </Typography>
        <Typography fontWeight={400} fontSize={14}>
          night
        </Typography>
      </Stack>
      <Box>
        {start && end ? (
          <ButtonBase
            onClick={handleClick}
            sx={{ textDecoration: "underline", fontSize: 14 }}
          >
            {`${dayjs(start).format("MMM DD")} - ${dayjs(end).format(
              "MMM DD"
            )}`}
          </ButtonBase>
        ) : (
          //@TODO make reusable rating component
          <Stack direction="row" alignItems="center">
            <StarRateRoundedIcon
              fontSize="inherit"
              sx={{ mt: -0.6, mr: 0.2 }}
            />
            <Typography
              fontSize={13}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {rating}
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};
