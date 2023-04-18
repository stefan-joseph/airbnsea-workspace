import { Box, Chip, Skeleton } from "@mui/material";

import { useLoadingDelay } from "../../../components/hooks/useLoadingDelay";

export const PhotosNarrowScreen: React.FC<{ photos: string[] | undefined }> = ({
  photos,
}) => {
  const { delay } = useLoadingDelay(!!photos, 1000);

  return (
    <Box sx={{ position: "relative" }}>
      {photos && !delay ? (
        <>
          <Box
            component={"img"}
            src={photos[0]}
            alt="listing photo 1"
            style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover" }}
          />
          <Chip
            label={`1 / ${photos.length}`}
            size="small"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 12,
              color: "#FFF",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
        </>
      ) : (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ aspectRatio: "3/2" }}
        />
      )}
    </Box>
  );
};
