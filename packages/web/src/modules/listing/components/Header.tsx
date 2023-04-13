import {
  ButtonBase,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ShareSaveButtons } from "./ShareSaveButtons";
import { desktopMinWidth } from "../../../constants/constants";
import { Rating } from "../../../components/Rating";
import { ViewListingQuery } from "@airbnb-clone/controller";
import { useEffect, useState } from "react";

type Props = {
  data?: ViewListingQuery["viewListing"];
};

export const Header = ({ data }: Props) => {
  const matches = useMediaQuery(desktopMinWidth);

  return (
    <Stack spacing={0.5}>
      <Typography
        variant="h1"
        fontSize={28}
        fontWeight={600}
        letterSpacing={0.2}
        sx={{ textTransform: "capitalize" }}
      >
        {data ? (
          data.name
        ) : (
          <Skeleton width="100%" height="100%" sx={{ maxWidth: 500 }} />
        )}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        {data ? (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            divider={<Typography>·</Typography>}
          >
            <Rating rating={data.rating} />

            <ButtonBase sx={{ textDecoration: "underline" }}>
              7 reviews
            </ButtonBase>
            <ButtonBase sx={{ textDecoration: "underline" }}>
              {data.city}, {data.state ? `${data.state}, ` : null}
              {data.country}
            </ButtonBase>
          </Stack>
        ) : (
          <Skeleton width="100%" height={28} sx={{ maxWidth: 300 }} />
        )}
        {/* {matches && <ShareSaveButtons notVisible={!data?.city || !yes} />} */}
      </Stack>
    </Stack>
  );
};
