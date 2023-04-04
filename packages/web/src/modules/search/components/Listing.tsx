import { Box, Grid, Skeleton, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { SearchListingResult } from "@airbnb-clone/controller";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PhotoCarousel } from "./PhotoCarousel";
import { useState } from "react";

export const Listing: React.FC<{
  data: SearchListingResult | undefined;
  mapShowing: boolean;
}> = ({ data, mapShowing }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleNavigation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    let url = `/listing/${id}/view?`;
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
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        onClick={(e) => data?.id && handleNavigation(e, data.id)}
        sx={{ color: "initial", pb: 2, cursor: "pointer" }}
      >
        <Box borderRadius={4} overflow="hidden" position="relative">
          {data?.photos ? (
            <PhotoCarousel photos={data.photos} showArrowButtons={isHovering} />
          ) : (
            <Skeleton
              variant="rounded"
              height="100%"
              sx={{ aspectRatio: "1/1" }}
            />
          )}
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
              sx={{ color: "grey.700", marginBottom: -0.2 }}
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
          <Typography fontWeight={200} gutterBottom sx={{ color: "grey.700" }}>
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
                  sx={{ color: "grey.700" }}
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
