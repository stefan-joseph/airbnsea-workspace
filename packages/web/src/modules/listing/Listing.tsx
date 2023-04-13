import { useState } from "react";
import { useViewListingQuery } from "@airbnb-clone/controller";
import { Stack, Typography, Divider, Box, IconButton } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate } from "react-router-dom";

import { desktopMinWidth, searchBarHeight } from "../../constants/constants";
import { Navbar } from "../navbar/Navbar";
import { Amenities } from "./components/Amenities";
import { Header } from "./components/Header";
import { PhotosWideScreen } from "./components/PhotosWideScreen";
import { ReserveBar } from "./components/ReserveBar";
import { ReserveCard } from "./components/ReserveCard";
import { Sleep } from "./components/Sleep";
import { SubHeader } from "./components/SubHeader";
import { PhotosNarrowScreen } from "./components/PhotosNarrowScreen";
import { PhotosDrawer } from "./components/PhotosDrawer";
import { ShareSaveButtons } from "./components/ShareSaveButtons";
import { SiteMap } from "../../components/SiteMap";
import { theme } from "../../MuiTheme";

export const Listing = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const { listingId } = useParams();

  const [photosOpen, setPhotosOpen] = useState(false);

  const { data, error, loading } = useViewListingQuery({
    variables: { listingId: listingId as string },
  });

  const matches = useMediaQuery(desktopMinWidth);
  const matchesReserveBar = useMediaQuery(theme.breakpoints.down("md"));

  if (data?.viewListing || loading) {
    return (
      <Box
        sx={{
          mt: matches ? `${searchBarHeight}px` : undefined,
          mb: matchesReserveBar ? 12 : 0,
        }}
      >
        {matches ? (
          <Navbar />
        ) : (
          <Stack direction="row" justifyContent="space-between" padding={1.75}>
            <IconButton
              onClick={() => navigate(state?.from || "/")}
              color="info"
            >
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </IconButton>
            <Box>
              <ShareSaveButtons onlyIcon spacing={1} />
            </Box>
          </Stack>
        )}
        {!matches && (
          <Box onClick={() => setPhotosOpen(true)} sx={{ cursor: "pointer" }}>
            <PhotosNarrowScreen photos={data?.viewListing.photos} />
          </Box>
        )}
        <Stack
          alignItems="center"
          sx={{
            pt: 3,
            pb: 3,
            ml: { xs: 3, md: 6 },
            mr: { xs: 3, md: 6 },
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: 1100, width: "100%" }}>
            <Header data={data?.viewListing} />
            {matches ? (
              <Box
                onClick={() => setPhotosOpen(true)}
                sx={{ cursor: "pointer" }}
              >
                <PhotosWideScreen photos={data?.viewListing.photos} />
              </Box>
            ) : (
              <Divider />
            )}
            <Stack direction="row" spacing={4} sx={{ pt: 3 }}>
              <Stack spacing={4} divider={<Divider />} sx={{ flex: 2 }}>
                <SubHeader data={data?.viewListing} />
                {data?.viewListing && (
                  <>
                    <Amenities amenities={data?.viewListing.amenities} />
                    <Typography>{data?.viewListing.description}</Typography>
                    <Sleep beds={data?.viewListing.beds} />
                  </>
                )}
              </Stack>
              <ReserveCard data={data?.viewListing} />
            </Stack>
          </Stack>
        </Stack>
        {!matchesReserveBar && <SiteMap />}
        <ReserveBar data={data?.viewListing} />
        {data?.viewListing && (
          <PhotosDrawer
            photos={data?.viewListing.photos}
            setPhotosOpen={setPhotosOpen}
            photosOpen={photosOpen}
          />
        )}
      </Box>
    );
  }

  console.log(error);
  return <div>There was an error...</div>;
};
