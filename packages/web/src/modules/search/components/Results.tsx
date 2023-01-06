import { SearchListingsQuery } from "@airbnb-clone/controller";
import React, { useState } from "react";
import { Fab, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { searchBarHeight } from "../../../constants/constants";
import { Listing } from "./Listing";
import { Map } from "./Map";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { ListingSkeleton } from "./ListingSkeleton";

export const Results: React.FC<{
  loading?: boolean;
  data?: SearchListingsQuery["searchListings"];
}> = ({ loading, data }) => {
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");

  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Grid container sx={{ mt: `${searchBarHeight}px` }}>
      <Grid
        item
        xs={12}
        md={where ? 7 : 12}
        lg={where ? 6 : 12}
        sx={{
          overflow: "hidden",
          height: {
            xs: mapOpen ? `calc(100vh - ${searchBarHeight}px)` : "intitial",
            lg: "initial",
          },
        }}
      >
        <Grid container spacing={3} sx={{ padding: 4 }}>
          {data?.results
            ? data.results.map((listing, index) => (
                <Listing key={listing.id} data={listing} mapShowing={!!where} />
              ))
            : Array.from(new Array(searchParams.get("limit") || 12)).map(
                (_, index) => (
                  <ListingSkeleton key={index} mapShowing={!!where} />
                )
              )}
        </Grid>
      </Grid>
      {where && (
        <Grid
          item
          xs={12}
          md={5}
          lg={6}
          sx={{
            padding: 0,
            position: { xs: "absolute", md: "initial" },
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
            bottom: 30,
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
