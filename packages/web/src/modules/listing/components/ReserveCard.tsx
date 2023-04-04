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

  const [yes, setYes] = useState(false);

  setTimeout(() => {
    setYes(true);
  }, 2000);

  return (
    <>
      {matches &&
        (data && yes ? (
          <Card
            raised
            sx={{
              position: "sticky",
              top: searchBarHeight + 30,
              height: "100%",
              width: 360,
              overflow: "unset",
              borderRadius,
              padding: 1,
            }}
          >
            <CardContent>
              {data && (
                <Booking
                  price={data.price}
                  rating={data.rating}
                  maxGuests={data.guests}
                />
              )}
            </CardContent>
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
