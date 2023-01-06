import { SearchListingResult } from "@airbnb-clone/controller";
import {
  Box,
  ClickAwayListener,
  Fab,
  Grow,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import Carousel from "react-material-ui-carousel";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export const Marker: React.FC<{
  data: SearchListingResult;
  lat: number | null | undefined;
  lng: number | null | undefined;
  openMarker: string | undefined;
  setOpenMarker: (id: string | undefined) => void;
}> = ({ data, openMarker, setOpenMarker }) => {
  const markerRef = useRef<HTMLButtonElement>(null);

  const { id, photos, distance, city, state, country, beds, guests, price } =
    data;

  const handleClose = () => {
    // stop if click on another marker
    setOpenMarker(undefined);
  };

  return (
    <>
      <Fab
        variant="extended"
        ref={markerRef}
        sx={{
          position: "absolute",
          width: 90,
          height: 30,
          left: "calc(90px / -2)",
          top: "calc(30px / -2)",
          padding: 0,
          color: openMarker === id ? "#FFF" : "inherit",
          backgroundColor: openMarker === id ? "rgba(0, 0, 0, 0.85)" : "#FFF",
          "&:hover": {
            backgroundColor:
              openMarker === id ? "rgba(0, 0, 0, 0.85)" : undefined,
          },
        }}
        onClick={() => id && setOpenMarker(id)}
      >
        ${price} USD
      </Fab>
      <Popper
        open={openMarker === id}
        anchorEl={markerRef.current}
        sx={{ zIndex: 9999, padding: 1 }}
        // role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "top",
            }}
          >
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                width: 300,
                zIndex: 999,
                overflow: "hidden",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Carousel
                    autoPlay={false}
                    animation="slide"
                    indicatorContainerProps={{
                      style: {
                        position: "absolute",
                        zIndex: 1,
                        bottom: 0,
                      },
                    }}
                    sx={{
                      // border: "1px solid blue",
                      aspectRatio: "3 / 2",
                      // borderRadius: 3,
                    }}
                  >
                    {photos?.map((img) => (
                      <Box
                        key={img}
                        sx={{
                          width: "100%",
                          aspectRatio: "3 / 2",
                        }}
                      >
                        <img
                          src={`http://localhost:4000/images/${img}`}
                          alt=""
                          style={{
                            objectFit: "cover",
                            height: "100%",
                            width: "auto",
                          }}
                        />
                      </Box>
                    ))}
                  </Carousel>
                  <Box sx={{ margin: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontSize="larger"
                        gutterBottom
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {city}, {state && `${state},`} {country}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontSize="larger"
                        gutterBottom
                        sx={{ display: "flex", paddingLeft: 1 }}
                      >
                        <StarRateRoundedIcon fontSize="small" />{" "}
                        {4 + parseFloat(Math.random().toFixed(2))}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={200}
                      sx={{ color: "grey.600", marginBottom: -0.7 }}
                    >
                      {distance &&
                        `${
                          Math.round(distance) === 0
                            ? "Less than 1 km away"
                            : `${Math.round(distance)} km away`
                        }`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight={200}
                      gutterBottom
                      sx={{ color: "grey.600" }}
                    >
                      {beds} bed{beds === 1 ? "" : "s"} · {guests} guest
                      {guests === 1 ? "" : "s"}
                    </Typography>
                    <Typography variant="subtitle2" fontSize="larger">
                      ${price} USD{" "}
                      <Box component="span" fontWeight={200}>
                        night
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
