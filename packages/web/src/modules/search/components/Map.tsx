import { useCallback, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { SearchListingsQuery, SearchLocation } from "@airbnb-clone/controller";
import { Box, useMediaQuery } from "@mui/material";

import {
  desktopMinWidth,
  searchBarHeight,
  bottomNavbarHeight,
  searchBarHeightMobile,
} from "../../../constants/constants";
import { Loader } from "../../../components/Loader";
import Marker from "./Marker";
import { mapStyles } from "./MapStyles";
import { renderGoogleConnection } from "../../../utils/renderGoogleConnection";

type MapProps = {
  listings: SearchListingsQuery["searchListings"]["results"];
  initialCenter: SearchLocation;
};

export const Map = ({ initialCenter, listings }: MapProps) => {
  const [openMarker, setOpenMarker] = useState<string>();
  const [mouseDownPosition, setMouseDownPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [map, setMap] = useState<google.maps.Map>();
  const [mapNode, setMapNode] = useState<HTMLDivElement>();

  const matches = useMediaQuery(desktopMinWidth);

  const mapRef = useCallback((node: HTMLDivElement | undefined) => {
    if (node) {
      const map = new window.google.maps.Map(node, {
        center: initialCenter,
        zoom: 3,
        restriction: {
          latLngBounds: {
            east: 180,
            north: 85,
            south: -85,
            west: -180,
          },
        },
        minZoom: 2,
        streetViewControl: false,
        fullscreenControl: false,
        // mapTypeId: "fdf263fa6faba606",
        mapTypeControlOptions: {
          mapTypeIds: [],
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: mapStyles,
      });
      setMap(map);
      setMapNode(node);
    }
  }, []);

  // const render = (status: Status): ReactElement => {
  //   if (status === Status.FAILURE) return <Box>There was an error..</Box>;
  //   return <Loader />;
  // };

  const handleClose = (e: globalThis.MouseEvent | TouchEvent) => {
    // if click outside map then do not close
    if (!mapNode?.contains(e.target as Node)) return;

    const element = e.target as HTMLElement;

    // if click event is on map zoom buttons then do not close
    if (element.classList.contains("gm-control-active")) return;

    // @ts-ignore touch events already handled by google API
    if (mouseDownPosition?.x == e.x && mouseDownPosition?.y == e.y) {
      // if click on other marker, set id. Otherwise, close.
      setOpenMarker(element.dataset.openlisting || undefined);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: matches ? searchBarHeight : searchBarHeightMobile,
        height: `calc(100vh - ${
          matches ? searchBarHeight : searchBarHeightMobile
        }px${!matches ? ` - ${bottomNavbarHeight}px` : ""})`,
      }}
    >
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}
        libraries={["places", "drawing", "geometry"]}
        render={renderGoogleConnection}
      >
        <Box ref={mapRef} id="map" height="100%">
          {listings.map((listing, index) => (
            <Marker
              key={index}
              map={map}
              listing={listing}
              openMarker={openMarker}
              setOpenMarker={setOpenMarker}
              mouseDownPosition={mouseDownPosition}
              setMouseDownPosition={setMouseDownPosition}
              handleClose={handleClose}
            />
          ))}
        </Box>
      </Wrapper>
    </Box>
  );
};
