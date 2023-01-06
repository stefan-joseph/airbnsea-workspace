import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

type Props = {
  price: number;
  rating: number | null | undefined;
};
export const ReserveBar = ({ price, rating }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  return (
    <>
      {matches && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            backgroundColor: "#FFF",
            borderTop: "1px solid",
            borderTopColor: "grey.300",
            p: 2,
            pl: 3,
            pr: 3,
          }}
        >
          <Stack rowGap={0.2}>
            <Stack direction="row" alignItems="baseline" columnGap={1}>
              <Typography fontSize={18}>${price} USD</Typography>
              <Typography sx={{ fontWeight: 100 }}> day</Typography>
            </Stack>
            <Box>
              {start && end ? (
                <ButtonBase sx={{ textDecoration: "underline", fontSize: 14 }}>
                  {`${dayjs(start).format("MMM DD")} - ${dayjs(end).format(
                    "MMM DD"
                  )}`}
                </ButtonBase>
              ) : (
                <Stack direction="row" alignItems="baseline">
                  <StarRateRoundedIcon fontSize="inherit" />
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    {rating}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
          <Button variant="contained">
            {start && end ? "Reserve" : "Check availability"}
          </Button>
        </Stack>
      )}
    </>
  );
};
