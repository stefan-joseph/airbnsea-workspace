import { Box, Skeleton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { searchBarBorderColor } from "../../../constants/constants";

import { Booking } from "../../booking/Booking";

type Props = {
  price: number | undefined;
  rating: number | undefined;
};
export const ReserveBar = ({ price, rating }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [yes, setYes] = useState(false);

  setTimeout(() => {
    setYes(true);
  }, 2000);

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
          {price && rating && yes ? (
            <Booking mobile price={price} rating={rating} />
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
