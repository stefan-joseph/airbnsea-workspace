import { Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { IoStar } from "react-icons/io5";
import { HiStar } from "react-icons/hi";

export const Rating = ({
  rating,
  fontSize,
}: {
  rating: number;
  fontSize?: number;
}) => {
  return (
    <Typography fontSize={fontSize} fontWeight={600} sx={{ display: "flex" }}>
      <HiStar fontSize="1.2em" />{" "}
      {rating.toString().split(".")[1]?.length > 1 ? rating : rating.toFixed(1)}
    </Typography>
  );
};
