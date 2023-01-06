import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { SearchListingsQuery, SearchLocation } from "@airbnb-clone/controller";
import { Box } from "@mui/material";
import { Marker } from "./Marker";
import { searchBarHeight } from "../../../constants/constants";

type MapProps = {
  listings: SearchListingsQuery["searchListings"]["results"];
  initialCenter: SearchLocation;
};

export const Map = ({ initialCenter, listings }: MapProps) => {
  const [openMarker, setOpenMarker] = useState<string>();

  return (
    <Box
      sx={{
        position: "sticky",
        top: searchBarHeight,
        height: `calc(100vh - ${searchBarHeight}px)`,
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={initialCenter}
        defaultZoom={1}
      >
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            lat={listing.latitude}
            lng={listing.longitude}
            data={listing}
            openMarker={openMarker}
            setOpenMarker={(id) => setOpenMarker(id)}
          />
        ))}
      </GoogleMapReact>
    </Box>
  );
};
