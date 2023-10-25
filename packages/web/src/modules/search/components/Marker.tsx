import { SearchListingResult } from "@airbnb-clone/controller";
import {
  Box,
  ClickAwayListener,
  Fab,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import OverlayView from "./OverlayView";
import { useNavigate } from "react-router-dom";
import { PhotoCarousel } from "./PhotoCarousel";

interface CustomMarkerProps {
  map?: google.maps.Map;
  listing: SearchListingResult;
  openMarker: string | undefined;
  setOpenMarker: (id: string | undefined) => void;
  mouseDownPosition: { x: number; y: number } | null;
  setMouseDownPosition: (
    mousePosition: { x: number; y: number } | null
  ) => void;
  handleClose: (e: globalThis.MouseEvent | TouchEvent) => void;
}

export default function Marker({
  map,
  listing,
  openMarker,
  setOpenMarker,
  mouseDownPosition,
  setMouseDownPosition,
  handleClose,
}: CustomMarkerProps) {
  const navigate = useNavigate();
  const markerRef = useRef<HTMLButtonElement>(null);

  const {
    id,
    latitude,
    longitude,
    photos,
    distance,
    city,
    state,
    country,
    beds,
    guests,
    price,
    rating,
  } = listing;

  const [showListing, setShowListing] = useState(false);

  return (
    <>
      {map && (
        <OverlayView
          position={{
            lat: latitude,
            lng: longitude,
          }}
          map={map}
          zIndex={openMarker === id ? 98 : 1}
        >
          <Fab
            variant="extended"
            ref={markerRef}
            sx={{
              width: 90,
              height: 30,
              // to center button on gps co-ordinate
              left: "calc(90px / -2)",
              top: "calc(30px / -2)",
              padding: 0,
              fontWeight: 600,
              letterSpacing: 0.2,
              color: openMarker === id ? "#FFF" : "inherit",
              backgroundColor:
                openMarker === id ? "rgba(0, 0, 0, 0.85)" : "#FFF",
              "&:hover": {
                backgroundColor:
                  openMarker === id ? "rgba(0, 0, 0, 0.85)" : undefined,
              },
            }}
            onClick={() => id && setOpenMarker(id)}
            data-openlisting={id}
          >
            ${price} USD
          </Fab>

          <Popper
            open={openMarker === id}
            anchorEl={markerRef.current}
            transition
            disablePortal
            placement="bottom"
            sx={{
              mt: 3,
              transform: "translateX(-50%)",
            }}
          >
            <Box
              component="a"
              onClick={(e) => navigate(`listing/${id}/view`)}
              sx={{ cursor: "pointer" }}
            >
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 3,
                  width: 300,
                  overflow: "hidden",
                }}
              >
                <ClickAwayListener
                  onClickAway={(e) => {
                    if (e.type === "mousedown") {
                      // @ts-ignore 'mousedown' type will include this
                      setMouseDownPosition({ x: e.x, y: e.y });
                    }
                  }}
                  mouseEvent={"onMouseDown"}
                >
                  <Box>
                    <ClickAwayListener
                      onClickAway={(e) => handleClose(e)}
                      mouseEvent={"onMouseUp"}
                    >
                      <Box sx={{ isolation: "isolate" }}>
                        <PhotoCarousel
                          photos={photos}
                          showArrowButtons={true}
                          aspectRatio="3/2"
                          showListing={showListing}
                          setShowListing={setShowListing}
                        />
                        <Box padding={2}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography
                              gutterBottom
                              fontSize={15}
                              fontWeight={600}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {city}, {state && `${state},`} {country}
                            </Typography>
                            <Typography
                              fontSize={15}
                              gutterBottom
                              sx={{ display: "flex", paddingLeft: 1 }}
                            >
                              <StarRateRoundedIcon fontSize="small" /> {rating}
                            </Typography>
                          </Box>
                          <Typography
                            fontSize={15}
                            fontWeight={200}
                            sx={{ color: "grey.700", marginBottom: -0.4 }}
                          >
                            {distance &&
                              `${
                                Math.round(distance) === 0
                                  ? "Less than 1 km away"
                                  : `${Math.round(distance)} km away`
                              }`}
                          </Typography>
                          <Typography
                            fontSize={15}
                            fontWeight={200}
                            gutterBottom
                            sx={{ color: "grey.700" }}
                          >
                            {beds} bed{beds === 1 ? "" : "s"} · {guests} guest
                            {guests === 1 ? "" : "s"}
                          </Typography>
                          <Typography fontSize={15} fontWeight={600}>
                            ${price} USD{" "}
                            <Box component="span" fontWeight={300}>
                              night
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
                    </ClickAwayListener>
                  </Box>
                </ClickAwayListener>
              </Paper>
            </Box>
          </Popper>
        </OverlayView>
      )}
    </>
  );
}
