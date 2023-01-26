import { Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export const Rating = ({ rating }: { rating: number }) => {
  return (
    <Typography sx={{ display: "flex" }}>
      <StarRateRoundedIcon fontSize="small" /> {rating}
    </Typography>
  );
};
