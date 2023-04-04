import { ViewListingQuery } from "@airbnb-clone/controller";
import { Box, Skeleton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { searchBarBorderColor } from "../../../constants/constants";
import { Booking } from "../../booking/Booking";

type Props = {
  data?: ViewListingQuery["viewListing"];
};
export const ReserveBar = ({ data }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {matches && (
        <Box
          position="fixed"
          bottom={0}
          // height={78}
          width="100vw"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          borderTop="1px solid"
          padding={2}
          paddingLeft={3}
          paddingRight={3}
          sx={{
            backgroundColor: "#FFF",
            borderTopColor: searchBarBorderColor,
          }}
        >
          {data ? (
            <Booking
              mobile
              price={data.price}
              rating={data.rating}
              maxGuests={data.guests}
            />
          ) : (
            <>
              <Stack justifyContent="space-between">
                <Skeleton width={120} sx={{ fontSize: 26 }} />
                <Skeleton width={60} />
              </Stack>
              <Skeleton
                variant="rounded"
                width="100%"
                height={45}
                sx={{ maxWidth: 175, borderRadius: 2 }}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
};
