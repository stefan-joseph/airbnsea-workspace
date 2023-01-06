import {
  ButtonBase,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import { searchBarHeight } from "../../../constants/constants";
import { Booking } from "../../booking/Booking";

type Props = {
  data: {
    price: number;
    rating: number | null | undefined;
  };
};

export const ReserveCard = ({ data: { price, rating } }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {matches && (
        <Card
          raised
          sx={{
            position: "sticky",
            top: searchBarHeight + 30,
            height: "100%",
            width: 340,
            overflow: "unset",
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexWrap: "wrap" }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="baseline"
                sx={{ mr: 2 }}
              >
                <Typography variant="h3" fontSize={26} noWrap>
                  ${price} USD
                </Typography>
                <Typography>day</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                divider={<Typography>·</Typography>}
              >
                <Typography sx={{ display: "flex" }}>
                  <StarRateRoundedIcon fontSize="small" /> {rating}
                </Typography>
                <ButtonBase sx={{ whiteSpace: "nowrap" }}>7 reviews</ButtonBase>
              </Stack>
            </Stack>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Booking price={price} />
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
};
