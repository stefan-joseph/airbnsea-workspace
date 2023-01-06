import { Box, Grid, Typography } from "@mui/material";

import Carousel from "react-material-ui-carousel";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { SearchListingResult } from "@airbnb-clone/controller";
import { useNavigate, useSearchParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";

export const Listing: React.FC<{
  data: SearchListingResult;

  mapShowing: boolean;
}> = ({ data, mapShowing }, props) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const {
    id,
    photos,
    city,
    state,
    country,
    price,
    beds,
    guests,
    distance,
    rating,
  } = data;

  const handleNavigation = (e: any) => {
    let url = `/listings/${id}/view?`;
    const start = searchParams.get("start");
    if (start) url = url + `start=${start}&`;
    const end = searchParams.get("end");
    if (end) url = url + `end=${end}&`;
    const guests = searchParams.get("guests");
    url = url + `guests=${guests || 1}`;

    navigate(url);
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={mapShowing ? 6 : 4}
      lg={mapShowing ? 6 : 3}
      sx={{ width: "100%" }}
    >
      {/* <Link to={`/listings/${id}/view`}> */}
      <Box
        sx={{ color: "initial", pb: 2, cursor: "pointer" }}
        onClick={handleNavigation}
      >
        <Box sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Carousel
            autoPlay={false}
            animation="slide"
            duration={400}
            sx={{
              aspectRatio: "1 / 1",
            }}
            navButtonsProps={{
              style: {
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgb(0,0,0)",
                height: "30px",
                width: "30px",
              },
            }}
            indicatorContainerProps={{
              style: {
                position: "absolute",
                zIndex: 1,
                bottom: 3,
                pointerEvents: "none",
              },
            }}
            IndicatorIcon={<CircleIcon sx={{ fontSize: 8 }} />}
            indicatorIconButtonProps={{
              style: {
                color: "rgb(255, 255, 255, 0.6)",
                padding: "2px",
                transition: "400ms",
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: "rgb(255, 255, 255)",
              },
            }}
          >
            {photos?.map((url, i) => (
              <Box
                key={url}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                }}
              >
                <img
                  src={url}
                  alt={`listing image ${i + 1}`}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
        <Box sx={{ p: 0.4, pt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
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
              fontSize={15}
              gutterBottom
              sx={{ display: "flex", alignItems: "center", paddingLeft: 1 }}
            >
              <StarRateRoundedIcon fontSize="small" sx={{ mt: -0.6 }} />{" "}
              {rating}
            </Typography>
          </Box>
          <Typography
            fontWeight={200}
            sx={{ color: "grey.700", marginBottom: -0.2 }}
          >
            {distance &&
              `${
                Math.round(distance) === 0
                  ? "Less than 1 km away"
                  : `${Math.round(distance)} km away`
              }`}
          </Typography>
          <Typography fontWeight={200} gutterBottom sx={{ color: "grey.700" }}>
            {beds} bed{beds === 1 ? "" : "s"} · {guests} guest
            {guests === 1 ? "" : "s"}
          </Typography>
          <Typography>
            ${price} USD{" "}
            <Box component="span" fontWeight={200} sx={{ color: "grey.700" }}>
              night
            </Box>
          </Typography>
        </Box>
      </Box>
      {/* </Link> */}
    </Grid>
  );
};
