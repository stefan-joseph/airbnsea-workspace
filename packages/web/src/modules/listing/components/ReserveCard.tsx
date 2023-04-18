import { Card, CardContent, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ViewListingQuery } from "@airbnb-clone/controller";
import { useState } from "react";

import { borderRadius, searchBarHeight } from "../../../constants/constants";
import { Booking } from "../../booking/Booking";

type Props = {
  data?: ViewListingQuery["viewListing"];
};

export const ReserveCard = ({ data }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {matches &&
        (data ? (
          <Card
            sx={{
              position: "sticky",
              top: searchBarHeight + 30,
              height: "100%",
              width: 360,
              overflow: "unset",
              borderRadius,
              padding: 1,
              boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px;",
              border: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <CardContent>{data && <Booking listingData={data} />}</CardContent>
          </Card>
        ) : (
          <Skeleton
            variant="rounded"
            width={340}
            height={160}
            sx={{ borderRadius }}
          />
        ))}
    </>
  );
};
