import { SearchListingsQuery } from "@airbnb-clone/controller";
import React, { useState } from "react";
import { Fab, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import {
  appSidePaddingAlt,
  appSidePadding,
  desktopMinWidth,
  searchBarHeight,
} from "../../../constants/constants";
import { Listing } from "./Listing";
import { Map } from "./Map";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

export const Results: React.FC<{
  children: JSX.Element | undefined;
  data?: SearchListingsQuery["searchListings"];
}> = ({ children, data }) => {
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");

  const matches = useMediaQuery(desktopMinWidth);

  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={where ? 7 : 12}
        lg={where ? 6 : 12}
        xl={where ? 7 : 12}
        paddingLeft={where ? appSidePaddingAlt : appSidePadding}
        paddingRight={where ? appSidePaddingAlt : appSidePadding}
        sx={{
          overflow: "hidden",
          height: {
            xs: mapOpen ? `calc(100vh - ${searchBarHeight}px)` : "intitial",
            lg: "initial",
          },
        }}
      >
        <Typography fontWeight={700} paddingTop={3} paddingBottom={3}>
          {data ? `${data.count} vessels found` : <Skeleton width={150} />}
        </Typography>
        <Grid container spacing={3} sx={{ padding: 0 }}>
          {(data?.results
            ? data.results
            : Array.from(new Array(searchParams.get("limit") || 12))
          ).map((listing, index) => (
            <Listing
              key={index}
              data={
                typeof listing == "string" || typeof listing == "number"
                  ? undefined
                  : listing
              }
              mapShowing={!!where}
            />
          ))}
        </Grid>
        {children}
      </Grid>
      {where && (
        <Grid
          item
          xs={12}
          md={5}
          lg={6}
          xl={5}
          sx={{
            padding: 0,
            position: { xs: "absolute", md: "initial" },
            height: { xs: "100%", md: "unset" },
            zIndex: 1,
            width: "100%",
            display: { xs: mapOpen ? "initial" : "none", md: "initial" },
          }}
        >
          {data?.searchLocation && (
            <Map listings={data.results} initialCenter={data.searchLocation} />
          )}
        </Grid>
      )}
      {where && (
        <Fab
          variant="extended"
          onClick={() => setMapOpen(!mapOpen)}
          color="primary"
          sx={{
            display: { xs: "flex", md: "none" },
            width: 140,
            position: "fixed",
            bottom: matches ? 25 : 65,
            left: "50%",
            marginLeft: "calc(-140px / 2)",
            textTransform: "none",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          {mapOpen ? "Show list" : "Show map"}
          {mapOpen ? (
            <FormatListBulletedRoundedIcon fontSize="small" sx={{ ml: 1 }} />
          ) : (
            <MapOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
          )}
        </Fab>
      )}
    </Grid>
  );
};
