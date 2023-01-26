import { useState } from "react";
import { useViewListingQuery } from "@airbnb-clone/controller";
import { Stack, Typography, Divider, Box, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
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

export const Listing = () => {
  const navigate = useNavigate();
  const { listingId } = useParams();

  const [photosOpen, setPhotosOpen] = useState(false);

  const { data, error, loading } = useViewListingQuery({
    variables: { listingId: listingId as string },
  });

  const matches = useMediaQuery(desktopMinWidth);

  if (loading) return <div>Loading...</div>;

  if (data?.viewListing) {
    const {
      id,
      name,
      city,
      state,
      country,
      photos,
      vesselType,
      guests,
      beds,
      price,
      amenities,
      description,
      rating,
      owner,
    } = data.viewListing;

    return (
      <Box
        sx={{
          mt: matches ? `${searchBarHeight}px` : undefined,
          mb: { xs: 12 },
        }}
      >
        {matches ? (
          <Navbar />
        ) : (
          <Stack direction="row" justifyContent="space-between" padding={2}>
            <IconButton onClick={() => navigate(-1)} color="info">
              <ArrowBackIosNewRoundedIcon fontSize="small" />
            </IconButton>
            <Box>
              <ShareSaveButtons onlyIcon spacing={1} />
            </Box>
          </Stack>
        )}
        {!matches && (
          <Box onClick={() => setPhotosOpen(true)} sx={{ cursor: "pointer" }}>
            <PhotosNarrowScreen photos={photos} />
          </Box>
        )}

        <Stack
          alignItems="center"
          sx={{
            pt: 3,
            ml: { xs: 3, md: 6 },
            mr: { xs: 3, md: 6 },
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: 1100, width: "100%" }}>
            <Header data={{ name, city, state, country, rating }} />
            {matches ? (
              <Box
                onClick={() => setPhotosOpen(true)}
                sx={{ cursor: "pointer" }}
              >
                <PhotosWideScreen photos={photos} />
              </Box>
            ) : (
              <Divider />
            )}
            <Stack direction="row" spacing={4} sx={{ pt: 3 }}>
              <Stack spacing={4} divider={<Divider />} sx={{ flex: 2 }}>
                <SubHeader data={{ vesselType, guests, beds, owner }} />
                <Amenities amenities={amenities} />
                <Typography>{description}</Typography>
                <Sleep beds={beds} />
              </Stack>
              <ReserveCard data={{ price, rating }} />
            </Stack>
          </Stack>
        </Stack>
        <ReserveBar price={price} rating={rating} />
        <PhotosDrawer
          photos={photos}
          setPhotosOpen={setPhotosOpen}
          photosOpen={photosOpen}
        />
      </Box>
    );
  }

  console.log(error);
  return <div>There was an error...</div>;
};
