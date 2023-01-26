import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { searchBarBorderColor } from "../../../constants/constants";

import { Booking } from "../../booking/Booking";

type Props = {
  price: number;
  rating: number | null | undefined;
};
export const ReserveBar = ({ price, rating }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {matches && (
        <Box
          position="fixed"
          bottom={0}
          width="100vw"
          borderTop="1px solid"
          sx={{
            backgroundColor: "#FFF",
            borderTopColor: searchBarBorderColor,
          }}
        >
          <Booking mobile price={price} rating={rating} />
        </Box>
      )}
    </>
  );
};
