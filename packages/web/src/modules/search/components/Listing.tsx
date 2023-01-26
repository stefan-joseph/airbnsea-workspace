import { Box, Grid, Skeleton, Typography } from "@mui/material";

import Carousel from "react-material-ui-carousel";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { SearchListingResult } from "@airbnb-clone/controller";
import { useNavigate, useSearchParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";

export const Listing: React.FC<{
  data: SearchListingResult | undefined;
  mapShowing: boolean;
}> = ({ data, mapShowing }, props) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleNavigation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
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
      <Box
        sx={{ color: "initial", pb: 2, cursor: "pointer" }}
        onClick={(e) => data?.id && handleNavigation(e, data.id)}
      >
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {!imageLoaded && (
            <Skeleton
              variant="rounded"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            />
          )}
          <Carousel
            autoPlay={false}
            animation="slide"
            duration={400}
            sx={{
              aspectRatio: "1 / 1",
              "&:hover .carousel-nav-buttons": {
                opacity: 0.6,
              },
              ".carousel-nav-buttons:hover": {
                opacity: "0.8 !important",
              },
            }}
            navButtonsProps={{
              style: {
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgb(0,0,0)",
                height: "30px",
                width: "30px",
              },
              className: "carousel-nav-buttons",
            }}
            indicatorContainerProps={{
              style: {
                position: "absolute",
                zIndex: 1,
                bottom: 8,
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
            {data?.photos?.map((url, i) => (
              <Box
                key={url}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  position: "relative",
                }}
              >
                <img
                  src={url}
                  alt={`listing image ${i + 1}`}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 200ms ease-out 0s",
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        <Box sx={{ p: 0.4, pt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              fontWeight={600}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                paddingRight: 1,
                width: data ? "unset" : "60%",
              }}
            >
              {data ? (
                `${data.city}, ${data.state ? data.state : ""} ${data.country}`
              ) : (
                <Skeleton width={"100%"} sx={{ fontSize: "16px" }} />
              )}
            </Typography>
            <Typography
              fontSize={15}
              fontWeight={600}
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",

                width: data ? "20%" : "20%",
              }}
            >
              {data ? (
                <>
                  <StarRateRoundedIcon fontSize="small" sx={{ mt: -0.6 }} />
                  {data?.rating}
                </>
              ) : (
                <Skeleton width={"100%"} sx={{ fontSize: "16px" }} />
              )}
            </Typography>
          </Box>
          {where && (
            <Typography
              fontWeight={200}
              sx={{ color: "grey.800", marginBottom: -0.2 }}
            >
              {data?.distance ? (
                Math.round(data.distance) === 0 ? (
                  "Less than 1 km away"
                ) : (
                  `${Math.round(data.distance)} km away`
                )
              ) : (
                <Skeleton width={"50%"} sx={{ fontSize: "16px" }} />
              )}
            </Typography>
          )}
          <Typography fontWeight={200} gutterBottom sx={{ color: "grey.800" }}>
            {data ? (
              `${data?.beds} bed${data?.beds === 1 ? "" : "s"} · ${
                data?.guests
              } guest${data?.guests === 1 ? "" : "s"}`
            ) : (
              <Skeleton width={"50%"} sx={{ fontSize: "16px" }} />
            )}
          </Typography>
          <Typography fontWeight={600}>
            {data ? (
              <>
                ${data?.price} USD{" "}
                <Box
                  component="span"
                  fontWeight={200}
                  sx={{ color: "grey.800" }}
                >
                  night
                </Box>
              </>
            ) : (
              <Skeleton width={"40%"} sx={{ fontSize: "16px" }} />
            )}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
