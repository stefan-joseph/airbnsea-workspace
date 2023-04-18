import { Box, Stack, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { IoStar } from "react-icons/io5";
import { HiStar } from "react-icons/hi";

export const Rating = ({
  rating,
  fontSize,
  starSize,
  marginTop,
}: {
  rating: number;
  fontSize?: number;
  starSize?: number;
  marginTop?: number;
}) => {
  return (
    <Stack direction="row" alignItems="center" gap={0.3}>
      <Box>
        <HiStar fontSize={starSize} />
      </Box>
      <Typography fontSize={fontSize} fontWeight={600} sx={{ display: "flex" }}>
        {rating.toString().split(".")[1]?.length > 1
          ? rating
          : rating.toFixed(1)}
      </Typography>
    </Stack>
  );
};
